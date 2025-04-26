// Servicio de Telegram para enviar mensajes
import { Telegraf } from 'telegraf';
import * as fs from 'fs/promises';
import * as path from 'path';

// Constantes de configuración
const BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || '';
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

			// Configurar comandos básicos
			bot.start(async ctx => {
				const chatId = ctx.chat?.id;
				console.log(`Usuario inició /start en chat ${chatId}`);
				if (chatId) {
					await ctx.reply(
						'¡Hola! Bienvenido al bot de Bautismos en Agua Finestrat - Benidorm',
					);
				}
			});

			bot.command('personas', async ctx => {
				const chatId = ctx.chat?.id;
				if (!chatId) return;
				console.log(`Usuario pidió /personas en chat ${chatId}`);

				// Asegurarnos de que la carpeta existe
				try {
					await fs.mkdir(DATA_DIR, { recursive: true });
				} catch (err) {
					console.error('Error al crear carpeta de datos:', err);
				}

				// Añadir al archivo
				try {
					await fs.appendFile(DATA_FILE, `${chatId}\n`);
					await ctx.reply(
						'¡Ahora estás en la lista! Recibirás notificaciones cuando alguien necesite ayuda.',
					);
				} catch (err) {
					console.error('Error al escribir en personas.txt:', err);
					await ctx.reply('❌ Error al guardar tu chat ID.');
				}
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

		const chatIds = content
			.split('\n')
			.filter(line => line.trim().length > 0)
			.map(line => parseInt(line.trim(), 10))
			.filter(id => !isNaN(id));

		// Si no hay chat IDs, no enviar nada
		if (chatIds.length === 0) {
			console.warn('No hay usuarios registrados para enviar mensajes');
			return;
		}

		// Enviar el mensaje a cada chat ID
		for (const chatId of chatIds) {
			try {
				await telegramBot.telegram.sendMessage(chatId, message, { parse_mode: 'HTML' });
				console.log(`Mensaje enviado a ${chatId}`);
			} catch (err) {
				console.error(`Error enviando mensaje a ${chatId}:`, err);
			}
		}
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

	// Enviar el mensaje a todos los usuarios
	return sendToAllUsers(message);
}
