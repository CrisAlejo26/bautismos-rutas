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

			// Comandos básicos
			bot.start(async ctx => {
				const chatId = ctx.chat?.id;
				console.log(`Usuario inició /start en chat ${chatId}`);
				if (chatId) await ctx.reply('Soy un bot. ¿En qué puedo ayudarte?');
			});

			bot.help(async ctx => {
				const chatId = ctx.chat?.id;
				if (!chatId) return;
				console.log(`Usuario pidió /help en chat ${chatId}`);
				await ctx.reply('Ayuda');
			});

			// Nuevo comando /bautismos
			bot.command('bautismos', async ctx => {
				const chatId = ctx.chat?.id;
				console.log(`Usuario pidió /bautismos en chat ${chatId}`);
				await ctx.reply('¡Bienvenido a las notificaciones!');
			});

			// Registrar comandos para sugerencias en Telegram
			bot.telegram
				.setMyCommands([
					{ command: 'start', description: 'Iniciar el bot' },
					{ command: 'help', description: 'Mostrar ayuda' },
					{ command: 'personas', description: 'Cómo registrarse' },
					{ command: 'bautismos', description: 'Unirte a las notificaciones' },
				])
				.catch(err => console.warn('No se pudo establecer lista de comandos:', err));

			// Escuchar la palabra "bautismos" en texto libre
			bot.hears(/bautismos/i, async ctx => {
				const chatId = ctx.chat?.id;
				if (!chatId) return;
				console.log(`Usuario escribió "bautismos" en chat ${chatId}`);

				try {
					await fs.access(DATA_FILE).catch(() => fs.writeFile(DATA_FILE, '', 'utf-8'));
					const content = await fs.readFile(DATA_FILE, 'utf-8');
					const chatIds = content.split('\n').filter(l => l.trim());

					if (chatIds.includes(String(chatId))) {
						await ctx.reply(
							'Ya estás en la lista. Recibirás notificaciones cuando alguien necesite ayuda.',
						);
					} else {
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

			// Comando personalizado para explicar registro
			bot.command('personas', async ctx => {
				const chatId = ctx.chat?.id;
				if (!chatId) return;
				console.log(`Usuario pidió /personas en chat ${chatId}`);
				await ctx.reply(
					'Para registrarte y recibir notificaciones, escribe "bautismos" en el chat.',
				);
			});

			// Manejar cualquier otro texto
			bot.on('text', async ctx => {
				const text = ctx.message.text;
				if (text.startsWith('/') || /bautismos/i.test(text)) return;
				const chatId = ctx.chat?.id;
				if (!chatId) return;
				console.log(`Usuario envió mensaje: ${text}`);
				await ctx.reply(text);
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

export async function sendToAllUsers(message: string): Promise<void> {
	if (typeof window !== 'undefined') return;
	const telegramBot = initBot();
	if (!telegramBot) throw new Error('No se pudo inicializar el bot de Telegram');

	try {
		let content: string;
		try {
			content = await fs.readFile(DATA_FILE, 'utf-8');
		} catch {
			await fs.mkdir(DATA_DIR, { recursive: true });
			await fs.writeFile(DATA_FILE, '', 'utf-8');
			content = '';
		}

		const chatIds = content.split('\n').filter(l => l.trim());
		const promises: Promise<any>[] = [];

		// Al administrador siempre
		promises.push(
			telegramBot.telegram
				.sendMessage(ADMIN_CHAT_ID, message, { parse_mode: 'HTML' })
				.then(() => console.log(`Mensaje enviado al admin (${ADMIN_CHAT_ID})`))
				.catch(err => console.error('Error al enviar al admin:', err)),
		);

		for (const id of chatIds) {
			if (id === ADMIN_CHAT_ID) continue;
			promises.push(
				telegramBot.telegram
					.sendMessage(id, message, { parse_mode: 'HTML' })
					.then(() => console.log(`Mensaje enviado a ${id}`))
					.catch(err => console.error(`Error al enviar a ${id}:`, err)),
			);
		}

		await Promise.allSettled(promises);
	} catch (error) {
		console.error('Error en sendToAllUsers:', error);
		throw error;
	}
}

export async function sendLostPersonInfo(
	name: string,
	phone: string,
	location: { lat: number; lng: number },
): Promise<void> {
	const url = `https://maps.google.com/?q=${location.lat},${location.lng}`;
	const message =
		`🔴 <b>ALERTA: PERSONA PERDIDA</b> 🔴\n\n` +
		`<b>Nombre:</b> ${name}\n` +
		`<b>Teléfono:</b> ${phone}\n` +
		`<b>Ubicación:</b> ${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}\n` +
		`<b>Ver en Google Maps:</b> <a href="${url}">${url}</a>\n\n` +
		`Por favor, contacta con esta persona lo antes posible para ayudarla.`;

	// Log opcional
	await fs.mkdir(path.resolve(process.cwd(), 'data'), { recursive: true });
	await fs.appendFile(
		path.resolve(process.cwd(), 'data', 'lost-persons.txt'),
		`${new Date().toISOString()} | Nombre: ${name} | Teléfono: ${phone} | Ub: ${location.lat},${
			location.lng
		}\n`,
	);

	return sendToAllUsers(message);
}

export async function sendDirectMessage(message: string): Promise<void> {
	const telegramBot = initBot();
	if (!telegramBot) throw new Error('No se pudo inicializar el bot de Telegram');
	await telegramBot.telegram.sendMessage(ADMIN_CHAT_ID, message, { parse_mode: 'HTML' });
}
