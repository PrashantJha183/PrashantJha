import React, { memo, useState, useMemo } from "react";
import { motion } from "framer-motion";

import {
    FaHtml5,
    FaCss3Alt,
    FaJsSquare,
    FaBootstrap,
    FaPhp,
    FaReact,
    FaNodeJs,
    FaGitAlt,
    FaGithub,
    FaSearch,
    FaMicrosoft,
    FaArrowLeft,
    FaArrowRight,
    FaVial,
    FaTools,
    FaCogs,
    FaFileCode,
    FaPaperPlane,
    FaCloud,
    FaServer,
} from "react-icons/fa";

import {
    SiTailwindcss,
    SiExpress,
    SiMysql,
    SiMongodb,
    SiGoogleanalytics,
    SiGooglemeet,
    SiNotion,
    SiZoom,
    SiWhatsapp,
    SiPostman,
    SiVite,
} from "react-icons/si";

/* ================= CATEGORIES ================= */

const categories = [
    {
        title: "Languages",
        skills: [
            { name: "HTML", icon: FaHtml5, color: "#E34F26" },
            { name: "CSS", icon: FaCss3Alt, color: "#1572B6" },
            { name: "JavaScript", icon: FaJsSquare, color: "#F7DF1E" },
            { name: "PHP", icon: FaPhp, color: "#777BB4" },
            { name: "JSON", icon: FaFileCode, color: "#000000" },
        ],
    },
    {
        title: "Frontend Frameworks & Libraries",
        skills: [
            { name: "React.js", icon: FaReact, color: "#61DAFB" },
            { name: "Bootstrap", icon: FaBootstrap, color: "#7952B3" },
            { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
        ],
    },
    {
        title: "Backend & APIs",
        skills: [
            { name: "Node.js", icon: FaNodeJs, color: "#68A063" },
            { name: "Express.js", icon: SiExpress, color: "#000000" },
        ],
    },
    {
        title: "Databases",
        skills: [
            { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
            { name: "MySQL", icon: SiMysql, color: "#00758F" },
        ],
    },
    {
        title: "Testing",
        skills: [
            { name: "Jest", icon: FaVial, color: "#C21325" },
            { name: "React Testing Library", icon: FaVial, color: "#E33332" },
        ],
    },
    {
        title: "API Testing & Debugging",
        skills: [
            { name: "Postman", icon: SiPostman, color: "#FF6C37" },
            { name: "Thunder Client", icon: FaTools, color: "#7B3FE4" },
        ],
    },
    {
        title: "Build Tools",
        skills: [{ name: "Vite", icon: SiVite, color: "#646CFF" }],
    },
    {
        title: "CI / CD & Automation",
        skills: [{ name: "GitHub Actions", icon: FaCogs, color: "#2088FF" }],
    },
    {
        title: "SEO & Analytics",
        skills: [
            { name: "Google Analytics", icon: SiGoogleanalytics, color: "#F9AB00" },
            { name: "Search Console", icon: FaSearch, color: "#4285F4" },
        ],
    },
    {
        title: "Version Control",
        skills: [
            { name: "Git", icon: FaGitAlt, color: "#F05032" },
            { name: "GitHub", icon: FaGithub, color: "#181717" },
        ],
    },
    {
        title: "Collaboration & Productivity",
        skills: [
            { name: "Google Meet", icon: SiGooglemeet, color: "#34A853" },
            { name: "Microsoft Teams", icon: FaMicrosoft, color: "#6264A7" },
            { name: "Notion", icon: SiNotion, color: "#000000" },
            { name: "Zoom", icon: SiZoom, color: "#2D8CFF" },
            { name: "WhatsApp", icon: SiWhatsapp, color: "#25D366" },
        ],
    },
];

/* ================= SKILL GRID ================= */

const SkillGrid = memo(({ skills }) => (
    <motion.div
        key={skills.map((s) => s.name).join("-")}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ type: "spring", stiffness: 80, damping: 12 }}
        className="
      flex flex-wrap justify-center
      gap-5
      mt-6 md:mt-0
      border rounded-xl p-5
      bg-white/10 backdrop-blur-sm
      min-h-[200px]
    "
    >
        {skills.map((skill, i) => {
            const Icon = skill.icon;
            return (
                <div
                    key={i}
                    className="
            flex flex-col items-center justify-center text-center
            rounded-xl bg-white/20 backdrop-blur-sm
            border border-white/90
            transition-all duration-300
            min-h-[120px] sm:min-h-[140px]
            w-[140px] sm:w-[160px]
          "
                >
                    <Icon
                        className="text-4xl sm:text-5xl mb-2"
                        style={{ color: skill.color }}
                    />
                    <p className="text-xs sm:text-sm font-semibold text-[#052659] tracking-wide">
                        {skill.name}
                    </p>
                </div>
            );
        })}
    </motion.div>
));

/* ================= MAIN ================= */

const AboutService = () => {
    const [selected, setSelected] = useState(categories[0]);
    const buttons = useMemo(() => categories, []);

    const midIndex = Math.ceil(buttons.length / 2);
    const leftButtons = buttons.slice(0, midIndex);
    const rightButtons = buttons.slice(midIndex);

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
                        <motion.span animate={{ x: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.9 }}>
                            <FaArrowLeft />
                        </motion.span>
                        <span>Swipe</span>
                        <motion.span animate={{ x: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 0.9 }}>
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
                                className={`px-5 py-3 rounded-lg font-bold transition-all
                ${selected.title === cat.title
                                        ? "bg-white/80 text-[#052659]"
                                        : "bg-white/10 text-white hover:bg-white/40"
                                    }`}
                            >
                                {cat.title}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Desktop Layout (UPDATED) */}
                <div className="hidden lg:grid grid-cols-5 gap-10 mt-6 items-center">

                    {/* LEFT BUTTONS */}
                    <div className="flex flex-col justify-center gap-4">
                        {leftButtons.map((cat, i) => (
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

                    {/* CENTER ICON GRID */}
                    <div className="col-span-3">
                        <SkillGrid skills={selected.skills} />
                    </div>

                    {/* RIGHT BUTTONS */}
                    <div className="flex flex-col justify-center gap-4">
                        {rightButtons.map((cat, i) => (
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
