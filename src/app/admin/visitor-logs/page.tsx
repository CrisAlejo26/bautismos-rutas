'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface VisitorLog {
	ip?: string;
	country?: string;
	region?: string;
	city?: string;
	timezone?: string;
	userAgent: string;
	referrer: string;
	timestamp: string;
	path: string;
	serverTimestamp: string;
}

export default function VisitorLogsPage() {
	const [logs, setLogs] = useState<VisitorLog[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [password, setPassword] = useState('');
	const [darkMode, setDarkMode] = useState(false);
	const router = useRouter();

	// Detectar preferencia de modo oscuro del sistema
	useEffect(() => {
		// Verificar si hay preferencia guardada
		const savedMode = localStorage.getItem('admin_dark_mode');
		if (savedMode) {
			setDarkMode(savedMode === 'true');
		} else {
			// Detectar preferencia del sistema
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			setDarkMode(prefersDark);
			localStorage.setItem('admin_dark_mode', prefersDark.toString());
		}
	}, []);

	// Aplicar clase de modo oscuro al body
	useEffect(() => {
		if (darkMode) {
			document.body.classList.add('dark-mode');
		} else {
			document.body.classList.remove('dark-mode');
		}
	}, [darkMode]);

	// Autenticación simple para propósitos de demostración
	// En una aplicación real, usarías un sistema de autenticación adecuado
	const authenticate = (e: React.FormEvent) => {
		e.preventDefault();
		// Esto es solo un marcador de posición - en una aplicación real, usa un método de autenticación seguro
		if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === 'admin123') {
			setIsAuthenticated(true);
			localStorage.setItem('admin_authenticated', 'true');
		} else {
			setError('Contraseña inválida');
		}
	};

	useEffect(() => {
		// Verificar si ya está autenticado
		if (localStorage.getItem('admin_authenticated') === 'true') {
			setIsAuthenticated(true);
		}

		if (isAuthenticated) {
			fetchLogs();
		}
	}, [isAuthenticated]);

	const fetchLogs = async () => {
		try {
			setLoading(true);
			const response = await fetch('/api/log-visitor');

			if (!response.ok) {
				throw new Error(`Error al obtener registros: ${response.status}`);
			}

			const data = await response.json();
			setLogs(data.logs || []);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Error al obtener registros');
		} finally {
			setLoading(false);
		}
	};

	const logout = () => {
		localStorage.removeItem('admin_authenticated');
		setIsAuthenticated(false);
	};

	if (!isAuthenticated) {
		return (
			<div
				className={`min-h-screen flex items-center justify-center ${
					darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
				}`}>
				<div
					className={`${
						darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
					} p-8 rounded-lg shadow-md w-full max-w-md`}>
					<h1 className="text-2xl font-bold mb-6 text-center">Acceso Administrador</h1>

					{error && (
						<div
							className={`${
								darkMode
									? 'bg-red-900 border-red-800 text-red-200'
									: 'bg-red-100 border-red-400 text-red-700'
							} px-4 py-3 rounded mb-4 border`}>
							{error}
						</div>
					)}

					<form onSubmit={authenticate}>
						<div className="mb-4">
							<label
								htmlFor="password"
								className={`block mb-2 ${
									darkMode ? 'text-gray-300' : 'text-gray-700'
								}`}>
								Contraseña
							</label>
							<input
								type="password"
								id="password"
								value={password}
								onChange={e => setPassword(e.target.value)}
								className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
									darkMode
										? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-600'
										: 'bg-white border-gray-300 focus:ring-blue-500'
								}`}
								required
							/>
						</div>

						<button
							type="submit"
							className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 ${
								darkMode
									? 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-800'
									: 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500'
							}`}>
							Acceder
						</button>
					</form>

					<div className="mt-4 text-center">
						<button
							onClick={() => router.push('/')}
							className={`hover:underline ${
								darkMode ? 'text-blue-400' : 'text-blue-500'
							}`}>
							Volver al Inicio
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div
			className={`container mx-auto px-4 py-8 ${
				darkMode ? ' text-white' : 'bg-white text-gray-900'
			}`}>
			<div className="flex flex-col md:flex-row justify-between items-center mb-6">
				<h1 className="text-2xl font-bold mb-4 md:mb-0">Registros de Visitantes</h1>
				<div className="flex space-x-2">
					<button
						onClick={fetchLogs}
						className={`py-2 px-4 rounded-md cursor-pointer ${
							darkMode
								? 'bg-blue-600 hover:bg-blue-700'
								: 'bg-blue-500 hover:bg-blue-600'
						} text-white`}>
						Actualizar
					</button>
					<button
						onClick={() => router.push('/')}
						className={`py-2 px-4 rounded-md cursor-pointer ${
							darkMode
								? 'bg-gray-700 hover:bg-gray-800'
								: 'bg-gray-500 hover:bg-gray-600'
						} text-white`}>
						Inicio
					</button>
					<button
						onClick={logout}
						className={`py-2 px-4 rounded-md cursor-pointer ${
							darkMode ? 'bg-red-700 hover:bg-red-800' : 'bg-red-500 hover:bg-red-600'
						} text-white`}>
						Cerrar Sesión
					</button>
				</div>
			</div>

			{error && (
				<div
					className={`${
						darkMode
							? 'bg-red-900 border-red-800 text-red-200'
							: 'bg-red-100 border-red-400 text-red-700'
					} px-4 py-3 rounded mb-4 border`}>
					{error}
				</div>
			)}

			{loading ? (
				<div className="flex justify-center items-center h-64">
					<div
						className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
							darkMode ? 'border-blue-400' : 'border-blue-500'
						}`}></div>
				</div>
			) : logs.length === 0 ? (
				<div
					className={`${
						darkMode ? 'bg-gray-800' : 'bg-gray-100'
					} p-6 rounded-lg text-center`}>
					<p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
						No se encontraron registros de visitantes.
					</p>
				</div>
			) : (
				<div className="overflow-x-auto">
					<table
						className={`min-w-full ${
							darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
						} border rounded-lg`}>
						<thead>
							<tr className={darkMode ? 'bg-gray-700' : 'bg-gray-100'}>
								<th
									className={`py-2 px-4 border-b ${
										darkMode ? 'border-gray-600' : 'border-gray-200'
									} text-left`}>
									Fecha y Hora
								</th>
								<th
									className={`py-2 px-4 border-b ${
										darkMode ? 'border-gray-600' : 'border-gray-200'
									} text-left`}>
									IP
								</th>
								<th
									className={`py-2 px-4 border-b ${
										darkMode ? 'border-gray-600' : 'border-gray-200'
									} text-left`}>
									Ubicación
								</th>
								<th
									className={`py-2 px-4 border-b ${
										darkMode ? 'border-gray-600' : 'border-gray-200'
									} text-left`}>
									Ruta
								</th>
								<th
									className={`py-2 px-4 border-b ${
										darkMode ? 'border-gray-600' : 'border-gray-200'
									} text-left`}>
									Referencia
								</th>
								<th
									className={`py-2 px-4 border-b ${
										darkMode ? 'border-gray-600' : 'border-gray-200'
									} text-left hidden md:table-cell`}>
									Navegador
								</th>
							</tr>
						</thead>
						<tbody>
							{logs.map((log, index) => (
								<tr
									key={index}
									className={
										darkMode
											? index % 2 === 0
												? 'bg-gray-800'
												: 'bg-gray-750'
											: index % 2 === 0
											? 'bg-gray-50'
											: 'bg-white'
									}>
									<td
										className={`py-2 px-4 border-b ${
											darkMode ? 'border-gray-700' : 'border-gray-200'
										}`}>
										{new Date(log.timestamp).toLocaleString('es-ES')}
									</td>
									<td
										className={`py-2 px-4 border-b ${
											darkMode ? 'border-gray-700' : 'border-gray-200'
										}`}>
										{log.ip || 'Desconocida'}
									</td>
									<td
										className={`py-2 px-4 border-b ${
											darkMode ? 'border-gray-700' : 'border-gray-200'
										}`}>
										{[log.city, log.region, log.country]
											.filter(Boolean)
											.join(', ') || 'Desconocida'}
									</td>
									<td
										className={`py-2 px-4 border-b ${
											darkMode ? 'border-gray-700' : 'border-gray-200'
										}`}>
										{log.path}
									</td>
									<td
										className={`py-2 px-4 border-b ${
											darkMode ? 'border-gray-700' : 'border-gray-200'
										}`}>
										{log.referrer === 'direct' ? 'Directo' : log.referrer}
									</td>
									<td
										className={`py-2 px-4 border-b ${
											darkMode ? 'border-gray-700' : 'border-gray-200'
										} hidden md:table-cell`}>
										<div className="truncate max-w-xs">{log.userAgent}</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
