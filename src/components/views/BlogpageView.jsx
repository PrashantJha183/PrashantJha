import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import Blog from "../blogpage/Blog";
import ErrorBoundary from "../base/ErrorBoundary";

const BlogPageView = () => {
  const location = useLocation();
  const { slug } = useParams(); // detect single blog page

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace("#", ""));
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
      {/* ===================== LISTING PAGE SEO ONLY ===================== */}
      {!slug && (
        <Helmet>
          <title>
            Tech Blog | MERN, React, Node & SEO – Prashant Jha
          </title>

          <meta
            name="description"
            content="Technical blogs and insights by Prashant Jha on MERN stack, React, Node.js, SEO optimization, PWA performance, and modern web engineering."
          />

          <meta name="robots" content="index, follow" />

          <link
            rel="canonical"
            href="https://www.prashantjhadev.in/blog"
          />

          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="Tech Blog | MERN, React & SEO"
          />
          <meta
            property="og:description"
            content="Read in-depth technical blogs on full stack development and SEO."
          />
          <meta
            property="og:url"
            content="https://www.prashantjhadev.in/blog"
          />

          <meta name="twitter:card" content="summary_large_image" />
        </Helmet>
      )}
      {/* ===================== END LISTING SEO ===================== */}

      <ErrorBoundary>
        <Blog />
      </ErrorBoundary>
    </>
  );
};

export default BlogPageView;