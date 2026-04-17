import { motion } from "framer-motion";

export function TestimonioVideo() {
    return (
        <section className="md:hidden py-16 bg-[#f4f8f6] relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-sm">

                {/* Título */}
                <motion.div
                    className="text-center mb-8 space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">
                        Vive la experiencia Bamboo!
                    </h2>
                </motion.div>

                {/* Video vertical */}
                <motion.div
                    className="relative rounded-3xl overflow-hidden shadow-xl mx-auto"
                    style={{ aspectRatio: "9/16", maxWidth: "320px" }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                >
                    <video
                        src="/testimonio.mp4"
                        className="w-full h-full object-cover"
                        controls
                        playsInline
                        preload="metadata"
                    />
                </motion.div>

            </div>
        </section>
    );
}
