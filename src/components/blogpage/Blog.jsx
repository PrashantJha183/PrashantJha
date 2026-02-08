import React, {
    memo,
    useEffect,
    useState,
    useRef,
    useMemo,
} from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { api } from "../../lib/api";
import { Share2, Search } from "lucide-react";

/* =====================
   ANIMATIONS
===================== */
const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
};

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
        hour12: false,
    });
};


/* =====================
   BLOG PAGE
===================== */
function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadedOnce, setLoadedOnce] = useState(false);

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const abortRef = useRef(null);

    /* =====================
       FETCH BLOGS
    ===================== */
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

    /* =====================
       DEBOUNCE SEARCH
    ===================== */
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search.trim().toLowerCase());
        }, 350);

        return () => clearTimeout(timer);
    }, [search]);

    /* =====================
       FILTERED BLOGS
    ===================== */
    const filteredBlogs = useMemo(() => {
        if (!debouncedSearch) return blogs;

        return blogs.filter((blog) => {
            const title = blog.title?.toLowerCase() || "";
            const slug = blog.slug?.toLowerCase() || "";
            const author = blog.profiles?.name?.toLowerCase() || "";
            const date = formatISTDate(blog.created_at).toLowerCase();

            return (
                title.includes(debouncedSearch) ||
                slug.includes(debouncedSearch) ||
                author.includes(debouncedSearch) ||
                date.includes(debouncedSearch)
            );
        });
    }, [blogs, debouncedSearch]);

    if (loading) return <BlogSkeletonList />;

    if (loadedOnce && blogs.length === 0) {
        return <BlogUnderDevelopment />;
    }

    /* =====================
       SHARE HANDLER
    ===================== */
    const getPublicBlogUrl = (slug) =>
        `${window.location.origin}/blogs/${slug}`;

    const shareBlog = async (blog) => {
        if (!blog.slug) return;

        const url = getPublicBlogUrl(blog.slug);

        if (navigator.share) {
            try {
                await navigator.share({
                    title: blog.title,
                    text: blog.title,
                    url,
                });
                return;
            } catch {
                return;
            }
        }

        try {
            await navigator.clipboard.writeText(url);
            alert("Blog link copied to clipboard");
        } catch {
            alert("Unable to share blog link");
        }
    };

    return (
        <motion.section
            variants={pageSpring}
            initial="hidden"
            animate="visible"
            className="min-h-screen bg-[#F8FAFC] px-4 md:py-40 py-28 new-font"
        >
            <div className="max-w-3xl mx-auto space-y-8">
                {/* SEARCH BAR */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by title, author, date or slug"
                        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring"
                    />
                </div>

                {filteredBlogs.map((blog) => (
                    <motion.article
                        key={blog.id}
                        variants={itemSpring}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        className="bg-white rounded-xl shadow-md overflow-hidden"
                    >
                        {/* HEADER */}
                        <div className="p-6 pb-2 flex justify-between items-start">
                            <div>
                                <h2 className="text-xl sm:text-2xl font-bold">
                                    {blog.title}
                                </h2>

                                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                    By{" "}
                                    <span className="font-medium text-gray-700">
                                        {blog.profiles?.name || "Admin"}
                                    </span>{" "}
                                    • {formatISTDate(blog.created_at)} IST
                                </p>
                            </div>

                            {blog.slug && (
                                <button
                                    onClick={() => shareBlog(blog)}
                                    className="text-gray-600 hover:text-black"
                                    aria-label="Share blog"
                                >
                                    <Share2 size={18} />
                                </button>
                            )}
                        </div>

                        {/* CONTENT BLOCKS */}
                        <div className="space-y-5">
                            {blog.content_blocks?.map((block) => {
                                if (block.type === "heading") {
                                    return (
                                        <h3
                                            key={block.id}
                                            className="px-6 text-lg font-semibold"
                                        >
                                            {block.text}
                                        </h3>
                                    );
                                }

                                if (block.type === "paragraph") {
                                    return (
                                        <p
                                            key={block.id}
                                            className="px-6 text-gray-700 text-sm sm:text-base leading-relaxed text-justify"
                                        >
                                            {block.text}
                                        </p>
                                    );
                                }

                                if (
                                    block.type === "media" &&
                                    block.media?.fileType === "image"
                                ) {
                                    return (
                                        <BlogImageGallery
                                            key={block.id}
                                            images={[block.media.url]}
                                        />
                                    );
                                }

                                return null;
                            })}
                        </div>
                    </motion.article>
                ))}
            </div>
        </motion.section>
    );
}

/* =====================
   IMAGE COMPONENTS
===================== */
const BlogImageGallery = memo(({ images }) => (
    <SingleImage src={images[0]} />
));

const SingleImage = memo(({ src }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="relative w-full min-h-[240px] bg-gray-200 overflow-hidden">
            {!loaded && (
                <div className="absolute inset-0 bg-gray-300 animate-pulse" />
            )}
            <img
                src={src}
                alt=""
                loading="lazy"
                onLoad={() => setLoaded(true)}
                className={`w-full h-full object-cover transition-all p-3 duration-700 ${loaded ? "opacity-100 blur-0" : "opacity-0 blur-lg"
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
                    <div key={i} className="bg-white rounded-xl shadow-md p-6 space-y-4">
                        <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded" />
                        <div className="h-4 w-1/3 bg-gray-200 animate-pulse rounded" />
                        <div className="h-56 bg-gray-200 animate-pulse rounded" />
                        <div className="h-4 bg-gray-200 animate-pulse rounded" />
                        <div className="h-4 w-5/6 bg-gray-200 animate-pulse rounded" />
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
