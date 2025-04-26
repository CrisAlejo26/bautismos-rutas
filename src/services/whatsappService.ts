// Constantes de configuración cargadas desde variables de entorno
const WHATSAPP_API_URL = process.env.NEXT_PUBLIC_WHATSAPP_API_URL;
const PHONE_NUMBER_ID = process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER_ID;
const WHATSAPP_BUSINESS_ACCOUNT_ID = process.env.NEXT_PUBLIC_WHATSAPP_BUSINESS_ACCOUNT_ID;
// Asegurarse de que el número de teléfono tenga el prefijo del país (34 para España)
const RECIPIENT_PHONE_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_RECIPIENT_PHONE;

// El token de acceso debe estar en variables de entorno y no debe ser público
// En el cliente, este valor será una cadena vacía, pero en el servidor tendrá el valor correcto
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_WHATSAPP_ACCESS_TOKEN || '';

/**
 * Envía un mensaje de texto simple a través de WhatsApp
 * @param message El mensaje a enviar
 * @returns Promise con la respuesta de la API
 */
interface WhatsAppResponse {
	messaging_product: string;
	contacts: Array<{ input: string; wa_id: string }>;
	messages: Array<{ id: string }>;
}

// Función para enviar un mensaje usando una plantilla predefinida
export async function sendWhatsAppTemplateMessage(
	templateName: string = 'hello_world',
	languageCode: string = 'es',
): Promise<WhatsAppResponse> {
	try {
		const response = await fetch(`${WHATSAPP_API_URL}/${PHONE_NUMBER_ID}/messages`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${ACCESS_TOKEN}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				messaging_product: 'whatsapp',
				to: RECIPIENT_PHONE_NUMBER,
				type: 'template',
				template: {
					name: templateName,
					language: {
						code: languageCode,
					},
				},
			}),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(`Error al enviar mensaje: ${JSON.stringify(errorData)}`);
		}

		return await response.json();
	} catch (error) {
		console.error('Error en sendWhatsAppTemplateMessage:', error);
		throw error;
	}
}

// Función para enviar un mensaje de texto simple
export async function sendWhatsAppTextMessage(message: string): Promise<WhatsAppResponse> {
	try {
		const response = await fetch(`${WHATSAPP_API_URL}/${PHONE_NUMBER_ID}/messages`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${ACCESS_TOKEN}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				messaging_product: 'whatsapp',
				to: RECIPIENT_PHONE_NUMBER,
				type: 'text',
				text: {
					body: message,
				},
			}),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(`Error al enviar mensaje: ${JSON.stringify(errorData)}`);
		}

		return await response.json();
	} catch (error) {
		console.error('Error en sendWhatsAppTextMessage:', error);
		throw error;
	}
}

/**
 * Envía la información de ubicación de un usuario perdido a través de WhatsApp
 * @param name Nombre del usuario
 * @param phone Teléfono del usuario
 * @param location Objeto con la ubicación (lat, lng)
 * @returns Promise con la respuesta de la API
 */
export async function sendLostPersonInfo(
	name: string,
	phone: string,
	location: { lat: number; lng: number },
): Promise<WhatsAppResponse> {
	try {
		const googleMapsUrl = `https://maps.google.com/?q=${location.lat},${location.lng}`;

		const message =
			`🆘 *ALERTA: PERSONA PERDIDA* 🆘\n\n` +
			`*Nombre:* ${name}\n` +
			`*Teléfono:* ${phone}\n` +
			`*Ubicación:* ${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}\n` +
			`*Ver en Google Maps:* ${googleMapsUrl}\n\n` +
			`Por favor, contacta con esta persona lo antes posible para ayudarla.`;

		return await sendWhatsAppTextMessage(message);
	} catch (error) {
		console.error('Error en sendLostPersonInfo:', error);
		throw error;
	}
}

/**
 * Configura un webhook para recibir notificaciones de WhatsApp
 * Esta función debe ejecutarse en el servidor backend
 * @param verifyToken Token de verificación para el webhook
 * @param callbackUrl URL de devolución de llamada para el webhook
 * @returns Promise con la respuesta de la API
 */
interface WebhookResponse {
	success: boolean;
	id?: string;
	data?: unknown;
}

export async function setupWhatsAppWebhook(
	verifyToken: string,
	callbackUrl: string,
): Promise<WebhookResponse> {
	try {
		const response = await fetch(
			`${WHATSAPP_API_URL}/${WHATSAPP_BUSINESS_ACCOUNT_ID}/subscribed_apps`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${ACCESS_TOKEN}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					verify_token: verifyToken,
					callback_url: callbackUrl,
					fields: [
						'messages',
						'message_deliveries',
						'messaging_postbacks',
						'message_reads',
					],
				}),
			},
		);

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(`Error al configurar webhook: ${JSON.stringify(errorData)}`);
		}

		return await response.json();
	} catch (error) {
		console.error('Error en setupWhatsAppWebhook:', error);
		throw error;
	}
}
