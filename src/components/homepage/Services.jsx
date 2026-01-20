// Services.jsx
import React, { memo, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom"; // ✅ ADDED
import {
  CheckCircle,
  Code,
  Server,
  Workflow,
  Search,
  ArrowUpRight,
} from "lucide-react";

/* =========================================================
   SERVICE CARD (MOBILE CENTERED, REST UNCHANGED)
========================================================= */
const ServiceCard = memo(({ icon, title, features, index }) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: false });

  useEffect(() => {
    controls.start(
      inView
        ? {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 80,
            damping: 12,
            mass: 0.7,
          },
        }
        : { opacity: 0, y: 40, scale: 0.95 }
    );
  }, [inView, controls]);

  const cardNumber = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={controls}
      whileHover={{ scale: 1 }}
      className="
        relative
        bg-white
        shadow-md
        border-2 border-[#052659]
        rounded-xl
        overflow-hidden
        aspect-square
        p-4
        sm:p-8
        flex
        flex-col
        items-center
        justify-center
      "
    >
      {/* ===== MOBILE BACKGROUND NUMBER (CENTERED) ===== */}
      <span className="absolute inset-0 flex top-3 left-4 text-7xl font-bold text-[#052659]/10 sm:hidden">
        {cardNumber}
      </span>

      {/* ===== ICON (HIDDEN ON MOBILE) ===== */}
      <div className="hidden sm:block text-[#052659] text-6xl mb-4">
        {icon}
      </div>

      {/* TITLE */}
      <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-[#052659] relative z-10 text-center">
        {title}
      </h3>

      {/* ===== MOBILE VIEW ALL BUTTON (CENTERED) ===== */}
      <Link to="/services" className="relative z-10 mt-3 sm:hidden">
        <div className="w-10 h-10 rounded-full bg-[#052659] flex items-center justify-center">
          <ArrowUpRight className="w-6 h-6 text-white" />
        </div>
      </Link>

      {/* ===== FEATURES (HIDDEN ON MOBILE) ===== */}
      <ul className="hidden sm:block text-gray-800 text-base md:text-lg text-left space-y-2 mt-2">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-[#052659] mt-1" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
});

/* =========================================================
   MAIN SERVICES PAGE
========================================================= */
const Services = () => {
  const services = [
    {
      icon: <Code />,
      title: "Frontend Development",
      features: [
        "Responsive & mobile-first UI",
        "Modern animations & interactions",
        "Reusable & optimized components",
        "Pixel-perfect design implementation",
      ],
    },
    {
      icon: <Server />,
      title: "Backend Development",
      features: [
        "REST APIs & authentication",
        "Database schema modeling",
        "Secure backend architecture",
        "Performance & scalability",
      ],
    },
    {
      icon: <Workflow />,
      title: "DevOps Engineering",
      features: [
        "Automated deployments",
        "Optimized cloud pipelines",
        "Version control systems (Git)",
        "Infrastructure scalability",
      ],
    },
    {
      icon: <Search />,
      title: "SEO Optimization",
      features: [
        "Improved ranking performance",
        "Meta tags & structured data",
        "Image, speed & content optimization",
        "Search engine visibility boost",
      ],
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
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 120,
            damping: 12,
            bounce: 0.5,
          },
        }
        : { opacity: 0, y: -20, scale: 0.9 }
    );
  }, [inView, headingControls]);

  return (
    <section
      className="min-h-[50vh] bg-[#7DA0CA] py-16 px-6 new-font rounded-t m-2"
      aria-labelledby="services-heading"
    >
      <div className="max-w-full mx-auto text-center relative z-10">
        <motion.h2
          ref={ref}
          id="services-heading"
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={headingControls}
          className="text-3xl md:text-5xl font-bold text-[#052659] mb-12"
        >
          Collaborating with Brands & Agencies <br />
          to Build Meaningful Digital Impact
        </motion.h2>

        {/* ================= MOBILE & TABLET ================= */}
        <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-4 gap-4 md:gap-12 lg:hidden md:m-5">
          {services.map((service, idx) => (
            <ServiceCard
              key={idx}
              index={idx}
              icon={service.icon}
              title={service.title}
              features={service.features}
            />
          ))}
        </div>

        {/* ================= LARGE SCREEN (UNCHANGED) ================= */}
        <div className="hidden lg:block divide-y divide-white text-[#021024] text-left">
          {services.map((service, index) => (
            <div
              key={index}
              className="grid grid-cols-4 items-center gap-40 py-10 px-6 hover:bg-white/20"
            >
              <h3 className="text-4xl font-semibold">{service.title}</h3>

              <ul className="space-y-3 text-sm opacity-90">
                {service.features.slice(0, 2).map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-[#021024] font-bold">|</span>
                    {item}
                  </li>
                ))}
              </ul>

              <ul className="space-y-3 text-sm opacity-90">
                {service.features.slice(2).map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-[#021024] font-bold">|</span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* ===== DESKTOP VIEW ALL BUTTON ===== */}
              <Link to="/services" className="flex justify-center">
                <div className="relative w-16 h-16">
                  <svg
                    viewBox="0 0 120 120"
                    className="absolute inset-0 w-full h-full"
                  >
                    <defs>
                      <path
                        id={`viewAllPath`}
                        d="
                          M 60,60
                          m -45,0
                          a 45,45 0 1,1 90,0
                          a 45,45 0 1,1 -90,0
                        "
                      />
                    </defs>

                    <text fill="#000" fontSize="12" fontWeight="600" letterSpacing="3">
                      <textPath href="#viewAllPath" startOffset="25%" textAnchor="middle">
                        VIEW ALL
                      </textPath>
                    </text>
                  </svg>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                      <ArrowUpRight className="w-6 h-6 text-black" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Services);
