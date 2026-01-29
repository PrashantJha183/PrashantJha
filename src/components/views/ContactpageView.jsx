import { Helmet } from "react-helmet-async";

import Contact from "../contactpage/Contact";
import ErrorBoundary from "../base/ErrorBoundary";

const ContactPageView = () => {
  return (
    <>
      {/* ===================== CONTACT PAGE SEO ===================== */}
      <Helmet>
        {/* Primary SEO */}
        <title>
          Contact Prashant Jha | Full Stack MERN Developer for Global Clients
        </title>

        <meta
          name="description"
          content="Get in touch with Prashant Jha, a Full Stack MERN Developer offering SEO-optimized, high-performance web and PWA solutions for startups, businesses, and global clients. Let’s discuss your project."
        />

        <meta
          name="keywords"
          content="Contact Full Stack Developer, Hire MERN Developer, Contact React Developer, Hire Web Developer, Freelance Full Stack Developer, Remote MERN Developer, Global Web Developer, SEO Friendly Website Developer, PWA Developer, Web Development Consultation"
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
          href="https://prashant-jhadev.netlify.app/contact"
        />

        {/* HREFLANG — GLOBAL TARGETING */}
        <link
          rel="alternate"
          href="https://prashant-jhadev.netlify.app/contact"
          hrefLang="en"
        />
        <link
          rel="alternate"
          href="https://prashant-jhadev.netlify.app/contact"
          hrefLang="en-IN"
        />
        <link
          rel="alternate"
          href="https://prashant-jhadev.netlify.app/contact"
          hrefLang="en-US"
        />
        <link
          rel="alternate"
          href="https://prashant-jhadev.netlify.app/contact"
          hrefLang="en-GB"
        />
        <link
          rel="alternate"
          href="https://prashant-jhadev.netlify.app/contact"
          hrefLang="x-default"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Prashant Jha Portfolio" />
        <meta
          property="og:title"
          content="Contact Prashant Jha | Full Stack MERN Developer"
        />
        <meta
          property="og:description"
          content="Reach out to discuss your web development needs. SEO-friendly, scalable, and high-performance solutions for global clients."
        />
        <meta
          property="og:url"
          content="https://prashant-jhadev.netlify.app/contact"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Contact Prashant Jha | Hire Full Stack Developer"
        />
        <meta
          name="twitter:description"
          content="Looking to hire a Full Stack MERN Developer? Contact Prashant Jha for fast, secure, and SEO-optimized web solutions."
        />

        {/* STRUCTURED DATA — CONTACT PAGE */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact Prashant Jha",
            url: "https://prashant-jhadev.netlify.app/contact",
            description:
              "Contact Prashant Jha, Full Stack MERN Developer, for SEO-optimized, high-performance web and PWA development services for global clients.",
            about: {
              "@type": "Person",
              name: "Prashant Jha",
              jobTitle: "Full Stack MERN Developer",
              url: "https://prashant-jhadev.netlify.app/",
              email: "mailto:jhaprashant.works@gmail.com",
              sameAs: [
                "https://www.linkedin.com/in/jhaprashant183/",
                "https://github.com/PrashantJha183",
              ],
            },
          })}
        </script>
      </Helmet>
      {/* ===================== SEO END ===================== */}

      <ErrorBoundary>
        <Contact />
      </ErrorBoundary>
    </>
  );
};

export default ContactPageView;
