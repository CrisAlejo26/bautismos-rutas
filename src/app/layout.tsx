// app/layout.tsx

import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://bautismos.cristiancode.es';

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? BASE_URL),
	title: 'Bautismos en agua',
	description:
		'Bautismos en agua en Finestrat, Benidorm — organizado por la Iglesia de Dios Ministerial de Jesucristo Internacional.',
	openGraph: {
		title: 'Bautismos en agua',
		description:
			'Bautismos en agua en Finestrat, Benidorm — organizado por la Iglesia de Dios Ministerial de Jesucristo Internacional.',
		url: '/',
		siteName: 'Iglesia de Dios Ministerial de Jesucristo Internacional',
		images: [
			{
				url: `${BASE_URL}/logo.webp`,
				width: 800,
				height: 600,
				alt: 'Logo Iglesia de Dios Ministerial de Jesucristo Internacional',
			},
		],
		locale: 'es_ES',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Bautismos en agua',
		description:
			'Bautismos en agua en Finestrat, Benidorm — organizado por la Iglesia de Dios Ministerial de Jesucristo Internacional.',
		images: ['/logo.webp'],
	},
	icons: {
		icon: '/logo.webp',
		apple: '/logo.webp',
	},
};

export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#ffffff' },
		{ media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
	],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="es" className="h-full">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased h-full bg-background text-foreground`}>
				{children}
			</body>
		</html>
	);
}
