import React from "react";
import { motion } from "framer-motion";

import logo1 from "../../assets/logo_1.png";
import logo2 from "../../assets/logo_2.png";
import logo3 from "../../assets/logo_3.png";
import logo4 from "../../assets/logo_4.png";
import logo5 from "../../assets/logo_5.png";

const logos = [logo1, logo2, logo3, logo4, logo5];

// Duplicate logos 3 times for perfect infinite loop
const infiniteLogos = [...logos, ...logos, ...logos];

export default function ClientSlider() {
  // Detect screen width for mobile-specific animation speed
  const isMobile = window.innerWidth < 640;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 80,
          damping: 12,
          duration: 0.5,
        },
      }}
      className="relative w-full overflow-hidden py-8 bg-white"
    >
      {/* LEFT BLUR */}
      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />

      {/* RIGHT BLUR */}
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

      {/* TRACK */}
      <motion.div
        className="flex w-max gap-8 sm:gap-12 lg:gap-20 will-change-transform"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{
          duration: isMobile ? 10 : 12, 
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {infiniteLogos.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt="Client Logo"
            className="
              h-16
              sm:h-24
              lg:h-28
              xl:h-32
              object-contain 
              opacity-90 transition
            "
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
