import React from "react";
import { Mail, MessageCircle } from "lucide-react";
import HandIcon from "../../assets/Optix DIgital Ai logo.svg"; // replace with your greeting/hand image

export default function Project() {
  return (
    <section className="w-full bg-[#F8FAFC] py-16 px-4 new-font">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Greeting Icon */}
        <img
          src={HandIcon}
          alt="Greeting Hand"
          className="w-20 h-20 sm:w-24 sm:h-24 mb-6"
        />

        {/* Heading */}
        <h2 className="text-2xl sm:text-5xl font-semibold text-[#021024] mb-4">
          Tell me about your next project
        </h2>

        {/* Sub text (optional but recommended) */}
        <p className="text-gray-600 max-w-xl mb-8">
          Let’s collaborate and build something meaningful together. I’m just a
          message away.
        </p>

        {/* Buttons */}
        <div className="flex flex-row gap-3 w-full max-w-sm justify-center">
          <a
            href="mailto:yourmail@example.com"
            className="flex-1 flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-lg
               bg-[#052659] text-white font-medium hover:bg-[#041f45] transition"
          >
            <Mail size={18} />
            Email Me
          </a>

          <a
            href="https://wa.me/91XXXXXXXXXX"
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
