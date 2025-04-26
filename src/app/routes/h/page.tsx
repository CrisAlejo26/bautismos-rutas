'use client';

import RouteDetail from '@/components/RouteDetail';

export default function RouteH() {
	return (
		<RouteDetail
			title="Lugar de los Bautismos"
			description="Ha llegado al destino final: el hotel donde se realizarán los bautismos en agua.

El 'Events Hotel La Plantación' es el lugar designado para esta importante ceremonia.

El mapa a continuación muestra la ubicación exacta del hotel. Si ya se encuentra aquí, simplemente siga las indicaciones del personal o de los organizadores del evento para dirigirse al área específica donde se llevarán a cabo los bautismos.

¡Bienvenido y que disfrute de esta significativa experiencia!"
			mapUrl="https://maps.app.goo.gl/mQ3EZW8bEFdCMn4G8"
			buttonText="Ver ubicación del hotel"
		/>
	);
}
