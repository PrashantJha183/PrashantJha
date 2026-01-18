import React, { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DEFAULT_LOGOS, duplicatedLogos } from "./constants";

/* ================= STATIC ANIMATIONS ================= */

const containerAnimation = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 12,
      duration: 0.5,
    },
  },
};

/* ================= COMPONENT ================= */

const ClientSlider = ({
  logos = DEFAULT_LOGOS,
  repeatCount = 3,
  mobileSpeed = 10,
  desktopSpeed = 12,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  /* -------- SSR-safe screen detection -------- */
  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    setIsMobile(media.matches);

    const handler = (e) => setIsMobile(e.matches);
    media.addEventListener("change", handler);

    return () => media.removeEventListener("change", handler);
  }, []);

  const infiniteLogos = duplicatedLogos(logos, repeatCount);

  return (
    <motion.section
      {...containerAnimation}
      className="relative w-full overflow-hidden py-12 md:py-24 bg-white"
      aria-label="Client logos"
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
          duration: isMobile ? mobileSpeed : desktopSpeed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {infiniteLogos.map((logo, index) => (
          <img
            key={`${index}-${logo}`}
            src={logo}
            alt="Client brand logo"
            loading="lazy"
            className="
              h-16
              sm:h-24
              lg:h-28
              xl:h-32
              object-contain 
              opacity-90 
              transition
            "
          />
        ))}
      </motion.div>
    </motion.section>
  );
};

export default memo(ClientSlider);
