import React, { memo, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Helmet } from "react-helmet-async";

import ErrorBoundary from "./components/base/ErrorBoundary";
import SkeletonLoader from "./components/base/SkeletonLoader";

// Lazy Components
const Header = lazy(() =>
  import("./components/base/Header").catch(() => ({ default: () => null }))
);
const Footer = lazy(() =>
  import("./components/base/Footer").catch(() => ({ default: () => null }))
);
const TermsAndConditions = lazy(() =>
  import("./components/base/TermsAndConditions").catch(() => ({ default: () => null }))
);
const PrivacyPolicy = lazy(() =>
  import("./components/base/PrivacyPolicy").catch(() => ({ default: () => null }))
);
const Disclaimer = lazy(() =>
  import("./components/base/Disclaimer").catch(() => ({ default: () => null }))
);
const Project = lazy(() =>
  import("./components/base/Project").catch(() => ({ default: () => null }))
);
const Home = lazy(() =>
  import("./components/views/HomepageView").catch(() => ({ default: () => null }))
);
const About = lazy(() =>
  import("./components/views/AboutpageView").catch(() => ({ default: () => null }))
);
const Contact = lazy(() =>
  import("./components/views/ContactpageView").catch(() => ({ default: () => null }))
);
const Blog = lazy(() =>
  import("./components/views/BlogpageView").catch(() => ({ default: () => null }))
);
const Service = lazy(() =>
  import("./components/views/ServicepageView").catch(() => ({ default: () => null }))
);

//////////////////////////
// ScrollToTop Component
//////////////////////////
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return null;
};

//////////////////////////
// App Layout
//////////////////////////
const AppLayout = () => {
  const location = useLocation();

  return (
    <>
      {/* GLOBAL SEO FALLBACK */}
      <Helmet>
        <title>Prashant Jha | Full Stack MERN Developer</title>
        <meta
          name="description"
          content="Full Stack MERN Developer building SEO-optimized, high-performance, PWA-ready web applications for global clients."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://prashant-jhadev.netlify.app/" />
      </Helmet>

      <ScrollToTop />

      {/* Header */}
      <Suspense fallback={<SkeletonLoader />}>
        <ErrorBoundary>
          <Header />
        </ErrorBoundary>
      </Suspense>

      {/* MAIN CONTENT (SEO landmark) */}
      <main id="main-content">
        <Suspense fallback={<SkeletonLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Service />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
          </Routes>
        </Suspense>
      </main>

      {/* Project (hidden on specific pages) */}
      {![
        "/contact",
        "/blog",
        "/terms-and-conditions",
        "/privacy-policy",
        "/disclaimer",
      ].includes(location.pathname) && (
          <Suspense fallback={<SkeletonLoader />}>
            <ErrorBoundary>
              <Project />
            </ErrorBoundary>
          </Suspense>
        )}

      {/* Footer */}
      <Suspense fallback={<SkeletonLoader />}>
        <ErrorBoundary>
          <Footer />
        </ErrorBoundary>
      </Suspense>
    </>
  );
};

//////////////////////////
// App Wrapper
//////////////////////////
const AppContent = () => (
  <Router basename="/">
    <AppLayout />
  </Router>
);

export default memo(AppContent);
