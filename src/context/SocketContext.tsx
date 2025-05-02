'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
	socket: Socket | null;
	onlineUsers: number;
}

const SocketContext = createContext<SocketContextType>({
	socket: null,
	onlineUsers: 0,
});

export const useSocket = () => useContext(SocketContext);

interface SocketProviderProps {
	children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [onlineUsers, setOnlineUsers] = useState<number>(0);

	useEffect(() => {
		// Solo inicializar en el cliente
		if (typeof window === 'undefined') return;

		// Iniciar la conexión con el servidor Socket.io
		fetch('/api/socket').catch(console.error);

		// Determinar la URL del servidor según el entorno
		const socketUrl =
			process.env.NODE_ENV === 'production'
				? `${window.location.protocol}//${window.location.hostname}:3000`
				: 'http://localhost:3000';

		// Inicializar Socket.io
		const socketConnection = io(socketUrl, {
			transports: ['websocket', 'polling'],
		});

		setSocket(socketConnection);

		// Escuchar eventos de actualización de usuarios en línea
		socketConnection.on('updateOnlineUsers', (count: number) => {
			setOnlineUsers(count);
		});

		// Limpiar conexión al desmontar
		return () => {
			socketConnection.disconnect();
		};
	}, []);

	return (
		<SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>
	);
};
