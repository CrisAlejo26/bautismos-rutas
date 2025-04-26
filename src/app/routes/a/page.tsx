'use client';

import RouteDetail from '@/components/RouteDetail';

export default function RouteA() {
	return (
		<RouteDetail
			title="Estación de Autobuses de Benidorm"
			description="Desde su ubicación actual en la estación de autobuses, debe dirigirse a la parada del tren (TRAM). La estación se llama Benidorm Intermodal.

Para llegar a los bautismos, necesita tomar el tren con dirección Alicante y llegar hasta la estación de la Cala Finestrat (en la siguiente estación debe hacer trasbordo a autobus).

El mapa a continuación le mostrará cómo llegar caminando desde la estación de autobuses hasta la parada del tren. Es un trayecto corto y bien señalizado."
			mapUrl="https://maps.app.goo.gl/w4iPK9r8dhLZr8CQ7"
		/>
	);
}
