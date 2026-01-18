import React, { memo } from "react";
import My from "../../assets/My.jpg";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

/* ================= STATIC ANIMATION ================= */

const bounceVariant = {
  initial: { opacity: 0, y: 40, scale: 0.9 },
  animate: { opacity: 1, y: 0, scale: 1 },
};

/* ================= COMPONENT ================= */

const Home = () => {
  return (
    <section
      className="
        bg-[#052659] 
        h-[75vh] md:h-[80vh] 
        rounded-b 
        text-[#C1E8FF] 
        flex flex-col 
        justify-center 
        items-center 
        m-2 
        new-font 
        px-4
      "
      aria-labelledby="home-heading"
    >
      {/* Profile Image */}
      <motion.div
        variants={bounceVariant}
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.3 }}
        transition={{ type: "spring", stiffness: 90, damping: 12 }}
        className="flex justify-center mb-4"
      >
        <img
          src={My}
          alt="Prashant Jha – Full Stack & Frontend Developer"
          width="192"
          height="192"
          loading="eager"
          className="
            w-40 h-40 
            sm:w-48 sm:h-48 
            rounded-full 
            border-4 
            border-white 
            object-cover 
            shadow-lg
          "
        />
      </motion.div>

      {/* Heading */}
      <motion.h1
        id="home-heading"
        variants={bounceVariant}
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.3 }}
        transition={{
          type: "spring",
          stiffness: 90,
          damping: 12,
          delay: 0.1,
        }}
        className="
          text-xl 
          sm:text-2xl 
          md:text-3xl 
          font-semibold 
          text-center 
          mb-2
        "
      >
        Building Digital Products, Brands, and Experiences
      </motion.h1>

      {/* Description */}
      <motion.p
        variants={bounceVariant}
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.3 }}
        transition={{
          type: "spring",
          stiffness: 90,
          damping: 12,
          delay: 0.2,
        }}
        className="
          text-center 
          text-sm 
          sm:text-base 
          md:text-lg 
          mb-4 
          opacity-90 
          max-w-xl
        "
      >
        I specialize in crafting modern websites, scalable web applications, and
        clean user experiences that help businesses grow digitally.
      </motion.p>

      {/* Button */}
      <motion.button
        type="button"
        variants={bounceVariant}
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.3 }}
        transition={{ type: "spring", stiffness: 90, damping: 12 }}
        className="
          mt-2 
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
        aria-label="Know more about my work"
      >
        <span>Know More</span>
        <FiArrowRight className="w-5 h-5" aria-hidden="true" />
      </motion.button>
    </section>
  );
};

export default memo(Home);
