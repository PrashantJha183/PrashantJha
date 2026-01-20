import { motion } from "framer-motion";
import {
    Code2,
    Layout,
    Server,
    Plug,
    ShieldCheck,
    Gauge,
    Cloud,
    Wrench,
    ShoppingCart,
    MonitorSmartphone,
    Database,
    Globe,
    ArrowRight,
} from "lucide-react";

export default function ServiceGrid() {
    const services = [
        {
            title: "Full Stack Web Development",
            description:
                "End-to-end MERN stack development for scalable, secure, and high-performing web applications.",
            points: [
                "Custom dashboards & portals",
                "Scalable architecture",
                "Clean & maintainable codebase",
            ],
            icon: Code2,
        },
        {
            title: "ERP System Development",
            description:
                "Custom ERP solutions tailored to business workflows and operational needs.",
            points: [
                "HRMS, CRM, Inventory & Finance modules",
                "Role-based access control",
                "Reports & analytics",
            ],
            icon: Database,
        },
        {
            title: "LMS & CRM Based Applications",
            description:
                "Learning and customer management platforms with automation and analytics.",
            points: [
                "User & role management",
                "Content / course handling",
                "Workflow automation",
            ],
            icon: Globe,
        },
        {
            title: "Frontend & Landing Page Development",
            description:
                "Modern, conversion-focused UI development using React & Next.js.",
            points: [
                "Responsive & accessible UI",
                "Performance-optimized UX",
                "SEO-friendly structure",
            ],
            icon: Layout,
        },
        {
            title: "Backend Development",
            description:
                "Secure and scalable backend systems using Node.js & Express.",
            points: [
                "RESTful architecture",
                "Secure data handling",
                "Optimized API performance",
            ],
            icon: Server,
        },
        {
            title: "API Development & Integration",
            description:
                "Robust APIs and seamless third-party integrations.",
            points: [
                "Payment & CRM integration",
                "External service connectivity",
                "API security best practices",
            ],
            icon: Plug,
        },
        {
            title: "Authentication & Authorization",
            description:
                "Enterprise-grade authentication and authorization systems.",
            points: [
                "JWT & OAuth",
                "RBAC & permissions",
                "Secure session handling",
            ],
            icon: ShieldCheck,
        },
        {
            title: "Progressive Web Apps (PWA)",
            description:
                "Installable, fast, and offline-capable web applications.",
            points: [
                "Offline support",
                "Push notifications",
                "Native-like UX",
            ],
            icon: MonitorSmartphone,
        },
        {
            title: "E-Commerce Solutions",
            description:
                "Custom-built e-commerce platforms tailored to business needs.",
            points: [
                "Product & order management",
                "Secure payment flows",
                "Admin dashboards",
            ],
            icon: ShoppingCart,
        },
        {
            title: "Website Revamp & Maintenance",
            description:
                "Modernization and long-term maintenance of existing applications.",
            points: [
                "UI/UX revamp",
                "Performance improvements",
                "Bug fixes & upgrades",
            ],
            icon: Wrench,
        },
        {
            title: "DevOps, Deployment & DNS",
            description:
                "Reliable deployment pipelines and infrastructure management.",
            points: [
                "CI/CD pipelines",
                "DNS configuration",
                "Production monitoring",
            ],
            icon: Cloud,
        },
        {
            title: "SEO & Technical Optimization",
            description:
                "Search engine and performance optimization for better visibility.",
            points: [
                "On-page & technical SEO",
                "Core Web Vitals",
                "Indexing readiness",
            ],
            icon: Gauge,
        },
        {
            title: "Complete SDLC Management",
            description:
                "Ownership of the entire software development lifecycle.",
            points: [
                "Requirement analysis",
                "Development & testing",
                "Deployment & support",
            ],
            icon: Code2,
        },
    ];

    /* Spring animation that REPLAYS on scroll but NEVER flickers */
    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 28,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 85,
                damping: 22,
                mass: 0.9,
                bounce: 0, // prevents jitter on re-entry
            },
        },
    };

    return (
        <section className="py-16 sm:py-20 new-font">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">


                {/* ===== Section Heading ===== */}
                <div className="mb-14 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                        Turning <span className="text-[#7DA0CA]">Ideas</span> into{" "}
                        <span className="text-[#7DA0CA]">Scalable</span> Systems
                    </h2>
                    <p className="mt-3 text-gray-600">
                        Modern web applications built with clean architecture,
                        secure APIs, and production-ready code.
                    </p>
                </div>


                {/* Mobile grid → Desktop flex (centers last row correctly) */}
                <div
                    className="
            grid grid-cols-1 gap-8 px-4 md:px-0
            sm:grid-cols-2
            lg:flex lg:flex-wrap lg:justify-center
          "
                >
                    {services.map((service, index) => {
                        const Icon = service.icon;

                        return (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{
                                    once: false,   // replay on every scroll
                                    amount: 0.45,  // avoids edge re-trigger flicker
                                }}
                                className="relative w-full max-w-[380px]"
                            >
                                {/* Blue accent box */}
                                <div className="absolute -bottom-3 -left-3 h-full w-full rounded-2xl bg-[#021024]" />

                                {/* Main card */}
                                <div className="relative flex h-full flex-col rounded-2xl bg-white p-6 shadow-lg">
                                    {/* Header */}
                                    <div className="mb-4 flex items-start justify-between">
                                        <h3 className="max-w-[80%] text-lg font-semibold text-gray-900">
                                            {service.title}
                                        </h3>
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                                            <Icon className="h-6 w-6 text-[#021024]" />
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="mb-3 text-sm leading-relaxed text-gray-600">
                                        {service.description}
                                    </p>

                                    {/* Bullet points */}
                                    <ul className="mb-5 space-y-1 text-sm text-gray-600">
                                        {service.points.map((point, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#021024]" />
                                                {point}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA */}
                                    <div className="mt-auto">
                                        <motion.a
                                            href="/contact"
                                            className="
                        inline-flex items-center gap-2
                        px-5 py-2.5 sm:px-7 sm:py-3
                        bg-[#052659]
                        text-[#C1E8FF]
                        text-sm sm:text-base md:text-md
                        font-semibold
                        rounded-lg
                        shadow-md
                        hover:scale-105
                        transition
                        group
                        whitespace-nowrap
                      "
                                            aria-label="Discuss project"
                                        >
                                            <span>Discuss Project</span>
                                            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                                        </motion.a>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
