import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

interface LocationModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (name: string, phone: string, location: { lat: number; lng: number }) => void;
}

export default function LocationModal({ isOpen, onClose, onSubmit }: LocationModalProps) {
	const [name, setName] = useState('');
	const [isSending, setIsSending] = useState(false);
	const [phone, setPhone] = useState('');
	const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (isOpen) {
			setIsLoading(true);
			setError(null);

			if (!navigator.geolocation) {
				setError('La geolocalización no está soportada por tu navegador');
				setIsLoading(false);
				return;
			}

			navigator.geolocation.getCurrentPosition(
				position => {
					setLocation({
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					});
					setIsLoading(false);
				},
				error => {
					console.error('Error getting location:', error);
					setError(
						'No se pudo obtener tu ubicación. Por favor, asegúrate de dar permiso de ubicación.',
					);
					setIsLoading(false);
				},
				{ enableHighAccuracy: true },
			);
		}
	}, [isOpen]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!location) {
			toast.error('No se pudo obtener tu ubicación. Por favor, inténtalo de nuevo.');
			return;
		}

		// Validar campos del formulario
		if (!name.trim()) {
			toast.error('Por favor, ingresa tu nombre.');
			return;
		}

		if (!phone.trim() || phone.length < 9) {
			toast.error('Por favor, ingresa un número de teléfono válido.');
			return;
		}

		try {
			setIsSending(true);

			// Llamar a nuestra API para enviar el mensaje a WhatsApp
			// Llamar a nuestra API para enviar el mensaje a Telegram
			const response = await fetch('/api/telegram/send', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name, phone, location }),
			});

			const data = await response.json();

			if (!response.ok) {
				console.error('Error en la respuesta de la API:', data);
				throw new Error(data.error || 'Error al enviar el mensaje');
			}

			// Mostrar mensaje de éxito
			toast.success('Información enviada correctamente. Te contactaremos pronto.');

			// Llamar al callback del padre para notificar que el envío fue exitoso
			onSubmit(name, phone, location);

			// Limpiar los campos
			setName('');
			setPhone('');
		} catch (error) {
			console.error('Error al enviar información:', error);
			toast.error('No se pudo enviar tu información. Inténtalo de nuevo.');
		} finally {
			setIsSending(false);
		}
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={onClose}>
					<motion.div
						className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md"
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						onClick={e => e.stopPropagation()}>
						<div className="p-5">
							<h2 className="text-xl font-bold mb-4 text-[#0e2b89] dark:text-white">
								Compartir tu ubicación
							</h2>

							{isLoading ? (
								<div className="py-8 flex flex-col items-center">
									<div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
									<p>Obteniendo tu ubicación...</p>
								</div>
							) : error ? (
								<div className="py-6 text-center">
									<p className="text-red-500 mb-4">{error}</p>
									<button
										onClick={onClose}
										className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
										Cerrar
									</button>
								</div>
							) : (
								<form onSubmit={handleSubmit}>
									<div className="mb-4">
										<label htmlFor="name" className="block mb-1 font-medium">
											Nombre
										</label>
										<input
											type="text"
											id="name"
											value={name}
											onChange={e => setName(e.target.value)}
											className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
											required
										/>
									</div>

									<div className="mb-4">
										<label htmlFor="phone" className="block mb-1 font-medium">
											Teléfono
										</label>
										<input
											type="number"
											id="phone"
											value={phone}
											onChange={e => setPhone(e.target.value)}
											className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
											required
											minLength={9}
											maxLength={15}
										/>
									</div>

									{location && (
										<div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
											<p className="text-sm">
												<span className="font-medium">
													Ubicación obtenida:
												</span>{' '}
												{location.lat.toFixed(6)}, {location.lng.toFixed(6)}
											</p>
										</div>
									)}

									<div className="flex justify-end space-x-3 mt-6">
										<button
											type="button"
											onClick={onClose}
											className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition dark:border-gray-600 dark:hover:bg-gray-700">
											Cancelar
										</button>
										<button
											type="submit"
											disabled={isSending}
											className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center justify-center min-w-[80px] ${
												isSending ? 'opacity-70 cursor-not-allowed' : ''
											}`}>
											{isSending ? (
												<>
													<svg
														className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24">
														<circle
															className="opacity-25"
															cx="12"
															cy="12"
															r="10"
															stroke="currentColor"
															strokeWidth="4"></circle>
														<path
															className="opacity-75"
															fill="currentColor"
															d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
													</svg>
													Enviando...
												</>
											) : (
												'Enviar'
											)}
										</button>
									</div>
								</form>
							)}
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
