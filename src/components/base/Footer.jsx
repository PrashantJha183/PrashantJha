// Footer.jsx
import React, { memo } from "react";
import { Linkedin, Twitter, Instagram, Dribbble, ArrowUp } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative new-font">
      {/* ================= FOOTER CONTAINER ================= */}
      <div
        className="
          bg-[#021024]
          w-full
          min-h-[450px]
          pt-24
          px-6
          relative
          overflow-hidden

          /* MOBILE */
          rounded-none

          /* DESKTOP SEMICIRCLE */
          md:rounded-t-[100%]
        "
      >
        {/* ================= SOCIAL ICONS ================= */}
        <div className="flex justify-center gap-8 mb-16">
          <a
            href="https://linkedin.com"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:opacity-80 transition"
          >
            <Linkedin />
          </a>

          <a
            href="https://instagram.com"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:opacity-80 transition"
          >
            <Instagram />
          </a>

          <a
            href="https://twitter.com"
            aria-label="Twitter"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:opacity-80 transition"
          >
            <Twitter />
          </a>

          <a
            href="https://dribbble.com"
            aria-label="Dribbble"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:opacity-80 transition"
          >
            <Dribbble />
          </a>
        </div>

        {/* ================= FOOTER CONTENT ================= */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-white">
          <div>
            <h4 className="font-semibold text-lg mb-4 border-b border-white/30 pb-2">
              Our Offices
            </h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>India: Mohali, PB</li>
              <li>Canada: Vancouver, BC</li>
              <li>Dubai: Disclosing Soon*</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 border-b border-white/30 pb-2">
              News Feed
            </h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>In the Media</li>
              <li>Blogs & News</li>
              <li>Vlogs & Reels</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 border-b border-white/30 pb-2">
              Legal Terms
            </h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>Terms & Conditions</li>
              <li>Copyright Content Policy</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 border-b border-white/30 pb-2">
              Useful Links
            </h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>Humans of Our Team</li>
              <li>Join as Intern</li>
              <li>Become a Part of Team</li>
            </ul>
          </div>
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
