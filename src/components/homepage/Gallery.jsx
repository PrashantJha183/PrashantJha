// Gallery.jsx
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import GripChain from "./GripChain";
import Optix from "./Optix";

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 14,
    },
  },
};

const Gallery = () => {
  return (
    <section className="py-20 px-6 bg-transparent new-font">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-[#052659]">
          Featured Projects
        </h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          A curated selection of brands and digital experiences crafted with
          precision, performance, and modern design.
        </p>
      </div>

      <div
        className="
          mx-auto
          grid
          grid-cols-1
          gap-12
          lg:grid-cols-2
          max-w-6xl
          lg:max-w-7xl
        "
      >
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="flex justify-center"
        >
          <GripChain />
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="flex justify-center"
        >
          <Optix />
        </motion.div>
      </div>

      {/* ===== EXPLORE MORE BUTTON ===== */}
      <div className="flex justify-center mt-12">
        <a
          href="#"
          className="
      inline-flex
      items-center
      gap-2
      px-8
      py-4
      border border-[#052659]
      bg-[#052659]
      text-[#ffff]
      font-medium
      rounded-lg
      transition-all
      duration-300
      hover:bg-[#ffff]
      hover:text-[#052659]
    "
        >
          Explore More Projects
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>

    </section>
  );
};

export default Gallery;
