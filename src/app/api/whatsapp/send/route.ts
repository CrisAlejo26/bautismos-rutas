import { NextRequest, NextResponse } from 'next/server';
import { sendLostPersonInfo } from '@/services/whatsappService';

// Esta es una API route de Next.js que maneja las solicitudes POST para enviar mensajes a WhatsApp
export async function POST(request: NextRequest) {
	try {
		// Obtener los datos del cuerpo de la solicitud
		const data = await request.json();
		const { name, phone, location } = data;

		// Validar que todos los campos requeridos estén presentes
		if (!name || !phone || !location || !location.lat || !location.lng) {
			return NextResponse.json(
				{ error: 'Faltan campos requeridos (nombre, teléfono o ubicación)' },
				{ status: 400 },
			);
		}

		// Enviar la información a WhatsApp
		const result = await sendLostPersonInfo(name, phone, location);

		// Devolver una respuesta exitosa
		return NextResponse.json({ success: true, result }, { status: 200 });
	} catch (error) {
		console.error('Error al enviar mensaje a WhatsApp:', error);

		// Devolver una respuesta de error
		return NextResponse.json(
			{ error: 'Error al enviar mensaje a WhatsApp', details: (error as Error).message },
			{ status: 500 },
		);
	}
}
