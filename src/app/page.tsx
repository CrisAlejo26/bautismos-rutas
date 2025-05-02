'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import LocationModal from '../components/LocationModal';

export default function Home() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Esta función se llama cuando el envío a Telegram ha sido exitoso
	const handleLocationSubmit = () => {
		// Cerramos el modal
		setIsModalOpen(false);
	};
	const options = [
		{ label: 'En la estación de autobuses', route: 'a' },
		{ label: 'En la parada del tren de la estación de autobuses', route: 'b' },
		{ label: 'En otra estación del tren en Benidorm', route: 'c' },
		{ label: 'En la Cala Finestrat', route: 'd' },
		{ label: 'En la Avenida Mediterráneo', route: 'e' },
		{ label: 'En Alicante', route: 'f' },
		{ label: 'Lugar de los bautismos', route: 'g' },
	];

	return (
		<motion.div
			className="min-h-screen flex flex-col items-center p-4 sm:p-8
               bg-[var(--background)] text-[var(--foreground)]"
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, ease: 'easeOut' }}>
			{/* Botón "Estoy perdido" */}
			<motion.button
				className="fixed top-4 right-4 z-40 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full
				          shadow-lg flex items-center space-x-2 transition-all duration-300
				          sm:px-5 sm:py-2.5 md:px-6 md:py-3 text-sm"
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				onClick={() => setIsModalOpen(true)}
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 1.2, duration: 0.5 }}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor">
					<path
						fillRule="evenodd"
						d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
						clipRule="evenodd"
					/>
				</svg>
				<span className="font-medium">Estoy perdido</span>
			</motion.button>

			{/* Modal de ubicación */}
			<LocationModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSubmit={handleLocationSubmit}
			/>

			{/* Encabezado con logo + título */}
			<motion.div
				className="flex flex-col sm:flex-row items-center mb-8 sm:mb-12 w-full max-w-3xl mt-10 sm:mt-0"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.5, duration: 0.5 }}>
				<div className="w-20 h-20 sm:w-24 sm:h-24 relative mb-4 sm:mb-0 sm:mr-4">
					<Image
						src="/logo.webp"
						alt="Logo Iglesia"
						fill
						priority
						className="object-contain"
					/>
				</div>
				<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center sm:text-left text-[#0e2b89] dark:text-white">
					Bautismos en Agua Finestrat - Benidorm
				</h1>
			</motion.div>

			{/* Opciones de rutas */}
			<motion.div
				className="w-full max-w-3xl bg-blue-50 dark:bg-blue-900/30
                 rounded-2xl p-5 sm:p-6 shadow-lg dark:shadow-gray-700"
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ delay: 0.8, duration: 0.5 }}>
				<p className="text-lg font-semibold mb-4">¿En dónde te encuentras?</p>

				<ul className="space-y-3">
					{options.map((option, index) => (
						<motion.li
							key={index}
							whileHover={{ scale: 1.03 }}
							whileTap={{ scale: 0.97 }}>
							<Link href={`/routes/${option.route}`}>
								<div
									className="w-full text-left px-4 py-3
                    bg-white dark:bg-gray-800
                    rounded-lg shadow-sm dark:shadow-gray-700
                    hover:shadow-md dark:hover:shadow-lg
                    transition cursor-pointer">
									<span className="font-mono mr-2 text-[#0e2b89] dark:text-blue-400 font-bold">
										{String.fromCharCode(65 + index)}.
									</span>
									{option.label}
								</div>
							</Link>
						</motion.li>
					))}
				</ul>
			</motion.div>

			{/* Footer con enlaces a políticas */}
			<motion.div
				className="w-full max-w-3xl mt-8 text-center text-sm text-gray-600 dark:text-gray-400"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1.5, duration: 0.5 }}>
				<div className="flex flex-wrap justify-center gap-4">
					<Link
						href="/privacidad"
						className="hover:underline hover:text-[#0e2b89] dark:hover:text-blue-400 transition-colors">
						Política de Privacidad
					</Link>
					<Link
						href="/condiciones"
						className="hover:underline hover:text-[#0e2b89] dark:hover:text-blue-400 transition-colors">
						Condiciones del Servicio
					</Link>
				</div>
				<p className="mt-2">
					&copy; {new Date().getFullYear()} Bautismos en Agua Finestrat - Benidorm
				</p>
			</motion.div>
		</motion.div>
	);
}
