'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function TermsOfService() {
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
						Condiciones del Servicio
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
						<h2 className="text-xl font-bold mb-4">1. Aceptación de los Términos</h2>
						<p>
							Al acceder o utilizar la aplicación de Bautismos en Agua Finestrat -
							Benidorm (en adelante, &quot;la Aplicación&quot;), usted acepta estar
							legalmente vinculado por estos Términos y Condiciones del Servicio. Si
							no está de acuerdo con alguno de estos términos, no utilice nuestra
							Aplicación.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-bold mb-4">2. Descripción del Servicio</h2>
						<p>
							La Aplicación proporciona información sobre rutas y ubicaciones
							relacionadas con los bautismos en agua en la zona de Finestrat-Benidorm,
							así como asistencia a personas que puedan encontrarse perdidas en el
							área.
						</p>
						<p>
							La función &quot;Estoy perdido&quot; permite a los usuarios compartir su
							ubicación y datos de contacto para recibir asistencia a través de
							WhatsApp u otros medios de comunicación.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-bold mb-4">3. Uso de WhatsApp</h2>
						<p>
							Nuestra Aplicación utiliza WhatsApp como medio de comunicación para
							brindar asistencia a los usuarios que lo soliciten. Al utilizar la
							función &quot;Estoy perdido&quot; y proporcionar su número de teléfono,
							usted acepta:
						</p>
						<ul className="list-disc pl-6">
							<li>
								Recibir mensajes a través de WhatsApp relacionados con la asistencia
								solicitada.
							</li>
							<li>
								Que su número de teléfono sea utilizado exclusivamente para este
								propósito y no será compartido con terceros no relacionados con el
								servicio de asistencia.
							</li>
							<li>
								Cumplir con los Términos de Servicio de WhatsApp (disponibles en{' '}
								<a
									href="https://www.whatsapp.com/legal/terms-of-service"
									className="text-blue-500 hover:underline"
									target="_blank"
									rel="noopener noreferrer">
									https://www.whatsapp.com/legal/terms-of-service
								</a>
								).
							</li>
						</ul>
						<p className="mt-4">
							Tenga en cuenta que WhatsApp es un servicio proporcionado por un tercero
							y no tenemos control sobre sus políticas o prácticas. Le recomendamos
							revisar los términos y políticas de WhatsApp antes de utilizar nuestra
							función de asistencia.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-bold mb-4">4. Uso de la Ubicación</h2>
						<p>
							Al utilizar la función &quot;Estoy perdido&quot;, usted acepta compartir
							su ubicación geográfica con nosotros. Esta información se utiliza
							exclusivamente para:
						</p>
						<ul className="list-disc pl-6">
							<li>
								Proporcionar asistencia personalizada basada en su ubicación actual.
							</li>
							<li>
								Facilitar la comunicación y orientación para ayudarle a encontrar su
								destino.
							</li>
							<li>Mejorar nuestros servicios y la precisión de nuestras rutas.</li>
						</ul>
						<p className="mt-4">
							Su ubicación no se almacena permanentemente en nuestros sistemas una vez
							que se ha resuelto su solicitud de asistencia, a menos que usted haya
							dado su consentimiento explícito para ello.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-bold mb-4">5. Responsabilidades del Usuario</h2>
						<p>Al utilizar nuestra Aplicación, usted acepta:</p>
						<ul className="list-disc pl-6">
							<li>
								Proporcionar información precisa y veraz cuando utilice nuestros
								servicios.
							</li>
							<li>No utilizar la Aplicación para fines ilegales o no autorizados.</li>
							<li>No interferir con el funcionamiento normal de la Aplicación.</li>
							<li>
								No intentar acceder a áreas o información a las que no tenga
								autorización.
							</li>
							<li>
								Ser responsable de mantener la confidencialidad de cualquier
								información personal que comparta a través de la Aplicación.
							</li>
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-bold mb-4">6. Limitación de Responsabilidad</h2>
						<p>
							La Aplicación se proporciona &quot;tal cual&quot; y &quot;según
							disponibilidad&quot;, sin garantías de ningún tipo, ya sean expresas o
							implícitas.
						</p>
						<p className="mt-2">No garantizamos que:</p>
						<ul className="list-disc pl-6">
							<li>
								La Aplicación siempre estará disponible o será ininterrumpida,
								oportuna, segura o libre de errores.
							</li>
							<li>
								Los resultados que puedan obtenerse del uso de la Aplicación serán
								precisos o confiables.
							</li>
							<li>
								La calidad de cualquier información, contenido o servicio disponible
								a través de la Aplicación cumplirá con sus expectativas.
							</li>
						</ul>
						<p className="mt-4">
							No seremos responsables por cualquier pérdida o daño que pueda surgir
							del uso de nuestra Aplicación, incluyendo pero no limitado a:
						</p>
						<ul className="list-disc pl-6">
							<li>
								Daños directos, indirectos, incidentales, punitivos, consecuentes o
								ejemplares.
							</li>
							<li>Lesiones personales o daños a la propiedad de cualquier tipo.</li>
							<li>
								Cualquier pérdida de datos, beneficios, ingresos, negocios o ahorros
								anticipados.
							</li>
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-bold mb-4">
							7. Modificaciones del Servicio y los Términos
						</h2>
						<p>
							Nos reservamos el derecho, a nuestra sola discreción, de modificar o
							reemplazar estos Términos en cualquier momento. Si una revisión es
							material, haremos esfuerzos razonables para proporcionar al menos 30
							días de aviso antes de que los nuevos términos entren en vigencia.
						</p>
						<p className="mt-2">
							También podemos, sin previo aviso, cambiar los servicios; dejar de
							proporcionar los servicios o características de los servicios; o crear
							límites para los servicios. Podemos suspender permanente o temporalmente
							el acceso a los servicios sin previo aviso ni responsabilidad por
							cualquier motivo, o sin motivo.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-bold mb-4">8. Ley Aplicable</h2>
						<p>
							Estos Términos se regirán e interpretarán de acuerdo con las leyes de
							España, sin tener en cuenta sus disposiciones sobre conflictos de leyes.
						</p>
						<p className="mt-2">
							Nuestra falta de ejercicio o aplicación de cualquier derecho o
							disposición de estos Términos no constituirá una renuncia a tal derecho
							o disposición.
						</p>
					</section>

					<section>
						<h2 className="text-xl font-bold mb-4">9. Contacto</h2>
						<p>Si tiene alguna pregunta sobre estos Términos, por favor contáctenos:</p>
						<p className="mt-2">
							Por correo electrónico: info@bautismos-finestrat.com
							<br />
							Por teléfono: +34 XXX XXX XXX
						</p>
					</section>
				</motion.div>

				<div className="mt-8 text-center">
					<Link
						href="/privacidad"
						className="text-[#0e2b89] dark:text-blue-400 hover:underline">
						Ver Política de Privacidad
					</Link>
				</div>
			</div>
		</motion.div>
	);
}
