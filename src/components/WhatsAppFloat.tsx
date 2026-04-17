import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden="true">
        <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.46 0 .08 5.37.08 11.98c0 2.11.55 4.18 1.6 6.01L0 24l6.17-1.62a11.93 11.93 0 0 0 5.89 1.51h.01c6.6 0 11.98-5.37 11.99-11.98a11.9 11.9 0 0 0-3.54-8.43ZM12.07 21.87h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.66.96.98-3.57-.24-.37a9.9 9.9 0 0 1-1.52-5.3c0-5.49 4.47-9.96 9.97-9.96a9.9 9.9 0 0 1 7.05 2.91 9.88 9.88 0 0 1 2.92 7.04c0 5.49-4.47 9.96-9.99 9.96Zm5.47-7.47c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.08-.3-.15-1.27-.47-2.42-1.5a9.1 9.1 0 0 1-1.68-2.08c-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.08-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.86 1.22 3.06c.15.2 2.1 3.2 5.09 4.49.71.31 1.26.5 1.69.64.71.23 1.35.2 1.86.12.57-.09 1.77-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
    </svg>
);

export function WhatsAppFloat() {
    const [hovered, setHovered] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">

            {/* Tooltip */}
            <AnimatePresence>
                {hovered && (
                    <motion.span
                        className="bg-[#00665A] text-white text-sm font-medium px-4 py-2 rounded-full shadow-lg whitespace-nowrap pointer-events-none"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                    >
                        Chatea con nosotros
                    </motion.span>
                )}
            </AnimatePresence>

            {/* Botón flotante */}
            <div className="relative">
                {/* Pulso de fondo */}
                <span className="absolute inset-0 rounded-full bg-[#00665A] opacity-30 animate-ping" />

                <motion.a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chatea con nosotros por WhatsApp"
                    className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#00665A] text-white shadow-lg hover:bg-[#005248] transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => setHovered(true)}
                    onHoverEnd={() => setHovered(false)}
                >
                    <WhatsAppIcon />
                </motion.a>
            </div>
        </div>
    );
}
