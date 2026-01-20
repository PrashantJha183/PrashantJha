import React, { memo } from "react";
import { motion } from "framer-motion";

/* ================= ANIMATION ================= */

const bounceVariant = {
    initial: { opacity: 0, y: 40, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
};

/* ================= COMPONENT ================= */

const ServiceHero = () => {
    return (
        <section
            className="
                bg-[#052659]
                h-[60vh] md:h-[60vh]
                rounded-b
                flex flex-col
                justify-center
                items-center
                m-2
                new-font
                px-4
                text-center
            "
            aria-labelledby="about-heading"
        >
            <motion.h2
                id="about-heading"
                variants={bounceVariant}
                initial="initial"
                whileInView="animate"
                viewport={{ once: false, amount: 0.3 }}
                transition={{ type: "spring", stiffness: 90, damping: 12 }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
            >
                Full Stack Web Development Services
            </motion.h2>

            <motion.p
                variants={bounceVariant}
                initial="initial"
                whileInView="animate"
                viewport={{ once: false, amount: 0.3 }}
                transition={{ type: "spring", stiffness: 90, damping: 12, delay: 0.1 }}
                className="
                    text-sm
                    sm:text-base
                    md:text-lg
                    text-[#C1E8FF]
                    mb-4
                    leading-relaxed
                    max-w-2xl
                "
            >
                I design, develop, and deliver scalable full stack web applications using
                the MERN stack focused on performance, security, and real business
                outcomes for startups and growing businesses.
            </motion.p>

            {/* ===== CTA Buttons ===== */}
            <motion.div
                variants={bounceVariant}
                initial="initial"
                whileInView="animate"
                viewport={{ once: false, amount: 0.3 }}
                transition={{ type: "spring", stiffness: 90, damping: 12, delay: 0.3 }}
                className="flex gap-3 mt-6"
            >
                {/* Get a Quote */}
                <motion.a
                    href="/contact"
                    className="
                        px-5 py-2.5
                        sm:px-7 sm:py-3
                        bg-[#C1E8FF]
                        text-[#052659]
                        text-sm
                        sm:text-base
                        md:text-lg
                        font-semibold
                        rounded-lg
                        shadow-md
                        flex items-center gap-2
                        hover:scale-105
                        transition
                        whitespace-nowrap
                    "
                    aria-label="Get a quote"
                >
                    Get a Quote
                </motion.a>

                {/* Discuss Project */}
                <motion.a
                    href="/contact"
                    className="
                        px-5 py-2.5
                        sm:px-7 sm:py-3
                        border
                        border-[#C1E8FF]
                        text-[#C1E8FF]
                        text-sm
                        sm:text-base
                        md:text-lg
                        font-semibold
                        rounded-lg
                        shadow-md
                        flex items-center gap-2
                        hover:scale-105
                        transition
                        whitespace-nowrap
                    "
                    aria-label="Discuss project"
                >
                    Discuss Project
                </motion.a>
            </motion.div>
        </section>
    );
};

export default memo(ServiceHero);
