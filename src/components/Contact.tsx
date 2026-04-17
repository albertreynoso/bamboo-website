import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WaveDivider } from "@/components/WaveDivider";
import { CheckCircle } from "lucide-react";

// ─── Credenciales EmailJS ─────────────────────────────────────────────────────
// Se recomienda configurar estas variables en el panel de Vercel (https://vercel.com)
const EJS_SERVICE = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_40ukfc4";
const EJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_wa3c5tv";
const EJS_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "z7j-sCDLwP6lAoeqw";
// ─────────────────────────────────────────────────────────────────────────────

const SERVICIOS = [
    "Revisión General",
    "Ortodoncia",
    "Implantes",
    "Endodoncia",
    "Rehabilitación",
    "Estética Dental",
];

const TIME_SLOTS = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
    "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
    "21:00", "21:30", "22:00"
];

const inputClass =
    "h-12 bg-white w-full rounded-md border border-input px-3 py-2 text-sm " +
    "ring-offset-background placeholder:text-muted-foreground " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

// Variantes de animación
const titleVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const subtitleVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.15, ease: "easeOut" } },
};

const formContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const formItemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const buttonVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

const mapVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut", delay: 0.3 } },
};

const confirmVariants: Variants = {
    hidden: { opacity: 0, scale: 0.85, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Contact() {
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [servicio, setServicio] = useState("Revisión General");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [motivo, setMotivo] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setAttemptedSubmit(true);

        // Validación global antes de enviar
        const isPhoneValid = /^9\d{8}$/.test(telefono);
        if (!nombre || !telefono || !isPhoneValid || !fecha || !hora || !motivo) {
            return;
        }

        setLoading(true);
        setError("");

        try {
            await emailjs.send(
                EJS_SERVICE,
                EJS_TEMPLATE,
                {
                    nombre,
                    telefono: `+51 ${telefono}`,
                    servicio,
                    fecha,
                    hora,
                    motivo
                },
                EJS_KEY,
            );
            setSent(true);
        } catch {
            setError("Hubo un problema al enviar. Por favor intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    // Handlers de formato y limpieza
    const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        // Solo letras, espacios, ñ y tildes
        const cleaned = val.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚ\s]/g, "");
        // Title Case: Cada palabra inicia con mayúscula
        const formatted = cleaned.replace(/\b\w/g, c => c.toUpperCase());
        setNombre(formatted);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        // Solo números
        let cleaned = val.replace(/\D/g, "");

        // Debe empezar con 9 si hay contenido
        if (cleaned.length > 0 && cleaned[0] !== '9') {
            return; // Bloquea si el primer dígito no es 9
        }

        // Máximo 9 dígitos
        if (cleaned.length <= 9) {
            setTelefono(cleaned);
        }
    };

    const handleMotivoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        const cleaned = val.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚ\s]/g, "");
        // Sentence Case: Primera letra en mayúscula
        const formatted = cleaned.length > 0
            ? cleaned.charAt(0).toUpperCase() + cleaned.slice(1)
            : cleaned;
        setMotivo(formatted);
    };

    return (
        <section id="contact" className="py-24 bg-white relative overflow-hidden">
            {/* Franja sólida encima del wave */}
            <div className="absolute top-0 left-0 w-full h-[200px] bg-[#c7dcd5] z-0 pointer-events-none" />

            <WaveDivider
                className="absolute top-[200px] left-0 w-full z-0 text-[#c7dcd5] fill-current pointer-events-none scale-x-[-1]"
                svgClassName="h-[45px] md:h-[140px]"
            />

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="text-center mb-16 space-y-4 -mt-[50px] md:mt-0">
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold tracking-tight text-foreground"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={titleVariants}
                    >
                        Reserva tu Cita
                    </motion.h2>
                    <motion.p
                        className="text-muted-foreground text-lg"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={subtitleVariants}
                    >
                        Completa tus datos y te contactaremos lo antes posible para confirmar tu cita.
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-[2fr_3fr] gap-12 items-center bg-teal-50/20 rounded-[2rem] p-8 md:p-12 shadow-sm border border-teal-50/30">

                    {/* ── Formulario / Confirmación ── */}
                    <AnimatePresence mode="wait">
                        {sent ? (
                            /* Pantalla de confirmación */
                            <motion.div
                                key="confirm"
                                className="flex flex-col items-center justify-center text-center py-12 gap-5"
                                initial="hidden"
                                animate="visible"
                                variants={confirmVariants}
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
                                >
                                    <CheckCircle className="h-20 w-20 text-[#00665A]" strokeWidth={1.5} />
                                </motion.div>

                                <motion.p
                                    className="text-2xl font-semibold text-foreground"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    Mensaje enviado 😊
                                </motion.p>

                                <motion.p
                                    className="text-muted-foreground text-base max-w-xs"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.45 }}
                                >
                                    Nos pondremos en contacto contigo lo más pronto posible.
                                </motion.p>

                                <motion.button
                                    className="mt-2 text-sm text-[#00665A] underline underline-offset-4 hover:text-[#005248] transition-colors"
                                    onClick={() => {
                                        setSent(false);
                                        setNombre(""); setTelefono("");
                                        setServicio("Revisión General");
                                        setFecha(""); setHora(""); setMotivo("");
                                    }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    Hacer otra reserva
                                </motion.button>
                            </motion.div>
                        ) : (
                            /* Formulario */
                            <motion.form
                                key="form"
                                className="space-y-5"
                                onSubmit={handleSubmit}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                variants={formContainerVariants}
                            >
                                {/* Nombre y Teléfono */}
                                <motion.div className="grid sm:grid-cols-2 gap-4" variants={formItemVariants}>
                                    <div className="space-y-2">
                                        <label htmlFor="nombre" className="text-sm font-medium">
                                            Nombre Completo <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            id="nombre"
                                            placeholder="Ej. Juan Pérez"
                                            className="h-12 bg-white"
                                            value={nombre}
                                            onChange={handleNombreChange}
                                            aria-describedby={attemptedSubmit && !nombre ? "nombre-error" : undefined}
                                        />
                                        {attemptedSubmit && !nombre && (
                                            <p id="nombre-error" className="text-[11px] text-red-500 mt-1 ml-1" role="alert">
                                                * Ingrese su nombre
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="telefono" className="text-sm font-medium">
                                            Teléfono <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-[14px] font-medium border-r pr-2 h-5 flex items-center">
                                                +51
                                            </span>
                                            <Input
                                                id="telefono"
                                                type="tel"
                                                placeholder="944 779 844"
                                                className="h-12 bg-white pl-14"
                                                value={telefono}
                                                onChange={handlePhoneChange}
                                                aria-describedby={(attemptedSubmit && !telefono) || (attemptedSubmit && telefono.length > 0 && !/^9\d{8}$/.test(telefono)) ? "telefono-error" : undefined}
                                            />
                                        </div>
                                        {attemptedSubmit && !telefono && (
                                            <p id="telefono-error" className="text-[11px] text-red-500 mt-1 ml-1" role="alert">
                                                * Ingrese su número
                                            </p>
                                        )}
                                        {attemptedSubmit && telefono.length > 0 && !/^9\d{8}$/.test(telefono) && (
                                            <p id="telefono-error" className="text-[11px] text-red-500 mt-1 ml-1" role="alert">
                                                * Ingresa un número correcto
                                            </p>
                                        )}
                                    </div>
                                </motion.div>

                                {/* Servicio */}
                                <motion.div className="space-y-2" variants={formItemVariants}>
                                    <label htmlFor="servicio" className="text-sm font-medium">
                                        Servicio <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="servicio"
                                        className={`${inputClass} cursor-pointer`}
                                        required
                                        value={servicio}
                                        onChange={e => setServicio(e.target.value)}
                                    >
                                        <option value="" disabled hidden>Selecciona un servicio</option>
                                        {SERVICIOS.map(s => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </motion.div>

                                {/* Fecha y Hora */}
                                <motion.div className="grid sm:grid-cols-2 gap-4" variants={formItemVariants}>
                                    <div className="space-y-2">
                                        <label htmlFor="fecha" className="text-sm font-medium">
                                            Fecha <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="fecha"
                                            type="date"
                                            className={inputClass}
                                            min={new Date().toISOString().split("T")[0]}
                                            value={fecha}
                                            onChange={e => setFecha(e.target.value)}
                                            aria-describedby={attemptedSubmit && !fecha ? "fecha-error" : undefined}
                                        />
                                        {attemptedSubmit && !fecha && (
                                            <p id="fecha-error" className="text-[11px] text-red-500 mt-1 ml-1" role="alert">
                                                * Ingrese la fecha de su cita
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="hora" className="text-sm font-medium">
                                            Hora <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            id="hora"
                                            className={inputClass}
                                            value={hora}
                                            onChange={e => setHora(e.target.value)}
                                            aria-describedby={attemptedSubmit && !hora ? "hora-error" : undefined}
                                        >
                                            <option value="">Seleccione una hora</option>
                                            {TIME_SLOTS.map(slot => (
                                                <option key={slot} value={slot}>
                                                    {slot}
                                                </option>
                                            ))}
                                        </select>
                                        {attemptedSubmit && !hora && (
                                            <p id="hora-error" className="text-[11px] text-red-500 mt-1 ml-1" role="alert">
                                                * Ingrese la hora de su cita
                                            </p>
                                        )}
                                    </div>
                                </motion.div>

                                {/* Motivo */}
                                <motion.div className="space-y-2" variants={formItemVariants}>
                                    <label htmlFor="motivo" className="text-sm font-medium">
                                        Motivo de Consulta <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="motivo"
                                        rows={3}
                                        className="flex w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        placeholder="¿En qué podemos ayudarte?"
                                        value={motivo}
                                        onChange={handleMotivoChange}
                                    />
                                    {attemptedSubmit && !motivo && (
                                        <p className="text-[11px] text-red-500 mt-1 ml-1">
                                            * Ingrese su motivo de consulta
                                        </p>
                                    )}
                                </motion.div>

                                {/* Error */}
                                {error && (
                                    <p className="text-sm text-red-500 text-center">{error}</p>
                                )}

                                {/* Botón */}
                                <motion.div variants={buttonVariants}>
                                    <Button
                                        type="submit"
                                        size="lg"
                                        disabled={loading}
                                        className="w-full h-14 text-lg rounded-xl shadow-md disabled:opacity-70"
                                    >
                                        {loading ? (
                                            <span className="flex items-center gap-2">
                                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                                </svg>
                                                Enviando...
                                            </span>
                                        ) : (
                                            "Realizar Reserva"
                                        )}
                                    </Button>
                                </motion.div>
                            </motion.form>
                        )}
                    </AnimatePresence>

                    {/* ── Mapa ── */}
                    <motion.div
                        className="h-[480px] w-full rounded-2xl overflow-hidden relative"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={mapVariants}
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5000!2d-75.21904119999999!3d-12.0616691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x910e97e73b85202f%3A0xe53d25e1dd1fa86b!2sest%C3%A9tica%20dental%20Huancayo%20-%20Bamboo!5e0!3m2!1sen!2spe!4v1773082684772!5m2!1sen!2spe"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0"
                            title="Ubicación de Bamboo Studio Dental en Google Maps"
                        ></iframe>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
