import React, { memo } from "react";
import { motion } from "framer-motion";

const experiences = [
    {
        year: "July 2025 - December 2025",
        role: "Full Stack Developer",
        company: "Bazaar Digital",
        points: [
            "Developed and maintained scalable web applications using the MERN stack, managing the full SDLC from analysis and design to deployment and support.",
            "Performed thorough testing using React-based Jest test suites along with manual API validation through tools like Postman and Thunder Client to ensure reliability and security.",
            "Improved overall web application performance by 40–50% through custom development and optimization, replacing vulnerable template-based solutions with secure, client-focused implementations.",
            "Applied on-page SEO best practices and optimized Core Web Vitals, increasing global search visibility and enhancing operational efficiency by 60-70%, resulting in 80-90% client satisfaction.",
        ],
    },

    {
        year: "June 2024 - June 2025",
        role: "Full Stack Developer",
        company: "Agratas Infotech",
        points: [
            "Led full stack development for multiple web applications, collaborating closely with clients and cross-functional teams to deliver scalable and user-focused solutions within defined timelines.",
            "Worked with US-based clients to understand business requirements and delivered tailored solutions in coordination with the development team.",
            "Managed end-to-end product development, ensuring seamless communication between stakeholders and development teams to build efficient and high-performing frontend systems.",
            "Collaborated with a team of four developers to enhance employee record management systems, resulting in a 60–70% improvement in operational efficiency through process optimization and feature enhancements."
        ],
    }

];

/* Desktop Animation */
const fadeLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fadeRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

/* Mobile Animation */
const fadeUp = {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const Experience = () => {
    return (
        <section className="bg-white py-16 px-4 sm:px-8 new-font">
            <div className="mb-12 text-center">
                <h2 className="text-2xl md:text-5xl font-bold text-[#052659]">
                    Experience That Delivers
                </h2>
                <p className="mt-3 text-gray-600 text-base md:text-lg">
                    Practical experience creating scalable systems
                    that support real business operations.
                </p>
            </div>


            <div className="max-w-5xl mx-auto space-y-12">
                {experiences.map((exp, index) => (
                    <div
                        key={index}
                        className="flex flex-col md:flex-row md:items-center md:gap-10"
                    >
                        {/* Year */}
                        <motion.div
                            variants={window.innerWidth < 768 ? fadeUp : fadeLeft}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.3 }}
                            className="text-lg md:text-xl font-semibold text-[#052659] mb-2 md:mb-0"
                        >
                            {exp.year}
                        </motion.div>

                        {/* Role & Points */}
                        <motion.div
                            variants={window.innerWidth < 768 ? fadeUp : fadeRight}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.3 }}
                            className="bg-[#F8FAFC] p-5 rounded-xl border border-gray-200 shadow-sm w-full"
                        >
                            <h3 className="text-xl font-semibold text-[#052659] mb-2">
                                {exp.role} -- {exp.company}
                            </h3>

                            <ul className="list-disc ml-5 text-gray-600 text-sm sm:text-base space-y-1">
                                {exp.points.map((point, i) => (
                                    <li key={i}>{point}</li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default memo(Experience);
