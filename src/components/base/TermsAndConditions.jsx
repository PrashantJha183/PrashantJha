import React, { memo } from "react";
import { motion } from "framer-motion";
import {
    MdGavel,
    MdPerson,
    MdWork,
    MdSecurity,
    MdCopyright,
    MdPublic,
    MdUpdate,
    MdEmail,
    MdWarning,
    MdPayment,
    MdBalance
} from "react-icons/md";

/* ======================
   Animation Config
====================== */

const springFadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 90,
            damping: 18,
            mass: 0.6,
        },
    },
};

const sectionVariant = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const AnimatedSection = ({ icon: Icon, title, items }) => (
    <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.25 }}
        className="bg-white rounded-xl shadow-sm p-6"
    >
        <motion.h2
            variants={springFadeUp}
            className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-3"
        >
            <Icon className="text-xl" /> {title}
        </motion.h2>

        <ul className="list-disc pl-5 space-y-2">
            {items.map((text, i) => (
                <motion.li
                    key={i}
                    variants={springFadeUp}
                    className="text-gray-700 text-sm sm:text-base"
                >
                    {text}
                </motion.li>
            ))}
        </ul>
    </motion.section>
);

const TermsAndConditions = () => {
    return (
        <section
            className="
                relative
                min-h-[70vh]
                bg-[#F8FAFC]
                px-4
                py-32 md:py-40
                new-font
            "
            aria-labelledby="terms-heading"
        >
            {/* Header */}
            <div className="max-w-4xl mx-auto text-center mb-12">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    viewport={{ once: true }}
                    id="terms-heading"
                    className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3"
                >
                    Terms & Conditions
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto"
                >
                    These terms define usage rules, responsibilities, and legal limitations
                    related to this portfolio website and freelance professional services.
                </motion.p>
            </div>

            {/* Content */}
            <div className="max-w-5xl mx-auto space-y-10">

                <AnimatedSection
                    icon={MdGavel}
                    title="General Use & Acceptance"
                    items={[
                        "This website functions as a personal portfolio and professional showcase.",
                        "Accessing or using this website implies acceptance of these terms.",
                        "If any part of these terms is not acceptable, usage of the website should be discontinued.",
                    ]}
                />

                <AnimatedSection
                    icon={MdPerson}
                    title="Portfolio Content & Accuracy"
                    items={[
                        "Project descriptions, timelines, and outcomes represent real professional experience.",
                        "Content may change over time to reflect updated skills, tools, or career progression.",
                        "No guarantee is provided regarding accuracy, completeness, or business suitability.",
                    ]}
                />

                <AnimatedSection
                    icon={MdWork}
                    title="Freelance Services & Engagement"
                    items={[
                        "This website may be used to promote freelance full stack development services.",
                        "Any collaboration, quotation, or project discussion does not constitute a binding agreement.",
                        "Final scope, timelines, pricing, and deliverables require written confirmation.",
                    ]}
                />

                <AnimatedSection
                    icon={MdPayment}
                    title="Payments & Commercial Terms"
                    items={[
                        "Payment terms, milestones, and refund policies are defined separately per project.",
                        "No financial obligation exists unless formally agreed in writing.",
                        "Failure to complete payment may result in suspension or termination of services.",
                    ]}
                />

                <AnimatedSection
                    icon={MdCopyright}
                    title="Intellectual Property Rights"
                    items={[
                        "Website content, design, source code structure, and visuals are legally protected.",
                        "Unauthorized copying, reuse, resale, or redistribution is strictly prohibited.",
                        "Third-party libraries, tools, and trademarks belong to their respective owners.",
                    ]}
                />

                <AnimatedSection
                    icon={MdSecurity}
                    title="Security, Performance & PWA"
                    items={[
                        "The website follows modern security, performance, and accessibility best practices.",
                        "Progressive Web App (PWA) features allow limited offline content access.",
                        "No absolute guarantee is provided against downtime, data loss, or technical issues.",
                    ]}
                />

                <AnimatedSection
                    icon={MdWarning}
                    title="Limitation of Liability"
                    items={[
                        "No liability is assumed for direct or indirect losses arising from website usage.",
                        "The website is provided on an 'as-is' and 'as-available' basis.",
                        "Business, financial, or technical decisions should not rely solely on website content.",
                    ]}
                />

                <AnimatedSection
                    icon={MdPublic}
                    title="External Links & Third-Party Content"
                    items={[
                        "External links are provided for reference or demonstration purposes only.",
                        "No responsibility is assumed for third-party websites, services, or policies.",
                        "Accessing external platforms is done at the user's own discretion.",
                    ]}
                />

                <AnimatedSection
                    icon={MdBalance}
                    title="Governing Law & Jurisdiction"
                    items={[
                        "These terms are governed by applicable local laws.",
                        "Any disputes are subject to the jurisdiction of relevant courts.",
                    ]}
                />

                <AnimatedSection
                    icon={MdUpdate}
                    title="Updates to Terms"
                    items={[
                        "Terms may be updated periodically without prior notice.",
                        "Continued usage of the website indicates acceptance of revised terms.",
                    ]}
                />

                <AnimatedSection
                    icon={MdEmail}
                    title="Contact & Communication"
                    items={[
                        "For legal clarifications or professional inquiries, use the contact details provided.",
                        "Communication via this website does not create a contractual relationship.",
                    ]}
                />

            </div>
        </section>
    );
};

export default memo(TermsAndConditions);
