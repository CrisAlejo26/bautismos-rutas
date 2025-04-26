'use client';

import RouteDetail from '@/components/RouteDetail';

export default function RouteF() {
	return (
		<RouteDetail
			title="Alicante"
			description="Desde Alicante, puede tomar el tren TRAM para llegar a la Cala Finestrat. Hay varias estaciones disponibles en Alicante desde donde puede iniciar su viaje:

• Luceros
• Mercado
• MARQ-Castillo
• La Isleta
• Sangueta

El trayecto desde Alicante hasta la Cala Finestrat dura aproximadamente una hora. El precio del billete puede variar entre 3€ y 5€, dependiendo de las tarifas vigentes.

El mapa a continuación muestra la ubicación de la estación Luceros, situada en el centro de Alicante, que es una de las opciones más convenientes para iniciar su viaje."
			mapUrl="https://maps.app.goo.gl/27kZtuAFpnFMPoBR8"
		/>
	);
}
