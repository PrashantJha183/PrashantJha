import React, { memo } from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
};

const Blog = () => {
    return (
        <section
            className="
        relative
        min-h-[70vh]
        flex
        flex-col
        items-center
        justify-center
        text-center
        bg-[#F8FAFC]
        px-4
        new-font
      "
            aria-labelledby="blog-status-heading"
        >
            {/* Icon / Emoji */}
            <motion.div
                variants={fadeUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.5 }}
                className="text-5xl mb-4"
            >
                {/* 🚧 */}
            </motion.div>

            {/* Heading */}
            <motion.h1
                id="blog-status-heading"
                variants={fadeUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3"
            >
                Blog Page Under Development
            </motion.h1>

            {/* Description */}
            <motion.p
                variants={fadeUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-xl text-gray-600 text-sm sm:text-base mb-6"
            >
                I am currently working on this space to bring you meaningful articles on
                web development, real-world projects, performance optimization, and
                practical learnings.
                <br />
                <span className="font-medium text-gray-800">
                    Stay tuned the blog will be live soon.
                </span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
                variants={fadeUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap justify-center gap-4"
            >
                <a
                    href="/services#use-cases"
                    className="
            px-6 py-3
            bg-[#052659]
            text-[#C1E8FF]
            font-semibold
            rounded-lg
            shadow-md
            flex items-center gap-2
            hover:scale-105
            transition
          "
                    aria-label="View projects"
                >
                    {/* 🧩  */}
                    View Projects <FiArrowRight />
                </a>

                <a
                    href="/services"
                    className="
            px-6 py-3
            border
            border-[#052659]
            text-[#052659]
            font-semibold
            rounded-lg
            shadow-md
            flex items-center gap-2
            hover:scale-105
            transition
          "
                    aria-label="Explore services"
                >
                    {/* 🛠️  */}
                    Explore Services <FiArrowRight />
                </a>

                <a
                    href="/about"
                    className="
            px-6 py-3
            border
            border-gray-300
            text-gray-700
            font-semibold
            rounded-lg
            shadow-sm
            flex items-center gap-2
            hover:scale-105
            transition
          "
                    aria-label="About me"
                >
                    {/* 👤  */}
                    About Me <FiArrowRight />
                </a>
            </motion.div>
        </section>
    );
};

export default memo(Blog);