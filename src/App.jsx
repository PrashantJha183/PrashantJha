import React, { memo, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import ErrorBoundary from "./components/base/ErrorBoundary";
import SkeletonLoader from "./components/base/SkeletonLoader";

// Lazy Components
const Header = lazy(() =>
  import("./components/base/Header").catch(() => ({ default: () => null }))
);
const Footer = lazy(() =>
  import("./components/base/Footer").catch(() => ({ default: () => null }))
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
const Pricing = lazy(() =>
  import("./components/views/PricingpageView").catch(() => ({ default: () => null }))
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
// App Content (inside Router)
//////////////////////////
const AppLayout = () => {
  const location = useLocation();

  return (
    <div className="cursor-grab">
      <ScrollToTop />

      {/* Header */}
      <Suspense fallback={<SkeletonLoader />}>
        <ErrorBoundary>
          <Header />
        </ErrorBoundary>
      </Suspense>

      {/* Routes */}
      <Suspense fallback={<SkeletonLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </Suspense>

      {/* Project (hidden only on contact page) */}
      {location.pathname !== "/contact" && (
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
    </div>
  );
};

//////////////////////////
// Final App Wrapper
//////////////////////////
const AppContent = () => (
  <Router>
    <AppLayout />
  </Router>
);

export default memo(AppContent);
