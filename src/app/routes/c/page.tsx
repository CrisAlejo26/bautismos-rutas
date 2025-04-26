'use client';

import RouteDetail from '@/components/RouteDetail';

export default function RouteC() {
	return (
		<RouteDetail
			title="Estación de Tren de Benidorm"
			description="Usted se encuentra actualmente en la estación de tren de Benidorm. Debido a trabajos de mantenimiento en las vías, el servicio hasta la Cala Finestrat se realiza mediante autobús.

En esta estación deberá adquirir su billete para el trayecto. El precio del viaje puede variar entre 1€ y 3€, dependiendo de las tarifas vigentes.

El autobús le llevará directamente hasta la Cala Finestrat. El mapa a continuación muestra la ruta aproximada que recorrerá, aunque tenga en cuenta que el recorrido exacto del autobús puede variar ligeramente."
			mapUrl="https://maps.app.goo.gl/KrsofP2sm2MHjxJ48"
		/>
	);
}
