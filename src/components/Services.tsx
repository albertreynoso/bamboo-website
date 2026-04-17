import { motion, type Variants } from "framer-motion";
import { WaveDivider } from "@/components/WaveDivider";
import servicios1 from "@/assets/servicios-1.png";
import servicios2 from "@/assets/servicios-2.png";
import servicios3 from "@/assets/servicios-3.png";
import servicios4 from "@/assets/servicios-4.png";
import servicios5 from "@/assets/servicios-5.png";
import servicios6 from "@/assets/servicios-6.png";

const serviceImages = [servicios1, servicios2, servicios3, servicios4, servicios5, servicios6];

const services = [
    { title: "Revisión General", description: "Chequeo completo de salud bucal y prevención." },
    { title: "Ortodoncia", description: "Alineamos tu sonrisa con las técnicas más modernas y discretas." },
    { title: "Implantes", description: "Recupera la funcionalidad y estética con implantes de alta durabilidad." },
    { title: "Odontopediatría", description: "Cuidado especializado y divertido para las sonrisas de los más pequeños." },
    { title: "Rehabilitación", description: "Restauración de la función masticatoria." },
    { title: "Estética Dental", description: "Diseño de sonrisa y blanqueamientos para resultados deslumbrantes." },
];

// Variantes de animación
const titleVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

const subtitleVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: 0.15, ease: "easeOut" }
    }
};

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.2
        }
    }
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.4, ease: "easeOut" }
    }
};

function ServiceCard({ title, description, image }: { title: string; description: string; image: string }) {
    return (
        <motion.div
            className="rounded-2xl bg-white/85 backdrop-blur-sm shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-visible"
            variants={cardVariants}
            whileHover={{ y: -5 }}
        >
            <motion.div
                className="mx-4 -mt-6 rounded-2xl overflow-hidden shadow-lg"
                variants={imageVariants}
            >
                <img src={image} alt={title} className="w-full h-52 object-cover" />
            </motion.div>
            <div className="p-6 pt-5 text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-base text-foreground/85 leading-relaxed">{description}</p>
            </div>
        </motion.div>
    );
}

export function Services() {
    return (
        <section id="services" className="relative bg-[#a7c6b6] py-24 overflow-hidden">
            {/* Franja sólida del color del wave */}
            <div className="absolute top-0 left-0 w-full h-[250px] bg-[#c7dcd5] z-10 pointer-events-none" />

            <WaveDivider
                className="absolute top-[250px] left-0 w-full z-10 text-[#c7dcd5] fill-current pointer-events-none scale-x-[-1]"
                svgClassName="h-[70px] md:h-[140px]"
                pathData="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-8.73,250.45,8.61C823.78,40,906.67,72,985.66,78.5c70.05,4.8,146.53,17.5,214.34,-10V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                aria-hidden="true"
            />

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold tracking-tight text-foreground"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={titleVariants}
                    >
                        Servicios Especializados
                    </motion.h2>
                    <motion.p
                        className="text-muted-foreground max-w-2xl mx-auto text-lg"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={subtitleVariants}
                    >
                        Atención integral con tecnología avanzada para cuidar tu salud dental y estética.
                    </motion.p>
                </div>

                <motion.div
                    className="grid md:grid-cols-3 gap-x-8 gap-y-[50px] pt-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={containerVariants}
                >
                    {services.map((service, idx) => (
                        <ServiceCard
                            key={idx}
                            title={service.title}
                            description={service.description}
                            image={serviceImages[idx]}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
