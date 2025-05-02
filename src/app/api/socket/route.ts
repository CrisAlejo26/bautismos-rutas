import { Server as ServerIO } from 'socket.io';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Almacenar el número de usuarios conectados globalmente
let onlineUsers = 0;
let io: ServerIO;

export async function GET() {
	try {
		// Verificar si ya existe una instancia de Socket.io
		if (!io) {
			// Crear una nueva instancia de Socket.io
			const { createServer } = await import('node:http');

			// Crear un servidor HTTP
			const httpServer = createServer();

			// Inicializar Socket.io
			io = new ServerIO(httpServer, {
				cors: {
					origin: '*',
					methods: ['GET', 'POST'],
				},
			});

			// Manejar conexiones de clientes
			io.on('connection', socket => {
				// Incrementar contador cuando un usuario se conecta
				onlineUsers++;

				// Emitir el número actualizado a todos los clientes
				io.emit('updateOnlineUsers', onlineUsers);

				console.log(`Usuario conectado. Total: ${onlineUsers}`);

				// Cuando un usuario se desconecta
				socket.on('disconnect', () => {
					// Decrementar contador
					onlineUsers--;

					// Emitir el número actualizado a todos los clientes
					io.emit('updateOnlineUsers', onlineUsers);

					console.log(`Usuario desconectado. Total: ${onlineUsers}`);
				});
			});

			// Iniciar el servidor HTTP
			httpServer.listen(3001);

			console.log('Socket.io iniciado en el puerto 3001');
		}

		return new Response('Socket.io server running', { status: 200 });
	} catch (error) {
		console.error('Error al iniciar Socket.io:', error);
		return new Response('Error initializing Socket.io server', { status: 500 });
	}
}
