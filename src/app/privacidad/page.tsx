'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
	return (
		<motion.div
			className="min-h-screen p-4 sm:p-8 md:p-12 bg-[var(--background)] text-[var(--foreground)]"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}>
			<div className="max-w-4xl mx-auto">
				<motion.div
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.2, duration: 0.5 }}>
					<Link
						href="/"
						className="inline-flex items-center mb-6 text-[#0e2b89] dark:text-blue-400 hover:underline">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 mr-1"
							viewBox="0 0 20 20"
							fill="currentColor">
							<path
								fillRule="evenodd"
								d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
								clipRule="evenodd"
							/>
						</svg>
						Volver a la página principal
					</Link>
					<h1 className="text-3xl sm:text-4xl font-bold mb-6 text-[#0e2b89] dark:text-white">
						Política de Privacidad
					</h1>
				</motion.div>

				<motion.div
					className="prose prose-lg dark:prose-invert max-w-none bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 shadow-md"
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.3, duration: 0.5 }}>
					<p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
						Última actualización: 26 de abril de 2025
					</p>

					<section className="mb-8">
						<h2 className="text-xl font-bold mb-4">1. Introducción</h2>
						<p>
							Bienvenido a la aplicación de Bautismos en Agua Finestrat - Benidorm.
							Esta Política de Privacidad explica cómo recopilamos, utilizamos,
							divulgamos y protegemos su información cuando utiliza nuestra aplicación
							móvil y sitio web (colectivamente, los &quot;Servicios&quot;).
						</p>
						<p>
							Al utilizar nuestros Servicios, usted acepta las prácticas descritas en
							esta Política de Privacidad. Si no está de acuerdo con esta Política,
							por favor no utilice nuestros Servicios.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-bold mb-4">2. Información que recopilamos</h2>
						<p>
							<strong>Información proporcionada por usted:</strong> Cuando utiliza la
							función &quot;Estoy perdido&quot; en nuestra aplicación, recopilamos:
						</p>
						<ul className="list-disc pl-6 mb-4">
							<li>Su nombre</li>
							<li>Su número de teléfono</li>
							<li>Su ubicación geográfica (latitud y longitud)</li>
						</ul>
						<p>
							<strong>Información recopilada automáticamente:</strong> Cuando utiliza
							nuestros Servicios, podemos recopilar cierta información
							automáticamente, incluyendo:
						</p>
						<ul className="list-disc pl-6">
							<li>
								Información sobre su dispositivo (como modelo, sistema operativo)
							</li>
							<li>Información de registro y uso</li>
							<li>
								Información de ubicación cuando utiliza funciones basadas en la
								ubicación
							</li>
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-bold mb-4">
							3. Cómo utilizamos su información
						</h2>
						<p>Utilizamos la información que recopilamos para:</p>
						<ul className="list-disc pl-6">
							<li>
								Proporcionar asistencia a personas que se encuentran perdidas en el
								área de Benidorm-Finestrat
							</li>
							<li>
								Facilitar la comunicación a través de WhatsApp para brindar
								orientación
							</li>
							<li>Mejorar y personalizar nuestros Servicios</li>
							<li>Cumplir con obligaciones legales</li>
							<li>Proteger la seguridad de nuestros usuarios</li>
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-bold mb-4">4. Compartición de información</h2>
						<p>Podemos compartir su información en las siguientes circunstancias:</p>
						<ul className="list-disc pl-6">
							<li>
								Con su consentimiento: Compartiremos su información personal cuando
								nos haya dado su consentimiento para hacerlo, como cuando utiliza la
								función &quot;Estoy perdido&quot; para recibir asistencia.
							</li>
							<li>
								Con proveedores de servicios: Podemos compartir su información con
								proveedores de servicios de terceros que realizan servicios en
								nuestro nombre, como WhatsApp para facilitar la comunicación.
							</li>
							<li>
								Por razones legales: Podemos divulgar su información si creemos de
								buena fe que dicha acción es necesaria para cumplir con una
								obligación legal, proteger y defender nuestros derechos o propiedad,
								proteger la seguridad personal de los usuarios de nuestros Servicios
								o del público, o proteger contra responsabilidad legal.
							</li>
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-bold mb-4">5. WhatsApp y comunicaciones</h2>
						<p>
							Nuestra aplicación utiliza WhatsApp como medio de comunicación para
							brindar asistencia a los usuarios. Al proporcionar su número de teléfono
							y utilizar la función &quot;Estoy perdido&quot;, usted consiente que
							podamos contactarle a través de WhatsApp.
						</p>
						<p>
							Tenga en cuenta que WhatsApp tiene su propia política de privacidad que
							rige cómo manejan su información. Le recomendamos que revise la política
							de privacidad de WhatsApp en{' '}
							<a
								href="https://www.whatsapp.com/legal/privacy-policy"
								className="text-blue-500 hover:underline"
								target="_blank"
								rel="noopener noreferrer">
								https://www.whatsapp.com/legal/privacy-policy
							</a>
							.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-bold mb-4">6. Seguridad de los datos</h2>
						<p>
							Nos esforzamos por utilizar medidas de seguridad comercialmente
							aceptables para proteger su información personal. Sin embargo, ningún
							método de transmisión por Internet o método de almacenamiento
							electrónico es 100% seguro, y no podemos garantizar su seguridad
							absoluta.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-bold mb-4">7. Sus derechos</h2>
						<p>
							Dependiendo de su ubicación, puede tener ciertos derechos con respecto a
							su información personal, como:
						</p>
						<ul className="list-disc pl-6">
							<li>Acceder a la información personal que tenemos sobre usted</li>
							<li>Corregir información inexacta o incompleta</li>
							<li>Solicitar la eliminación de su información personal</li>
							<li>Oponerse al procesamiento de su información personal</li>
							<li>
								Solicitar la restricción del procesamiento de su información
								personal
							</li>
							<li>Solicitar la portabilidad de su información personal</li>
						</ul>
						<p>
							Para ejercer estos derechos, póngase en contacto con nosotros utilizando
							la información proporcionada en la sección &quot;Contáctenos&quot;.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-bold mb-4">
							8. Cambios a esta Política de Privacidad
						</h2>
						<p>
							Podemos actualizar nuestra Política de Privacidad de vez en cuando. Le
							notificaremos cualquier cambio publicando la nueva Política de
							Privacidad en esta página y actualizando la fecha de &quot;última
							actualización&quot; en la parte superior.
						</p>
						<p>
							Se le aconseja revisar esta Política de Privacidad periódicamente para
							cualquier cambio. Los cambios a esta Política de Privacidad son
							efectivos cuando se publican en esta página.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-bold mb-4">9. Contáctenos</h2>
						<p>
							Si tiene preguntas o comentarios sobre esta Política de Privacidad, por
							favor contáctenos:
						</p>
						<p className="mt-2">
							Por correo electrónico: info@bautismos-finestrat.com
							<br />
							Por teléfono: +34 XXX XXX XXX
						</p>
					</section>
				</motion.div>

				<div className="mt-8 text-center">
					<Link
						href="/condiciones"
						className="text-[#0e2b89] dark:text-blue-400 hover:underline">
						Ver Condiciones del Servicio
					</Link>
				</div>
			</div>
		</motion.div>
	);
}
