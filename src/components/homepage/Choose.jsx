// Choose.jsx
import React, { memo, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ShieldCheck,
  Rocket,
  Users,
  TrendingUp,
  Settings,
  Award,
} from "lucide-react";

/* =========================================================
   CHOOSE CARD
========================================================= */
const ChooseCard = memo(({ icon, title, description }) => {
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
        bg-white
        border-2 border-[#052659]
        rounded-xl
        p-6
        shadow-md
        text-center
        flex
        flex-col
        items-center
      "
    >
      <div className="w-14 h-14 rounded-full bg-[#052659] flex items-center justify-center mb-4">
        {icon}
      </div>

      <h3 className="text-xl font-semibold text-[#052659] mb-2">{title}</h3>

      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </motion.article>
  );
});

/* =========================================================
   MAIN CHOOSE SECTION
========================================================= */
const Choose = () => {
  const reasons = [
    {
      icon: <Rocket className="w-6 h-6 text-white" />,
      title: "Performance-Driven Development",
      description:
        "I build fast, scalable, and optimized digital solutions focused on performance, clean architecture, and long-term maintainability.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-white" />,
      title: "Reliable & Secure Solutions",
      description:
        "From frontend to backend, security, stability, and best practices are always prioritized in every project I deliver.",
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: "Client-Centric Approach",
      description:
        "I work closely with clients to understand business goals and deliver tailored digital experiences that create real impact.",
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      title: "SEO & Growth Focused",
      description:
        "Every project is built with SEO-friendly structure, performance optimization, and scalability to support long-term growth.",
    },
    {
      icon: <Settings className="w-6 h-6 text-white" />,
      title: "Modern Tech Stack",
      description:
        "Experienced with React, Node.js, MongoDB, DevOps, CI/CD, and modern tooling to deliver future-ready solutions.",
    },
    {
      icon: <Award className="w-6 h-6 text-white" />,
      title: "Quality & Consistency",
      description:
        "I focus on clean code, reusable components, and consistent design systems to ensure high-quality, maintainable products.",
    },
  ];

  const headingControls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: false });

  useEffect(() => {
    headingControls.start(
      inView
        ? {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 120, damping: 12 },
          }
        : { opacity: 0, y: -20 }
    );
  }, [inView, headingControls]);

  return (
    <section
      className="bg-[#7DA0CA] py-16 px-6 new-font rounded-t m-2"
      aria-labelledby="choose-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* ===== HEADING ===== */}
        <motion.h2
          ref={ref}
          id="choose-heading"
          initial={{ opacity: 0, y: -20 }}
          animate={headingControls}
          className="text-3xl md:text-5xl font-bold text-[#052659] text-center mb-12"
        >
          Why Choose Me
        </motion.h2>

        {/* ===== GRID ===== */}
        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-6
        "
        >
          {reasons.map((item, index) => (
            <ChooseCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Choose);
