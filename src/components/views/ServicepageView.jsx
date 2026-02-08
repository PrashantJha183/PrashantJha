import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import ServiceHero from "../servicepage/ServiceHero";
import ErrorBoundary from "../base/ErrorBoundary";
import ServiceGrid from "../servicepage/ServiceGrid";
import ProcessTimeline from "../servicepage/ProcessTimeline";
import UseCases from "../servicepage/UseCases";
import WhyChooseMe from "../servicepage/WhyChooseMe";

const ServicePageView = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(
        location.hash.replace("#", "")
      );
      if (el) {
        el.scrollIntoView({
          behavior: "auto",
          block: "start",
        });
      }
    }
  }, [location]);

  return (
    <>
      {/* ===================== SERVICE PAGE SEO ===================== */}
      <Helmet>
        {/* Primary SEO */}
        <title>
          Web Development Services | Full Stack MERN Developer – Prashant Jha
        </title>

        <meta
          name="description"
          content="Professional web development services by Prashant Jha, a Full Stack MERN Developer. I build SEO-optimized, high-performance, secure, and scalable React, Node.js, and PWA solutions for startups, businesses, and global clients."
        />

        <meta
          name="keywords"
          content="Web Development Services, Full Stack Development Services, MERN Stack Developer Services, React Development Services, Node.js Development Services, SEO Friendly Website Development, Progressive Web App Development, PWA Developer Services, Performance Optimized Websites, Secure Web Applications, Freelance Web Developer Services, Remote Full Stack Developer, Global Web Development Services"
        />

        {/* Indexing */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />

        {/* Author & Language */}
        <meta name="author" content="Prashant Jha" />
        <meta name="language" content="en" />

        {/* FIXED CANONICAL */}
        <link
          rel="canonical"
          href="https://www.prashantjhadev.in/services"
        />

        {/* CORRECT GLOBAL HREFLANG */}
        <link
          rel="alternate"
          href="https://www.prashantjhadev.in/services"
          hrefLang="en"
        />
        <link
          rel="alternate"
          href="https://www.prashantjhadev.in/services"
          hrefLang="x-default"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Prashant Jha Portfolio" />
        <meta
          property="og:title"
          content="Web Development Services | Full Stack MERN Developer"
        />
        <meta
          property="og:description"
          content="SEO-friendly, scalable, and high-performance web development services using React, Node.js, MongoDB, and modern web technologies."
        />
        <meta
          property="og:url"
          content="https://www.prashantjhadev.in/services"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Web Development Services | Prashant Jha"
        />
        <meta
          name="twitter:description"
          content="Full Stack MERN development services for startups, businesses, and global clients. Fast, secure, and SEO-optimized."
        />

        {/* STRUCTURED DATA — SERVICE */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Full Stack Web Development Services",
            description:
              "SEO-optimized, high-performance full stack web development services using React, Node.js, MongoDB, MySQL, and Progressive Web App technologies for startups and businesses worldwide.",
            provider: {
              "@type": "Person",
              name: "Prashant Jha",
              url: "https://www.prashantjhadev.in/"
            },
            areaServed: {
              "@type": "AdministrativeArea",
              name: "Worldwide"
            },
            serviceType: [
              "Full Stack Web Development",
              "MERN Stack Development",
              "React Development",
              "Node.js Development",
              "Progressive Web App Development"
            ]
          })}
        </script>

      </Helmet>
      {/* ===================== SEO END ===================== */}

      <ErrorBoundary>
        <ServiceHero />
      </ErrorBoundary>

      <ErrorBoundary>
        <ServiceGrid />
      </ErrorBoundary>

      <ErrorBoundary>
        <ProcessTimeline />
      </ErrorBoundary>

      <ErrorBoundary>
        <UseCases />
      </ErrorBoundary>

      <ErrorBoundary>
        <WhyChooseMe />
      </ErrorBoundary>
    </>
  );
};

export default ServicePageView;
