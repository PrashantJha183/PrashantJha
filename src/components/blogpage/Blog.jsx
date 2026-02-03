import React, { memo, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { api } from "../../lib/api";

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
};

/* =====================
   DATE FORMATTER (IST)
===================== */
const formatISTDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
};

/* =====================
   ANIMATIONS
===================== */
const pageSpring = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 80, damping: 14 },
    },
};

const itemSpring = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 70, damping: 12 },
    },
};

/* =====================
   BLOG PAGE
===================== */
function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadedOnce, setLoadedOnce] = useState(false);

    const abortRef = useRef(null);

    useEffect(() => {
        abortRef.current = new AbortController();

        const fetchBlogs = async () => {
            try {
                const res = await api.get("/public-blogs", {
                    signal: abortRef.current.signal,
                });

                setBlogs(Array.isArray(res.data?.blogs) ? res.data.blogs : []);
            } catch (err) {
                if (err.name !== "CanceledError") {
                    console.error("Public blogs fetch failed");
                }
            } finally {
                setLoading(false);
                setLoadedOnce(true);
            }
        };

        fetchBlogs();
        return () => abortRef.current?.abort();
    }, []);

    if (loading) return <BlogSkeletonList />;

    if (loadedOnce && blogs.length === 0) {
        return <BlogUnderDevelopment />;
    }

    const splitIntoParagraphs = (text, maxParagraphs = 3) => {
        if (!text) return [];

        // Split by sentence end
        const sentences = text.split(/(?<=[.?!])\s+/);

        if (sentences.length <= 2) {
            return [text];
        }

        const paragraphs = [];
        const chunkSize = Math.ceil(sentences.length / maxParagraphs);

        for (let i = 0; i < sentences.length; i += chunkSize) {
            paragraphs.push(
                sentences.slice(i, i + chunkSize).join(" ")
            );
        }

        return paragraphs.slice(0, maxParagraphs);
    };
    return (
        <motion.section
            variants={pageSpring}
            initial="hidden"
            animate="visible"
            className="min-h-screen bg-[#F8FAFC] px-4 md:py-40 py-28 new-font"
        >
            <div className="max-w-3xl mx-auto space-y-12">
                {blogs.map((blog) => (
                    <motion.article
                        key={blog.id}
                        variants={itemSpring}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        className="bg-white rounded-xl shadow-md overflow-hidden"
                    >
                        {/* TITLE */}
                        <div className="p-6 pb-2">
                            <h2 className="text-xl sm:text-2xl font-bold">
                                {blog.title}
                            </h2>

                            {/* AUTHOR + DATE */}
                            <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                By{" "}
                                <span className="font-medium text-gray-700">
                                    {blog.profiles?.name || "Admin"}
                                </span>{" "}
                                • {formatISTDate(blog.created_at)} IST
                            </p>
                        </div>

                        {/* IMAGES (DYNAMIC) */}
                        {Array.isArray(blog.images) && blog.images.length > 0 && (
                            <BlogImageGallery images={blog.images} />
                        )}

                        {/* DESCRIPTION */}
                        <div className="p-6 pt-4 text-gray-700 text-sm sm:text-base leading-relaxed space-y-4">
                            {splitIntoParagraphs(blog.description).map((para, i) => (
                                <p key={i} className="text-justify">
                                    {para}
                                </p>
                            ))}
                        </div>

                    </motion.article>
                ))}
            </div>
        </motion.section>
    );
}

/* =====================
   IMAGE GALLERY
===================== */
const BlogImageGallery = memo(({ images }) => {
    const count = images.length;

    if (count === 1) {
        return <SingleImage src={images[0]} />;
    }

    if (count === 2) {
        return (
            <div className="grid grid-cols-2 gap-1">
                {images.slice(0, 2).map((src, i) => (
                    <GridImage key={i} src={src} />
                ))}
            </div>
        );
    }

    if (count === 3) {
        return (
            <div className="grid grid-cols-2 gap-1">
                <div className="col-span-2">
                    <RectImage src={images[0]} />
                </div>
                <GridImage src={images[1]} />
                <GridImage src={images[2]} />
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-1 p-3 md:p-8">
            {images.slice(0, 4).map((src, i) => (
                <GridImage key={i} src={src} />
            ))}
        </div>
    );
});

/* =====================
   IMAGE TYPES
===================== */
const SingleImage = memo(({ src }) => <RectImage src={src} />);

const RectImage = memo(({ src }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="relative w-full aspect-[4/3] bg-gray-200 overflow-hidden">
            {!loaded && <div className="absolute inset-0 bg-gray-300 animate-pulse" />}
            <img
                src={src}
                alt=""
                loading="lazy"
                onLoad={() => setLoaded(true)}
                className={`w-full h-full object-cover transition-all duration-700 ${loaded ? "opacity-100 blur-0" : "opacity-0 blur-lg"
                    }`}
            />
        </div>
    );
});

const GridImage = memo(({ src }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="relative w-full aspect-square bg-gray-200 overflow-hidden">
            {!loaded && <div className="absolute inset-0 bg-gray-300 animate-pulse" />}
            <img
                src={src}
                alt=""
                loading="lazy"
                onLoad={() => setLoaded(true)}
                className={`w-full h-full object-cover transition-all duration-700 ${loaded ? "opacity-100 blur-0" : "opacity-0 blur-lg"
                    }`}
            />
        </div>
    );
});

/* =====================
   SKELETON
===================== */
function BlogSkeletonList() {
    return (
        <div className="min-h-screen bg-[#F8FAFC] px-4 py-24">
            <div className="max-w-3xl mx-auto space-y-10">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="bg-white rounded-xl shadow-md overflow-hidden"
                    >
                        <div className="h-6 w-3/4 m-6 bg-gray-200 animate-pulse rounded" />
                        <div className="h-3 w-1/3 ml-6 mb-4 bg-gray-200 animate-pulse rounded" />
                        <div className="h-64 bg-gray-200 animate-pulse" />
                        <div className="p-6 space-y-3">
                            <div className="h-4 bg-gray-200 animate-pulse rounded" />
                            <div className="h-4 w-5/6 bg-gray-200 animate-pulse rounded" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* =====================
   EMPTY STATE
===================== */
function BlogUnderDevelopment() {
    return (


        <section
            className="
        relative
        min-h-[70vh]
        flex
        flex-col
        items-center
        justify-center
        text-center
        bg-[#F8FAFC]
        px-4
        new-font
      "
            aria-labelledby="blog-status-heading"
        >
            {/* Icon / Emoji */}
            <motion.div
                variants={fadeUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.5 }}
                className="text-5xl mb-4"
            >
                {/* 🚧 */}
            </motion.div>

            {/* Heading */}
            <motion.h1
                id="blog-status-heading"
                variants={fadeUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3"
            >
                Blog Page Under Development
            </motion.h1>

            {/* Description */}
            <motion.p
                variants={fadeUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-xl text-gray-600 text-sm sm:text-base mb-6"
            >
                I am currently working on this space to bring you meaningful articles on
                web development, real-world projects, performance optimization, and
                practical learnings.
                <br />
                <span className="font-medium text-gray-800">
                    Stay tuned the blog will be live soon.
                </span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
                variants={fadeUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap justify-center gap-4"
            >
                <a
                    href="/services#use-cases"
                    className="
            px-6 py-3
            bg-[#052659]
            text-[#C1E8FF]
            font-semibold
            rounded-lg
            shadow-md
            flex items-center gap-2
            hover:scale-105
            transition
          "
                    aria-label="View projects"
                >
                    {/* 🧩  */}
                    View Projects <FiArrowRight />
                </a>

                <a
                    href="/services"
                    className="
            px-6 py-3
            border
            border-[#052659]
            text-[#052659]
            font-semibold
            rounded-lg
            shadow-md
            flex items-center gap-2
            hover:scale-105
            transition
          "
                    aria-label="Explore services"
                >
                    {/* 🛠️  */}
                    Explore Services <FiArrowRight />
                </a>

                <a
                    href="/about"
                    className="
            px-6 py-3
            border
            border-gray-300
            text-gray-700
            font-semibold
            rounded-lg
            shadow-sm
            flex items-center gap-2
            hover:scale-105
            transition
          "
                    aria-label="About me"
                >
                    {/* 👤  */}
                    About Me <FiArrowRight />
                </a>
            </motion.div>
        </section>

    );
}

export default memo(Blog);



