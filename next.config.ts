import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	async rewrites() {
		return [
			{
				source: '/api/:path*', // peticiones a /api/…
				destination: 'http://localhost:3002/api/:path*', // …van a Express en el puerto 3002
			},
			{
				source: '/socket.io/:path*',
				destination: 'http://localhost:3002', // Redirigir Socket.io al puerto 3002
			},
		];
	},
};

export default nextConfig;
