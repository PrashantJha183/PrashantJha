import React, {
    memo,
    useEffect,
    useState,
    useRef,
    useMemo,
} from "react";
import { motion } from "framer-motion";
import { api } from "../../lib/api";
import { Share2, Search } from "lucide-react";
import { useParams } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { Helmet } from "react-helmet-async";

/* =====================
   ANIMATION VARIANTS
===================== */
const fadeUp = {
    initial: { opacity: 0, y: 20 },
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
        hour12: false,
    });
};

function Blog() {
    const { slug } = useParams();

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
                if (slug) {
                    const res = await api.get(`/public-blogs/${slug}`, {
                        signal: abortRef.current.signal,
                    });
                    setBlogs(res.data?.blog ? [res.data.blog] : []);
                } else {
                    const res = await api.get("/public-blogs", {
                        signal: abortRef.current.signal,
                    });
                    setBlogs(Array.isArray(res.data?.blogs) ? res.data.blogs : []);
                }
            } catch (err) {
                if (err.name !== "CanceledError") {
                    console.error("Public blogs fetch failed", err);
                }
            } finally {
                setLoading(false);
                setLoadedOnce(true);
            }
        };

        fetchBlogs();
        return () => abortRef.current?.abort();
    }, [slug]);

    /* =====================
       DEBOUNCE SEARCH
    ===================== */
    useEffect(() => {
        if (slug) return;
        const timer = setTimeout(() => {
            setDebouncedSearch(search.trim().toLowerCase());
        }, 350);
        return () => clearTimeout(timer);
    }, [search, slug]);

    /* =====================
       FILTER BLOGS
    ===================== */
    const filteredBlogs = useMemo(() => {
        if (slug || !debouncedSearch) return blogs;

        return blogs.filter((blog) => {
            const title = blog.title?.toLowerCase() || "";
            const blogSlug = blog.slug?.toLowerCase() || "";
            const author = blog.profiles?.name?.toLowerCase() || "";
            const date = formatISTDate(blog.created_at).toLowerCase();

            return (
                title.includes(debouncedSearch) ||
                blogSlug.includes(debouncedSearch) ||
                author.includes(debouncedSearch) ||
                date.includes(debouncedSearch)
            );
        });
    }, [blogs, debouncedSearch, slug]);

    const blog = slug ? filteredBlogs[0] : null;

    const getMetaDescription = (blog) => {
        if (!blog) return "";
        if (blog.description) return blog.description.slice(0, 160);
        const fromBlocks = blog.content_blocks?.find(
            (b) => b.type === "paragraph"
        );
        if (fromBlocks?.text) {
            return fromBlocks.text.replace(/<[^>]+>/g, "").slice(0, 160);
        }
        if (blog.content_html) {
            const text = blog.content_html
                .replace(/<[^>]+>/g, " ")
                .replace(/\s+/g, " ")
                .trim();
            if (text) return text.slice(0, 160);
        }
        return blog.title;
    };

    if (loading) return <BlogSkeletonList />;
    if (loadedOnce && blogs.length === 0) return <BlogUnderDevelopment />;

    const getPublicBlogUrl = (slug) =>
        `${window.location.origin}/blog/${slug}`;

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
            alert(url);
        }
    };

    return (
        <>
            {/* ================= SEO FOR SINGLE BLOG ================= */}
            {slug && blog && (
                <Helmet>
                    <title>{blog.title} | Prashant Jha</title>

                    <meta
                        name="description"
                        content={getMetaDescription(blog)}
                    />

                    <link
                        rel="canonical"
                        href={`https://www.prashantjhadev.in/blog/${blog.slug}`}
                    />

                    <meta property="og:type" content="article" />
                    <meta property="og:title" content={blog.title} />
                    <meta
                        property="og:description"
                        content={getMetaDescription(blog)}
                    />
                    <meta
                        property="og:url"
                        content={`https://www.prashantjhadev.in/blog/${blog.slug}`}
                    />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={blog.title} />
                    <meta
                        name="twitter:description"
                        content={getMetaDescription(blog)}
                    />

                    <script type="application/ld+json">
                        {JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "BlogPosting",
                            headline: blog.title,
                            description: getMetaDescription(blog),
                            datePublished: blog.created_at,
                            dateModified: blog.updated_at || blog.created_at,
                            author: {
                                "@type": "Person",
                                name: "Prashant Jha",
                                url: "https://www.prashantjhadev.in/about",
                            },
                            publisher: {
                                "@type": "Organization",
                                name: "Prashant Jha",
                                logo: {
                                    "@type": "ImageObject",
                                    url: "https://www.prashantjhadev.in/logo.png",
                                },
                            },
                            mainEntityOfPage: {
                                "@type": "WebPage",
                                "@id": `https://www.prashantjhadev.in/blog/${blog.slug}`,
                            },
                        })}
                    </script>
                </Helmet>
            )}

            {/* ================= BLOG UI ================= */}
            <section className="min-h-screen bg-[#F8FAFC] px-4 py-28 md:py-40 new-font">
                <div className="max-w-3xl mx-auto space-y-8">

                    {!slug && (
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by title, author, date"
                                className="w-full pl-10 pr-4 py-3 border rounded-lg"
                            />
                        </div>
                    )}

                    {filteredBlogs.map((blog) => (
                        <article key={blog.id} className="bg-white rounded-xl shadow-md overflow-hidden pb-8">
                            <div className="p-6 pb-2 mb-4 flex justify-between bg-[#052659]">
                                <div className="text-[#C1E8FF]">
                                    <h1 className="text-xl font-bold">{blog.title}</h1>
                                    {blog.description && (
                                        <p className="text-sm text-gray-200 mt-1">
                                            {blog.description}
                                        </p>
                                    )}
                                    <p className="text-sm text-gray-100 mt-1 font-semibold">
                                        By {blog.profiles?.name || "Admin"} • {formatISTDate(blog.created_at)} IST
                                    </p>
                                </div>

                                {blog.slug && (
                                    <button onClick={() => shareBlog(blog)}>
                                        <Share2 size={18} className="text-gray-100" />
                                    </button>
                                )}
                            </div>

                            {/* Rich HTML content (new WYSIWYG editor) */}
                            {blog.content_html ? (
                                <div
                                    className="blog-prose px-6"
                                    dangerouslySetInnerHTML={{ __html: blog.content_html }}
                                />
                            ) : (
                                /* Legacy content_blocks (old posts) */
                                <div className="space-y-5">
                                    {blog.content_blocks?.map((block) => {
                                        if (block.type === "heading") {
                                            return <h2 key={block.id} className="px-6 text-lg font-semibold">{block.text}</h2>;
                                        }
                                        if (block.type === "paragraph") {
                                            return <p key={block.id} className="px-6 text-gray-700 text-justify">{block.text}</p>;
                                        }
                                        if (block.type === "list") {
                                            const ListTag = block.ordered ? "ol" : "ul";
                                            return (
                                                <ListTag
                                                    key={block.id}
                                                    className={
                                                        (block.ordered ? "list-decimal" : "list-disc") +
                                                        " px-10 text-gray-700 space-y-1"
                                                    }
                                                >
                                                    {(block.items || []).map((item, i) => (
                                                        <li key={i}>{item}</li>
                                                    ))}
                                                </ListTag>
                                            );
                                        }
                                        if (block.type === "quote") {
                                            return (
                                                <blockquote key={block.id} className="mx-6 border-l-4 border-[#052659] pl-4 text-gray-700 italic">
                                                    {block.text}
                                                </blockquote>
                                            );
                                        }
                                        if (block.type === "code") {
                                            return (
                                                <pre key={block.id} className="mx-6 bg-gray-900 text-gray-100 rounded p-4 text-sm overflow-x-auto">
                                                    {block.text}
                                                </pre>
                                            );
                                        }
                                        if (block.type === "table") {
                                            return (
                                                <table key={block.id} className="mx-6 w-[calc(100%-3rem)] border-collapse text-sm">
                                                    <tbody>
                                                        {(block.rows || []).map((row, i) => (
                                                            <tr key={i}>
                                                                {row.map((cell, j) => (
                                                                    <td key={j} className="border border-gray-300 px-3 py-1">
                                                                        {cell}
                                                                    </td>
                                                                ))}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            );
                                        }
                                        if (block.type === "divider") {
                                            return <hr key={block.id} className="mx-6 border-gray-300" />;
                                        }
                                        if (block.type === "media" && block.media?.fileType === "image") {
                                            return <BlogImage key={block.id} src={block.media.url} />;
                                        }
                                        if (block.type === "media" && block.media?.fileType === "audio") {
                                            return (
                                                <div className="px-6">
                                                    <audio key={block.id} controls src={block.media.url} className="w-full" />
                                                </div>
                                            );
                                        }
                                        if (block.type === "media" && block.media?.fileType === "video") {
                                            return (
                                                <div className="px-6">
                                                    <video key={block.id} controls src={block.media.url} className="w-full rounded" />
                                                </div>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                            )}
                        </article>
                    ))}
                </div>
            </section>
        </>
    );
}

const BlogImage = memo(({ src }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="relative min-h-[240px] p-3 bg-gray-200 flex items-center justify-center">
            {!loaded && (
                <div className="absolute inset-0 animate-pulse bg-gray-300" />
            )}

            <img
                src={src}
                loading="lazy"
                onLoad={() => setLoaded(true)}
                alt="Blog visual content"
                className={`
            transition duration-700
            ${loaded ? "opacity-100 blur-0" : "opacity-0 blur-lg"}
            w-full
            lg:h-full
            object-contain
            lg:object-cover
        `}
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
            <motion.div
                variants={fadeUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.5 }}
                className="text-5xl mb-4"
            >
            </motion.div>

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
                    About Me <FiArrowRight />
                </a>
            </motion.div>
        </section>
    );
}

export default memo(Blog);
