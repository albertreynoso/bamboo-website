import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FloatingElement } from "@/components/ui/motion";
import { WaveDivider } from "@/components/WaveDivider";
import imagenMujer from "@/assets/Imagen_mujer.png";
import { getWhatsAppUrl } from "@/lib/whatsapp";

// Variantes de animación para el Hero
const heroTitleVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const heroSubtitleVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.2, ease: "easeOut" }
  }
};

const heroButtonVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, delay: 0.4, ease: "easeOut" }
  }
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const blobVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export function Hero() {
    return (
        <section id="inicio" className="relative bg-background pt-24 pb-32 min-h-[620px] overflow-hidden">
            {/* Imagen de fondo con animación */}
            <motion.img
                src={imagenMujer}
                alt="Paciente feliz con su nueva sonrisa en Bamboo Studio Dental - Expertos en diseño de sonrisa y estética dental en Huancayo"
                className="absolute inset-0 w-full h-full object-cover object-[68%_25%] md:object-[72%_center]"
                initial="hidden"
                animate="visible"
                variants={imageVariants}
                loading="eager"
                fetchPriority="high"
            />
            <div className="absolute inset-0 bg-black/20 md:hidden pointer-events-none" />

            {/* Gradiente desktop: original */}
            <div
                className="absolute inset-y-0 left-0 w-[68%] hidden md:block pointer-events-none"
                style={{
                    background:
                        "linear-gradient(to right, rgba(167,198,182,0.92) 0%, rgba(167,198,182,0.92) calc(100% - 450px), rgba(167,198,182,0.80) calc(100% - 270px), rgba(167,198,182,0.00) 100%)",
                }}
            />

            <div className="absolute inset-0 z-50 flex items-center">
                <div className="container mx-auto px-6 w-full">
                    <div className="space-y-3 md:space-y-6 max-w-xl md:w-[576px] mt-[150px] md:mt-0 md:ml-[max(0px,calc(50%-500px))]">
                        <motion.h1
                            className="text-4xl md:text-6xl font-bold tracking-tight text-white md:text-[#15413a] leading-[1.08]"
                            initial="hidden"
                            animate="visible"
                            variants={heroTitleVariants}
                        >
                            Tu sonrisa,<br />
                            nuestra pasión
                        </motion.h1>
                        <motion.p
                            className="text-base md:text-xl text-white md:text-white leading-relaxed max-w-xl"
                            initial="hidden"
                            animate="visible"
                            variants={heroSubtitleVariants}
                        >
                            <strong>Combinamos tecnología de vanguardia con un enfoque natural y orgánico para devolverte la confianza en tu sonrisa.</strong>
                        </motion.p>
                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 pt-2"
                            initial="hidden"
                            animate="visible"
                            variants={heroButtonVariants}
                        >
                            <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:translate-y-[-2px] transition-all bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => window.open(getWhatsAppUrl(), "_blank", "noopener,noreferrer")}>
                                Reserva tu Cita
                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                    className="ml-2 h-5 w-5 fill-current text-white"
                                >
                                    <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.46 0 .08 5.37.08 11.98c0 2.11.55 4.18 1.6 6.01L0 24l6.17-1.62a11.93 11.93 0 0 0 5.89 1.51h.01c6.6 0 11.98-5.37 11.99-11.98a11.9 11.9 0 0 0-3.54-8.43ZM12.07 21.87h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.66.96.98-3.57-.24-.37a9.9 9.9 0 0 1-1.52-5.3c0-5.49 4.47-9.96 9.97-9.96a9.9 9.9 0 0 1 7.05 2.91 9.88 9.88 0 0 1 2.92 7.04c0 5.49-4.47 9.96-9.99 9.96Zm5.47-7.47c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.08-.3-.15-1.27-.47-2.42-1.5a9.1 9.1 0 0 1-1.68-2.08c-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.08-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.86 1.22 3.06c.15.2 2.1 3.2 5.09 4.49.71.31 1.26.5 1.69.64.71.23 1.35.2 1.86.12.57-.09 1.77-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
                                </svg>
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Left-side stacked organic shapes con animación flotante */}
            <FloatingElement duration={7} distance={12} className="hidden md:block absolute left-[-160px] top-[28%] h-[280px] w-[320px] xl:h-[280px] xl:w-[320px] 2xl:h-[280px] 2xl:w-[320px] z-30 pointer-events-none" aria-hidden="true">
                <motion.div
                    className="h-full w-full bg-[#82a392] opacity-90"
                    style={{ borderRadius: "72% 28% 60% 40% / 40% 62% 38% 60%", transform: "rotate(12deg)" }}
                    initial="hidden"
                    animate="visible"
                    variants={blobVariants}
                />
            </FloatingElement>
            <FloatingElement duration={8} distance={18} className="hidden md:block absolute left-[-122px] top-[16%] h-[235px] w-[270px] xl:h-[235px] xl:w-[270px] 2xl:h-[235px] 2xl:w-[270px] z-40 pointer-events-none" aria-hidden="true">
                <motion.div
                    className="h-full w-full bg-[#c7dcd5] opacity-95"
                    style={{ borderRadius: "66% 34% 70% 30% / 38% 68% 32% 62%", transform: "rotate(-14deg)" }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                />
            </FloatingElement>

            {/* Bottom wave overlay across Hero */}
            <WaveDivider
                flipped
                className="absolute bottom-0 left-0 w-full z-30 text-[#82a392] fill-current pointer-events-none scale-x-[-1]"
                svgClassName="h-[60px] md:h-[190px]"
                aria-hidden="true"
            />

            <WaveDivider
                flipped
                className="absolute bottom-0 left-0 w-full z-40 text-[#c7dcd5] fill-current pointer-events-none scale-x-[-1]"
                svgClassName="h-[60px] md:h-[190px]"
                pathData="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-8.73,250.45,8.61C823.78,40,906.67,72,985.66,78.5c70.05,4.8,146.53,17.5,214.34,-10V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                aria-hidden="true"
            />
            <WaveDivider
                flipped
                className="absolute bottom-[-34px] left-0 w-full z-[35] text-[#c7dcd5] fill-current pointer-events-none scale-x-[-1] opacity-90"
                svgClassName="h-[60px] md:h-[190px]"
                pathData="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-8.73,250.45,8.61C823.78,40,906.67,72,985.66,78.5c70.05,4.8,146.53,17.5,214.34,-10V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                aria-hidden="true"
            />
        </section>
    );
}
