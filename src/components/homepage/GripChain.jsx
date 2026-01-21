// GripChain.jsx
import React, { memo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom"

import gc1 from "../../assets/gripChain1.png";
import gc2 from "../../assets/gripChain2.png";
import gc3 from "../../assets/gripChain3.png";
import gc4 from "../../assets/gripChain4.png";

/* =========================================================
   STATIC IMAGE CONFIG (IMMUTABLE)
========================================================= */
const IMAGES = Object.freeze([gc1, gc2, gc3, gc4]);

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
        className={`object-cover w-full h-full transition-all duration-700 ${loaded
          ? "opacity-100 scale-100 blur-0"
          : "opacity-0 scale-105 blur-2xl"
          }`}
      />
    </div>
  );
});

/* =========================================================
   MAIN COMPONENT
========================================================= */
const GripChain = () => {
  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ type: "spring", stiffness: 120, damping: 12 }}
      className="
        bg-white
        shadow-lg
        overflow-hidden
        border border-gray-200
        mx-auto

        /* SHAPE CONTROL */
        rounded-2xl
        lg:rounded-none

        /* SIZE CONTROL */
        max-w-4xl
        lg:max-w-5xl
      "
    >
      {/* ================= IMAGE COLLAGE ================= */}
      <div className="grid grid-cols-4 grid-rows-2 gap-3 p-4 bg-gray-50">
        <div className="col-span-2 row-span-2">
          <BlurImage
            src={IMAGES[0]}
            alt="Grip Chain Packtech packaging solutions"
          />
        </div>

        <div className="col-span-2">
          <BlurImage
            src={IMAGES[1]}
            alt="Grip Chain Packtech printing technology"
          />
        </div>

        <div className="col-span-1">
          <BlurImage
            src={IMAGES[2]}
            alt="Custom packaging design by Grip Chain Packtech"
          />
        </div>

        <div className="col-span-1">
          <BlurImage
            src={IMAGES[3]}
            alt="Sustainable packaging solutions by Grip Chain Packtech"
          />
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-6 lg:p-8">
        <h3 className="text-2xl font-semibold text-[#052659] mb-3 text-center">
          Grip Chain Packtech Limited
        </h3>

        <p className="text-gray-600 text-base mb-6 text-justify">
          <span className="font-medium text-[#052659]">
            Grip Chain Packtech Limited
          </span>{" "}
          is a leading packaging and printing solutions provider, specializing
          in innovative, sustainable, and high-quality packaging services. We
          help businesses enhance brand visibility, protect products, and
          optimize operations through tailored packaging solutions. Backed by
          advanced technology and industry expertise, we deliver excellence in
          every project while continuously evolving with market trends.
        </p>

        {/* ===== CTA ===== */}
        <div className="flex justify-center gap-3 flex-nowrap">
          {/* Visit Website */}
          <a
            href="https://gripchain.in/"
            rel="noopener noreferrer"
            aria-label="Visit Grip Chain Packtech Limited website"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#052659] text-white rounded-lg font-medium shadow-md transition-all duration-300 hover:gap-3 text-sm sm:text-base"
          >
            Visit Website
            <ArrowUpRight className="w-4 h-4" />
          </a>

          {/* Learn More */}
          <Link
            to="/services#grip-chain-packtech"
            // target="_blank"
            rel="noopener noreferrer"
            aria-label="Learn more about Grip Chain Packtech Limited"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#052659] rounded-lg border border-[#052659] font-medium shadow-sm transition-all duration-300 hover:bg-gray-100 hover:gap-3 text-sm sm:text-base"
          >
            Learn More
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default memo(GripChain);
