import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import Blog from "../blogpage/Blog";
import ErrorBoundary from "../base/ErrorBoundary";

const BlogPageView = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(
        location.hash.replace("#", "")
      );
      if (el) {
        el.scrollIntoView({
          behavior: "auto", // no smooth scroll
          block: "start",
        });
      }
    }
  }, [location]);

  return (
    <>
      {/* ===================== BLOG PAGE SEO ===================== */}
      <Helmet>
        {/* Primary SEO */}
        <title>
          Blog & Insights | Full Stack MERN Development, SEO & Web Performance – Prashant Jha
        </title>

        <meta
          name="description"
          content="Read technical blogs and insights by Prashant Jha on Full Stack MERN development, React, Node.js, SEO optimization, PWA performance, and modern web engineering practices for global developers and businesses."
        />

        <meta
          name="keywords"
          content="Full Stack Developer Blog, MERN Stack Blog, React Development Blog, Node.js Blog, JavaScript Blog, SEO Optimization Blog, Web Performance Blog, PWA Development Blog, Web Development Insights, Software Engineering Blog, Freelance Developer Blog"
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
          href="https://prashant-jhadev.netlify.app/blog"
        />

        {/* HREFLANG — GLOBAL TARGETING */}
        <link
          rel="alternate"
          href="https://prashant-jhadev.netlify.app/blog"
          hrefLang="en"
        />
        <link
          rel="alternate"
          href="https://prashant-jhadev.netlify.app/blog"
          hrefLang="en-IN"
        />
        <link
          rel="alternate"
          href="https://prashant-jhadev.netlify.app/blog"
          hrefLang="en-US"
        />
        <link
          rel="alternate"
          href="https://prashant-jhadev.netlify.app/blog"
          hrefLang="en-GB"
        />
        <link
          rel="alternate"
          href="https://prashant-jhadev.netlify.app/blog"
          hrefLang="x-default"
        />

        {/* Open Graph */}
        <meta property="og:type" content="blog" />
        <meta property="og:site_name" content="Prashant Jha Portfolio" />
        <meta
          property="og:title"
          content="Blog & Insights | Full Stack MERN, SEO & Web Performance"
        />
        <meta
          property="og:description"
          content="In-depth articles on MERN stack development, React, Node.js, SEO optimization, and performance-driven web applications."
        />
        <meta
          property="og:url"
          content="https://prashant-jhadev.netlify.app/blog"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Blog & Insights | Prashant Jha"
        />
        <meta
          name="twitter:description"
          content="Technical blogs on full stack development, SEO, PWA, and web performance by Prashant Jha."
        />

        {/* STRUCTURED DATA — BLOG */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Prashant Jha – Tech Blog",
            url: "https://prashant-jhadev.netlify.app/blog",
            description:
              "Technical articles and insights on MERN stack development, SEO optimization, and modern web performance.",
            author: {
              "@type": "Person",
              name: "Prashant Jha",
              url: "https://prashant-jhadev.netlify.app/"
            },
            inLanguage: "en"
          })}
        </script>
      </Helmet>
      {/* ===================== SEO END ===================== */}

      <ErrorBoundary>
        <Blog />
      </ErrorBoundary>
    </>
  );
};

export default BlogPageView;
