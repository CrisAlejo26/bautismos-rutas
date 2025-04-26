'use client';

import RouteDetail from '@/components/RouteDetail';

export default function RouteG() {
	return (
		<RouteDetail
			title="¿Estás perdido en Benidorm?"
			description="No se preocupe si se siente desorientado. Llegar a los bautismos es más sencillo de lo que parece.

Tiene dos opciones principales para llegar a la Cala Finestrat:

1. Tomar el tren (TRAM) con dirección Alicante. Asegúrese de bajarse en la estación de Cala Finestrat.

2. Tomar el autobús Línea 2, que puede encontrar en varias paradas de Benidorm. Si elige esta opción, informe al conductor que su destino es el Carrefour de Cala Finestrat.

A continuación, encontrará dos botones que le mostrarán cómo llegar a las estaciones más cercanas de tren y autobús desde su ubicación actual."
			mapUrl="https://maps.app.goo.gl/W5WTZbf8XNQKv3b79"
			buttonText="Ir a la estación del tren"
			additionalButtons={[
				{
					title: 'Ir a la parada del autobús',
					url: 'https://maps.app.goo.gl/Rh6h9SuuH5C6wbT17',
				},
			]}
		/>
	);
}
