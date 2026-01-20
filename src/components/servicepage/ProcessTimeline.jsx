import { motion } from "framer-motion";
import {
    Search,
    PencilRuler,
    Code2,
    Server,
    TrendingUp,
    Bug,
    Rocket,
    Headphones,
} from "lucide-react";

export default function ProcessTimeline() {
    const steps = [
        {
            step: "01",
            title: "Discovery & Planning",
            points: [
                "Understand business goals and user needs",
                "Requirement gathering & scope definition",
                "Technical feasibility analysis",
            ],
            color: "border-purple-400 text-purple-500",
            icon: Search,
        },
        {
            step: "02",
            title: "Wireframing & UI/UX Design",
            points: [
                "Low & high-fidelity wireframes",
                "User-focused design approach",
                "Interactive prototypes",
            ],
            color: "border-blue-400 text-blue-500",
            icon: PencilRuler,
        },
        {
            step: "03",
            title: "Frontend Development",
            points: [
                "Responsive UI with React / Next.js",
                "Accessible & SEO-friendly markup",
                "Performance-first approach",
            ],
            color: "border-emerald-400 text-emerald-500",
            icon: Code2,
        },
        {
            step: "04",
            title: "Backend Development",
            points: [
                "Secure & scalable APIs",
                "Authentication & authorization",
                "Database & system architecture",
            ],
            color: "border-yellow-400 text-yellow-500",
            icon: Server,
        },
        {
            step: "05",
            title: "Content & SEO Optimization",
            points: [
                "SEO-friendly content structure",
                "Meta tags & technical SEO",
                "Core Web Vitals optimization",
            ],
            color: "border-orange-400 text-orange-500",
            icon: TrendingUp,
        },
        {
            step: "06",
            title: "Testing & Quality Assurance",
            points: [
                "Functional & performance testing",
                "Bug fixing & refinements",
                "Cross-device compatibility",
            ],
            color: "border-pink-400 text-pink-500",
            icon: Bug,
        },
        {
            step: "07",
            title: "Deployment & Launch",
            points: [
                "CI/CD & production deployment",
                "Domain & DNS configuration",
                "Final pre-launch checks",
            ],
            color: "border-amber-400 text-amber-500",
            icon: Rocket,
        },
        {
            step: "08",
            title: "Post-Launch Support",
            points: [
                "Monitoring & maintenance",
                "Feature upgrades",
                "Long-term technical support",
            ],
            color: "border-gray-400 text-gray-500",
            icon: Headphones,
        },
    ];

    /* Same animation philosophy as ServiceGrid */
    const cardVariants = {
        hidden: { opacity: 0, y: 28 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 85,
                damping: 22,
                mass: 0.9,
                bounce: 0,
            },
        },
    };

    return (
        <section className="py-20 bg-white new-font">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <div className="mb-14 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                        From <span className="text-[#7DA0CA]">Idea</span> to{" "}
                        <span className="text-[#7DA0CA]">Impact</span>
                    </h2>
                    <p className="mt-3 text-gray-600">
                        A clear, structured process focused on performance, scalability, and quality.
                    </p>
                </div>

                {/* Cards */}
                <div
                    className="
            grid grid-cols-1 gap-8
            sm:grid-cols-2
            lg:grid-cols-4 px-3 md:px-0
          "
                >
                    {steps.map((step, index) => {
                        const Icon = step.icon;

                        return (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: false, amount: 0.4 }}
                                className={`
                  relative rounded-2xl border border-dashed
                  ${step.color}
                  p-6
                  bg-white
                `}
                            >
                                {/* Step + Icon */}
                                <div className="mb-4 flex items-center justify-between">
                                    <span className="text-2xl font-bold">
                                        {step.step}
                                    </span>
                                    <Icon className="h-6 w-6" />
                                </div>

                                {/* Title */}
                                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                                    {step.title}
                                </h3>

                                {/* Points */}
                                <ul className="space-y-2 text-sm text-gray-600">
                                    {step.points.map((point, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
