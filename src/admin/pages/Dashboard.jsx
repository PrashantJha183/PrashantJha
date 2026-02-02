import { useEffect, useState, useMemo } from "react";
import { api } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

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

    console.log("AdminDashboard rendered");

    /* ================= MOUNT / UNMOUNT ================= */
    useEffect(() => {
        console.log("AdminDashboard mounted");
        return () => {
            console.log("AdminDashboard unmounted");
        };
    }, []);

    /* ================= USER UPDATE ================= */
    useEffect(() => {
        console.log("AdminDashboard user:", user);
    }, [user]);

    /* ================= FETCH DATA (MEMORY SAFE) ================= */
    useEffect(() => {
        console.log("Fetching dashboard data...");
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
                    console.error("Failed to fetch dashboard data", err);
                    setError("Failed to load dashboard data");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => controller.abort();
    }, []);

    /* ================= MEMOIZED BLOGS ================= */
    const memoBlogs = useMemo(() => blogs, [blogs]);

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
            {/* ================= DASHBOARD ================= */}
            <h1 className="text-2xl font-semibold mb-6">
                Admin Dashboard
            </h1>

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

                {/* <div
                    onClick={() => navigate("/dashboard/users")}
                    className="p-5 bg-white shadow rounded-xl cursor-pointer hover:shadow-lg transition"
                >
                    <p className="text-gray-500 text-sm">Total Users</p>
                    <p className="text-2xl font-bold mt-1">
                        {stats.totalUsers}
                    </p>
                </div> */}

                <div className="p-5 bg-white shadow rounded-xl cursor-pointer" onClick={() => navigate("/dashboard/users")}>
                    <p className="text-gray-500 text-sm">Total Users</p>
                    <p className="text-2xl font-bold mt-1">
                        {stats.activeRoles}
                    </p>
                </div>
            </div>

            {/* ================= BLOGS ================= */}
            <h2 className="text-xl font-semibold mb-6">
                Latest Blogs
            </h2>

            <div className="flex flex-col gap-8 items-center">
                {memoBlogs.map((blog) => (
                    <article
                        key={blog.id}
                        className="w-full max-w-3xl bg-white rounded-xl shadow p-5 sm:p-6 flex flex-col gap-4"
                    >
                        <header>
                            <h3 className="text-lg sm:text-xl font-semibold">
                                {blog.title}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">
                                {blog.status}
                            </p>
                        </header>

                        <p className="text-gray-700 text-sm leading-relaxed">
                            {blog.description}
                        </p>

                        {Array.isArray(blog.images) &&
                            blog.images.length > 0 && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {blog.images.map((img, i) => (
                                        <img
                                            key={i}
                                            src={img}
                                            alt={blog.title}
                                            loading="lazy"
                                            className="h-28 sm:h-32 w-full object-cover rounded"
                                        />
                                    ))}
                                </div>
                            )}
                    </article>
                ))}
            </div>
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
                <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
            </div>

            <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="h-28 sm:h-32 bg-gray-200 rounded animate-pulse"
                    />
                ))}
            </div>
        </div>
    );
}
