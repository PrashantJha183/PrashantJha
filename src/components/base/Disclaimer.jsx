import React, { memo } from "react";
import { motion } from "framer-motion";
import {
    MdWarning,
    MdWork,
    MdCopyright,
    MdPublic,
    MdBalance,
    MdUpdate
} from "react-icons/md";

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
    visible: { transition: { staggerChildren: 0.12 } },
};

const Section = ({ icon: Icon, title, items }) => (
    <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.25 }}
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

const Disclaimer = () => {
    return (
        <section className="bg-[#F8FAFC] px-4 py-32 md:py-40 new-font">
            <div className="max-w-4xl mx-auto text-center mb-12">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    viewport={{ once: true }}
                    className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3"
                >
                    Disclaimer
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 80, damping: 18 }}
                    viewport={{ once: true }}
                    className="text-gray-600 max-w-2xl mx-auto"
                >
                    This disclaimer outlines limitations of responsibility related to
                    the use of this portfolio website.
                </motion.p>
            </div>

            <div className="max-w-5xl mx-auto space-y-10">
                <Section
                    icon={MdWarning}
                    title="General Disclaimer"
                    items={[
                        "All information is provided on an 'as-is' basis without guarantees.",
                        "No responsibility is assumed for errors, omissions, or outcomes.",
                    ]}
                />

                <Section
                    icon={MdWork}
                    title="Professional & Freelance Disclaimer"
                    items={[
                        "Website content does not constitute professional, legal, or financial advice.",
                        "Project discussions do not create contractual obligations.",
                    ]}
                />

                <Section
                    icon={MdCopyright}
                    title="Portfolio & Project Representation"
                    items={[
                        "Project case studies are shared for demonstration purposes only.",
                        "Actual results may vary depending on requirements and execution.",
                    ]}
                />

                <Section
                    icon={MdPublic}
                    title="External Links"
                    items={[
                        "External websites are accessed at the visitor’s own discretion.",
                        "No control or responsibility exists over third-party content.",
                    ]}
                />

                <Section
                    icon={MdBalance}
                    title="Limitation of Liability"
                    items={[
                        "No liability is accepted for direct or indirect damages.",
                        "Use of the website is at the visitor’s own risk.",
                    ]}
                />

                <Section
                    icon={MdUpdate}
                    title="Updates"
                    items={[
                        "This disclaimer may be updated without prior notice.",
                        "Continued usage indicates acceptance of revisions.",
                    ]}
                />
            </div>
        </section>
    );
};

export default memo(Disclaimer);
