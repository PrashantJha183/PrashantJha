import { useEffect, useState, useRef } from "react";
import { api } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import { Pencil, Trash2, ImagePlus } from "lucide-react";

export default function AdminBlogs() {
    const { user } = useAuth();

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /* ================= MODAL STATE ================= */
    const [showFormModal, setShowFormModal] = useState(false);
    const [showMediaModal, setShowMediaModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);

    /* ================= BLOG CORE FORM ================= */
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "draft",
    });

    /* ================= MEDIA FILES ================= */
    const [mediaFiles, setMediaFiles] = useState({
        images: [],
        videos: [],
        audios: [],
    });

    const imageInputRef = useRef(null);
    const videoInputRef = useRef(null);
    const audioInputRef = useRef(null);


    /* ================= FETCH BLOGS ================= */
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await api.get("/blogs");
                const blogsData = res.data.blogs || [];

                const normalized = blogsData.map((b) => ({
                    ...b,
                    images: Array.isArray(b.images) ? b.images : [],
                    videos: Array.isArray(b.videos) ? b.videos : [],
                    audios: Array.isArray(b.audios) ? b.audios : [],
                }));

                setBlogs(normalized);
            } catch {
                setError("Failed to load blogs");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    /* ================= ACTION HANDLERS ================= */
    const openCreate = () => {
        setSelectedBlog(null);
        setFormData({ title: "", description: "", status: "draft" });
        setMediaFiles({ images: [], videos: [], audios: [] });
        setShowFormModal(true);
    };

    const openEdit = (blog) => {
        setSelectedBlog(blog);
        setFormData({
            title: blog.title,
            description: blog.description,
            status: blog.status,
        });
        setShowFormModal(true);
    };

    const openMedia = (blog) => {
        setSelectedBlog(blog);
        setMediaFiles({ images: [], videos: [], audios: [] });
        setShowMediaModal(true);
    };

    const createBlog = async () => {
        // BASIC VALIDATION
        if (!formData.title.trim() || !formData.description.trim()) {
            alert("Title and description are required");
            return;
        }

        const hasLocalFiles =
            mediaFiles.images.length ||
            mediaFiles.videos.length ||
            mediaFiles.audios.length;

        // 🔵 CASE 1: JSON ONLY (manual testing / URLs)
        if (!hasLocalFiles) {
            const payload = {
                title: formData.title.trim(),
                description: formData.description.trim(),
                status: formData.status,
                images: formData.images || [],
                videos: formData.videos || [],
                audios: formData.audios || [],
            };

            const res = await api.post("/blogs", payload);

            const blog = res.data.blog || res.data.data || res.data;
            setBlogs((prev) => [blog, ...prev]);
            setShowFormModal(false);
            return;
        }

        // 🟢 CASE 2: LOCAL FILE UPLOAD (multipart)
        const form = new FormData();
        form.append("title", formData.title.trim());
        form.append("description", formData.description.trim());
        form.append("status", formData.status);

        mediaFiles.images.forEach((f) => form.append("images", f));
        mediaFiles.videos.forEach((f) => form.append("videos", f));
        mediaFiles.audios.forEach((f) => form.append("audios", f));

        const res = await api.post("/blogs", form, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        const blog = res.data.blog || res.data.data || res.data;
        setBlogs((prev) => [blog, ...prev]);
        setShowFormModal(false);
    };



    const updateBlog = async () => {
        const payload = {
            title: formData.title.trim(),
            description: formData.description.trim(),
            status: formData.status,
        };

        const res = await api.put(`/blogs/${selectedBlog.id}`, payload);

        const updated =
            res.data?.data ||
            res.data?.blog ||
            res.data;

        setBlogs((prev) =>
            prev.map((b) => (b.id === selectedBlog.id ? updated : b))
        );

        setShowFormModal(false);
    };


    const updateMedia = async () => {
        const { images, videos, audios } = mediaFiles;

        const hasFiles =
            images.length > 0 ||
            videos.length > 0 ||
            audios.length > 0;

        if (!hasFiles) {
            console.warn("No media selected. Aborting request.");
            return; // 🚫 ABSOLUTELY NO API CALL
        }

        const form = new FormData();

        images.forEach((f) => form.append("images", f));
        videos.forEach((f) => form.append("videos", f));
        audios.forEach((f) => form.append("audios", f));

        try {
            // 🔥 Guard: do not send empty FormData
            const hasFiles =
                form.getAll("images").length ||
                form.getAll("videos").length ||
                form.getAll("audios").length;

            if (!hasFiles) {
                console.warn("No media selected, skipping upload");
                return;
            }

            // ✅ IMPORTANT FIX: upload media goes to /blogs/:id (NOT /media)
            const res = await api.patch(
                `/blogs/${selectedBlog.id}/media`,
                form,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            const updatedBlog = res.data.blog;

            setBlogs((prev) =>
                prev.map((b) =>
                    b.id === updatedBlog.id ? updatedBlog : b
                )
            );

            setShowMediaModal(false);
            setMediaFiles({ images: [], videos: [], audios: [] });

        } catch (err) {
            console.error(
                "Media upload failed",
                err.response?.data || err.message
            );
        }

    };


    const deleteBlog = async () => {
        await api.delete(`/blogs/${selectedBlog.id}`);
        setBlogs((prev) => prev.filter((b) => b.id !== selectedBlog.id));
        setShowDeleteModal(false);
    };

    /* ================= UI ================= */
    if (loading) {
        return (
            <div className="mt-20 px-4 sm:px-6">
                <div className="flex justify-between mb-6">
                    <div className="h-8 w-40 bg-gray-200 rounded animate-pulse" />
                    <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
                </div>

                <div className="flex flex-col gap-8 items-center">
                    {[1, 2, 3].map((i) => (
                        <BlogSkeleton key={i} />
                    ))}
                </div>
            </div>
        );
    }

    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="mt-28 md:mt-32 px-4 sm:px-6 new-font">
            <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-semibold">Admin Blogs</h2>
                <button
                    onClick={openCreate}
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    Create Blog
                </button>
            </div>

            {/* SINGLE COLUMN – CENTERED */}
            <div className="flex flex-col gap-8 items-center">
                {blogs.map((b) => (
                    <div
                        key={b.id}
                        className="w-full max-w-3xl bg-white rounded-xl shadow p-4 sm:p-6 flex flex-col gap-4"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg sm:text-xl font-semibold">
                                    {b.title}
                                </h3>
                                <span className="text-sm text-gray-500 capitalize">
                                    {b.status}
                                </span>
                            </div>

                            <div className="flex gap-3">
                                <button onClick={() => openEdit(b)}>
                                    <Pencil size={18} />
                                </button>
                                <button onClick={() => openMedia(b)}>
                                    <ImagePlus size={18} />
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedBlog(b);
                                        setShowDeleteModal(true);
                                    }}
                                    className="text-red-600"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                            {b.description}
                        </p>

                        <MediaPreview
                            images={b.images}
                            videos={b.videos}
                            audios={b.audios}
                        />
                    </div>
                ))}
            </div>

            {/* MODALS (UNCHANGED) */}
            {showFormModal && (
                <Modal title={selectedBlog ? "Edit Blog" : "Create Blog"}>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Blog Title
                        </label>
                        <input
                            type="text"
                            placeholder="Enter blog title"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                            }
                            className="w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Blog Description
                        </label>
                        <textarea
                            placeholder="Write your blog content here..."
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    description: e.target.value,
                                })
                            }
                            rows={8}
                            className="w-full px-4 py-3 border rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Status
                        </label>
                        <select
                            value={formData.status}
                            onChange={(e) =>
                                setFormData({ ...formData, status: e.target.value })
                            }
                            className="w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </div>

                    {/* Media Upload (Create Only) */}
                    {!selectedBlog && (
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Upload Images
                            </label>
                            <input
                                type="file"
                                multiple
                                onChange={(e) => {
                                    const files = Array.from(e.target.files);
                                    setMediaFiles((prev) => ({
                                        ...prev,
                                        images: files,
                                    }));
                                }}
                                className="w-full text-sm"
                            />
                        </div>
                    )}

                    <ModalActions
                        onSave={selectedBlog ? updateBlog : createBlog}
                        onCancel={() => setShowFormModal(false)}
                    />
                </Modal>
            )}


            {showMediaModal && (
                <Modal title="Update Media">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Upload Images
                        </label>
                        <input
                            type="file"
                            multiple
                            onChange={(e) =>
                                setMediaFiles({
                                    ...mediaFiles,
                                    images: [...e.target.files],
                                })
                            }
                            className="w-full text-sm"
                        />
                    </div>

                    <ModalActions
                        onSave={updateMedia}
                        onCancel={() => setShowMediaModal(false)}
                    />
                </Modal>
            )}


            {showDeleteModal && (
                <Modal title="Confirm Delete">
                    <p className="text-sm text-gray-700">
                        Are you sure you want to delete{" "}
                        <strong>{selectedBlog?.title}</strong>?
                    </p>

                    <ModalActions
                        onSave={deleteBlog}
                        onCancel={() => setShowDeleteModal(false)}
                    />
                </Modal>
            )}

        </div>
    );
}

/* ================= MEDIA PREVIEW WITH PER-ITEM SKELETON ================= */
function MediaPreview({ images = [], videos = [], audios = [] }) {
    return (
        <div className="space-y-4">
            {/* IMAGES */}
            {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {images.map((src, i) => (
                        <SkeletonImage key={i} src={src} />
                    ))}
                </div>
            )}

            {/* VIDEOS */}
            {videos.map((src, i) => (
                <SkeletonVideo key={i} src={src} />
            ))}

            {/* AUDIOS */}
            {audios.map((src, i) => (
                <SkeletonAudio key={i} src={src} />
            ))}
        </div>
    );
}

/* ================= PER-ITEM SKELETONS ================= */

function SkeletonImage({ src }) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="relative w-full h-28 sm:h-32 rounded overflow-hidden">
            {/* Skeleton */}
            {!loaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}

            {/* Image */}
            <img
                src={src}
                alt=""
                onLoad={() => setLoaded(true)}
                className={`
                    absolute inset-0 w-full h-full object-cover
                    transition-all duration-500
                    ${loaded ? "blur-0 opacity-100" : "blur-md opacity-0"}
                `}
            />
        </div>
    );
}

function SkeletonVideo({ src }) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="relative w-full aspect-video rounded overflow-hidden">
            {/* Skeleton */}
            {!loaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}

            {/* Video */}
            <video
                src={src}
                controls
                onLoadedData={() => setLoaded(true)}
                className={`
                    absolute inset-0 w-full h-full
                    transition-all duration-500
                    ${loaded ? "blur-0 opacity-100" : "blur-md opacity-0"}
                `}
            />
        </div>
    );
}

function SkeletonAudio({ src }) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="relative w-full h-12 rounded overflow-hidden">
            {/* Skeleton */}
            {!loaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}

            {/* Audio */}
            <audio
                src={src}
                controls
                onCanPlay={() => setLoaded(true)}
                className={`
                    w-full h-full
                    transition-all duration-500
                    ${loaded ? "blur-0 opacity-100" : "blur-md opacity-0"}
                `}
            />
        </div>
    );
}


/* ================= MODALS ================= */
function Modal({ title, children }) {
    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
            <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="px-6 py-4 border-b">
                    <h3 className="text-xl font-semibold">{title}</h3>
                </div>

                {/* Body */}
                <div className="px-6 py-5 space-y-4 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}

function ModalActions({ onSave, onCancel }) {
    return (
        <div className="flex justify-end gap-3 pt-4 border-t">
            <button
                onClick={onCancel}
                className="px-5 py-2 rounded border text-sm hover:bg-gray-100 transition"
            >
                Cancel
            </button>
            <button
                onClick={onSave}
                className="px-5 py-2 rounded bg-black text-white text-sm hover:opacity-90 transition"
            >
                Save
            </button>
        </div>
    );
}


function BlogSkeleton() {
    return (
        <div className="w-full max-w-3xl bg-white rounded-xl shadow p-4 sm:p-6 flex flex-col gap-4">

            {/* Header */}
            <div className="flex justify-between items-start">
                <div className="space-y-2">
                    <div className="h-5 w-56 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                </div>

                <div className="flex gap-3">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="h-5 w-5 bg-gray-200 rounded animate-pulse"
                        />
                    ))}
                </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Media */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
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
