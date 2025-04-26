// Servicio de Telegram para enviar mensajes
import { Telegraf } from 'telegraf';
import * as fs from 'fs/promises';
import * as path from 'path';

// Constantes de configuración
const BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || '';
// ID de chat fijo al que enviar los mensajes (tu número de teléfono)
const ADMIN_CHAT_ID = '34641305623';
// Ruta para guardar los IDs de chat
const DATA_DIR = path.resolve(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'personas.txt');

// Inicialización del bot (solo en el servidor)
let bot: Telegraf | null = null;

// Función para inicializar el bot (solo se ejecuta en el servidor)
function initBot() {
	if (typeof window === 'undefined' && !bot) {
		try {
			bot = new Telegraf(BOT_TOKEN);
			console.log('🤖 Bot de Telegram inicializado');

			// Crear la carpeta data si no existe
			fs.mkdir(DATA_DIR, { recursive: true }).catch(err => {
				console.error('Error al crear carpeta de datos:', err);
			});

			// Configurar comandos básicos - equivalente a start() en python-telegram-bot
			bot.start(async ctx => {
				const chatId = ctx.chat?.id;
				console.log(`Usuario inició /start en chat ${chatId}`);
				if (chatId) {
					await ctx.reply('Soy un bot. ¿En qué puedo ayudarte?');
				}
			});

			// Comando de ayuda - equivalente a help() en python-telegram-bot
			bot.help(async ctx => {
				const chatId = ctx.chat?.id;
				if (!chatId) return;
				console.log(`Usuario pidió /help en chat ${chatId}`);
				await ctx.reply('Ayuda');
			});

			// Escuchar la palabra "bautismos" para registrar al usuario
			bot.hears(/bautismos/i, async ctx => {
				const chatId = ctx.chat?.id;
				if (!chatId) return;
				console.log(`Usuario escribió "bautismos" en chat ${chatId}`);

				try {
					// Verificar si el archivo existe, si no, crearlo
					try {
						await fs.access(DATA_FILE);
					} catch {
						// El archivo no existe, lo creamos
						await fs.writeFile(DATA_FILE, '', 'utf-8');
					}

					// Leer el archivo para verificar si el ID ya está registrado
					const content = await fs.readFile(DATA_FILE, 'utf-8');
					const chatIds = content.split('\n').filter(line => line.trim().length > 0);

					// Verificar si el ID ya está en la lista
					if (chatIds.includes(String(chatId))) {
						await ctx.reply(
							'Ya estás en la lista. Recibirás notificaciones cuando alguien necesite ayuda.',
						);
					} else {
						// Añadir el ID al archivo
						await fs.appendFile(DATA_FILE, `${chatId}\n`);
						await ctx.reply(
							'¡Ahora estás en la lista! Recibirás notificaciones cuando alguien necesite ayuda.',
						);
					}
				} catch (err) {
					console.error('Error al registrar usuario:', err);
					await ctx.reply(
						'❌ Error al registrarte. Por favor, inténtalo de nuevo más tarde.',
					);
				}
			});

			// Comando personalizado - equivalente a custm() en python-telegram-bot
			bot.command('personas', async ctx => {
				const chatId = ctx.chat?.id;
				if (!chatId) return;
				console.log(`Usuario pidió /personas en chat ${chatId}`);

				// Informar al usuario que debe escribir "bautismos"
				await ctx.reply(
					'Para registrarte y recibir notificaciones, escribe "bautismos" en el chat.',
				);
			});

			// Manejar cualquier otro mensaje - equivalente a custm() en python-telegram-bot
			bot.on('text', async ctx => {
				// Ignorar comandos y la palabra "bautismos" que ya están manejados
				if (ctx.message.text.startsWith('/') || /bautismos/i.test(ctx.message.text)) return;

				const chatId = ctx.chat?.id;
				if (!chatId) return;
				console.log(`Usuario envió mensaje: ${ctx.message.text}`);

				// Responder con el mismo texto, como en el ejemplo de Python
				await ctx.reply(ctx.message.text);
			});

			// Iniciar el bot en modo polling
			bot.launch()
				.then(() => console.log('🤖 Bot iniciado en modo polling'))
				.catch(err => console.error('Error al iniciar el bot:', err));

			// Graceful shutdown
			process.once('SIGINT', () => bot?.stop('SIGINT'));
			process.once('SIGTERM', () => bot?.stop('SIGTERM'));
		} catch (error) {
			console.error('Error al inicializar el bot de Telegram:', error);
		}
	}
	return bot;
}

/**
 * Envía un mensaje a todos los usuarios registrados
 * @param message El mensaje a enviar
 * @returns Promise<void>
 */
export async function sendToAllUsers(message: string): Promise<void> {
	// Solo ejecutar en el servidor
	if (typeof window !== 'undefined') {
		console.warn('sendToAllUsers solo puede ejecutarse en el servidor');
		return;
	}

	// Inicializar el bot si no está inicializado
	const telegramBot = initBot();
	if (!telegramBot) {
		throw new Error('No se pudo inicializar el bot de Telegram');
	}

	try {
		// Leer los chat IDs del archivo
		let content: string;
		try {
			content = await fs.readFile(DATA_FILE, 'utf-8');
		} catch (err) {
			console.error('Error leyendo personas.txt:', err);
			// Si el archivo no existe, crearlo
			await fs.mkdir(DATA_DIR, { recursive: true });
			await fs.writeFile(DATA_FILE, '', 'utf-8');
			content = '';
		}

		const chatIds = content.split('\n').filter(line => line.trim().length > 0);

		// Si no hay chat IDs, enviar solo al administrador
		if (chatIds.length === 0) {
			console.warn('No hay usuarios registrados, enviando solo al administrador');
			await telegramBot.telegram.sendMessage(ADMIN_CHAT_ID, message, { parse_mode: 'HTML' });
			return;
		}

		// Enviar el mensaje a cada chat ID y al administrador
		const promises = [];

		// Siempre enviar al administrador
		promises.push(
			telegramBot.telegram
				.sendMessage(ADMIN_CHAT_ID, message, { parse_mode: 'HTML' })
				.then(() => console.log(`Mensaje enviado al administrador (${ADMIN_CHAT_ID})`))
				.catch(err => console.error(`Error enviando mensaje al administrador:`, err)),
		);

		// Enviar a todos los usuarios registrados
		for (const chatId of chatIds) {
			// No enviar duplicado al administrador
			if (chatId === ADMIN_CHAT_ID) continue;

			promises.push(
				telegramBot.telegram
					.sendMessage(chatId, message, { parse_mode: 'HTML' })
					.then(() => console.log(`Mensaje enviado a ${chatId}`))
					.catch(err => console.error(`Error enviando mensaje a ${chatId}:`, err)),
			);
		}

		// Esperar a que todos los mensajes se envíen
		await Promise.allSettled(promises);
	} catch (error) {
		console.error('Error en sendToAllUsers:', error);
		throw error;
	}
}

/**
 * Envía la información de una persona perdida a todos los usuarios registrados
 * @param name Nombre de la persona
 * @param phone Teléfono de la persona
 * @param location Ubicación de la persona (latitud y longitud)
 * @returns Promise<void>
 */
export async function sendLostPersonInfo(
	name: string,
	phone: string,
	location: { lat: number; lng: number },
): Promise<void> {
	// Crear la URL de Google Maps
	const googleMapsUrl = `https://maps.google.com/?q=${location.lat},${location.lng}`;

	// Crear el mensaje con formato HTML
	const message =
		`🔴 <b>ALERTA: PERSONA PERDIDA</b> 🔴\n\n` +
		`<b>Nombre:</b> ${name}\n` +
		`<b>Teléfono:</b> ${phone}\n` +
		`<b>Ubicación:</b> ${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}\n` +
		`<b>Ver en Google Maps:</b> <a href="${googleMapsUrl}">${googleMapsUrl}</a>\n\n` +
		`Por favor, contacta con esta persona lo antes posible para ayudarla.`;

	// Guardar la información en el archivo de registro (opcional)
	try {
		// Crear la carpeta data si no existe
		await fs.mkdir(path.resolve(process.cwd(), 'data'), { recursive: true });

		// Guardar la información en un archivo de registro
		const logEntry = `${new Date().toISOString()} | Nombre: ${name} | Teléfono: ${phone} | Ubicación: ${
			location.lat
		}, ${location.lng}\n`;
		await fs.appendFile(path.resolve(process.cwd(), 'data', 'lost-persons.txt'), logEntry);
	} catch (err) {
		console.error('Error al guardar registro de persona perdida:', err);
		// Continuar aunque falle el registro
	}

	// Enviar el mensaje a todos los usuarios registrados
	return sendToAllUsers(message);
}

/**
 * Envía un mensaje directamente al administrador
 * @param message El mensaje a enviar
 * @returns Promise<void>
 */
export async function sendDirectMessage(message: string): Promise<void> {
	// Inicializar el bot si no está inicializado
	const telegramBot = initBot();
	if (!telegramBot) {
		throw new Error('No se pudo inicializar el bot de Telegram');
	}

	try {
		// Enviar el mensaje directamente al administrador
		await telegramBot.telegram.sendMessage(ADMIN_CHAT_ID, message, { parse_mode: 'HTML' });
	} catch (error) {
		console.error('Error en sendDirectMessage:', error);
		throw error;
	}
}
