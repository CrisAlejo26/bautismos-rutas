import { NextRequest, NextResponse } from 'next/server';

// Token de verificación para el webhook (debe coincidir con el configurado en la plataforma de WhatsApp)
const VERIFY_TOKEN = 'bautismos_finestrat_webhook_token';

export async function GET(request: NextRequest) {
	// Obtener los parámetros de la solicitud
	const searchParams = request.nextUrl.searchParams;
	const mode = searchParams.get('hub.mode');
	const token = searchParams.get('hub.verify_token');
	const challenge = searchParams.get('hub.challenge');

	// Verificar que sea una solicitud de verificación del webhook
	if (mode === 'subscribe' && token === VERIFY_TOKEN) {
		console.log('Webhook verificado correctamente');
		// Responder con el desafío para confirmar la verificación
		return new NextResponse(challenge, { status: 200 });
	} else {
		// Si el token no coincide, rechazar la solicitud
		console.error('Verificación de webhook fallida');
		return new NextResponse('Verificación fallida', { status: 403 });
	}
}

export async function POST(request: NextRequest) {
	try {
		// Obtener los datos del cuerpo de la solicitud
		const data = await request.json();

		// Registrar los datos recibidos para depuración
		console.log('Webhook recibido:', JSON.stringify(data, null, 2));

		// Procesar las notificaciones recibidas
		if (data.object === 'whatsapp_business_account') {
			// Procesar las entradas (pueden ser múltiples)
			for (const entry of data.entry) {
				// Procesar los cambios en cada entrada
				for (const change of entry.changes) {
					// Verificar que sea un cambio de valor en WhatsApp
					if (change.field === 'messages') {
						const value = change.value;

						// Procesar mensajes recibidos
						if (value.messages && value.messages.length > 0) {
							// Aquí puedes procesar los mensajes recibidos
							console.log('Mensajes recibidos:', value.messages);
						}

						// Procesar notificaciones de entrega
						if (value.statuses && value.statuses.length > 0) {
							// Aquí puedes procesar las notificaciones de entrega
							console.log('Notificaciones de estado:', value.statuses);
						}
					}
				}
			}

			// Responder con éxito para confirmar la recepción
			return NextResponse.json({ success: true }, { status: 200 });
		}

		// Si no es un objeto de WhatsApp Business, rechazar
		return NextResponse.json({ error: 'Objeto no reconocido' }, { status: 400 });
	} catch (error) {
		console.error('Error al procesar webhook de WhatsApp:', error);

		// Devolver una respuesta de error
		return NextResponse.json(
			{ error: 'Error al procesar webhook', details: (error as Error).message },
			{ status: 500 },
		);
	}
}
