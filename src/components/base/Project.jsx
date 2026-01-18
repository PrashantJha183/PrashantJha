import React, { useState } from "react";
import { Mail, MessageCircle, CheckCircle } from "lucide-react";
import HandIcon from "../../assets/Optix DIgital Ai logo.svg";

export default function Project() {
  const email = "jhaprashant.works@gmail.com";
  const [showToast, setShowToast] = useState(false);

  const handleEmailClick = () => {
    if (window.innerWidth < 1024) {
      // Mobile → open mail client
      window.location.href = `mailto:${email}`;
    } else {
      // Laptop/Desktop → copy email
      navigator.clipboard.writeText(email);
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    }
  };

  return (
    <section className="w-full bg-[#F8FAFC] py-16 px-4 new-font relative">
      {/* ===== Toast (Top Right, Desktop Only) ===== */}
      {showToast && (
        <div className="hidden lg:flex fixed top-6 right-6 bg-white shadow-lg border border-gray-200 px-4 py-2 rounded-lg items-center gap-2 z-50 animate-bounce">
          <CheckCircle className="text-green-600 w-5 h-5" />
          <span className="text-sm font-medium text-gray-800">
            Email copied!
          </span>
        </div>
      )}

      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        <img
          src={HandIcon}
          alt="Greeting Hand"
          className="w-20 h-20 sm:w-24 sm:h-24 mb-6"
        />

        <h2 className="text-2xl sm:text-5xl font-semibold text-[#021024] mb-4">
          Tell me about your next project
        </h2>

        <p className="text-gray-600 max-w-xl mb-8">
          Let’s collaborate and build something meaningful together. I’m just a
          message away.
        </p>

        <div className="flex flex-row gap-3 w-full max-w-sm justify-center">
          {/* ===== Email Button ===== */}
          <button
            onClick={handleEmailClick}
            className="flex-1 flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-lg
              bg-[#052659] text-white font-medium hover:bg-[#041f45] transition"
          >
            <Mail size={18} />
            Email Me
          </button>

          {/* ===== WhatsApp Button ===== */}
          <a
            href="https://wa.me/918828382326"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-lg
              border border-[#052659] text-[#052659] font-medium
              hover:bg-[#052659] hover:text-white transition"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
