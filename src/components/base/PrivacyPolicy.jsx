import React, { memo } from "react";
import { motion } from "framer-motion";
import {
    MdPrivacyTip,
    MdSecurity,
    MdStorage,
    MdPublic,
    MdUpdate,
    MdEmail
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

const PrivacyPolicy = () => {
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
                    Privacy Policy
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 80, damping: 18 }}
                    viewport={{ once: true }}
                    className="text-gray-600 max-w-2xl mx-auto"
                >
                    This policy explains how information is collected, used, and protected
                    while using this portfolio website.
                </motion.p>
            </div>

            <div className="max-w-5xl mx-auto space-y-10">
                <Section
                    icon={MdPrivacyTip}
                    title="Information Collection"
                    items={[
                        "Personal information is collected only when voluntarily provided through contact forms or direct communication.",
                        "No unnecessary or sensitive personal data is intentionally collected.",
                    ]}
                />

                <Section
                    icon={MdStorage}
                    title="Use of Information"
                    items={[
                        "Information is used solely for communication, project discussions, or professional inquiries.",
                        "No personal data is sold, shared, or rented to third parties.",
                    ]}
                />

                <Section
                    icon={MdSecurity}
                    title="Data Security"
                    items={[
                        "Reasonable technical measures are applied to protect information.",
                        "No guarantee is provided against unauthorized access or data loss.",
                    ]}
                />

                <Section
                    icon={MdPublic}
                    title="Third-Party Services"
                    items={[
                        "External services such as analytics or hosting providers may process limited technical data.",
                        "Each third-party service follows its own privacy policies.",
                    ]}
                />

                <Section
                    icon={MdUpdate}
                    title="Policy Updates"
                    items={[
                        "This policy may be updated periodically.",
                        "Continued usage of the website indicates acceptance of changes.",
                    ]}
                />

                <Section
                    icon={MdEmail}
                    title="Contact"
                    items={[
                        "Privacy-related questions can be addressed using the contact details available on the website.",
                    ]}
                />
            </div>
        </section>
    );
};

export default memo(PrivacyPolicy);
