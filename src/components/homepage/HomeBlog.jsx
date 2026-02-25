import React, { memo, useEffect, useState, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight, FiArrowRight } from "react-icons/fi";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import { api } from "../../lib/api";

/* ================= CACHE ================= */
let blogCache = null;

/* ================= BLUR IMAGE ================= */
const BlurImage = memo(({ src, alt, priority }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="relative w-full aspect-[16/9] bg-gray-100 overflow-hidden">
            {!loaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}

            <img
                src={src}
                alt={alt || "Blog image"}
                loading={priority ? "eager" : "lazy"}
                fetchPriority={priority ? "high" : "auto"}
                decoding="async"
                onLoad={() => setLoaded(true)}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${loaded ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-xl scale-105"
                    }`}
            />
        </div>
    );
});

/* ================= SKELETON ================= */
const BlogSkeleton = () => (
    <div className="flex-none w-full lg:w-[32%] h-[420px] bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="aspect-[16/9] bg-gray-200 animate-pulse" />
        <div className="p-5 space-y-4">
            <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3" />
        </div>
    </div>
);

const HomeBlog = () => {
    const [blogs, setBlogs] = useState(null);
    const [index, setIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef(null);

    /* -------- RESPONSIVE -------- */
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    /* -------- FETCH BLOGS -------- */
    useEffect(() => {
        const fetchBlogs = async () => {
            if (blogCache) {
                setBlogs(blogCache);
                return;
            }

            try {
                const res = await api.get("/public-blogs");
                const sorted = [...(res.data?.blogs || [])].sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                );

                blogCache = sorted.slice(0, 3);
                setBlogs(blogCache);
            } catch (err) {
                console.error("Failed to fetch blogs", err);
            }
        };

        fetchBlogs();
    }, []);

    const visibleCards = isMobile ? 1 : 3;
    const hasOverflow = blogs && blogs.length > visibleCards;
    const maxIndex = blogs ? Math.max(blogs.length - visibleCards, 0) : 0;

    const next = () => {
        if (!hasOverflow) return;
        setIndex((prev) => Math.min(prev + 1, maxIndex));
    };

    const prev = () => {
        if (!hasOverflow) return;
        setIndex((prev) => Math.max(prev - 1, 0));
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: next,
        onSwipedRight: prev,
        preventScrollOnSwipe: true,
        trackMouse: true,
    });

    const slideWidth = useMemo(() => {
        if (!containerRef.current) return 0;
        return containerRef.current.offsetWidth;
    }, [isMobile]);

    return (
        <section className="py-20 new-font">
            <div className="max-w-7xl mx-auto px-6">

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-[#052659]">
                        Latest Insights & Articles
                    </h2>
                </motion.div>

                {/* ===== MOBILE SWIPE INDICATOR ===== */}
                {isMobile && blogs && blogs.length > 1 && (
                    <div className="flex justify-center mb-6">
                        <div className="flex items-center gap-3 text-xs font-semibold text-gray-500">
                            <motion.span
                                animate={{ x: [0, -6, 0] }}
                                transition={{ repeat: Infinity, duration: 0.9 }}
                            >
                                <FaArrowLeft />
                            </motion.span>

                            <span>Swipe</span>

                            <motion.span
                                animate={{ x: [0, 6, 0] }}
                                transition={{ repeat: Infinity, duration: 0.9 }}
                            >
                                <FaArrowRight />
                            </motion.span>
                        </div>
                    </div>
                )}

                <div className="relative" {...(isMobile ? swipeHandlers : {})}>

                    {/* ===== DESKTOP ARROWS ===== */}
                    {!isMobile && blogs && (
                        <>
                            <button
                                onClick={prev}
                                disabled={!hasOverflow || index === 0}
                                className={`absolute -left-16 top-1/2 -translate-y-1/2 p-3 bg-[#052659] text-[#C1E8FF] shadow rounded-full z-10 transition ${!hasOverflow || index === 0
                                        ? "opacity-40 cursor-not-allowed"
                                        : "hover:scale-105"
                                    }`}
                            >
                                <FiChevronLeft size={22} />
                            </button>

                            <button
                                onClick={next}
                                disabled={!hasOverflow || index === maxIndex}
                                className={`absolute -right-16 top-1/2 -translate-y-1/2 p-3 bg-[#052659] text-[#C1E8FF] shadow rounded-full z-10 transition ${!hasOverflow || index === maxIndex
                                        ? "opacity-40 cursor-not-allowed"
                                        : "hover:scale-105"
                                    }`}
                            >
                                <FiChevronRight size={22} />
                            </button>
                        </>
                    )}

                    <div
                        ref={containerRef}
                        className="overflow-hidden min-h-[420px]"
                    >
                        <motion.div
                            animate={{ x: -index * slideWidth }}
                            transition={{ type: "spring", stiffness: 120, damping: 18 }}
                            className={`flex ${isMobile ? "gap-0" : "gap-6"} will-change-transform`}
                        >
                            {!blogs
                                ? Array.from({ length: 3 }).map((_, i) => (
                                    <BlogSkeleton key={i} />
                                ))
                                : blogs.map((blog, i) => (
                                    <article
                                        key={blog.id}
                                        className={`flex-none ${isMobile ? "w-full" : "w-[32%]"
                                            } h-[420px] bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden flex flex-col`}
                                    >
                                        <BlurImage
                                            src={
                                                blog.content_blocks?.find(
                                                    (b) =>
                                                        b.type === "media" &&
                                                        b.media?.fileType === "image"
                                                )?.media?.url
                                            }
                                            alt={blog.title}
                                            priority={!isMobile && i === 0}
                                        />

                                        <div className="p-5 flex flex-col flex-1">
                                            <h3 className="text-lg font-semibold text-[#052659] mb-3 line-clamp-2">
                                                {blog.title}
                                            </h3>

                                            <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-1">
                                                {blog.content_blocks
                                                    ?.find((b) => b.type === "paragraph")
                                                    ?.text?.slice(0, 130)}...
                                            </p>

                                            <Link
                                                to={`/blog/${blog.slug}`}
                                                className="inline-flex items-center gap-2 text-[#052659] font-semibold hover:gap-3 transition-all"
                                            >
                                                Read Article
                                                <FiArrowRight />
                                            </Link>
                                        </div>
                                    </article>
                                ))}
                        </motion.div>
                    </div>

                    {/* ===== EXPLORE MORE BUTTON ===== */}
                    <div className="flex justify-center mt-12">
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-[#052659] text-white font-medium rounded-lg transition-all duration-300 hover:bg-white hover:text-[#052659] border border-[#052659]"
                        >
                            Explore More Blogs
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default memo(HomeBlog);