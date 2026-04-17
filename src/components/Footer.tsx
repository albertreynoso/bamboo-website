import { motion, type Variants } from "framer-motion";
import { MapPin, Phone, Instagram, Facebook } from "lucide-react";

// Variantes de animación con tipos correctos
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
};

const columnVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

// Función para scroll suave con offset del navbar
const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
        const navbarHeight = 72;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - navbarHeight;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
};

export function Footer() {
    return (
        <footer className="bg-primary pt-16 pb-8 text-primary-foreground">
            <motion.div
                className="container mx-auto px-6 grid gap-12 md:grid-cols-3 items-start"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
            >
                {/* Brand */}
                <motion.div className="space-y-4" variants={columnVariants}>
                    <motion.span
                        className="text-[32px] font-bold tracking-wide text-primary-foreground"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Bamboo
                    </motion.span>
                    <p className="opacity-80 max-w-xs text-sm leading-relaxed">
                        Tu sonrisa, nuestra pasión. Brindamos servicios odontológicos de la más alta calidad en un ambiente orgánico y relajante.
                    </p>
                    <div className="flex gap-4 pt-2">
                        {[
                            { href: "https://www.instagram.com/bamboo.studiodental/", icon: <Instagram className="h-5 w-5" />, label: "Instagram de Bamboo Studio" },
                            {
                                href: "https://www.tiktok.com/@bamboo.studiodental",
                                label: "TikTok de Bamboo Studio",
                                icon: (
                                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.3-.85.51-1.44 1.43-1.58 2.41-.03.55 0 1.05.19 1.54.42 1.05 1.52 1.78 2.65 1.79 1.05-.02 2.03-.64 2.46-1.6.15-.41.2-.84.18-1.27l.03-11.97c0-1.74-.01-3.48-.01-5.23z" />
                                    </svg>
                                )
                            },
                            { href: "https://www.facebook.com/studiodentalyestetica/?locale=es_LA", icon: <Facebook className="h-5 w-5" />, label: "Facebook de Bamboo Studio" }
                        ].map((social, i) => (
                            <motion.a
                                key={social.href}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                className="hover:text-accent transition-colors"
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 15,
                                    delay: i * 0.1
                                }}
                                whileHover={{ scale: 1.2, y: -3 }}
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                {/* Quick Links */}
                <motion.div className="space-y-4 md:justify-self-center" variants={columnVariants}>
                    <h4 className="text-lg font-semibold">Enlaces Rápidos</h4>
                    <nav className="flex flex-col gap-2 opacity-80 text-sm">
                        {[
                            { href: "#hero", label: "Inicio" },
                            { href: "#services", label: "Servicios" },
                            { href: "#trust", label: "Nosotros" },
                            { href: "#contact", label: "Contacto" }
                        ].map((link, i) => (
                            <motion.a
                                key={link.href}
                                href={link.href}
                                className="hover:text-accent hover:underline w-fit cursor-pointer"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05, duration: 0.3 }}
                                whileHover={{ x: 5 }}
                                onClick={(e) => handleNavClick(e, link.href)}
                            >
                                {link.label}
                            </motion.a>
                        ))}
                    </nav>
                </motion.div>

                {/* Contact Info */}
                <motion.div className="space-y-4 md:justify-self-end" variants={columnVariants}>
                    <h4 className="text-lg font-semibold">Contáctanos</h4>
                    <div className="space-y-3 opacity-80 text-sm">
                        <motion.div
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: 10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                        >
                            <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                            <p>Jr. Julio Cesar Tello 906, 12006</p>
                        </motion.div>
                        <motion.div
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: 10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.4 }}
                        >
                            <Phone className="h-5 w-5 shrink-0" />
                            <p>944 779 844</p>
                        </motion.div>
                    </div>
                </motion.div>

            </motion.div>

            <motion.div
                className="container mx-auto px-6 mt-16 pt-8 border-t border-primary-foreground/20 text-center text-sm opacity-80"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.8 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                &copy; {new Date().getFullYear()} Bamboo Studio Dental. Todos los derechos reservados.
            </motion.div>
        </footer>
    );
}