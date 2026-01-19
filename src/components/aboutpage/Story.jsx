import React, { memo, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const timeline = [
    {
        year: "2021",
        title: "Academic Foundation at Parul University",
        text: [
            "Started the Integrated MCA (BCA + MCA) program with a specialization in Full Stack Development.",
            "Built strong fundamentals in programming, data structures, and modern web technologies.",
            "Developed a clear understanding of frontend and backend architecture and workflows."
        ],
    },

    {
        year: "2022",
        title: "Practical Learning & Early Development Experience",
        text: [
            "Began working with PHP and MySQL as an accessible starting point for backend development.",
            "Learned how APIs enable communication between frontend and backend systems.",
            "Explored complete full stack workflows for real-world web applications.",
            "Served as a Teaching Assistant, strengthening communication, analytical thinking, and problem-solving abilities."
        ],
    },

    {
        year: "2023",
        title: "Transition to MERN Stack & Internship Growth",
        text: [
            "Delivered the first professional client project using PHP and MySQL.",
            "Transitioned from traditional backend technologies to the modern MERN stack ecosystem.",
            "Completed an internship focused on JavaScript-based application architecture and scalable solutions.",
            "Delivered production-ready projects across both MERN and PHP stacks.",
            "Gained hands-on experience with GitHub collaboration, version control, and deployment workflows."
        ],
    },

    {
        year: "2024",
        title: "Professional Full Stack Role at Agratas Infotech",
        text: [
            "Joined Agratas Infotech as a Full Stack Developer.",
            "Developed scalable MERN-based applications for domestic and international clients.",
            "Collaborated in a structured team environment while following SDLC best practices.",
            "Enhanced backend security using tools such as Helmet, Mongo-Sanitize, Joi Validation, and Express-Validator."
        ],
    },

    {
        year: "2025",
        title: "Full Stack Developer at Bazaar Digital",
        text: [
            "Joined Bazaar Digital as a Full Stack Developer.",
            "Handled the complete SDLC for secure and optimized MERN applications.",
            "Managed DNS configuration, deployment processes, and client communication independently.",
            "Improved application performance and resolved security vulnerabilities across multiple client projects.",
            "Worked with more than 15 clients across diverse industries."
        ],
    },
];


const StoryCard = memo(({ year, title, text, index }) => {
    const controls = useAnimation();
    const { ref, inView } = useInView({ threshold: 0.25, triggerOnce: false });

    useEffect(() => {
        controls.start(
            inView
                ? {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                        type: "spring",
                        stiffness: 90,
                        damping: 14,
                    },
                }
                : { opacity: 0, y: 40, scale: 0.95 }
        );
    }, [inView, controls]);

    return (
        <motion.article
            ref={ref}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={controls}
            className="
        w-full
        rounded-2xl
        backdrop-blur-xl
        bg-white/10
        border border-white/30
        shadow-[0_4px_30px_rgba(0,0,0,0.0)]
        hover:shadow-[0_8px_40px_rgba(0,0,0,0)]
        transition-all duration-300
        p-6 sm:p-8
        min-h-[240px] sm:min-h-[280px] md:min-h-[320px]
        lg:sticky lg:top-36
      "
            style={{ zIndex: 10 + index }}
        >
            <p className="text-[#7DA0CA] font-semibold text-base sm:text-lg">
                {year}
            </p>

            <h3 className="mt-2 text-lg sm:text-2xl font-bold text-white">
                {title}
            </h3>

            <ul className="mt-3 text-gray-200 text-sm sm:text-base leading-relaxed font-light space-y-1">
                {text.map((point, i) => (
                    <li key={i}>• {point}</li>
                ))}
            </ul>
        </motion.article>
    );
});

const Story = () => {
    return (
        <section className="py-16 px-4 sm:px-6 md:px-12 lg:px-20 bg-[#052659] rounded-b m-2 new-font pb-4">
            <div className="mx-auto space-y-10 sm:space-y-16 md:space-y-20 relative">
                {timeline.map((item, index) => (
                    <StoryCard key={index} index={index} {...item} />
                ))}
            </div>
        </section>
    );
};

export default memo(Story);
