// Optix.jsx
import React, { memo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom"
import optix1 from "../../assets/Optix1.png";
import optix2 from "../../assets/Optix2.png";
import optix3 from "../../assets/Optix3.png";
import optix4 from "../../assets/Optix4.png";

/* =========================================================
   STATIC IMAGE CONFIG (IMMUTABLE)
========================================================= */
const IMAGES = Object.freeze([optix1, optix2, optix3, optix4]);

/* =========================================================
   BLUR IMAGE (OPTIMIZED & REUSABLE)
========================================================= */
const BlurImage = memo(({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg bg-gray-100">
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
      )}

      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`object-cover w-full h-full transition-all duration-700 ${loaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-105 blur-2xl"
          }`}
      />
    </div>
  );
});

/* =========================================================
   MAIN COMPONENT
========================================================= */
const Optix = () => {
  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ type: "spring", stiffness: 120, damping: 12 }}
      className="
        bg-white
        shadow-lg
        rounded-2xl
        overflow-hidden
        border border-gray-200
        max-w-4xl
        lg:max-w-5xl
        mx-auto
      "
    >
      {/* ================= IMAGE COLLAGE ================= */}
      <div className="grid grid-cols-4 grid-rows-2 gap-3 p-4 bg-gray-50">
        <div className="col-span-2 row-span-2">
          <BlurImage src={IMAGES[0]} alt="OptixDigitalAI digital marketing solutions" />
        </div>

        <div className="col-span-2">
          <BlurImage src={IMAGES[1]} alt="OptixDigitalAI web and mobile app development" />
        </div>

        <div className="col-span-1">
          <BlurImage src={IMAGES[2]} alt="OptixDigitalAI performance marketing strategy" />
        </div>

        <div className="col-span-1">
          <BlurImage src={IMAGES[3]} alt="OptixDigitalAI UI UX and branding solutions" />
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-5">
        <h3 className="text-2xl font-semibold text-[#052659] mb-2 text-center">
          OptixDigitalAI
        </h3>

        <p className="text-gray-600 text-base mb-6 text-justify">
          <span className="font-medium text-[#052659]">OptixDigitalAI</span> is
          a leading digital marketing and technology company based in Pune,
          delivering result-driven digital marketing, web development, and
          mobile application solutions. We help brands grow through strategic
          marketing, modern design, and scalable digital products tailored to
          business goals.
        </p>

        {/* ===== CENTERED VISIT WEBSITE BUTTON WITH ARROW ===== */}
        <div className="flex justify-center gap-3 flex-nowrap">
          {/* Visit Website */}
          <a
            href="https://optixdigitalai.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit OptixDigitalAI website"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#052659] text-white font-medium rounded-lg shadow-md transition-all duration-300 hover:gap-3 text-sm sm:text-base"
          >
            Visit Website
            <ArrowUpRight className="w-4 h-4" />
          </a>

          {/* Learn More */}
          <Link
            to="/services#optixdigitalai"
            rel="noopener noreferrer"
            aria-label="Learn more about OptixDigitalAI"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#052659] border border-[#052659] font-medium rounded-lg shadow-sm transition-all duration-300 hover:bg-gray-100 hover:gap-3 text-sm sm:text-base"
          >
            Learn More
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default memo(Optix);
