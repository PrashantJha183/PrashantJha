import React, { memo, useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

/* -------------------- DATA -------------------- */

const testimonials = [
    {
        name: "Priyesh Pandey",
        role: "Product Manager, Agratas Infotech",
        message:
            "At Agratas Infotech, I have seen Prashant’s technical expertise and ownership firsthand. He has developed critical features with precision, contributing to systems used by a large user base daily. He consistently delivers high-quality, well-structured code and approaches problems proactively. His reliability, attention to detail, and problem-solving mindset make him a valuable and trusted member of the team.",
    },
    {
        name: "Ravi Ranjan",
        role: "CEO, OptixDigitalAI",
        message:
            "Working with Prashant was seamless from start to finish. His strong understanding of full-stack architecture, performance optimization, and SEO helped us significantly improve user experience and conversions. The final product was fast, scalable, and thoughtfully crafted. I would highly recommend him for any modern web or digital project.",
    },
    {
        name: "Rishabh Raj",
        role: "Owner, Mahadeo Sah Amarnath Prasad Jewellers",
        message:
            "Prashant transformed our jewellery platform into a modern, secure, and high-performing website. The real-time pricing logic, smooth user experience, and mobile performance exceeded our expectations. He understood our business requirements clearly and delivered a solution that genuinely improved our digital presence and customer trust.",
    },
    {
        name: "Arun Pal",
        role: "Director, Agratas Infotech",
        message:
            "Prashant brings a rare combination of strong technical skills and professional discipline. His approach to system design, scalability, and clean implementation reflects maturity beyond his experience. He takes ownership of his work, communicates clearly, and consistently delivers reliable solutions that align with long-term business goals.",
    },
];


/* -------------------- COMPONENT -------------------- */

const TestimonialsCarousel = () => {
    const [index, setIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    /* ---------- RESPONSIVE DETECTION (SAFE) ---------- */
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const visibleCards = isMobile ? 1 : 2;
    const maxIndex = testimonials.length - visibleCards;

    const next = () => setIndex((prev) => Math.min(prev + 1, maxIndex));
    const prev = () => setIndex((prev) => Math.max(prev - 1, 0));

    /* ---------- SWIPE HANDLERS ---------- */
    const swipeHandlers = useSwipeable({
        onSwipedLeft: next,
        onSwipedRight: prev,
        preventScrollOnSwipe: true,
        trackMouse: false,
    });

    return (
        <section
            className="
        relative
        m-2 rounded-b
        py-20
        bg-[#052659]
        text-[#C1E8FF]
        new-font
        overflow-hidden mt-10 md:mt-20
      "
            aria-labelledby="testimonial-heading"
        >
            {/* Heading */}
            <div className="text-center mb-12 px-4">
                <h2
                    id="testimonial-heading"
                    className="text-3xl md:text-4xl font-bold"
                >
                    Trusted by Leaders, Clients & Collaborators
                </h2>
                <p className="mt-3 text-sm sm:text-base opacity-90 max-w-xl mx-auto">
                    Feedback from product leaders, founders, and business owners who have
                    worked closely with me on real-world digital products and platforms.
                </p>
            </div>

            {/* Carousel Wrapper */}
            <div
                className="relative max-w-6xl mx-auto px-4"
                {...(isMobile ? swipeHandlers : {})}
            >
                {/* LEFT BUTTON (DESKTOP ONLY) */}
                <button
                    onClick={prev}
                    disabled={index === 0}
                    aria-label="Previous testimonial"
                    className="
            hidden lg:flex
            absolute -left-6 xl:-left-10 top-1/2 -translate-y-1/2
            z-10
            p-3 rounded-full
            bg-[#C1E8FF]
            text-[#052659]
            shadow-md
            disabled:opacity-40
          "
                >
                    <FiChevronLeft size={22} />
                </button>

                {/* TRACK */}
                <div className="overflow-hidden">
                    <div
                        className={`
              flex
              transition-transform
              duration-500
              ease-out
              ${isMobile ? "gap-0" : "gap-6"}
            `}
                        style={{
                            transform: `translateX(-${index * (100 / visibleCards)}%)`,
                        }}
                    >
                        {testimonials.map((item, i) => (
                            <article
                                key={i}
                                className="
                  w-full
                  lg:w-[48%]
                  shrink-0
                  bg-[#0B2F6B]
                  border border-white/10
                  rounded-xl
                  p-6
                  shadow-lg
                "
                            >
                                <p className="text-sm sm:text-base leading-relaxed mb-5">
                                    “{item.message}”
                                </p>

                                <div>
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-xs opacity-80">{item.role}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                {/* RIGHT BUTTON (DESKTOP ONLY) */}
                <button
                    onClick={next}
                    disabled={index === maxIndex}
                    aria-label="Next testimonial"
                    className="
            hidden lg:flex
            absolute -right-6 xl:-right-6 top-1/2 -translate-y-1/2
            z-10
            p-3 rounded-full
            bg-[#C1E8FF]
            text-[#052659]
            shadow-md
            disabled:opacity-40
          "
                >
                    <FiChevronRight size={22} />
                </button>
            </div>
        </section>
    );
};

export default memo(TestimonialsCarousel);
