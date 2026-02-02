import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
    const [open, setOpen] = useState(false);

    const linkClass = ({ isActive }) =>
        `px-3 py-2 rounded transition ${isActive
            ? "bg-white text-black"
            : "text-gray-300 hover:bg-white/10 hover:text-white"
        }`;

    return (
        <>
            {/* ================= MOBILE TOP BAR ================= */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-black text-white flex items-center px-4 z-50">
                {/* Hamburger */}
                <button
                    onClick={() => setOpen(!open)}
                    className="relative w-6 h-6"
                >
                    <span
                        className={`
                            absolute h-0.5 w-6 bg-white transition-all duration-300
                            ${open ? "rotate-45 top-3" : "top-1"}
                        `}
                    />
                    <span
                        className={`
                            absolute h-0.5 w-6 bg-white transition-all duration-300
                            ${open ? "opacity-0" : "top-3"}
                        `}
                    />
                    <span
                        className={`
                            absolute h-0.5 w-6 bg-white transition-all duration-300
                            ${open ? "-rotate-45 top-3" : "top-5"}
                        `}
                    />
                </button>

                <span className="ml-4 font-semibold">
                    Admin Panel
                </span>
            </div>

            {/* ================= MOBILE OVERLAY ================= */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* ================= SIDEBAR ================= */}
            <aside
                className={`
                    fixed md:static top-0 left-0 z-50
                    h-full w-64 bg-black text-white
                    transform transition-transform duration-300
                    ${open ? "translate-x-0" : "-translate-x-full"}
                    md:translate-x-0
                `}
            >
                {/* Header */}
                <div className="p-4 text-xl font-bold border-b border-white/10">
                    Admin Panel
                </div>

                {/* Nav */}
                <nav className="flex flex-col gap-1 p-4">
                    <NavLink
                        to="/dashboard"
                        className={linkClass}
                        onClick={() => setOpen(false)}
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/dashboard/blogs"
                        className={linkClass}
                        onClick={() => setOpen(false)}
                    >
                        Blogs
                    </NavLink>

                    <NavLink
                        to="/dashboard/users"
                        className={linkClass}
                        onClick={() => setOpen(false)}
                    >
                        Users
                    </NavLink>
                </nav>
            </aside>
        </>
    );
}
