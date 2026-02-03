import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { api } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import { Pencil, Trash2, ChevronDown } from "lucide-react";

export default function Users() {
    const { user } = useAuth();

    /* ================= STATE ================= */
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [selectedUser, setSelectedUser] = useState(null);
    const [roleOpen, setRoleOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const dropdownRef = useRef(null);
    const debounceRef = useRef(null);
    const abortRef = useRef(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
    });

    /* ================= CONSTANTS ================= */
    const ROLE_OPTIONS = useMemo(
        () => [
            { label: "Writer", value: "writer" },
            { label: "Editor", value: "editor" },
        ],
        [],
    );

    /* ================= SEO ================= */
    useEffect(() => {
        document.title = "Admin Users | Dashboard";
    }, []);

    /* ================= CLICK OUTSIDE ================= */
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setRoleOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    /* ================= FETCH USERS ================= */
    useEffect(() => {
        abortRef.current = new AbortController();

        const fetchUsers = async () => {
            try {
                const res = await api.get("/admin/users", {
                    signal: abortRef.current.signal,
                });
                setUsers(res.data.users || []);
            } catch (err) {
                if (err.name !== "CanceledError") {
                    setError("Failed to load users");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
        return () => abortRef.current?.abort();
    }, []);

    /* ================= CLEANUP DEBOUNCE ================= */
    useEffect(() => {
        return () => debounceRef.current && clearTimeout(debounceRef.current);
    }, []);

    /* ================= OPEN MODALS ================= */
    const openCreate = useCallback(() => {
        setFormData({ name: "", email: "", role: "" });
        setRoleOpen(false);
        setShowCreateModal(true);
    }, []);

    const openEdit = useCallback((u) => {
        setSelectedUser(u);
        setFormData({
            name: u.name || "",
            email: u.email || "",
            role: u.role || "",
        });
        setRoleOpen(false);
        setShowEditModal(true);
    }, []);

    /* ================= VALIDATION ================= */
    const validateCreate = () => {
        if (!formData.name.trim()) return "Name is required";
        if (formData.name.trim().length < 2) return "Name too short";
        if (!formData.email.trim()) return "Email is required";
        if (!/^\S+@\S+\.\S+$/.test(formData.email)) return "Invalid email";
        if (!ROLE_OPTIONS.some((r) => r.value === formData.role))
            return "Invalid role";
        return null;
    };

    const validateUpdate = () => {
        if (
            formData.name.trim() === selectedUser.name &&
            formData.role === selectedUser.role
        )
            return "Nothing to update";
        if (formData.name.trim().length < 2) return "Name too short";
        return null;
    };

    /* ================= CREATE USER ================= */
    const createUser = useCallback(() => {
        const err = validateCreate();
        if (err) return alert(err);

        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(async () => {
            try {
                setSubmitting(true);
                const res = await api.post("/admin/users", {
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    role: formData.role,
                });
                setUsers((p) => [res.data.user, ...p]);
                setShowCreateModal(false);
            } catch (err) {
                alert(err?.response?.data?.message || "Create failed");
            } finally {
                setSubmitting(false);
            }
        }, 700);
    }, [formData, ROLE_OPTIONS]);

    /* ================= UPDATE USER ================= */
    const updateUser = useCallback(() => {
        const err = validateUpdate();
        if (err) return alert(err);

        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(async () => {
            try {
                setSubmitting(true);
                const res = await api.put(`/admin/users/${selectedUser.id}`, {
                    name: formData.name.trim(),
                    role: formData.role,
                });
                setUsers((p) =>
                    p.map((u) => (u.id === res.data.user.id ? res.data.user : u)),
                );
                setShowEditModal(false);
            } catch (err) {
                alert(err?.response?.data?.message || "Update failed");
            } finally {
                setSubmitting(false);
            }
        }, 700);
    }, [formData, selectedUser]);

    /* ================= DELETE USER ================= */
    const deleteUser = async () => {
        if (selectedUser.id === user.id)
            return alert("Admin cannot delete himself");

        try {
            setSubmitting(true);
            await api.delete(`/admin/users/${selectedUser.id}`);
            setUsers((p) => p.filter((u) => u.id !== selectedUser.id));
            setShowDeleteModal(false);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="mt-28 md:mt-40 px-4 max-w-6xl mx-auto new-font">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Admin Users</h1>
                <button
                    onClick={openCreate}
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    Create User
                </button>
            </div>

            <div className="bg-white shadow rounded-xl overflow-x-auto transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] scrollbar-hide">
                {loading ? (
                    <TableSkeleton />
                ) : (
                    <table className="w-full text-sm animate-fadeIn">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-4 text-left">Name</th>
                                <th className="p-4 text-left">Email</th>
                                <th className="p-4 text-left">Role</th>
                                <th className="p-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u.id} className="border-t">
                                    <td className="p-4">{u.name}</td>
                                    <td className="p-4">{u.email}</td>
                                    <td className="p-4 capitalize">{u.role}</td>
                                    <td className="p-4 flex gap-3">
                                        <button onClick={() => openEdit(u)}>
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            className="text-red-600"
                                            onClick={() => {
                                                setSelectedUser(u);
                                                setShowDeleteModal(true);
                                            }}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* MODALS (UNCHANGED) */}
            {showCreateModal && (
                <UserModal
                    title="Create User"
                    formData={formData}
                    setFormData={setFormData}
                    ROLE_OPTIONS={ROLE_OPTIONS}
                    roleOpen={roleOpen}
                    setRoleOpen={setRoleOpen}
                    dropdownRef={dropdownRef}
                    submitting={submitting}
                    onSave={createUser}
                    onCancel={() => setShowCreateModal(false)}
                    showEmail
                />
            )}

            {showEditModal && (
                <UserModal
                    title="Update User"
                    formData={formData}
                    setFormData={setFormData}
                    ROLE_OPTIONS={ROLE_OPTIONS}
                    roleOpen={roleOpen}
                    setRoleOpen={setRoleOpen}
                    dropdownRef={dropdownRef}
                    submitting={submitting}
                    onSave={updateUser}
                    onCancel={() => setShowEditModal(false)}
                />
            )}

            {showDeleteModal && (
                <ConfirmModal
                    title="Confirm Delete"
                    text={`Delete ${selectedUser?.name}?`}
                    submitting={submitting}
                    onConfirm={deleteUser}
                    onCancel={() => setShowDeleteModal(false)}
                />
            )}
        </div>
    );
}

/* ================= SKELETON ================= */

function TableSkeleton() {
    return (
        <div className="p-6 space-y-4">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-4">
                    <SkeletonBox className="w-1/4" />
                    <SkeletonBox className="w-1/3" />
                    <SkeletonBox className="w-1/6" />
                    <SkeletonBox className="w-16" />
                </div>
            ))}
        </div>
    );
}

function SkeletonBox({ className }) {
    return (
        <div className={`h-4 bg-gray-200 rounded animate-pulse ${className}`} />
    );
}

/* ================= MODALS (UNCHANGED) ================= */

function UserModal({
    title,
    formData,
    setFormData,
    ROLE_OPTIONS,
    roleOpen,
    setRoleOpen,
    dropdownRef,
    submitting,
    onSave,
    onCancel,
    showEmail,
}) {
    return (
        <Modal title={title}>
            <input
                className="w-full px-4 py-2 border rounded"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            {showEmail && (
                <input
                    className="w-full px-4 py-2 border rounded"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
            )}

            <div ref={dropdownRef} className="relative">
                <button
                    onClick={() => setRoleOpen((p) => !p)}
                    className="w-full px-4 py-2 border rounded flex justify-between"
                >
                    {ROLE_OPTIONS.find((r) => r.value === formData.role)?.label ||
                        "Select role"}
                    <ChevronDown />
                </button>

                {roleOpen && (
                    <div className="absolute mt-2 w-full bg-white border rounded shadow">
                        {ROLE_OPTIONS.map((r) => (
                            <button
                                key={r.value}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                onClick={() => {
                                    setFormData({
                                        ...formData,
                                        role: r.value,
                                    });
                                    setRoleOpen(false);
                                }}
                            >
                                {r.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <ModalActions onCancel={onCancel} onSave={onSave} disabled={submitting} />
        </Modal>
    );
}

function ConfirmModal({ title, text, onCancel, onConfirm, submitting }) {
    return (
        <Modal title={title}>
            <p>{text}</p>
            <ModalActions
                danger
                onCancel={onCancel}
                onSave={onConfirm}
                disabled={submitting}
            />
        </Modal>
    );
}

function Modal({ title, children }) {
    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
            <div className="bg-white w-full max-w-md p-6 rounded-xl space-y-4">
                <h2 className="font-semibold">{title}</h2>
                {children}
            </div>
        </div>
    );
}

function ModalActions({ onCancel, onSave, danger, disabled }) {
    return (
        <div className="flex justify-end gap-3">
            <button onClick={onCancel} className="border px-4 py-2 rounded">
                Cancel
            </button>
            <button
                disabled={disabled}
                onClick={onSave}
                className={`px-4 py-2 rounded text-white ${danger ? "bg-red-600" : "bg-black"
                    } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
            >
                {danger ? "Delete" : "Save"}
            </button>
        </div>
    );
}
