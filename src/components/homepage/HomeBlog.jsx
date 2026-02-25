import React, { memo, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight, FiArrowRight } from "react-icons/fi";
import { api } from "../../lib/api";

/* ================= CACHE ================= */
let blogCache = null;

/* ================= BLUR IMAGE ================= */
const BlurImage = memo(({ src, alt }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="relative w-full aspect-[16/9] bg-gray-100 overflow-hidden">
            {!loaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}

            <img
                src={src}
                alt={alt}
                loading="lazy"
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

/* ================= COMPONENT ================= */
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

    /* -------- FETCH -------- */
    useEffect(() => {
        const fetchBlogs = async () => {
            if (blogCache) {
                setBlogs(blogCache);
                return;
            }

            try {
                const res = await api.get("/public-blogs");
                const allBlogs = Array.isArray(res.data?.blogs)
                    ? res.data.blogs
                    : [];

                const sorted = [...allBlogs].sort(
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
    const maxIndex = blogs ? Math.max(blogs.length - visibleCards, 0) : 0;

    const next = () => setIndex((prev) => Math.min(prev + 1, maxIndex));
    const prev = () => setIndex((prev) => Math.max(prev - 1, 0));

    /* -------- SWIPE -------- */
    const swipeHandlers = useSwipeable({
        onSwipedLeft: next,
        onSwipedRight: prev,
        preventScrollOnSwipe: true,
        trackMouse: true,
    });

    const getImage = (blog) =>
        blog.content_blocks?.find(
            (b) => b.type === "media" && b.media?.fileType === "image"
        )?.media?.url;

    const getDescription = (blog) => {
        const text = blog.content_blocks
            ?.find((b) => b.type === "paragraph")
            ?.text?.replace(/<[^>]+>/g, "");

        return text ? text.slice(0, 130) + "..." : "";
    };

    const slideWidth = containerRef.current
        ? containerRef.current.offsetWidth / visibleCards
        : 0;

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

                <div className="relative" {...(isMobile ? swipeHandlers : {})}>

                    {!isMobile && blogs && (
                        <>
                            <button
                                onClick={prev}
                                disabled={index === 0}
                                className="absolute -left-16 top-1/2 -translate-y-1/2 p-3 bg-[#052659] text-[#C1E8FF] shadow rounded-full z-10 disabled:opacity-40"
                            >
                                <FiChevronLeft size={22} />
                            </button>

                            <button
                                onClick={next}
                                disabled={index === maxIndex}
                                className="absolute -right-16 top-1/2 -translate-y-1/2 p-3 bg-[#052659] text-[#C1E8FF] shadow rounded-full z-10 disabled:opacity-40"
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
                            className="flex gap-6 will-change-transform"
                        >
                            {!blogs
                                ? Array.from({ length: 3 }).map((_, i) => (
                                    <BlogSkeleton key={i} />
                                ))
                                : blogs.map((blog) => (
                                    <motion.article
                                        key={blog.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: false, amount: 0.3 }}
                                        transition={{ duration: 0.5 }}
                                        className="
                        flex-none
                        w-full
                        lg:w-[32%]
                        h-[420px]
                        bg-white
                        rounded-2xl
                        shadow-lg
                        border border-gray-200
                        overflow-hidden
                        flex flex-col
                      "
                                    >
                                        <BlurImage
                                            src={getImage(blog)}
                                            alt={blog.title}
                                        />

                                        <div className="p-5 flex flex-col flex-1">
                                            <h3 className="text-lg font-semibold text-[#052659] mb-3 line-clamp-2">
                                                {blog.title}
                                            </h3>

                                            <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-1">
                                                {getDescription(blog)}
                                            </p>

                                            <Link
                                                to={`/blog/${blog.slug}`}
                                                className="inline-flex items-center gap-2 text-[#052659] font-semibold hover:gap-3 transition-all"
                                            >
                                                Read Article
                                                <FiArrowRight />
                                            </Link>
                                        </div>
                                    </motion.article>
                                ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default memo(HomeBlog);