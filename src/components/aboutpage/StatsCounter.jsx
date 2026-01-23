import React, { useEffect, useRef, useState, memo } from "react";

const statsData = [
    { value: 12, suffix: "+", label: "Months Experience" },
    { value: 15, suffix: "+", label: "Clients Worked" },
    { value: 20, suffix: "+", label: "Projects Delivered" },
];

const StatsCounter = () => {
    const sectionRef = useRef(null);
    const [counts, setCounts] = useState(statsData.map(() => 0));

    useEffect(() => {
        if (!sectionRef.current) return;

        let animationFrameId;

        const startAnimation = () => {
            const duration = 1200;
            const startTime = performance.now();

            const animate = (currentTime) => {
                const progress = Math.min((currentTime - startTime) / duration, 1);

                setCounts(
                    statsData.map((stat) =>
                        Math.floor(stat.value * progress)
                    )
                );

                if (progress < 1) {
                    animationFrameId = requestAnimationFrame(animate);
                }
            };

            animationFrameId = requestAnimationFrame(animate);
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    startAnimation(); // start every time it appears
                } else {
                    setCounts(statsData.map(() => 0)); // reset when leaving
                    cancelAnimationFrame(animationFrameId);
                }
            },
            { threshold: 0.4 }
        );

        observer.observe(sectionRef.current);

        return () => {
            observer.disconnect();
            cancelAnimationFrame(animationFrameId); // no memory leak
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="w-full py-16 md:py-24 bg-white new-font"
            aria-label="Work statistics"
        >
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
                    {statsData.map((stat, index) => (
                        <div key={stat.label}>
                            <div className="text-4xl md:text-5xl font-bold text-[#021024]">
                                {counts[index]}
                                {stat.suffix}
                            </div>

                            <p className="mt-2 text-sm md:text-base text-[#052659]">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default memo(StatsCounter);
