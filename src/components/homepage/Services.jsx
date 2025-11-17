// ServicesPage.jsx
import React, { memo, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CheckCircle } from "lucide-react";
import { Code, Server, Workflow, Search } from "lucide-react";

// ------------------------------------------------------------
// ServiceCard MUST be defined BEFORE using it
// ------------------------------------------------------------
const ServiceCard = memo(({ icon, title, stage, features }) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: false });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 80, damping: 12, mass: 0.7 },
      });
    } else {
      controls.start({
        opacity: 0,
        y: 40,
        scale: 0.95,
      });
    }
  }, [inView, controls]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={controls}
      whileHover={{ scale: 1 }}
      className="relative flex flex-col items-center text-center p-8 bg-white shadow-md rounded-xl transition-shadow duration-300 border-2 border-[#052659]"
    >
      <div className="text-[#052659] text-6xl mb-4">{icon}</div>

      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#052659]">
        {title}
      </h3>

      <ul className="text-gray-800 text-base md:text-lg text-left space-y-2 mt-2">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start space-x-2">
            <CheckCircle className="text-[#052659] w-5 h-5 mt-1" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
});

// ------------------------------------------------------------
// MAIN PAGE
// ------------------------------------------------------------
const ServicesPage = () => {
  const services = [
    {
      icon: <Code />,
      title: "Frontend Development",
      stage: "HTML • CSS • JS • React",
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
      stage: "Node • Express • MongoDB",
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
      stage: "CI/CD • Docker • Cloud",
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
      stage: "Technical & On-Page SEO",
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
    if (inView) {
      headingControls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 120,
          damping: 12,
          bounce: 0.5,
        },
      });
    } else {
      headingControls.start({
        opacity: 0,
        y: -20,
        scale: 0.9,
      });
    }
  }, [inView, headingControls]);

  return (
    <section
      className="min-h-screen md:min-h-[50vh] bg-[#7DA0CA] py-16 px-6 new-font rounded-t m-2 flex flex-col"
      aria-labelledby="services-heading"
    >
      <div className="max-w-full mx-auto text-center relative z-10">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={headingControls}
          id="services-heading"
          className="text-3xl md:text-5xl font-bold text-[#052659] mb-12"
        >
          Collaborating with Brands & Agencies <br />
          to Build Meaningful Digital Impact
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 lg:gap-16 md:m-5">
          {services.map((service, idx) => (
            <ServiceCard
              key={idx}
              icon={service.icon}
              title={service.title}
              stage={service.stage}
              features={service.features}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(ServicesPage);
