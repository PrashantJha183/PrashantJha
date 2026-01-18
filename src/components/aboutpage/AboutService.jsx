import React, { memo, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ServiceCard = memo(({ icon, title, features, index }) => {
    const controls = useAnimation();
    const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: false });

    useEffect(() => {
        controls.start(
            inView
                ? {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { type: "spring", stiffness: 80, damping: 12, mass: 0.7 },
                }
                : { opacity: 0, y: 40, scale: 0.95 }
        );
    }, [inView, controls]);

    const cardNumber = String(index + 1).padStart(2, "0");

    return (
        <motion.article
            ref={ref}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={controls}
            whileHover={{ scale: 1 }}
            className="relative bg-white shadow-md border-2 border-[#052659] rounded-xl overflow-hidden aspect-square p-4 sm:p-8 flex flex-col items-center justify-center"
        >
            {/* Mobile Number */}
            <span className="absolute inset-0 flex top-3 left-4 text-7xl font-bold text-[#052659]/10 sm:hidden">
                {cardNumber}
            </span>

            {/* Icon only for tablet & desktop */}
            {icon && (
                <div className="hidden sm:block text-[#052659] text-6xl mb-3">
                    {icon}
                </div>
            )}

            {/* Title */}
            <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-[#052659] text-center">
                {title}
            </h3>

            {/* Mobile Features (fits inside same card) */}
            <ul className="sm:hidden mt-2 text-[10px] leading-snug text-gray-700 text-center space-y-1 px-1">
                {features?.map((feature, i) => (
                    <li key={i}>{feature}</li>
                ))}
            </ul>
        </motion.article>
    );
});

const AboutService = () => {
    const services = [
        {
            title: "Frontend",
            features: [
                "HTML, CSS, JavaScript",
                "Bootstrap, Tailwind CSS",
                "React.js",
                "Responsive UI Development",
            ],
        },
        {
            title: "Database",
            features: ["MongoDB", "SQL", "MongoDB Atlas", "Data Modeling"],
        },
        {
            title: "Backend",
            features: ["Node.js", "Express.js", "MySQL", "API Integration"],
        },
        {
            title: "Testing",
            features: ["React Testing", "Jest", "Postman", "Thunder Client"],
        },
        {
            title: "DevOps & Deployment",
            features: [
                "CI/CD Pipelines",
                "Netlify, Render",
                "Docker",
                "Build Tools: Vite & Babel",
            ],
        },
        {
            title: "SEO & Analytics",
            features: [
                "Google Search Console",
                "Google Analytics",
                "SEMrush",
                "Lighthouse Reports",
            ],
        },
        {
            title: "Version Control",
            features: ["Git", "GitHub", "Branching & Collaboration"],
        },
    ];

    const headingControls = useAnimation();
    const { ref, inView } = useInView({ threshold: 0.2 });

    useEffect(() => {
        headingControls.start(
            inView
                ? { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120, damping: 12 } }
                : { opacity: 0, y: -20, scale: 0.9 }
        );
    }, [inView, headingControls]);

    return (
        <section className="min-h-[50vh] bg-[#7DA0CA] py-16 px-6 new-font rounded-t m-2">
            <div className="max-w-full mx-auto text-center">
                <motion.h2
                    ref={ref}
                    animate={headingControls}
                    className="text-3xl md:text-5xl font-bold text-[#052659] mb-12"
                >
                    My Technical Stack
                </motion.h2>

                {/* Mobile + Tablet Grid (unchanged layout) */}
                <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-3 gap-4 md:gap-12 lg:hidden">
                    {services.map((service, idx) => (
                        <ServiceCard key={idx} index={idx} {...service} />
                    ))}
                </div>

                {/* Desktop Section (unchanged) */}
                <div className="hidden lg:block divide-y divide-white text-[#021024] text-left">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-4 items-center gap-40 py-10 px-6 hover:bg-white/20"
                        >
                            <h3 className="text-4xl font-semibold">{service.title}</h3>

                            <ul className="space-y-3 text-sm opacity-90">
                                {service.features.slice(0, 2).map((item, i) => (
                                    <li key={i} className="flex gap-2">
                                        <span className="font-bold">|</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <ul className="space-y-3 text-sm opacity-90">
                                {service.features.slice(2).map((item, i) => (
                                    <li key={i} className="flex gap-2">
                                        <span className="font-bold">|</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default memo(AboutService);
