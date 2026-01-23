import React, { memo, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
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
  mobileSpeed = 20,
  desktopSpeed = 20,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const x = useMotionValue(0);
  const animationRef = useRef(null);
  const infiniteLogos = duplicatedLogos(logos, repeatCount);

  /* -------- SSR-safe screen detection -------- */
  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    setIsMobile(media.matches);

    const handler = (e) => setIsMobile(e.matches);
    media.addEventListener("change", handler);

    return () => media.removeEventListener("change", handler);
  }, []);

  /* -------- Single infinite animation (constant speed) -------- */
  useEffect(() => {
    const duration = isMobile ? mobileSpeed : desktopSpeed;

    animationRef.current = animate(
      x,
      ["0%", "-33.33%"],
      {
        ease: "linear",
        duration,
        repeat: Infinity,
      }
    );

    return () => animationRef.current?.stop();
  }, [x, isMobile, mobileSpeed, desktopSpeed]);

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
        style={{ x }}
        onHoverStart={() => {
          if (!isMobile) animationRef.current?.pause();
        }}
        onHoverEnd={() => {
          if (!isMobile) animationRef.current?.play();
        }}
      >
        {infiniteLogos.map((logo, index) => (
          <div
            key={`${index}-${logo}`}
            className="
              flex
              items-center
              justify-center
              w-28 h-20
              sm:w-36 sm:h-20
              lg:w-44 lg:h-28
              xl:w-52 xl:h-32
              flex-shrink-0
            "
          >
            <img
              src={logo}
              alt="Client brand logo"
              loading="lazy"
              className="
                max-h-full
                max-w-full
                object-contain
                opacity-90
                transition
              "
            />
          </div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default memo(ClientSlider);
