import React, { memo, Suspense, lazy, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ReactGA from "react-ga4";

import ErrorBoundary from "./components/base/ErrorBoundary";
import SkeletonLoader from "./components/base/SkeletonLoader";
import OfflineInfoModal from "./components/base/OfflineInfoModal";

/* =========================
   AUTH
========================= */
import { AuthProvider } from "../src/context/AuthContext";
import ProtectedRoute from "../src/components/ProtectedRoute";

/* =========================
   GA4 INIT (ONCE)
========================= */
ReactGA.initialize("G-YP6GG3704G"); //replace with real ID

/* =========================
   LAZY COMPONENTS
========================= */
const Header = lazy(() =>
  import("./components/base/Header").catch(() => ({ default: () => null }))
);
const Footer = lazy(() =>
  import("./components/base/Footer").catch(() => ({ default: () => null }))
);

const TermsAndConditions = lazy(() =>
  import("./components/base/TermsAndConditions").catch(() => ({
    default: () => null,
  }))
);
const PrivacyPolicy = lazy(() =>
  import("./components/base/PrivacyPolicy").catch(() => ({
    default: () => null,
  }))
);
const Disclaimer = lazy(() =>
  import("./components/base/Disclaimer").catch(() => ({
    default: () => null,
  }))
);
const Project = lazy(() =>
  import("./components/base/Project").catch(() => ({ default: () => null }))
);

const Home = lazy(() =>
  import("./components/views/HomepageView").catch(() => ({
    default: () => null,
  }))
);
const About = lazy(() =>
  import("./components/views/AboutpageView").catch(() => ({
    default: () => null,
  }))
);
const Contact = lazy(() =>
  import("./components/views/ContactpageView").catch(() => ({
    default: () => null,
  }))
);
const Blog = lazy(() =>
  import("./components/views/BlogpageView").catch(() => ({
    default: () => null,
  }))
);
const Service = lazy(() =>
  import("./components/views/ServicepageView").catch(() => ({
    default: () => null,
  }))
);

/* =========================
   AUTH PAGES
========================= */
const Login = lazy(() =>
  import("../src/components/base/Login").catch(() => ({ default: () => null }))
);
const Dashboard = lazy(() =>
  import("../src/admin/layout/AdminLayout").catch(() => ({
    default: () => null,
  }))
);

const AdminDashboard = lazy(() =>
  import("../src/admin/pages/Dashboard").catch(() => ({ default: () => null }))
);
const AdminBlogs = lazy(() =>
  import("../src/admin/pages/Blogs").catch(() => ({ default: () => null }))
);
const AdminUsers = lazy(() =>
  import("../src/admin/pages/Users").catch(() => ({ default: () => null }))
);

/* =========================
   ScrollToTop + GA PAGEVIEW
========================= */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
    ReactGA.send({ hitType: "pageview", page: pathname });
  }, [pathname]);

  return null;
};

/* =========================
   HELPERS
========================= */
const getCanonicalUrl = (pathname) => {
  const base = "https://prashantjhadev.in";
  return pathname === "/" ? base : `${base}${pathname}`;
};

const getLangFromPath = (pathname) => {
  if (pathname.startsWith("/hi")) return "hi";
  if (pathname.startsWith("/fr")) return "fr";
  if (pathname.startsWith("/ar")) return "ar";
  return "en";
};

/* =========================
   App Layout
========================= */
const AppLayout = () => {
  const location = useLocation();
  const canonicalUrl = getCanonicalUrl(location.pathname);
  const currentLang = getLangFromPath(location.pathname);

  return (
    <>
      {/* ================= GLOBAL SEO ================= */}
      <Helmet htmlAttributes={{ lang: currentLang }}>
        <title>Prashant Jha | Full Stack MERN Developer</title>

        <meta
          name="description"
          content="Prashant Jha is a Full Stack MERN Developer building fast, scalable, SEO-friendly frontend and backend web applications for global users."
        />

        <meta name="robots" content="index, follow" />

        {/* CANONICAL */}
        <link rel="canonical" href={canonicalUrl} />

        {/* HREFLANG (SAFE BASE SET) */}
        <link rel="alternate" hreflang="x-default" href="https://prashantjhadev.in/" />
        <link rel="alternate" hreflang="en" href="https://prashantjhadev.in/" />

        {/* Enable ONLY when content exists */}
        <link rel="alternate" hreflang="hi" href="https://prashantjhadev.in/hi/" />
        <link rel="alternate" hreflang="fr" href="https://prashantjhadev.in/fr/" />
        <link rel="alternate" hreflang="ar" href="https://prashantjhadev.in/ar/" />
      </Helmet>

      {/* OFFLINE INFO */}
      <OfflineInfoModal />

      <ScrollToTop />

      {/* HEADER */}
      <Suspense fallback={<SkeletonLoader />}>
        <ErrorBoundary>
          <Header />
        </ErrorBoundary>
      </Suspense>

      {/* MAIN */}
      <main id="main-content">
        <Suspense fallback={<SkeletonLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Service />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<Blog />} />


            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />

            <Route path="/login" element={<Login />} />

            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="blogs" element={<AdminBlogs />} />
              <Route path="users" element={<AdminUsers />} />
            </Route>
          </Routes>
        </Suspense>
      </main>

      {/* PROJECT */}
      {![
        "/contact",
        "/blog",
        "/terms-and-conditions",
        "/privacy-policy",
        "/disclaimer",
        "/login",
        "/dashboard",
        "/dashboard/users",
        "/dashboard/blogs",
      ].includes(location.pathname) && (
          <Suspense fallback={<SkeletonLoader />}>
            <ErrorBoundary>
              <Project />
            </ErrorBoundary>
          </Suspense>
        )}

      {/* FOOTER */}
      <Suspense fallback={<SkeletonLoader />}>
        <ErrorBoundary>
          <Footer />
        </ErrorBoundary>
      </Suspense>
    </>
  );
};

/* =========================
   App Wrapper
========================= */
const AppContent = () => (
  <Router basename="/">
    <AuthProvider>
      <AppLayout />
    </AuthProvider>
  </Router>
);

export default memo(AppContent);
