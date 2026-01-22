// Footer.jsx
import React, { memo, useState } from "react";
import {
  Linkedin,
  Github,
  MessageCircle,
  Mail,
  ArrowUp,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const email = "jhaprashant.works@gmail.com";
  const [showToast, setShowToast] = useState(false);

  const handleEmailClick = async () => {
    if (window.innerWidth < 1024) {
      window.location.href = `mailto:${email}`;
    } else {
      try {
        await navigator.clipboard.writeText(email);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      } catch (err) {
        console.error("Clipboard copy failed", err);
      }
    }
  };

  return (
    <footer className="relative new-font m-2">
      <div
        className="
          bg-[#021024]
          w-full
          min-h-[450px]
          pt-24
          px-6 
          relative
          overflow-hidden
          rounded-t-footer
        "
      >
        {/* ===== Toast ===== */}
        {showToast && (
          <div className="hidden lg:flex fixed top-6 right-6 bg-white shadow-lg border border-gray-200 px-4 py-2 rounded-lg items-center gap-2 z-50 animate-bounce">
            <CheckCircle className="text-green-600 w-5 h-5" />
            <span className="text-sm font-medium text-gray-800">
              Email copied!
            </span>
          </div>
        )}

        {/* ================= SOCIAL ICONS ================= */}
        <div className="flex justify-center gap-8 mb-16">
          <a
            href="https://www.linkedin.com/in/jhaprashant183/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:opacity-80 transition"
            aria-label="LinkedIn"
          >
            <Linkedin />
          </a>

          <a
            href="https://github.com/PrashantJha183"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:opacity-80 transition"
            aria-label="GitHub"
          >
            <Github />
          </a>

          <a
            href="https://wa.me/918828382326"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:opacity-80 transition"
            aria-label="WhatsApp"
          >
            <MessageCircle />
          </a>

          <button
            onClick={handleEmailClick}
            className="text-white hover:opacity-80 transition"
            aria-label="Email"
          >
            <Mail />
          </button>
        </div>

        {/* ================= FOOTER LINKS ================= */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-white">

          {/* Column 1: About */}
          <div>
            <h4 className="font-semibold text-lg mb-4 border-b border-white/30 pb-2">
              About
            </h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <Link to="/about" className="hover:underline">
                  About Me
                </Link>
              </li>
              <li>
                <Link to="/services#use-cases" className="hover:underline">
                  Projects & Case Studies
                </Link>
              </li>
              <li>
                <a href="https://drive.google.com/file/d/1KFyUJdq4RROBngZ4wR3YVKuNVdAo5dlI/view?usp=drivesdk" className="hover:underline">
                  Resume
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h4 className="font-semibold text-lg mb-4 border-b border-white/30 pb-2">
              Explore
            </h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <Link to="/services" className="hover:underline">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:underline">
                  Blog & Articles
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h4 className="font-semibold text-lg mb-4 border-b border-white/30 pb-2">
              Legal
            </h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <Link to="/terms-and-conditions" className="hover:underline">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:underline">
                  Disclaimer
                </Link>
              </li>
              {/* Optional but recommended */}
              {/* <li>
                <Link to="/cookies-policy" className="hover:underline">
                  Cookies Policy
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Column 4: Work With Me */}
          {/* <div>
            <h4 className="font-semibold text-lg mb-4 border-b border-white/30 pb-2">
              Work With Me
            </h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>Freelance Full Stack Projects</li>
              <li>Web & PWA Development</li>
              <li>Performance & SEO Optimization</li>
            </ul>
          </div> */}
        </div>

        {/* ================= SCROLL TO TOP ================= */}
        <button
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="
            absolute
            bottom-6
            right-6
            w-12
            h-12
            rounded-full
            bg-white
            text-[#021024]
            flex
            items-center
            justify-center
            shadow-lg
            hover:scale-105
            transition
          "
        >
          <ArrowUp />
        </button>

        {/* ================= COPYRIGHT ================= */}
        <div className="text-center text-white/70 text-sm mt-16">
          © {new Date().getFullYear()} Prashant Jha. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
