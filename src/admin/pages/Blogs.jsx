import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import { Pencil, Trash2, Share2 } from "lucide-react";

/* ======================================================
   UTILITIES
====================================================== */

/* Generates a stable unique id for blocks on frontend */
const generateId = () =>
    `${Date.now()}_${Math.random().toString(36).slice(2)}`;

/* Formats ISO date string into readable Indian locale format */
const formatDateTime = (isoString) => {
    if (!isoString) return "Unknown date";
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "Invalid date";

    return date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
};

/* Normalizes content blocks coming from backend */
const normalizeContentBlocks = (blog) => {
    if (Array.isArray(blog.content_blocks)) return blog.content_blocks;
    if (Array.isArray(blog.contentBlocks)) return blog.contentBlocks;
    return [];
};

/* Builds public blog URL using slug */
const getPublicBlogUrl = (slug) => {
    return `${window.location.origin}/blogs/${slug}`;
};

/* Handles native sharing on mobile and clipboard fallback on desktop */
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

/* ======================================================
   RENDER BLOCKS (READ MODE)
====================================================== */

const RenderContentBlocks = ({ blog }) => {
    const blocks = normalizeContentBlocks(blog);

    if (!blocks.length) {
        return <p className="text-gray-500 text-sm mt-3">No content added yet</p>;
    }

    return (
        <div className="mt-4 space-y-3">
            {blocks.map((block) => {
                if (!block || block._delete) return null;

                if (block.type === "heading") {
                    return (
                        <h4 key={block.id} className="text-lg font-semibold">
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

                if (block.type === "media" && block.media?.url) {
                    if (block.media.fileType === "pdf") {
                        return (
                            <a
                                key={block.id}
                                href={block.media.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-600 text-sm underline"
                            >
                                View PDF
                            </a>
                        );
                    }

                    return (
                        <img
                            key={block.id}
                            src={block.media.url}
                            alt=""
                            className="w-full max-h-auto object-cover rounded"
                        />
                    );
                }

                return null;
            })}
        </div>
    );
};

/* ======================================================
   ADMIN BLOGS
====================================================== */

export default function AdminBlogs() {
    const { user } = useAuth();

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showFormModal, setShowFormModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        status: "draft",
    });

    const [blocks, setBlocks] = useState([]);
    const [mediaFiles, setMediaFiles] = useState({});

    /* ================= FETCH ================= */

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await api.get("/blogs");
                setBlogs(Array.isArray(res.data?.blogs) ? res.data.blogs : []);
            } catch {
                setError("Failed to load blogs");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    /* ================= OPEN MODALS ================= */

    const openCreate = () => {
        setSelectedBlog(null);
        setFormData({ title: "", status: "draft" });
        setBlocks([
            { id: generateId(), type: "heading", text: "" },
            { id: generateId(), type: "paragraph", text: "" },
        ]);
        setMediaFiles({});
        setShowFormModal(true);
    };

    const openEdit = (blog) => {
        setSelectedBlog(blog);
        setFormData({
            title: blog.title || "",
            status: blog.status || "draft",
        });
        setBlocks(normalizeContentBlocks(blog));
        setMediaFiles({});
        setShowFormModal(true);
    };

    /* ================= BLOCK ACTIONS ================= */

    const addBlock = (type) => {
        if (type === "media") {
            setBlocks((prev) => [
                ...prev,
                { id: generateId(), type: "media", fileKey: null },
            ]);
        } else {
            setBlocks((prev) => [
                ...prev,
                { id: generateId(), type, text: "" },
            ]);
        }
    };

    const updateBlockText = (id, text) => {
        setBlocks((prev) =>
            prev.map((b) => (b.id === id ? { ...b, text } : b))
        );
    };

    const markDeleteBlock = (id) => {
        setBlocks((prev) =>
            prev.map((b) => (b.id === id ? { ...b, _delete: true } : b))
        );
    };

    /* ================= SAVE ================= */

    const submitBlog = async () => {
        if (!formData.title.trim()) {
            alert("Title is required");
            return;
        }

        const form = new FormData();
        form.append("title", formData.title.trim());
        form.append("status", formData.status);
        form.append("content_blocks", JSON.stringify(blocks));

        Object.entries(mediaFiles).forEach(([key, file]) => {
            if (file) form.append(key, file);
        });

        try {
            const res = selectedBlog
                ? await api.put(`/blogs/${selectedBlog.id}`, form)
                : await api.post("/blogs", form);

            const blog = res.data?.blog;
            if (!blog) return;

            setBlogs((prev) =>
                selectedBlog
                    ? prev.map((b) => (b.id === blog.id ? blog : b))
                    : [blog, ...prev]
            );

            setShowFormModal(false);
        } catch {
            alert("Failed to save blog");
        }
    };

    /* ================= DELETE ================= */

    const deleteBlog = async () => {
        if (!selectedBlog) return;

        try {
            await api.delete(`/blogs/${selectedBlog.id}`);
            setBlogs((prev) => prev.filter((b) => b.id !== selectedBlog.id));
            setShowDeleteModal(false);
        } catch {
            alert("Delete failed");
        }
    };

    /* ================= UI ================= */

    if (loading) {
        return (
            <div className="mt-20 px-4">
                <BlogSkeleton />
                <BlogSkeleton />
            </div>
        );
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="mt-28 px-4 new-font">
            <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-semibold">Admin Blogs</h2>
                <button
                    onClick={openCreate}
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    Create Blog
                </button>
            </div>

            <div className="flex flex-col gap-8 items-center">
                {blogs.map((b) => (
                    <div
                        key={b.id}
                        className="w-full max-w-3xl bg-white rounded-xl shadow p-6"
                    >
                        <div className="flex justify-between">
                            <div>
                                <h3 className="text-xl font-semibold">{b.title}</h3>
                                <div className="text-sm text-gray-500 mt-1 space-x-2">
                                    <span className="capitalize">{b.status}</span>
                                    <span>•</span>
                                    <span>{formatDateTime(b.created_at)}</span>
                                </div>
                            </div>

                            <div className="flex gap-3 items-center">
                                {b.status === "published" && b.slug && (
                                    <button
                                        title="Share blog"
                                        onClick={() => shareBlog(b)}
                                        className="text-gray-600 hover:text-black"
                                    >
                                        <Share2 size={18} />
                                    </button>
                                )}

                                <button onClick={() => openEdit(b)}>
                                    <Pencil size={18} />
                                </button>

                                <button
                                    className="text-red-600"
                                    onClick={() => {
                                        setSelectedBlog(b);
                                        setShowDeleteModal(true);
                                    }}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        <RenderContentBlocks blog={b} />
                    </div>
                ))}
            </div>

            {showFormModal && (
                <Modal title={selectedBlog ? "Edit Blog" : "Create Blog"}>
                    <input
                        value={formData.title}
                        onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                        }
                        placeholder="Blog title"
                        className="w-full px-4 py-3 border rounded"
                    />

                    <select
                        value={formData.status}
                        onChange={(e) =>
                            setFormData({ ...formData, status: e.target.value })
                        }
                        className="w-full px-4 py-3 border rounded"
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>

                    <div className="max-h-[50vh] overflow-y-auto space-y-4 pr-1">
                        {blocks.map((block) =>
                            block._delete ? null : (
                                <div key={block.id} className="border p-3 rounded">
                                    {block.type !== "media" && (
                                        <textarea
                                            value={block.text || ""}
                                            onChange={(e) =>
                                                updateBlockText(
                                                    block.id,
                                                    e.target.value
                                                )
                                            }
                                            placeholder={block.type}
                                            className="w-full border p-2 rounded"
                                        />
                                    )}

                                    {block.type === "media" && (
                                        <>
                                            {block.media?.url && (
                                                <img
                                                    src={block.media.url}
                                                    className="w-full rounded mb-2"
                                                />
                                            )}

                                            <input
                                                type="file"
                                                onChange={(e) => {
                                                    const fileKey =
                                                        block.fileKey ||
                                                        `media_${generateId()}`;

                                                    setBlocks((prev) =>
                                                        prev.map((b) =>
                                                            b.id === block.id
                                                                ? {
                                                                    ...b,
                                                                    fileKey,
                                                                }
                                                                : b
                                                        )
                                                    );

                                                    setMediaFiles((prev) => ({
                                                        ...prev,
                                                        [fileKey]:
                                                            e.target.files[0],
                                                    }));
                                                }}
                                            />
                                        </>
                                    )}

                                    <button
                                        onClick={() =>
                                            markDeleteBlock(block.id)
                                        }
                                        className="text-red-600 text-sm mt-2"
                                    >
                                        Remove block
                                    </button>
                                </div>
                            )
                        )}
                    </div>

                    <div className="flex gap-2">
                        <button onClick={() => addBlock("heading")}>
                            Add heading
                        </button>
                        <button onClick={() => addBlock("paragraph")}>
                            Add paragraph
                        </button>
                        <button onClick={() => addBlock("media")}>
                            Add media
                        </button>
                    </div>

                    <ModalActions
                        onSave={submitBlog}
                        onCancel={() => setShowFormModal(false)}
                    />
                </Modal>
            )}

            {showDeleteModal && (
                <Modal title="Confirm Delete">
                    <p>Delete {selectedBlog?.title}?</p>
                    <ModalActions
                        onSave={deleteBlog}
                        onCancel={() => setShowDeleteModal(false)}
                    />
                </Modal>
            )}
        </div>
    );
}

/* ================= SHARED ================= */

function Modal({ title, children }) {
    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-start overflow-y-auto py-10">
            <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg max-h-[90vh] flex flex-col">
                <div className="px-6 py-4 border-b shrink-0">
                    <h3 className="text-xl font-semibold">{title}</h3>
                </div>
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
            <button onClick={onCancel} className="px-5 py-2 border rounded">
                Cancel
            </button>
            <button
                onClick={onSave}
                className="px-5 py-2 bg-black text-white rounded"
            >
                Save
            </button>
        </div>
    );
}

function BlogSkeleton() {
    return (
        <div className="w-full max-w-3xl bg-white rounded-xl shadow p-6 mb-6">
            <div className="h-5 w-48 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
    );
}
