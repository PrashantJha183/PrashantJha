import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, roles }) {
    const { user, loading } = useAuth();
    const location = useLocation();

    console.log("ProtectedRoute check:", {
        path: location.pathname,
        loading,
        user,
        roles,
    });

    // While auth state is resolving
    if (loading) {
        console.log("Auth loading... blocking route render");
        return <div>Checking authentication...</div>;
    }

    // Not logged in
    if (!user) {
        console.warn("No user found. Redirecting to /login");
        return <Navigate to="/login" replace />;
    }

    // Role not allowed
    if (roles && !roles.includes(user.role)) {
        console.warn(
            "Role not authorized:",
            user.role,
            "Required:",
            roles
        );
        return <Navigate to="/unauthorized" replace />;
    }

    // Access granted
    console.log("Access granted to:", location.pathname);
    return children;
}
