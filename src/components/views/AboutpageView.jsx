import { Helmet } from "react-helmet-async";

import AboutIntro from "../aboutpage/AboutIntro";
import Experience from "../aboutpage/Experience";
import AboutService from "../aboutpage/AboutService";
import Story from "../aboutpage/Story";
import StatsCounter from "../aboutpage/StatsCounter";
import ClientSlider from "../homepage/ClientSlider";
import ErrorBoundary from "../base/ErrorBoundary";

const AboutPageView = () => {
  return (
    <>
      {/* ===================== ABOUT PAGE SEO ===================== */}
      <Helmet>
        {/* Primary SEO */}
        <title>
          About Prashant Jha | Full Stack MERN Developer & SEO Specialist
        </title>

        <meta
          name="description"
          content="Learn more about Prashant Jha, a Full Stack MERN Developer with experience building SEO-optimized, high-performance, and secure web applications for global clients across diverse industries."
        />

        <meta
          name="keywords"
          content="About Full Stack Developer, About MERN Developer, Prashant Jha Developer, React Developer Experience, Full Stack Developer Portfolio, SEO Optimized Web Developer, PWA Developer, Performance Focused Web Developer, Remote Full Stack Developer, Global Web Developer"
        />

        {/* Indexing */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />

        {/* Author & Language */}
        <meta name="author" content="Prashant Jha" />
        <meta name="language" content="en" />

        {/* Canonical */}
        <link
          rel="canonical"
          href="https://prashant-jhadev.netlify.app/about"
        />

        {/* HREFLANG — GLOBAL TARGETING */}
        <link
          rel="alternate"
          href="https://prashant-jhadev.netlify.app/about"
          hrefLang="en"
        />
        <link
          rel="alternate"
          href="https://prashant-jhadev.netlify.app/about"
          hrefLang="en-IN"
        />
        <link
          rel="alternate"
          href="https://prashant-jhadev.netlify.app/about"
          hrefLang="en-US"
        />
        <link
          rel="alternate"
          href="https://prashant-jhadev.netlify.app/about"
          hrefLang="en-GB"
        />
        <link
          rel="alternate"
          href="https://prashant-jhadev.netlify.app/about"
          hrefLang="x-default"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Prashant Jha Portfolio" />
        <meta
          property="og:title"
          content="About Prashant Jha | Full Stack MERN Developer"
        />
        <meta
          property="og:description"
          content="Discover Prashant Jha’s journey, skills, and experience as a Full Stack MERN Developer delivering SEO-friendly and performance-driven web solutions worldwide."
        />
        <meta
          property="og:url"
          content="https://prashant-jhadev.netlify.app/about"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="About Prashant Jha | Full Stack Developer"
        />
        <meta
          name="twitter:description"
          content="Full Stack MERN Developer with hands-on experience delivering scalable, SEO-optimized web applications for global clients."
        />

        {/* STRUCTURED DATA — PERSON (ABOUT PAGE) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Prashant Jha",
            url: "https://prashant-jhadev.netlify.app/",
            image: "https://prashant-jhadev.netlify.app/logo.png",
            jobTitle: "Full Stack MERN Developer",
            description:
              "Full Stack MERN Developer specializing in SEO-optimized, high-performance, and PWA-ready web applications for global clients.",
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
      </Helmet>
      {/* ===================== SEO END ===================== */}

      <ErrorBoundary>
        <AboutIntro />
      </ErrorBoundary>

      <ErrorBoundary>
        <Experience />
      </ErrorBoundary>

      <ErrorBoundary>
        <AboutService />
      </ErrorBoundary>

      <ErrorBoundary>
        <StatsCounter />
      </ErrorBoundary>

      <ErrorBoundary>
        <Story />
      </ErrorBoundary>
    </>
  );
};

export default AboutPageView;
