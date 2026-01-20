import { motion } from "framer-motion";
import {
    ShieldCheck,
    Zap,
    Globe,
    Settings,
    Layers,
    RefreshCcw,
} from "lucide-react";

export default function WhyChooseMe() {
    const reasons = [
        {
            title: "Proven Real-World Experience",
            description:
                "I have hands-on experience building and maintaining real production systems including ERP, CRM, LMS, e-commerce, and high-traffic business websites not just demo projects.",
            icon: Layers,
        },
        {
            title: "Built for Performance, PWA & SSG",
            description:
                "Applications are developed with PWA readiness, SSG support, lazy loading, code splitting, and Core Web Vitals optimization to ensure fast load times and offline-friendly experiences.",
            icon: Zap,
        },
        {
            title: "Security, Stability & Trust",
            description:
                "I secure applications using JWT, RBAC, and best practices, fix legacy vulnerabilities, and ensure long-term stability through proper DNS, hosting, and environment management.",
            icon: ShieldCheck,
        },
        {
            title: "SEO & Global Visibility Expertise",
            description:
                "I help businesses grow organically with technical and on-page SEO, enabling visibility across India, neighboring regions, and global markets including the Middle East, Europe, and the USA.",
            icon: Globe,
        },
        {
            title: "Clients Stay for Long-Term Support",
            description:
                "Clients continue working with me for maintenance, upgrades, SEO improvements, performance tuning, and feature expansion because systems are built to evolve, not break.",
            icon: RefreshCcw,
        },
        {
            title: "Business-First, Not Just Code",
            description:
                "I focus on solving business problems reducing manual effort, improving workflows, increasing visibility, and delivering measurable impact instead of just shipping features.",
            icon: Settings,
        },
    ];

    const cardVariants = {
        hidden: { opacity: 0, y: 28 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 85,
                damping: 22,
                bounce: 0,
            },
        },
    };

    return (
        <section className="py-20 bg-[#7DA0CA]  rounded-t m-2 new-font">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <div className="mb-16 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                        Why <span className="text-[#052659]">Clients Choose & Stay</span>
                    </h2>
                    <p className="mt-4 max-w-3xl mx-auto text-gray-900">
                        A combination of experience, performance-focused development, and
                        long-term reliability delivering systems that grow with your business.
                    </p>
                </div>

                {/* Cards */}
                <div
                    className="
            grid grid-cols-1 gap-8
            sm:grid-cols-2
            lg:grid-cols-3 px-3 md:px-0
          "
                >
                    {reasons.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: false, amount: 0.4 }}
                                className="relative"
                            >
                                {/* Accent layer */}
                                <div className="absolute -bottom-3 -left-3 h-full w-full rounded-2xl bg-[#021024]" />

                                {/* Card */}
                                <div className="relative h-full rounded-2xl bg-white p-6 shadow-lg">
                                    {/* Icon */}
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                                        <Icon className="h-6 w-6 text-[#021024]" />
                                    </div>

                                    {/* Title */}
                                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                        {item.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm leading-relaxed text-gray-600">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
