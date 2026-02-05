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
import OfflineInfoModal from "./components/base/OfflineInfoModal";

/* =========================
   AUTH
========================= */
import { AuthProvider } from "../src/context/AuthContext";
import ProtectedRoute from "../src/components/ProtectedRoute";

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
  import("../src/admin/layout/AdminLayout").catch(() => ({ default: () => null }))
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
const Unauthorized = lazy(() =>
  import("../src/admin/pages/Unauthorized").catch(() => ({ default: () => null }))
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
const getCanonicalUrl = (pathname) => {
  const base = "https://prashantjhadev.in";
  return pathname === "/" ? base : `${base}${pathname}`;
};

//////////////////////////
// App Layout
//////////////////////////
const AppLayout = () => {
  const location = useLocation();
  const canonicalUrl = getCanonicalUrl(location.pathname);

  return (
    <>
      {/* GLOBAL SEO FALLBACK */}
      <Helmet>
        <title>Prashant Jha | Full Stack MERN Developer</title>

        <meta
          name="description"
          content="Prashant Jha is a Full Stack MERN Developer building fast, scalable, SEO-friendly frontend and backend web applications for global users."
        />

        <meta name="robots" content="index, follow" />

        {/* FIXED CANONICAL */}
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>


      {/* GLOBAL OFFLINE INFO */}
      <OfflineInfoModal />

      <ScrollToTop />

      {/* HEADER */}
      <Suspense fallback={<SkeletonLoader />}>
        <ErrorBoundary>
          <Header />
        </ErrorBoundary>
      </Suspense>

      {/* MAIN CONTENT */}
      <main id="main-content">
        <Suspense fallback={<SkeletonLoader />}>
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Service />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />

            <Route
              path="/terms-and-conditions"
              element={<TermsAndConditions />}
            />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />

            {/* AUTH */}
            <Route path="/login" element={<Login />} />

            {/* PROTECTED */}
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

            <Route path="/unauthorized" element={<div>Unauthorized</div>} />

          </Routes>
        </Suspense>
      </main>

      {/* PROJECT SECTION */}
      {![
        "/contact",
        "/blog",
        "/terms-and-conditions",
        "/privacy-policy",
        "/disclaimer",
        "/login",
        "/dashboard",
        "/dashboard/users", "/dashboard/blogs"
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

//////////////////////////
// App Wrapper
//////////////////////////
const AppContent = () => (
  <Router basename="/">
    <AuthProvider>
      <AppLayout />
    </AuthProvider>
  </Router>
);

export default memo(AppContent);
