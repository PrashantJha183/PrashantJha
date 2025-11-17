// Header.jsx
import React, { useState, useEffect, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiPhone } from "react-icons/fi";
import ErrorBoundary from "../base/ErrorBoundary";
import logoSrc from "../../assets/logo.png";
import lowQualityLogo from "../../assets/logo.png";

const menuItems = [
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Pricing", path: "/pricing" },
];

const LogoSkeleton = () => (
  <div className="w-28 md:w-40 h-10 bg-gray-300 rounded animate-pulse" />
);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const img = new Image();
    img.src = logoSrc;
    img.onload = () => setLogoLoaded(true);
  }, []);

  return (
    <ErrorBoundary>
      <header className="fixed top-0 left-0 right-0 z-50 m-4 new-font">
        {/* Header Container */}
        <div className="mx-auto flex items-center justify-between md:justify-center px-6 py-3 md:py-0 bg-white border border-white rounded-t-lg md:rounded-md shadow-md ">
          {/* Logo */}
          <Link to="/" onClick={closeMenu}>
            <div className="flex-shrink-0 mr-auto md:mr-0">
              {logoLoaded ? (
                <img
                  src={logoSrc}
                  alt="OptixDigitalAI Logo"
                  className="w-16 h-auto md:w-28 md:h-24 object-contain transition-all duration-300 md:pt-2"
                />
              ) : (
                <div className="relative w-28 md:w-40 h-10">
                  <img
                    src={lowQualityLogo}
                    alt="Placeholder Logo"
                    className="w-full h-full object-contain filter blur-sm"
                  />
                  <LogoSkeleton />
                </div>
              )}
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-6 items-center">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`transition-colors ${
                  location.pathname === item.path
                    ? "text-[#021024] font-bold underline underline-offset-4 decoration-[#021024]"
                    : "text-[#052659] font-semibold"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Button */}
          <div className="hidden md:flex ml-auto">
            <Link to="/contact">
              <button className="bg-[#C1E8FF] text-[#052659] font-semibold px-4 py-2 rounded-md transition inline-flex items-center space-x-2">
                <FiPhone className="w-5 h-5" />
                <span>Get in Touch</span>
              </button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden relative ml-auto">
            <button
              aria-label="Toggle menu"
              onClick={toggleMenu}
              className="relative w-10 h-10 flex flex-col justify-center items-center"
            >
              <span
                className={`block absolute h-0.5 w-8 bg-black rounded transition-all duration-300 ${
                  isOpen
                    ? "rotate-45 top-1/2"
                    : "top-[35%] left-[2px] translate-x-1"
                }`}
              />
              <span
                className={`block absolute h-0.5 w-8 bg-black rounded transition-all duration-300 ${
                  isOpen
                    ? "-rotate-45 top-1/2"
                    : "top-[65%] left-[2px] -translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed top-[100px] inset-x-0 bottom-0 z-40 bg-white/5 backdrop-blur-[2px] backdrop-saturate-100 m-2"
                onClick={toggleMenu}
              />

              {/* Dropdown */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="overflow-hidden shadow-md md:hidden bg-white max-w-5xl mx-auto rounded-b-lg relative z-50"
              >
                <div className="flex flex-col space-y-4 px-8 py-6">
                  {/* MOBILE MENU TEXT FIXED */}
                  {menuItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={closeMenu}
                      className={`text-lg transition-colors ${
                        location.pathname === item.path
                          ? "text-[#021024] font-bold underline underline-offset-4 decoration-[#021024]"
                          : "text-[#052659] font-semibold"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}

                  {/* Contact Button */}
                  <Link to="/contact" onClick={closeMenu}>
                    <button className="bg-[#C1E8FF] text-[#052659]  font-semibold px-4 py-3 rounded-md transition inline-flex items-center space-x-2 w-max">
                      <FiPhone className="w-5 h-5" />
                      <span>Get in Touch</span>
                    </button>
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </ErrorBoundary>
  );
};

export default memo(Header);
