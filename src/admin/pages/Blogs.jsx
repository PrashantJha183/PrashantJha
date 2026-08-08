import { Suspense, lazy, useEffect, useState, Component } from "react";
import { api } from "../../lib/api";
import { Pencil, Trash2, Share2 } from "lucide-react";

const RichTextEditor = lazy(() => import("../components/RichTextEditor"));

/* ======================================================
   UTILITIES
====================================================== */

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

/* Escapes HTML special chars (safe for inserting into editor) */
const escapeHtml = (str = "") =>
    str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

/* Converts legacy content_blocks into basic HTML (for old posts in editor) */
const blocksToHtml = (blocks = []) =>
    (blocks || [])
        .filter((b) => b && !b._delete)
        .map((b) => {
            if (b.type === "heading") {
                return `<h${b.level || 2}>${escapeHtml(b.text || "")}</h${b.level || 2}>`;
            }
            if (b.type === "paragraph") {
                return `<p>${escapeHtml(b.text || "")}</p>`;
            }
            if (b.type === "list") {
                const tag = b.ordered ? "ol" : "ul";
                const items = (b.items || [])
                    .map((item) => `<li>${escapeHtml(item)}</li>`)
                    .join("");
                return `<${tag}>${items}</${tag}>`;
            }
            if (b.type === "quote") {
                return `<blockquote>${escapeHtml(b.text || "")}</blockquote>`;
            }
            if (b.type === "code") {
                return `<pre><code>${escapeHtml(b.text || "")}</code></pre>`;
            }
            if (b.type === "table") {
                const rows = (b.rows || [])
                    .map(
                        (row) =>
                            `<tr>${row
                                .map((cell) => `<td>${escapeHtml(cell)}</td>`)
                                .join("")}</tr>`
                    )
                    .join("");
                return `<table>${rows}</table>`;
            }
            if (b.type === "divider") {
                return `<hr />`;
            }
            if (b.type === "media" && b.media?.url) {
                if (b.media.fileType === "pdf") {
                    return `<p><a href="${b.media.url}" target="_blank" rel="noopener noreferrer">View PDF</a></p>`;
                }
                if (b.media.fileType === "audio") {
                    return `<p><audio controls src="${b.media.url}"></audio></p>`;
                }
                if (b.media.fileType === "video") {
                    return `<p><video controls src="${b.media.url}"></video></p>`;
                }
                return `<img src="${b.media.url}" alt="Blog image" />`;
            }
            return "";
        })
        .join("");

/* Builds public blog URL using slug */
const getPublicBlogUrl = (slug) => {
    return `${window.location.origin}/blogs/${slug}`;
};

/* Handles native sharing + clipboard fallback */
const shareBlog = async (blog) => {
    const url = getPublicBlogUrl(blog.slug);

    if (navigator.share) {
        try {
            await navigator.share({ title: blog.title, text: blog.title, url });
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
   RENDER PREVIEW (READ MODE)
====================================================== */
const RenderContentPreview = ({ blog }) => {
    if (blog.content_html) {
        return (
            <div
                className="blog-prose-preview mt-3"
                dangerouslySetInnerHTML={{ __html: blog.content_html }}
            />
        );
    }

    const blocks = Array.isArray(blog.content_blocks) ? blog.content_blocks : [];

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
                        <p key={block.id} className="text-gray-700 text-sm leading-relaxed">
                            {block.text}
                        </p>
                    );
                }

                if (block.type === "list") {
                    const ListTag = block.ordered ? "ol" : "ul";
                    return (
                        <ListTag
                            key={block.id}
                            className={
                                (block.ordered ? "list-decimal" : "list-disc") +
                                " pl-5 text-sm text-gray-700 space-y-1"
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
                        <blockquote key={block.id} className="border-l-4 border-gray-300 pl-4 text-sm text-gray-600 italic">
                            {block.text}
                        </blockquote>
                    );
                }

                if (block.type === "code") {
                    return (
                        <pre key={block.id} className="bg-gray-900 text-gray-100 rounded p-4 text-xs overflow-x-auto">
                            {block.text}
                        </pre>
                    );
                }

                if (block.type === "table") {
                    return (
                        <table key={block.id} className="w-full border-collapse text-sm">
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
                    return <hr key={block.id} className="border-gray-300 my-2" />;
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

                    if (block.media.fileType === "audio") {
                        return (
                            <audio key={block.id} controls src={block.media.url} className="w-full" />
                        );
                    }

                    if (block.media.fileType === "video") {
                        return (
                            <video key={block.id} controls src={block.media.url} className="w-full rounded" />
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
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showFormModal, setShowFormModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "draft",
    });
    const [content, setContent] = useState("");

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
        setFormData({ title: "", description: "", status: "draft" });
        setContent("");
        setShowFormModal(true);
    };

    const openEdit = (blog) => {
        setSelectedBlog(blog);
        setFormData({
            title: blog.title || "",
            description: blog.description || "",
            status: blog.status || "draft",
        });
        setContent(
            blog.content_html || blocksToHtml(blog.content_blocks) || ""
        );
        setShowFormModal(true);
    };

    /* ================= SAVE ================= */
    const submitBlog = async () => {
        if (!formData.title.trim()) {
            alert("Title is required");
            return;
        }

        const payload = {
            title: formData.title.trim(),
            description: formData.description.trim(),
            status: formData.status,
            content,
        };

        try {
            const res = selectedBlog
                ? await api.put(`/blogs/${selectedBlog.id}`, payload)
                : await api.post("/blogs", payload);

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

                        <RenderContentPreview blog={b} />
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

                    <textarea
                        value={formData.description}
                        onChange={(e) =>
                            setFormData({ ...formData, description: e.target.value })
                        }
                        placeholder="Short description (SEO)"
                        rows={2}
                        className="w-full px-4 py-3 border rounded resize-none"
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

                    <Suspense
                        fallback={
                            <div className="h-[480px] border rounded flex items-center justify-center text-gray-500">
                                Loading editor...
                            </div>
                        }
                    >
                        <EditorErrorBoundary key={selectedBlog?.id || "new-blog"}>
                            <RichTextEditor
                                initialContent={content}
                                onChange={setContent}
                            />
                        </EditorErrorBoundary>
                    </Suspense>

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
class EditorErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error) {
        console.error("Editor failed to load:", error);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="border rounded p-4 text-red-600 text-sm">
                    The editor failed to load. Please close and reopen the form.
                </div>
            );
        }
        return this.props.children;
    }
}

function Modal({ title, children }) {
    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-start overflow-y-auto py-10">
            <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg max-h-[90vh] flex flex-col">
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
