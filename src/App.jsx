// App.jsx
import React, { memo, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import ErrorBoundary from "./components/base/ErrorBoundary";
import SkeletonLoader from "./components/base/SkeletonLoader";

// Lazy-load components with fallback
const Header = lazy(() =>
  import("./components/base/Header").catch(() => ({ default: () => null }))
);
const Footer = lazy(() =>
  import("./components/base/Footer").catch(() => ({ default: () => null }))
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
const Pricing = lazy(() =>
  import("./components/views/PricingpageView").catch(() => ({
    default: () => null,
  }))
);
const Service = lazy(() =>
  import("./components/views/ServicepageView").catch(() => ({
    default: () => null,
  }))
);

// const Terms = lazy(() =>
//   import("./components/views/TermsAndConditionpageView").catch(() => ({
//     default: () => null,
//   }))
// );

// const Privacy = lazy(() =>
//   import("./components/views/PrivacyPolicypageView").catch(() => ({
//     default: () => null,
//   }))
// );

// const Career = lazy(() =>
//   import("./components/views/CareerpageView").catch(() => ({
//     default: () => null,
//   }))
// );

// Chatbot (global)
// const Chatbot = lazy(() =>
//   import("./components/views/ChatbotpageView").catch(() => ({
//     default: () => null,
//   }))
// );

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
// Main App Component
//////////////////////////
const AppContent = () => {
  return (
    <div className="cursor-grab">
      <Router>
        <ScrollToTop />

        {/* Header */}
        <Suspense fallback={<SkeletonLoader />}>
          <ErrorBoundary>
            <Header />
          </ErrorBoundary>
        </Suspense>

        {/* Main Routes */}
        <Suspense fallback={<SkeletonLoader />}>
          <Routes>
            <Route
              path="/"
              element={
                <ErrorBoundary>
                  <Home />
                </ErrorBoundary>
              }
            />
            <Route
              path="/about"
              element={
                <ErrorBoundary>
                  <About />
                </ErrorBoundary>
              }
            />
            <Route
              path="/services"
              element={
                <ErrorBoundary>
                  <Service />
                </ErrorBoundary>
              }
            />
            <Route
              path="/contact"
              element={
                <ErrorBoundary>
                  <Contact />
                </ErrorBoundary>
              }
            />
            <Route
              path="/pricing"
              element={
                <ErrorBoundary>
                  <Pricing />
                </ErrorBoundary>
              }
            />

            {/* 
            <Route
              path="/terms-and-conditions"
              element={
                <ErrorBoundary>
                  <Terms />
                </ErrorBoundary>
              }
            />
            <Route
              path="/privacy-policy"
              element={
                <ErrorBoundary>
                  <Privacy />
                </ErrorBoundary>
              }
            />
            <Route
              path="/career"
              element={
                <ErrorBoundary>
                  <Career />
                </ErrorBoundary>
              }
            />
            */}
          </Routes>
        </Suspense>

        {/* Footer */}
        <Suspense fallback={<SkeletonLoader />}>
          <ErrorBoundary>
            <Footer />
          </ErrorBoundary>
        </Suspense>

        {/* Global Chatbot */}
        {/* 
        <Suspense fallback={null}>
          <ErrorBoundary>
            <Chatbot />
          </ErrorBoundary>
        </Suspense>
        */}
      </Router>
    </div>
  );
};

export default memo(AppContent);
