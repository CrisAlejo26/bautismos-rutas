// app/page.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
	const options = [
		{ label: 'En la estación de autobuses', route: 'a' },
		{ label: 'En la parada del tren de la estación de autobuses', route: 'b' },
		{ label: 'En otra estación del tren en Benidorm', route: 'c' },
		{ label: 'En la Cala Finestrat', route: 'd' },
		{ label: 'En la Avenida Mediterráneo', route: 'e' },
		{ label: 'En Alicante', route: 'f' },
		{ label: 'Estoy perdido en Benidorm', route: 'g' },
		{ label: 'Lugar de los bautismos', route: 'h' },
	];

	return (
		<motion.div
			className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8
               bg-[var(--background)] text-[var(--foreground)]"
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, ease: 'easeOut' }}>
			{/* Encabezado con logo + título */}
			<motion.div
				className="flex flex-col sm:flex-row items-center mb-8 sm:mb-12 w-full max-w-3xl"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.5, duration: 0.5 }}>
				<div className="w-20 h-20 sm:w-24 sm:h-24 relative mb-4 sm:mb-0 sm:mr-4">
					<Image src="/logo.webp" alt="Logo Iglesia" fill className="object-contain" />
				</div>
				<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center sm:text-left text-[#0e2b89] dark:text-white">
					Bautismos en Agua Finestrat - Benidorm
				</h1>
			</motion.div>

			{/* Opciones de rutas */}
			<motion.div
				className="w-full max-w-3xl bg-white dark:bg-gray-800
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
                    bg-gray-50 dark:bg-gray-900
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
		</motion.div>
	);
}
