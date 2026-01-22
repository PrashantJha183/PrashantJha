import React, { memo, useState, useMemo } from "react";
import { motion } from "framer-motion";

import {
    FaHtml5, FaCss3Alt, FaJsSquare, FaBootstrap, FaReact,
    FaNodeJs, FaGitAlt, FaGithub, FaSearch, FaMicrosoft,
    FaArrowLeft, FaArrowRight
} from "react-icons/fa";

import {
    SiTailwindcss, SiExpress, SiMysql, SiMongodb, SiGoogleanalytics,
    SiGooglemeet, SiNotion, SiZoom, SiWhatsapp, SiGithub
} from "react-icons/si";

const categories = [
    {
        title: "Frontend",
        skills: [
            { name: "HTML", icon: FaHtml5, color: "#E34F26" },
            { name: "CSS", icon: FaCss3Alt, color: "#1572B6" },
            { name: "JavaScript", icon: FaJsSquare, color: "#F7DF1E" },
            { name: "Bootstrap", icon: FaBootstrap, color: "#7952B3" },
            { name: "Tailwind", icon: SiTailwindcss, color: "#38BDF8" },
            { name: "React", icon: FaReact, color: "#61DAFB" }
        ]
    },
    {
        title: "Backend",
        skills: [
            { name: "Node.js", icon: FaNodeJs, color: "#68A063" },
            { name: "Express", icon: SiExpress, color: "#000000" },
            { name: "MySQL", icon: SiMysql, color: "#00758F" },
            { name: "MongoDB", icon: SiMongodb, color: "#47A248" }
        ]
    },
    {
        title: "SEO",
        skills: [
            { name: "Analytics", icon: SiGoogleanalytics, color: "#F9AB00" },
            { name: "Search Console", icon: FaSearch, color: "#4285F4" },
            { name: "SEO Audit", icon: FaSearch, color: "#34A853" }
        ]
    },
    {
        title: "Version Control",
        skills: [
            { name: "Git", icon: FaGitAlt, color: "#F05032" },
            { name: "GitHub", icon: FaGithub, color: "#181717" }
        ]
    },
    {
        title: "Collaboration",
        skills: [
            { name: "Google Meet", icon: SiGooglemeet, color: "#34A853" },
            { name: "Microsoft Teams", icon: FaMicrosoft, color: "#6264A7" },
            { name: "Notion", icon: SiNotion, color: "#000000" },
            { name: "Zoom", icon: SiZoom, color: "#2D8CFF" },
            { name: "WhatsApp", icon: SiWhatsapp, color: "#25D366" },
            { name: "GitHub", icon: SiGithub, color: "#181717" }
        ]
    }
];

const SkillGrid = memo(({ skills }) => (
    <motion.div
        key={skills.map(s => s.name).join("-")}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ type: "spring", stiffness: 80, damping: 12 }}
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-6 md:mt-0 border rounded-xl p-5 bg-white/10 backdrop-blur-sm min-h-[320px] md:min-h-[360px]"
    >
        {skills.map((skill, i) => {
            const Icon = skill.icon;
            return (
                <div
                    key={i}
                    className="flex flex-col items-center justify-center text-center
                    rounded-xl bg-white/20 backdrop-blur-smd border border-white/90
                    shadow-[0_4px_30px_rgba(0,0,0,0)]
                    hover:shadow-[0_6px_40px_rgba(0,0,0,0.25)]
                    transition-all duration-300 min-h-[120px] sm:min-h-[140px]"
                >
                    <Icon className="text-4xl sm:text-5xl mb-2" style={{ color: skill.color }} />
                    <p className="text-xs sm:text-sm font-semibold text-[#052659] tracking-wide">
                        {skill.name}
                    </p>
                </div>
            );
        })}
    </motion.div>
));

const AboutService = () => {
    const [selected, setSelected] = useState(categories[0]);
    const buttons = useMemo(() => categories, []);

    return (
        <section className="min-h-[50vh] bg-[#7DA0CA] py-16 px-6 rounded-t m-2 new-font">
            <div className="text-center mb-6">
                <h2 className="text-3xl md:text-5xl font-bold text-[#052659]">
                    The Perfect Tech Stack
                </h2>
                <p className="text-sm md:text-base text-[#021024] mt-2">
                    Strong, Scalable & Absolutely No Duct Tape
                </p>
            </div>

            <div className="max-w-6xl mx-auto">

                {/* Mobile Swipe Hint */}
                <div className="lg:hidden flex justify-center mb-2">
                    <div className="flex items-center gap-3 text-xs font-semibold text-[#052659]">
                        <motion.span
                            animate={{ x: [0, -6, 0] }}
                            transition={{ repeat: Infinity, duration: 0.9 }}
                        >
                            <FaArrowLeft />
                        </motion.span>

                        <span>Swipe</span>

                        <motion.span
                            animate={{ x: [0, 6, 0] }}
                            transition={{ repeat: Infinity, duration: 0.9 }}
                        >
                            <FaArrowRight />
                        </motion.span>
                    </div>
                </div>

                {/* Mobile Buttons */}
                <div className="lg:hidden overflow-x-auto whitespace-nowrap scrollbar-hide">
                    <div className="flex gap-3 min-w-max px-1">
                        {buttons.map((cat, i) => (
                            <button
                                key={i}
                                onClick={() => setSelected(cat)}
                                className={`px-5 py-3 rounded-lg font-bold text-left transition-all duration-300
                                backdrop-blur-lg border border-white/40 shadow-md
                                ${selected.title === cat.title
                                        ? "bg-white/80 text-[#052659]"
                                        : "bg-white/10 text-white hover:bg-white/40 hover:text-[#052659]"
                                    }`}
                            >
                                {cat.title}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:grid grid-cols-4 gap-10 mt-6">
                    <div className="flex flex-col justify-center gap-4">
                        {buttons.map((cat, i) => (
                            <button
                                key={i}
                                onClick={() => setSelected(cat)}
                                className={`border-2 px-5 py-3 rounded-lg text-left font-bold
                                ${selected.title === cat.title
                                        ? "bg-white/90 text-[#052659]"
                                        : "bg-white/10 text-white border-white"
                                    }`}
                            >
                                {cat.title}
                            </button>
                        ))}
                    </div>

                    <div className="col-span-3">
                        <SkillGrid skills={selected.skills} />
                    </div>
                </div>

                {/* Mobile Skills */}
                <div className="lg:hidden">
                    <SkillGrid skills={selected.skills} />
                </div>
            </div>
        </section>
    );
};

export default memo(AboutService);
