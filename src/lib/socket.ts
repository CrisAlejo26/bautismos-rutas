import { Server as NetServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { NextApiRequest } from 'next';
import { NextApiResponse } from 'next';

export type NextApiResponseWithSocket = NextApiResponse & {
	socket: {
		server: NetServer & {
			io?: SocketIOServer;
		};
	};
};

export const initSocket = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
	if (!res.socket.server.io) {
		const io = new SocketIOServer(res.socket.server, {
			path: '/api/socket',
			addTrailingSlash: false,
		});

		// Almacenar el número de usuarios conectados
		let onlineUsers = 0;

		io.on('connection', socket => {
			// Incrementar contador cuando un usuario se conecta
			onlineUsers++;

			// Emitir el número actualizado a todos los clientes
			io.emit('updateOnlineUsers', onlineUsers);

			// Cuando un usuario se desconecta
			socket.on('disconnect', () => {
				// Decrementar contador
				onlineUsers--;

				// Emitir el número actualizado a todos los clientes
				io.emit('updateOnlineUsers', onlineUsers);
			});
		});

		// Guardar la instancia de io en el servidor para reutilizarla
		res.socket.server.io = io;
	}

	return res.socket.server.io;
};
