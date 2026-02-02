import { useEffect, useState, useRef } from "react";
import { api } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import { Pencil, Trash2, ChevronDown } from "lucide-react";

const ROLE_OPTIONS = [
    { label: "Writer", value: "writer" },
    { label: "Editor", value: "editor" },
    { label: "Admin", value: "admin" },
];

export default function Users() {
    const { user } = useAuth();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [roleOpen, setRoleOpen] = useState(false);

    const dropdownRef = useRef(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
    });

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
        const fetchUsers = async () => {
            try {
                const res = await api.get("/admin/users");
                setUsers(res.data.users || res.data.data || []);
            } catch {
                setError("Failed to load users");
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    /* ================= OPEN EDIT ================= */
    const openEdit = (u) => {
        setSelectedUser(u);
        setFormData({
            name: u.name || "",
            email: u.email || "",
            role: u.role || "",
        });
        setRoleOpen(false);
        setShowEditModal(true);
    };

    /* ================= UPDATE USER (PATCH) ================= */
    const updateUser = async () => {
        if (!selectedUser) return;

        const userId = selectedUser.id || selectedUser._id;

        const payload = {
            name: formData.name.trim(),
            email: formData.email.trim(),
            role: formData.role,
        };

        if (!ROLE_OPTIONS.some((r) => r.value === payload.role)) {
            alert("Invalid role selected");
            return;
        }

        try {
            const res = await api.put(`/admin/users/${userId}`, payload);

            const updatedUser = res.data.user || res.data.data;

            setUsers((prev) =>
                prev.map((u) =>
                    (u.id || u._id) === userId ? updatedUser : u
                )
            );

            setShowEditModal(false);
        } catch (err) {
            alert(err?.response?.data?.message || "Update failed");
        }
    };

    /* ================= DELETE USER ================= */
    const deleteUser = async () => {
        const userId = selectedUser.id || selectedUser._id;

        try {
            await api.delete(`/admin/users/${userId}`);
            setUsers((prev) =>
                prev.filter((u) => (u.id || u._id) !== userId)
            );
            setShowDeleteModal(false);
        } catch {
            alert("Failed to delete user");
        }
    };

    if (loading) return <p className="mt-20 px-4">Loading…</p>;
    if (error) return <p className="mt-20 px-4 text-red-500">{error}</p>;

    return (
        <div className="mt-24 px-4 new-font">
            <h2 className="text-2xl font-semibold mb-6">Admin Users</h2>

            <div className="bg-white shadow rounded-xl overflow-x-auto">
                <table className="w-full text-sm">
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
                            <tr key={u.id || u._id} className="border-t">
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
            </div>

            {showEditModal && (
                <Modal title="Update User">
                    <input
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-2 border rounded"
                        placeholder="Name"
                    />

                    <input
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-2 border rounded"
                        placeholder="Email"
                    />

                    <div ref={dropdownRef} className="relative">
                        <button
                            onClick={() => setRoleOpen((p) => !p)}
                            className="w-full px-4 py-2 border rounded flex justify-between"
                        >
                            {ROLE_OPTIONS.find(
                                (r) => r.value === formData.role
                            )?.label || "Select role"}
                            <ChevronDown />
                        </button>

                        {roleOpen && (
                            <div className="absolute mt-2 w-full bg-white border rounded shadow">
                                {ROLE_OPTIONS.map((r) => (
                                    <button
                                        key={r.value}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
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

                    <ModalActions onCancel={() => setShowEditModal(false)} onSave={updateUser} />
                </Modal>
            )}

            {showDeleteModal && (
                <Modal title="Confirm Delete">
                    <p>Delete {selectedUser?.name}?</p>
                    <ModalActions
                        danger
                        onCancel={() => setShowDeleteModal(false)}
                        onSave={deleteUser}
                    />
                </Modal>
            )}
        </div>
    );
}

/* ================= MODAL ================= */

function Modal({ title, children }) {
    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
                <h3 className="font-semibold">{title}</h3>
                {children}
            </div>
        </div>
    );
}

function ModalActions({ onCancel, onSave, danger }) {
    return (
        <div className="flex justify-end gap-3">
            <button onClick={onCancel} className="border px-4 py-2 rounded">
                Cancel
            </button>
            <button
                onClick={onSave}
                className={`px-4 py-2 rounded text-white ${danger ? "bg-red-600" : "bg-black"
                    }`}
            >
                {danger ? "Delete" : "Update"}
            </button>
        </div>
    );
}
