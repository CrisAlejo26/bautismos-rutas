'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface RouteDetailProps {
	title: string;
	description: string;
	mapUrl: string;
	buttonText?: string;
	additionalButtons?: Array<{
		title: string;
		url: string;
	}>;
}

export default function RouteDetail({
	title,
	description,
	mapUrl,
	buttonText = 'Ver en Google Maps',
	additionalButtons = [],
}: RouteDetailProps) {
	const router = useRouter();

	return (
		<motion.div
			className="min-h-screen flex flex-col items-center justify-start p-4 sm:p-8
                 bg-[var(--background)] text-[var(--foreground)]"
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, ease: 'easeOut' }}>
			{/* Encabezado con logo + título */}
			<motion.div
				className="flex flex-col sm:flex-row items-center mb-8 sm:mb-12 w-full max-w-3xl"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.3, duration: 0.5 }}>
				<div className="w-20 h-20 sm:w-24 sm:h-24 relative mb-4 sm:mb-0 sm:mr-4">
					<Image src="/logo.webp" alt="Logo Iglesia" fill className="object-contain" />
				</div>
				<div className="text-center sm:text-left">
					<button
						onClick={() => router.push('/')}
						className="mb-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors cursor-pointer">
						← Volver
					</button>
					<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0e2b89] dark:text-white">
						{title}
					</h1>
				</div>
			</motion.div>

			{/* Contenido principal */}
			<motion.div
				className="w-full max-w-3xl bg-blue-50 dark:bg-blue-900/30 rounded-2xl p-5 sm:p-8 shadow-lg dark:shadow-gray-700 mb-8"
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ delay: 0.6, duration: 0.5 }}>
				<div className="prose dark:prose-invert max-w-none">
					<p className="text-base sm:text-lg whitespace-pre-line">{description}</p>
				</div>

				<div className="mt-8 flex flex-col sm:flex-row gap-4">
					<motion.a
						href={mapUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="w-full sm:w-auto flex-1 inline-flex justify-center items-center px-6 py-3
                     bg-[#0e2b89] text-white font-medium rounded-lg shadow-md
                     hover:bg-[#0a2070] transition-colors duration-300
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						whileHover={{ scale: 1.03 }}
						whileTap={{ scale: 0.97 }}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 mr-2"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
						{buttonText}
					</motion.a>

					{additionalButtons.map((button, index) => (
						<motion.a
							key={index}
							href={button.url}
							target="_blank"
							rel="noopener noreferrer"
							className="w-full sm:w-auto flex-1 inline-flex justify-center items-center px-6 py-3
                       bg-blue-600 text-white font-medium rounded-lg shadow-md
                       hover:bg-blue-700 transition-colors duration-300
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
							whileHover={{ scale: 1.03 }}
							whileTap={{ scale: 0.97 }}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5 mr-2"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>
							{button.title}
						</motion.a>
					))}
				</div>
			</motion.div>
		</motion.div>
	);
}
