import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import fotoTeam from "@/assets/Foto Team.jpeg";
import testimonioMujer1 from "@/assets/mujer-1.png";
import testimonioMujer2 from "@/assets/mujer-2.png";
import testimonioHombre1 from "@/assets/hombre-1.png";

const testimonials = [
    {
        name: "Fiorella Zelada Vasquez",
        text: "Recomiendo por su profesionalismo, buen trato y excelente atención. Me explicó todo con claridad y me sentí muy cómoda durante el tratamiento. Sin duda, una dentista de confianza.",
        rating: 5,
        image: testimonioMujer1,
    },
    {
        name: "Bryan Tello",
        text: "Buena atención llegué de Lima a Huancayo para tratarme, Studio Dental Bamboo recomendado",
        rating: 5,
        image: testimonioHombre1,
    },
    {
        name: "Margarita Ordaya",
        text: "Recomiendo por su profesionalismo, buen trato y excelente atención. Me explicó todo con claridad y me sentí muy cómoda durante el tratamiento. Sin duda, una dentista de confianza.",
        rating: 5,
        image: testimonioMujer2,
    },
];

const team = [
    {
        name: "Dra. Elena Vargas",
        specialty: "Odontología Estética",
        description: "Especialista en transformar sonrisas con técnicas modernas y un trato cálido.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400",
    },
    {
        name: "Dr. Roberto Silva",
        specialty: "Implantología",
        description: "Más de 10 años restaurando la función y estética dental con implantes de precisión.",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400&h=400",
    },
    {
        name: "Dra. Sofía Castro",
        specialty: "Ortodoncia",
        description: "Especialista en alineación dental para niños, jóvenes y adultos.",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400&h=400",
    },
    {
        name: "Dr. Andrés Mora",
        specialty: "Cirugía Maxilofacial",
        description: "Experto en cirugías reconstructivas y correctivas del área facial con alta precisión.",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400&h=400",
    },
    {
        name: "Dra. Valentina Ríos",
        specialty: "Odontopediatría",
        description: "Apasionada por crear experiencias positivas y sin miedo para los más pequeños.",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400&h=400",
    },
    {
        name: "Dr. Camilo Torres",
        specialty: "Periodoncia",
        description: "Especialista en la salud de encías y tejidos de soporte dental con enfoque preventivo.",
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400&h=400",
    },
];

// Variantes de animación
const titleVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const teamImageVariants: Variants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const starVariants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 400, damping: 15, delay: i * 0.08 },
    }),
};

// Estrellas animadas
function AnimatedStars({ count }: { count: number }) {
    return (
        <div className="flex justify-center gap-1">
            {[...Array(count)].map((_, i) => (
                <motion.div key={i} custom={i} variants={starVariants} initial="hidden" animate="visible">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                </motion.div>
            ))}
        </div>
    );
}

// Card de miembro del equipo (sin animaciones propias — el grupo las maneja)
function TeamCard({ member }: { member: typeof team[0] }) {
    return (
        <div className="flex items-center gap-5 p-5 bg-[#f4f8f6] rounded-2xl min-h-[110px]">
            <div className="shrink-0 w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md">
                <img src={member.image} alt={`Dra. ${member.name} - Especialista en ${member.specialty} en Bamboo Studio Dental Huancayo`} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                    {member.description}
                </p>
                <div className="flex items-center gap-1 flex-wrap">
                    <span className="text-sm font-semibold text-foreground">{member.name}</span>
                    <span className="text-muted-foreground text-xs">·</span>
                    <span className="text-primary text-xs font-medium">{member.specialty}</span>
                </div>
            </div>
        </div>
    );
}

export function Trust() {
    // ── Embla (testimoniales) ────────────────────────────────────────────────
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
        emblaApi.on("select", onSelect);
        return () => { emblaApi.off("select", onSelect); };
    }, [emblaApi]);

    // ── Team pagination ──────────────────────────────────────────────────────
    const [teamPage, setTeamPage] = useState(0);
    const pageSize = 3;
    const totalPages = Math.ceil(team.length / pageSize);
    const visibleTeam = team.slice(teamPage * pageSize, teamPage * pageSize + pageSize);

    const teamScrollPrev = useCallback(
        () => setTeamPage(p => (p - 1 + totalPages) % totalPages),
        [totalPages]
    );
    const teamScrollNext = useCallback(
        () => setTeamPage(p => (p + 1) % totalPages),
        [totalPages]
    );

    return (
        <section id="trust" className="py-24 bg-white relative">
            <div className="container mx-auto px-6 max-w-6xl">

                {/* ── Sección Equipo ── */}
                <div className="mb-24">
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold tracking-tight text-foreground text-center mb-12"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={titleVariants}
                    >
                        Nuestro Equipo
                    </motion.h2>

                    <div className="flex flex-col md:flex-row gap-12 items-stretch">

                        {/* Lista de doctores con paginación */}
                        <motion.div
                            className="flex-1 flex items-center gap-2"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            {/* Flecha izquierda */}
                            {totalPages > 1 && (
                                <button
                                    onClick={teamScrollPrev}
                                    className="shrink-0 p-1 text-neutral-600 hover:text-foreground transition-colors"
                                    aria-label="Página anterior"
                                >
                                    <ChevronLeft className="h-6 w-6" />
                                </button>
                            )}

                            {/* Grupo de cards: entra y sale como una sola unidad */}
                            <div className="flex-1 overflow-hidden">
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.div
                                        key={teamPage}
                                        className="flex flex-col gap-4"
                                        initial={{ opacity: 0, x: 40 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -40 }}
                                        transition={{ duration: 0.25, ease: "easeInOut" }}
                                    >
                                        {visibleTeam.map((member) => (
                                            <TeamCard key={member.name} member={member} />
                                        ))}
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Flecha derecha */}
                            {totalPages > 1 && (
                                <button
                                    onClick={teamScrollNext}
                                    className="shrink-0 p-1 text-neutral-600 hover:text-foreground transition-colors"
                                    aria-label="Página siguiente"
                                >
                                    <ChevronRight className="h-6 w-6" />
                                </button>
                            )}
                        </motion.div>

                        {/* Foto del equipo */}
                        <motion.div
                            className="order-first md:order-last w-full md:w-1/2 shrink-0 rounded-3xl overflow-hidden shadow-lg aspect-[4/3]"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={teamImageVariants}
                        >
                            <img src={fotoTeam} alt="Equipo de odontólogos especialistas de Bamboo Studio Dental Huancayo" className="w-full h-full object-cover" loading="lazy" />
                        </motion.div>
                    </div>

                    {/* Dots de paginación del equipo */}
                    {totalPages > 1 && (
                        <div className="flex justify-center gap-2 mt-6">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setTeamPage(i)}
                                    aria-label={`Página ${i + 1}`}
                                    className={`h-2 rounded-full transition-all duration-300 ${i === teamPage
                                            ? "w-6 bg-primary"
                                            : "w-2 bg-neutral-400 hover:bg-neutral-600"
                                        }`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* ── Sección Testimoniales ── */}
                <div>
                    <motion.div
                        className="text-center mb-16"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={titleVariants}
                    >
                        <h2 className="text-4xl font-bold tracking-tight text-foreground">
                            Lo que dicen nuestros pacientes
                        </h2>
                    </motion.div>

                    <motion.div
                        className="relative w-[80%] mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="bg-[#fafafa] rounded-[2rem] shadow-sm border border-neutral-100">

                            {/* Viewport Embla sin padding — overflow-hidden corta limpio */}
                            <div ref={emblaRef} className="overflow-hidden rounded-t-[2rem]">
                                <div className="flex touch-pan-y">
                                    {testimonials.map((testimonial, idx) => (
                                        <div
                                            key={idx}
                                            className="flex-[0_0_100%] min-w-0 text-center px-8 md:px-12 pt-8 md:pt-12 pb-6"
                                        >
                                            <div className="flex justify-center mb-6">
                                                <img
                                                    src={testimonial.image}
                                                    alt={`Paciente ${testimonial.name} - Testimonio Bamboo Studio Dental`}
                                                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-sm mx-auto"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div className="mb-6">
                                                <AnimatedStars count={testimonial.rating} />
                                            </div>
                                            <p className="text-lg md:text-xl italic text-muted-foreground mb-8">
                                                "{testimonial.text}"
                                            </p>
                                            <h4 className="font-semibold text-foreground text-lg">
                                                {testimonial.name}
                                            </h4>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Navegación inferior: flechas mobile + dots */}
                            <div className="flex items-center justify-center gap-4 py-5">
                                <button
                                    onClick={scrollPrev}
                                    className="md:hidden text-neutral-400 hover:text-foreground transition-colors"
                                    aria-label="Testimonio anterior"
                                >
                                    <ChevronLeft className="h-6 w-6" />
                                </button>

                                <div className="flex gap-2">
                                    {testimonials.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => emblaApi?.scrollTo(i)}
                                            aria-label={`Testimonio ${i + 1}`}
                                            className={`h-2 rounded-full transition-all duration-300 ${i === selectedIndex
                                                    ? "w-6 bg-primary"
                                                    : "w-2 bg-neutral-300 hover:bg-neutral-400"
                                                }`}
                                        />
                                    ))}
                                </div>

                                <button
                                    onClick={scrollNext}
                                    className="md:hidden text-neutral-400 hover:text-foreground transition-colors"
                                    aria-label="Testimonio siguiente"
                                >
                                    <ChevronRight className="h-6 w-6" />
                                </button>
                            </div>
                        </div>

                        {/* Flechas desktop — fuera de la card */}
                        <motion.button
                            className="hidden md:flex absolute left-[-64px] top-1/2 -translate-y-1/2 text-neutral-400 hover:text-foreground transition-colors"
                            onClick={scrollPrev}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Testimonio anterior"
                        >
                            <ChevronLeft className="h-12 w-12" />
                        </motion.button>
                        <motion.button
                            className="hidden md:flex absolute right-[-64px] top-1/2 -translate-y-1/2 text-neutral-400 hover:text-foreground transition-colors"
                            onClick={scrollNext}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Testimonio siguiente"
                        >
                            <ChevronRight className="h-12 w-12" />
                        </motion.button>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
