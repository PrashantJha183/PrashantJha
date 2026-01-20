import React, { memo } from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

/* ================= ANIMATION ================= */

const bounceVariant = {
  initial: { opacity: 0, y: 40, scale: 0.9 },
  animate: { opacity: 1, y: 0, scale: 1 },
};

/* ================= COMPONENT ================= */

const AboutIntro = () => {
  return (
    <section
      className="
        bg-[#052659]
        h-[70vh] md:h-[65vh]
        rounded-b
        flex flex-col
        justify-center
        items-center
        m-2
        new-font
        px-4
        text-center
      "
      aria-labelledby="about-heading"
    >
      {/* <motion.h2
        id="about-heading"
        variants={bounceVariant}
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.3 }}
        transition={{ type: "spring", stiffness: 90, damping: 12 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
      >
        About Me
      </motion.h2> */}

      <motion.p
        variants={bounceVariant}
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.3 }}
        transition={{ type: "spring", stiffness: 90, damping: 12, delay: 0.1 }}
        className="text-lg sm:text-xl text-[#C1E8FF] mb-4 leading-relaxed max-w-2xl"
      >
        I’m <span className="font-semibold text-white">Prashant Jha</span>, a
        Full Stack MERN Developer who builds fast, scalable, and SEO-optimized
        web applications.
      </motion.p>

      <motion.p
        variants={bounceVariant}
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.3 }}
        transition={{ type: "spring", stiffness: 90, damping: 12, delay: 0.2 }}
        className="text-sm sm:text-base md:text-lg text-gray-200 max-w-3xl leading-relaxed"
      >
        With over a year of hands-on experience, I’ve worked on ERP, LMS, CRM,
        and CMS-based platforms. I focus on writing clean, production-ready code
        and delivering modern digital solutions that improve performance, user
        experience, and brand visibility.
      </motion.p>

      {/* ===== CTA Buttons ===== */}
      <motion.div
        variants={bounceVariant}
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.3 }}
        transition={{ type: "spring", stiffness: 90, damping: 12, delay: 0.3 }}
        className="flex gap-4 mt-6"
      >
        {/* Portfolio */}
        <motion.a
          href="/portfolio"
          className="
            px-8 py-3
            bg-[#C1E8FF]
            text-[#052659]
            font-semibold
            rounded-lg
            shadow-md
            flex items-center gap-2
            hover:scale-105
            transition
          "
          aria-label="View my portfolio"
        >
          Portfolio
          <FiArrowRight className="w-5 h-5" />
        </motion.a>

        {/* Blog */}
        <motion.a
          href="/blog"
          className="
            px-8 py-3
            border
            border-[#C1E8FF]
            text-[#C1E8FF]
            font-semibold
            rounded-lg
            shadow-md
            flex items-center gap-2
            hover:scale-105
            transition
          "
          aria-label="Read my blog"
        >
          Blog
          <FiArrowRight className="w-5 h-5" />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default memo(AboutIntro);
