'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSocket } from '../context/SocketContext';

const OnlineCounter = () => {
	const { onlineUsers } = useSocket();
	const [isVisible, setIsVisible] = useState<boolean>(true);

	const toggleVisibility = () => {
		setIsVisible(!isVisible);
	};

	return (
		<motion.div
			className="fixed bottom-4 right-4 z-50 flex flex-col items-end"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}>
			{isVisible && (
				<motion.div
					className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 mb-2"
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.3 }}>
					<div className="relative">
						<div className="w-3 h-3 bg-green-400 rounded-full"></div>
						<div className="w-3 h-3 bg-green-400 rounded-full absolute top-0 left-0 animate-ping opacity-75"></div>
					</div>
					<span className="text-sm font-medium">
						{onlineUsers} {onlineUsers === 1 ? 'persona' : 'personas'} en línea
					</span>
				</motion.div>
			)}
			<button
				onClick={toggleVisibility}
				className="bg-gray-800 hover:bg-gray-700 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
				{isVisible ? '−' : '+'}
			</button>
		</motion.div>
	);
};

export default OnlineCounter;
