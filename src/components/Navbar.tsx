import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo-2.PNG";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const navLinks = [
    { label: "Inicio", href: "#inicio" },
    { label: "Servicios", href: "#servicios" },
    { label: "Nosotros", href: "#nosotros" },
    { label: "Contacto", href: "#contacto" },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // useEffect(() => {
    //     if (scrolled) setMenuOpen(false);
    // }, [scrolled]);

    const handleNavClick = (href: string) => {
        setMenuOpen(false);

        // Esperamos un poco a que el menú empiece a cerrarse para no interrumpir el thread
        setTimeout(() => {
            const id = href.replace("#", "");

            // Caso especial para Inicio en móvil: ir al tope absoluto (0)
            if (id === "inicio" && window.innerWidth < 768) {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
                return;
            }

            const element = document.getElementById(id);
            if (element) {
                const isMobile = window.innerWidth < 768;
                let offset = isMobile ? 0 : 72;

                // Servicios y Nosotros entran profundo (-150px)
                if (isMobile && (id === "servicios" || id === "nosotros")) {
                    offset = 0;
                }

                // Contacto va exactamente al inicio (0px)
                if (isMobile && id === "contacto") {
                    offset = 50;
                }

                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }, 100);
    };

    return (
        <motion.header
            className={`fixed top-0 left-0 z-[60] w-full transition-colors duration-300 py-0 ${scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <motion.div
                    className="flex items-center h-18 py-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <img src={logo} alt="Bamboo Studio Dental" className="h-full w-auto object-contain scale-100" />
                </motion.div>

                {/* Nav desktop */}
                <motion.nav
                    className="hidden md:flex items-center gap-8 text-[15px] font-medium text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {navLinks.map((link, i) => (
                        <motion.a
                            key={link.href}
                            href={link.href}
                            className="transition-colors duration-300 hover:text-[#00665A]"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.2 + i * 0.08,
                                duration: 0.3,
                                type: "spring",
                                stiffness: 400,
                                damping: 17
                            }}
                            whileHover={{ y: -2, opacity: 0.8 }}
                            onClick={() => handleNavClick(link.href)}
                        >
                            {link.label}
                        </motion.a>
                    ))}
                </motion.nav>

                <motion.div
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                        <Button
                            className="hidden md:flex rounded-full bg-[#00665A] text-white hover:bg-[#005248] transition-all px-6 py-5 shadow-sm hover:shadow-md text-[15px] font-medium"
                            onClick={() => window.open(getWhatsAppUrl(), "_blank", "noopener,noreferrer")}
                            aria-label="Reservar cita por WhatsApp"
                        >
                            Reserva Online
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-2 h-4 w-4 fill-current">
                                <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.46 0 .08 5.37.08 11.98c0 2.11.55 4.18 1.6 6.01L0 24l6.17-1.62a11.93 11.93 0 0 0 5.89 1.51h.01c6.6 0 11.98-5.37 11.99-11.98a11.9 11.9 0 0 0-3.54-8.43ZM12.07 21.87h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.66.96.98-3.57-.24-.37a9.9 9.9 0 0 1-1.52-5.3c0-5.49 4.47-9.96 9.97-9.96a9.9 9.9 0 0 1 7.05 2.91 9.88 9.88 0 0 1 2.92 7.04c0 5.49-4.47 9.96-9.99 9.96Zm5.47-7.47c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.08-.3-.15-1.27-.47-2.42-1.5a9.1 9.1 0 0 1-1.68-2.08c-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.08-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.86 1.22 3.06c.15.2 2.1 3.2 5.09 4.49.71.31 1.26.5 1.69.64.71.23 1.35.2 1.86.12.57-.09 1.77-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
                            </svg>
                        </Button>
                    </motion.div>

                    <motion.button
                        className="md:hidden relative z-[70] p-2 rounded-lg text-gray-600 hover:text-[#00665A] hover:bg-gray-100 transition-colors"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </motion.button>
                </motion.div>
            </div>

            {/* Menú mobile desplegable */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.nav
                        className="md:hidden relative z-[65] flex flex-col px-6 pb-6 pt-2 gap-1 bg-white border-t border-gray-100 overflow-hidden pointer-events-auto"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => handleNavClick(link.href)}
                                className="block w-full py-3 px-4 text-[15px] font-medium text-gray-600 hover:text-[#00665A] hover:bg-gray-50 active:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                            >
                                {link.label}
                            </a>
                        ))}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.25 }}
                        >
                            <Button
                                className="mt-3 w-full rounded-full bg-[#00665A] text-white hover:bg-[#005248] transition-all px-6 py-5 shadow-sm text-[15px] font-medium"
                                onClick={() => window.open(getWhatsAppUrl(), "_blank", "noopener,noreferrer")}
                                aria-label="Reservar cita por WhatsApp"
                            >
                                Reserva Online
                                <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-2 h-4 w-4 fill-current">
                                    <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.46 0 .08 5.37.08 11.98c0 2.11.55 4.18 1.6 6.01L0 24l6.17-1.62a11.93 11.93 0 0 0 5.89 1.51h.01c6.6 0 11.98-5.37 11.99-11.98a11.9 11.9 0 0 0-3.54-8.43ZM12.07 21.87h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.66.96.98-3.57-.24-.37a9.9 9.9 0 0 1-1.52-5.3c0-5.49 4.47-9.96 9.97-9.96a9.9 9.9 0 0 1 7.05 2.91 9.88 9.88 0 0 1 2.92 7.04c0 5.49-4.47 9.96-9.99 9.96Zm5.47-7.47c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.08-.3-.15-1.27-.47-2.42-1.5a9.1 9.1 0 0 1-1.68-2.08c-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.08-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.86 1.22 3.06c.15.2 2.1 3.2 5.09 4.49.71.31 1.26.5 1.69.64.71.23 1.35.2 1.86.12.57-.09 1.77-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
                                </svg>
                            </Button>
                        </motion.div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </motion.header>
    );
}