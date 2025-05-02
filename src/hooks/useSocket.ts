'use client';

import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

// URL del servidor Socket.io - Usa URL relativa para que funcione tanto en desarrollo como en producción
const SOCKET_SERVER_URL =
	typeof window !== 'undefined'
		? `${window.location.protocol}//${window.location.hostname}${
				window.location.port ? `:${window.location.port}` : ''
		  }/socket.io`
		: '';

export function useOnlineUsers() {
	const [onlineUsers, setOnlineUsers] = useState<number>(0);
	const [socket, setSocket] = useState<Socket | null>(null);
	const [connected, setConnected] = useState<boolean>(false);

	useEffect(() => {
		console.log('Socket server URL:', SOCKET_SERVER_URL);
		// Solo inicializar en el cliente
		if (typeof window === 'undefined') return;

		// Crear conexión al servidor Socket.io
		const socketIo = io(SOCKET_SERVER_URL, {
			transports: ['websocket', 'polling'],
			reconnection: true,
			reconnectionAttempts: Infinity,
			reconnectionDelay: 1000,
			timeout: 30000,
		});

		// Guardar la instancia del socket
		setSocket(socketIo);

		// Registrar eventos de conexión para depuración
		socketIo.on('connect', () => {
			// console.log(
			// 	'%c[Socket.io] Conectado con ID: ' + socketIo.id,
			// 	'color: green; font-weight: bold',
			// );
			setConnected(true);

			// Solicitar el número actual de usuarios al conectarse
			socketIo.emit('get-user-count');

			// Identificar al usuario
			socketIo.emit('identify', { clientId: socketIo.id, connectTime: new Date() });
		});

		socketIo.on('connect_error', err => {
			console.error(
				'%c[Socket.io] Error de conexión: ' + err.message,
				'color: red; font-weight: bold',
			);
			setConnected(false);
		});

		socketIo.on('disconnect', reason => {
			console.log('%c[Socket.io] Desconectado: ' + reason, 'color: orange');
			setConnected(false);
		});

		socketIo.on('reconnect', attemptNumber => {
			console.log(
				`%c[Socket.io] Reconectado después de ${attemptNumber} intentos`,
				'color: green',
			);
			setConnected(true);
			socketIo.emit('get-user-count');
		});

		// Escuchar el evento 'user-count'
		socketIo.on('user-count', (data: { count: number; timestamp: string }) => {
			// console.log(
			// 	`%c[Socket.io] Usuarios en línea: ${data.count} (${new Date(
			// 		data.timestamp,
			// 	).toLocaleTimeString()})`,
			// 	'font-weight: bold',
			// );
			setOnlineUsers(data.count);
		});

		// Limpiar al desmontar
		return () => {
			socketIo.disconnect();
		};
	}, []);

	return { onlineUsers, socket, connected };
}
