'use client';

import RouteDetail from '@/components/RouteDetail';

export default function RouteB() {
	return (
		<RouteDetail
			title="Parada del Tren - Estación Benidorm Intermodal"
			description="Desde la estación Benidorm Intermodal, debe tomar el tren con dirección Alicante para llegar a la Cala Finestrat.

En la estación de Benidorm deberá hacer transbordo a autobús para continuar su viaje hasta la Cala Finestrat. Este transbordo es necesario debido al recorrido de la línea.

El precio del trayecto completo puede variar entre 1€ y 3€, dependiendo de las tarifas vigentes.

El mapa a continuación muestra la ruta que recorrerá hasta la siguiente estación y el posterior debe hacer transbordo en autobús."
			mapUrl="https://maps.app.goo.gl/UCzmUCeJgJQZX4Hj9"
		/>
	);
}
