import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const modalVariants = {
    hidden: {
        opacity: 0,
        scale: 0.9,
        y: 20,
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 260,
            damping: 22,
        },
    },
    exit: {
        opacity: 0,
        scale: 0.92,
        y: 20,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 30,
        },
    },
};

const OfflineInfoModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const alreadyShown = sessionStorage.getItem("offline-info-shown");
        if (alreadyShown) return;

        const timer = setTimeout(() => {
            setIsOpen(true);
            document.body.classList.add("overflow-hidden");
            sessionStorage.setItem("offline-info-shown", "true");
        }, 8000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        document.body.classList.remove("overflow-hidden");
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center new-font"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="offline-modal-title"
                >
                    {/* BACKDROP (NO CLICK CLOSE) */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

                    {/* LIQUID GLASS MODAL */}
                    <motion.div
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="
              relative z-10
              max-w-md w-[90%]
              rounded-2xl
              border border-white/20
              bg-white/15
              backdrop-blur-xl
              shadow-[0_20px_60px_rgba(0,0,0,0.35)]
              p-6
              text-center
            "
                    >
                        {/* subtle glass highlight */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />

                        <h2
                            id="offline-modal-title"
                            className="relative text-xl font-semibold text-white"
                        >
                            Stay Connected, Even Offline
                        </h2>

                        <p className="relative mt-3 text-sm text-white/90 leading-relaxed">
                            Browse most pages anytime, even without an internet connection.
                        </p>

                        <p className="relative mt-3 text-xs text-white/80">
                            Blogs and contact forms need an active connection.
                        </p>

                        <p className="relative mt-2 text-[11px] text-white/60">
                            Smooth experience across all devices and browsers.
                        </p>

                        <button
                            onClick={handleClose}
                            className="
                relative mt-6
                inline-flex items-center justify-center
                px-6 py-2
                text-sm font-medium
                rounded-md
                bg-white/90 text-[#021024]
                hover:bg-white
                transition
              "
                        >
                            Got it, Continue
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default OfflineInfoModal;
