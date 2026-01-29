import { Helmet } from "react-helmet-async";

import Hero from "../homepage/Hero";
import ErrorBoundary from "../base/ErrorBoundary";
import ClientSlider from "../homepage/ClientSlider";
import TestimonialsCarousel from "../homepage/TestimonialsCarousel";
import Services from "../homepage/Services";
import Gallery from "../homepage/Gallery";
import Choose from "../homepage/Choose";

const HomepageView = () => {
  return (
    <>
      {/* ===================== GLOBAL SEO ===================== */}
      <Helmet>
        {/* Primary SEO */}
        <title>
          Prashant Jha | Full Stack MERN Developer | SEO-Friendly Web & PWA
          Solutions
        </title>

        <meta
          name="description"
          content="Prashant Jha is a Full Stack MERN Developer building high-performance, SEO-optimized, PWA-ready web applications using React, Node.js, MongoDB, MySQL, and Tailwind CSS for global clients."
        />

        <meta
          name="keywords"
          content="Full Stack Developer, MERN Stack Developer, React Developer, Node.js Developer, JavaScript Developer, SEO Friendly Website Developer, Progressive Web App Developer, PWA Developer, Performance Optimized Websites, Freelance Web Developer, Remote Full Stack Developer, Global Web Developer, React Vite Developer, Tailwind CSS Developer, MongoDB Developer, MySQL Developer, Startup Website Developer, Business Website Developer, Secure Web Applications, Netlify Hosting"
        />

        {/* Indexing */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />

        {/* Author & Language */}
        <meta name="author" content="Prashant Jha" />
        <meta name="language" content="en" />

        {/* Canonical */}
        <link rel="canonical" href="https://prashant-jhadev.netlify.app/" />

        {/* HREFLANG — GLOBAL TARGETING */}
        <link
          rel="alternate"
          href="https://prashant-jhadev.netlify.app/"
          hrefLang="en"
        />
        <link
          rel="alternate"
          href="https://prashant-jhadev.netlify.app/"
          hrefLang="en-IN"
        />
        <link
          rel="alternate"
          href="https://prashant-jhadev.netlify.app/"
          hrefLang="en-US"
        />
        <link
          rel="alternate"
          href="https://prashant-jhadev.netlify.app/"
          hrefLang="en-GB"
        />
        <link
          rel="alternate"
          href="https://prashant-jhadev.netlify.app/"
          hrefLang="x-default"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Prashant Jha Portfolio" />
        <meta
          property="og:title"
          content="Prashant Jha | Full Stack MERN Developer"
        />
        <meta
          property="og:description"
          content="SEO-friendly, high-performance MERN stack applications and PWA solutions trusted by global clients."
        />
        <meta
          property="og:url"
          content="https://prashant-jhadev.netlify.app/"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Prashant Jha | Full Stack Developer"
        />
        <meta
          name="twitter:description"
          content="Building fast, scalable, SEO-optimized web applications for startups, businesses, and global clients."
        />

        {/* STRUCTURED DATA — PERSON */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Prashant Jha",
            jobTitle: "Full Stack MERN Developer",
            url: "https://prashant-jhadev.netlify.app/",
            image: "https://prashant-jhadev.netlify.app/logo.png",
            description:
              "Full Stack MERN Developer specializing in SEO-optimized, high-performance, PWA-ready web applications for global clients.",
            knowsAbout: [
              "React",
              "Node.js",
              "Express.js",
              "MongoDB",
              "MySQL",
              "SEO Optimization",
              "Progressive Web Apps",
              "Performance Optimization",
              "Vite",
              "Tailwind CSS",
              "Render",
              "MongoDB Atlas",
            ],
            sameAs: [
              "https://github.com/PrashantJha183",
              "https://www.linkedin.com/in/jhaprashant183/",
            ],
          })}
        </script>

        {/* STRUCTURED DATA — WEBSITE */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "PersonalBrand",
            name: "Prashant Jha",
            url: "https://prashant-jhadev.netlify.app/",
            logo: "https://prashant-jhadev.netlify.app/logo.png",
            image: "https://prashant-jhadev.netlify.app/logo.png",
            inLanguage: "en",
          })}
        </script>
      </Helmet>
      {/* ===================== SEO END ===================== */}

      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>

      <ErrorBoundary>
        <ClientSlider />
      </ErrorBoundary>

      <ErrorBoundary>
        <Services />
      </ErrorBoundary>

      <ErrorBoundary>
        <Gallery />
      </ErrorBoundary>

      <ErrorBoundary>
        <Choose />
      </ErrorBoundary>

      <ErrorBoundary>
        <TestimonialsCarousel />
      </ErrorBoundary>
    </>
  );
};

export default HomepageView;
