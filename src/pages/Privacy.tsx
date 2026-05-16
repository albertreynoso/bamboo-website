import { motion } from "framer-motion";
import { useEffect } from "react";

export function Privacy() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <main className="container mx-auto px-6 py-12 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl font-bold text-gray-900 mb-8">Política de Privacidad</h1>
                    
                    <p className="text-gray-600 mb-6 italic">
                        Última actualización: 16 de mayo de 2026
                    </p>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introducción</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Bamboo Studio Dental ("nosotros", "nuestro" o "la Clínica") se compromete a proteger la privacidad de los usuarios de nuestra aplicación móvil ("Bamboo App") y nuestro sitio web. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y protegemos su información cuando utiliza nuestros servicios.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Información que Recopilamos</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Podemos recopilar los siguientes tipos de información:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li><strong>Información de contacto:</strong> Nombre, dirección de correo electrónico, número de teléfono.</li>
                            <li><strong>Información de salud:</strong> Historial dental, citas programadas y preferencias de tratamiento (necesario para la prestación del servicio odontológico).</li>
                            <li><strong>Datos del dispositivo:</strong> Información técnica sobre su dispositivo móvil, como el modelo de hardware, la versión del sistema operativo e identificadores únicos del dispositivo.</li>
                            <li><strong>Ubicación:</strong> Con su consentimiento, podemos recopilar datos de ubicación para ayudarle a encontrar nuestra clínica.</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Uso de la Información</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Utilizamos la información recopilada para:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>Gestionar y confirmar sus citas dentales.</li>
                            <li>Proporcionar y mejorar las funcionalidades de la aplicación móvil.</li>
                            <li>Enviar recordatorios de citas y comunicaciones relacionadas con el servicio.</li>
                            <li>Cumplir con obligaciones legales y normativas en el ámbito de la salud.</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Protección de Datos de Menores</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Nuestros servicios pueden estar dirigidos a menores de 13 años bajo la supervisión de sus padres o tutores legales. No recopilamos conscientemente datos personales de niños menores de 13 años sin el consentimiento verificable de sus padres. Si nos enteramos de que hemos recopilado información personal de un niño menor de 13 años sin consentimiento parental, tomaremos medidas para eliminar esa información lo antes posible.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Seguridad de los Datos</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Implementamos medidas de seguridad técnicas y organizativas para proteger sus datos personales contra el acceso no autorizado, la pérdida o la alteración. Sus datos de salud se tratan con la más estricta confidencialidad de acuerdo con las leyes de protección de datos personales vigentes.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Sus Derechos</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Usted tiene derecho a acceder, rectificar, cancelar u oponerse al tratamiento de sus datos personales (Derechos ARCO). Para ejercer estos derechos, puede ponerse en contacto con nosotros a través de los canales proporcionados en la sección de contacto.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Contacto</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Si tiene preguntas sobre esta Política de Privacidad, puede contactarnos en:
                            <br /><br />
                            <strong>Bamboo Studio Dental</strong><br />
                            Jr. Julio Cesar Tello 906, Huancayo<br />
                            Teléfono: 944 779 844<br />
                            Email: contacto@bamboostudiodental.com
                        </p>
                    </section>
                </motion.div>
            </main>
        </div>
    );
}
