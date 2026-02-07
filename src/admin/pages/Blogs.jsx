import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import { Pencil, Trash2 } from "lucide-react";

/* ======================================================
   HELPERS
====================================================== */
const formatDateTime = (isoString) => {
    if (!isoString) return "Unknown date";

    const date = new Date(isoString);

    if (isNaN(date.getTime())) {
        console.warn("Invalid date format", isoString);
        return "Invalid date";
    }

    return date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
};

const normalizeContentBlocks = (blog) => {
    if (Array.isArray(blog.content_blocks)) {
        return blog.content_blocks;
    }

    if (Array.isArray(blog.contentBlocks)) {
        console.warn("contentBlocks alias detected for blog", blog.id);
        return blog.contentBlocks;
    }

    console.warn("content_blocks missing for blog", blog.id, blog);
    return [];
};

const getPreviewText = (blog) => {
    const blocks = normalizeContentBlocks(blog);

    const textBlock = blocks.find(
        (b) =>
            b &&
            (b.type === "heading" || b.type === "paragraph") &&
            typeof b.text === "string" &&
            b.text.trim().length > 0
    );

    if (textBlock) {
        return textBlock.text;
    }

    if (typeof blog.description === "string" && blog.description.trim()) {
        console.warn("Legacy blog using description fallback", blog.id);
        return blog.description;
    }

    return "No content added yet";
};


const RenderContentBlocks = ({ blog }) => {
    const blocks = normalizeContentBlocks(blog);

    if (!blocks.length) {
        console.warn("No content blocks to render for blog", blog.id);
        return (
            <p className="text-gray-500 text-sm mt-3">
                No content added yet
            </p>
        );
    }

    return (
        <div className="mt-4 space-y-3">
            {blocks.map((block, index) => {
                if (!block || block._delete) return null;

                if (block.type === "heading") {
                    return (
                        <h4
                            key={block.id || index}
                            className="text-lg font-semibold text-gray-900"
                        >
                            {block.text}
                        </h4>
                    );
                }

                if (block.type === "paragraph") {
                    return (
                        <p
                            key={block.id || index}
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
                                key={block.id || index}
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
                            key={block.id || index}
                            src={block.media.url}
                            alt=""
                            className="w-full max-h-72 object-cover rounded"
                        />
                    );
                }

                console.warn("Unknown block type", block);
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

    /* ================= FETCH BLOGS ================= */

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                console.log("Fetching admin blogs");
                const res = await api.get("/blogs");

                console.log("Raw API response", res.data);

                const list = res.data?.blogs;

                if (!Array.isArray(list)) {
                    console.error("blogs is not an array", list);
                    setBlogs([]);
                    return;
                }

                list.forEach((b) => {
                    console.log("Fetched blog keys", b.id, Object.keys(b));
                });

                setBlogs(list);
            } catch (err) {
                console.error("Failed to fetch blogs", err);
                setError("Failed to load blogs");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    /* ================= ACTIONS ================= */

    const openCreate = () => {
        setSelectedBlog(null);
        setFormData({ title: "", status: "draft" });
        setBlocks([
            { type: "heading", text: "" },
            { type: "paragraph", text: "" },
        ]);
        setMediaFiles({});
        setShowFormModal(true);
    };

    const openEdit = (blog) => {
        console.log("Editing blog", blog.id, blog);

        setSelectedBlog(blog);
        setFormData({
            title: blog.title || "",
            status: blog.status || "draft",
        });

        setBlocks(normalizeContentBlocks(blog));
        setMediaFiles({});
        setShowFormModal(true);
    };

    const addBlock = (type) => {
        if (type === "media") {
            const fileKey = `media_${crypto.randomUUID()}`;
            setBlocks((prev) => [...prev, { type: "media", fileKey }]);
        } else {
            setBlocks((prev) => [...prev, { type, text: "" }]);
        }
    };

    const updateBlockText = (index, text) => {
        setBlocks((prev) =>
            prev.map((b, i) => (i === index ? { ...b, text } : b))
        );
    };

    const markDeleteBlock = (index) => {
        setBlocks((prev) =>
            prev.map((b, i) => (i === index ? { ...b, _delete: true } : b))
        );
    };

    /* ================= SAVE BLOG ================= */

    const submitBlog = async () => {
        if (!formData.title.trim()) {
            alert("Title is required");
            return;
        }

        console.log("Submitting blog payload");
        console.log("Blocks", blocks);
        console.log("Media files", mediaFiles);

        const form = new FormData();
        form.append("title", formData.title.trim());
        form.append("status", formData.status);
        form.append("content_blocks", JSON.stringify(blocks));

        Object.entries(mediaFiles).forEach(([key, file]) => {
            if (file) {
                form.append(key, file);
            }
        });

        try {
            const res = selectedBlog
                ? await api.put(`/blogs/${selectedBlog.id}`, form, {
                    headers: { "Content-Type": "multipart/form-data" },
                })
                : await api.post("/blogs", form, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

            console.log("Save response", res.data);

            const blog = res.data?.blog;
            if (!blog) {
                console.error("No blog returned from API");
                return;
            }

            setBlogs((prev) =>
                selectedBlog
                    ? prev.map((b) => (b.id === blog.id ? blog : b))
                    : [blog, ...prev]
            );

            setShowFormModal(false);
        } catch (err) {
            console.error("Failed to save blog", err);
            alert("Failed to save blog");
        }
    };

    const deleteBlog = async () => {
        if (!selectedBlog) return;

        try {
            await api.delete(`/blogs/${selectedBlog.id}`);
            setBlogs((prev) => prev.filter((b) => b.id !== selectedBlog.id));
            setShowDeleteModal(false);
        } catch (err) {
            console.error("Delete failed", err);
        }
    };

    /* ================= UI ================= */

    if (loading) {
        return (
            <div className="mt-20 px-4">
                <BlogSkeleton />
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
                                    <span>
                                        By {b.profiles?.name || "Unknown author"}
                                    </span>
                                    <span>•</span>
                                    <span>
                                        {formatDateTime(b.created_at)}
                                    </span>
                                </div>
                            </div>


                            <div className="flex gap-3">
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

                    {blocks.map((block, i) =>
                        block._delete ? null : (
                            <div key={i} className="border p-3 rounded">
                                {block.type !== "media" && (
                                    <textarea
                                        value={block.text || ""}
                                        onChange={(e) => updateBlockText(i, e.target.value)}
                                        placeholder={block.type}
                                        className="w-full border p-2 rounded"
                                    />
                                )}

                                {block.type === "media" && (
                                    <input
                                        type="file"
                                        onChange={(e) =>
                                            setMediaFiles((prev) => ({
                                                ...prev,
                                                [block.fileKey]: e.target.files[0],
                                            }))
                                        }
                                    />
                                )}

                                <button
                                    onClick={() => markDeleteBlock(i)}
                                    className="text-red-600 text-sm mt-2"
                                >
                                    Remove block
                                </button>
                            </div>
                        )
                    )}

                    <div className="flex gap-2">
                        <button onClick={() => addBlock("heading")}>Add heading</button>
                        <button onClick={() => addBlock("paragraph")}>Add paragraph</button>
                        <button onClick={() => addBlock("media")}>Add media</button>
                    </div>

                    <ModalActions
                        onSave={submitBlog}
                        onCancel={() => setShowFormModal(false)}
                    />
                </Modal>
            )}

            {showDeleteModal && (
                <Modal title="Confirm Delete">
                    <p>Delete {selectedBlog?.title}</p>
                    <ModalActions
                        onSave={deleteBlog}
                        onCancel={() => setShowDeleteModal(false)}
                    />
                </Modal>
            )}
        </div>
    );
}

/* ================= SHARED COMPONENTS ================= */

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
            <button onClick={onSave} className="px-5 py-2 bg-black text-white rounded">
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
