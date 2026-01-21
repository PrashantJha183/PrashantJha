// Header.jsx
import React, { useEffect, useState, memo, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiPhone, FiHome, FiInfo, FiLayers, FiBookOpen } from "react-icons/fi";
import ErrorBoundary from "../base/ErrorBoundary";
import logoSrc from "../../assets/logo.png";
import lowQualityLogo from "../../assets/logo.png";

/* ================= STATIC CONFIG ================= */

const menuItems = Object.freeze([
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Blog", path: "/blog" },
]);

const bottomNavItems = Object.freeze([
  { name: "Home", path: "/", icon: FiHome },
  { name: "About", path: "/about", icon: FiInfo },
  { name: "Services", path: "/services", icon: FiLayers },
  { name: "Blog", path: "/blog", icon: FiBookOpen },
]);

const LogoSkeleton = memo(() => (
  <div className="w-28 md:w-40 h-10 bg-gray-300 rounded animate-pulse" />
));

/* ================= COMPONENT ================= */

const Header = () => {
  const [logoLoaded, setLogoLoaded] = useState(false);
  const location = useLocation();

  /* -------- Safe image preload (no memory leak) -------- */
  useEffect(() => {
    let isMounted = true;
    const img = new Image();

    img.src = logoSrc;
    img.onload = () => {
      if (isMounted) setLogoLoaded(true);
    };

    return () => {
      isMounted = false;
    };
  }, []);

  const isActivePath = useCallback(
    (path) => location.pathname === path,
    [location.pathname]
  );

  return (
    <ErrorBoundary>
      {/* ================= TOP HEADER ================= */}
      <header
        className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 new-font"
        role="banner"
      >
        <div
          className="
            mx-auto max-w-5xl
            flex items-center justify-between
            px-4 py-3
            rounded-2xl
            bg-white/40
            backdrop-blur-xl
            backdrop-saturate-150
            border border-white/40
            shadow-sm
          "
        >
          {/* Logo */}
          <Link to="/" aria-label="Go to homepage">
            <div className="flex-shrink-0">
              {logoLoaded ? (
                <img
                  src={logoSrc}
                  alt="OptixDigitalAI – AI & Digital Solutions"
                  width="80"
                  height="80"
                  loading="eager"
                  className="w-12 md:w-20 object-contain rounded-full"
                />
              ) : (
                <div className="relative w-28 h-10">
                  <img
                    src={lowQualityLogo}
                    alt="OptixDigitalAI logo placeholder"
                    className="w-full h-full object-contain blur-sm"
                  />
                  <LogoSkeleton />
                </div>
              )}
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav
            className="hidden md:flex space-x-8 items-center"
            aria-label="Primary navigation"
          >
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`transition-colors ${isActivePath(item.path)
                  ? "text-[#021024] font-bold underline underline-offset-4"
                  : "text-[#052659] font-semibold"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Get in Touch */}
          <Link to="/contact" aria-label="Contact OptixDigitalAI">
            <button
              type="button"
              className="
                bg-[#C1E8FF]
                text-[#052659]
                font-semibold
                px-4 py-2
                rounded-xl
                shadow-md
                inline-flex items-center gap-2
                hover:scale-[1.02]
                transition
              "
            >
              <FiPhone className="w-5 h-5" aria-hidden="true" />
              <span>Get in Touch</span>
            </button>
          </Link>
        </div>
      </header>

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <nav
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden"
        aria-label="Mobile navigation"
      >
        <div
          className="
            w-[92vw] max-w-md
            flex items-center justify-between
            px-6 py-3
            rounded-2xl
            bg-white/60
            backdrop-blur-xl
            backdrop-saturate-150
            shadow-lg
            border border-white/40
          "
        >
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActivePath(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex-1 flex flex-col items-center justify-center"
                aria-label={item.name}
              >
                <div
                  className={`
                    p-3 rounded-full transition-all duration-300
                    ${isActive
                      ? "bg-[#fff] text-[#052659] shadow-md scale-105"
                      : "text-[#052659] hover:bg-white/50"
                    }
                  `}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
              </Link>
            );
          })}
        </div>
      </nav>
    </ErrorBoundary>
  );
};

export default memo(Header);
