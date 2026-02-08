import { useEffect, useState, useMemo } from "react";
import { api } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Share2, Search } from "lucide-react";

export default function Dashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [stats, setStats] = useState({
        totalBlogs: 0,
        totalUsers: 0,
        activeRoles: 0,
    });

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    /* ================= FETCH DATA ================= */
    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                const res = await api.get("/public-blogs", {
                    signal: controller.signal,
                });

                const blogsData = res.data?.blogs || [];

                setStats({
                    totalBlogs: blogsData.length,
                    totalUsers: 0,
                    activeRoles: 1,
                });

                setBlogs(blogsData);
            } catch (err) {
                if (err.name !== "CanceledError") {
                    setError("Failed to load dashboard data");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        return () => controller.abort();
    }, []);

    /* ================= DEBOUNCE SEARCH ================= */
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search.trim().toLowerCase());
        }, 350);

        return () => clearTimeout(timer);
    }, [search]);

    /* ================= HELPERS ================= */

    const formatDate = (date) => {
        const d = new Date(date);
        if (isNaN(d.getTime())) return "";
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const getPublicBlogUrl = (slug) => {
        return `${window.location.origin}/blogs/${slug}`;
    };

    const shareBlog = async (blog) => {
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

    /* ================= FILTER BLOGS ================= */

    const filteredBlogs = useMemo(() => {
        if (!debouncedSearch) return blogs;

        return blogs.filter((blog) => {
            const title = blog.title?.toLowerCase() || "";
            const slug = blog.slug?.toLowerCase() || "";
            const author = blog.profiles?.name?.toLowerCase() || "";
            const date = formatDate(blog.created_at).toLowerCase();

            return (
                title.includes(debouncedSearch) ||
                slug.includes(debouncedSearch) ||
                author.includes(debouncedSearch) ||
                date.includes(debouncedSearch)
            );
        });
    }, [blogs, debouncedSearch]);

    /* ================= UI STATES ================= */

    if (loading) {
        return (
            <div className="mt-28 md:mt-20 px-4 sm:px-6 new-font">
                <div className="h-8 w-56 bg-gray-200 rounded animate-pulse mb-6" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                    {[1, 2, 3].map((i) => (
                        <DashboardCardSkeleton key={i} />
                    ))}
                </div>

                <div className="space-y-8">
                    {[1, 2, 3].map((i) => (
                        <PublicBlogSkeleton key={i} />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <p className="mt-28 md:mt-20 px-4 sm:px-6 text-red-500">
                {error}
            </p>
        );
    }

    return (
        <div className="mt-20 md:mt-32 px-4 sm:px-6 new-font">
            <h1 className="text-2xl font-semibold mb-6">
                Admin Dashboard
            </h1>

            {/* ================= STATS ================= */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                <div
                    onClick={() => navigate("/dashboard/blogs")}
                    className="p-5 bg-white shadow rounded-xl cursor-pointer hover:shadow-lg transition"
                >
                    <p className="text-gray-500 text-sm">Total Blogs</p>
                    <p className="text-2xl font-bold mt-1">
                        {stats.totalBlogs}
                    </p>
                </div>

                <div
                    className="p-5 bg-white shadow rounded-xl cursor-pointer"
                    onClick={() => navigate("/dashboard/users")}
                >
                    <p className="text-gray-500 text-sm">Total Users</p>
                    <p className="text-2xl font-bold mt-1">
                        {stats.activeRoles}
                    </p>
                </div>
            </div>

            {/* ================= SEARCH ================= */}
            <div className="relative max-w-3xl mb-10">
                <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by title, author, date or slug"
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring"
                />
            </div>

            <h2 className="text-xl font-semibold mb-6">
                Latest Blogs
            </h2>

            <div className="flex flex-col gap-10 items-center">
                {filteredBlogs.map((blog) => (
                    <article
                        key={blog.id}
                        className="w-full max-w-3xl bg-white rounded-xl shadow p-5 sm:p-6 flex flex-col gap-5"
                    >
                        <header className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg sm:text-xl font-semibold">
                                    {blog.title}
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">
                                    By {blog.profiles?.name || "Unknown"} •{" "}
                                    {formatDate(blog.created_at)}
                                </p>
                            </div>

                            {blog.slug && (
                                <button
                                    onClick={() => shareBlog(blog)}
                                    className="text-gray-600 hover:text-black"
                                    title="Share blog"
                                >
                                    <Share2 size={18} />
                                </button>
                            )}
                        </header>

                        {/* ================= CONTENT BLOCKS ================= */}
                        <div className="space-y-4">
                            {blog.content_blocks?.map((block) => {
                                if (block.type === "heading") {
                                    return (
                                        <h4
                                            key={block.id}
                                            className="text-lg font-semibold text-gray-900"
                                        >
                                            {block.text}
                                        </h4>
                                    );
                                }

                                if (block.type === "paragraph") {
                                    return (
                                        <p
                                            key={block.id}
                                            className="text-gray-700 text-sm leading-relaxed"
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
                                        <ImageWithPlaceholder
                                            key={block.id}
                                            src={block.media.url}
                                            alt={blog.title}
                                        />
                                    );
                                }

                                return null;
                            })}
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}

/* ================= IMAGE COMPONENT ================= */

function ImageWithPlaceholder({ src, alt }) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="relative w-full min-h-[220px] overflow-hidden rounded bg-gray-200">
            {!loaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}

            <img
                src={src}
                alt={alt}
                onLoad={() => setLoaded(true)}
                className={`w-full h-full object-cover transition-all duration-700 ${loaded ? "opacity-100 blur-0" : "opacity-0 blur-md"
                    }`}
                loading="lazy"
            />
        </div>
    );
}

/* ================= SKELETONS ================= */

function DashboardCardSkeleton() {
    return (
        <div className="p-5 bg-white shadow rounded-xl flex flex-col gap-3">
            <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
        </div>
    );
}

function PublicBlogSkeleton() {
    return (
        <div className="w-full max-w-3xl bg-white rounded-xl shadow p-5 sm:p-6 flex flex-col gap-4">
            <div className="space-y-2">
                <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-40 bg-gray-200 rounded animate-pulse" />
            </div>

            <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
            </div>

            <div className="h-56 bg-gray-200 rounded animate-pulse" />
        </div>
    );
}
