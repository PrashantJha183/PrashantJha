import { useNavigate } from "react-router-dom";
import { ShieldAlert } from "lucide-react";

export default function Unauthorized() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 new-font px-4">
            <div className="bg-white max-w-md w-full p-8 rounded-xl shadow text-center">
                <div className="flex justify-center mb-4 text-red-600">
                    <ShieldAlert size={48} />
                </div>

                <h1 className="text-2xl font-semibold mb-2">
                    Access Denied
                </h1>

                <p className="text-gray-600 text-sm mb-6">
                    You don’t have permission to view this page.
                </p>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="bg-black text-white py-2 rounded"
                    >
                        Go to Dashboard
                    </button>

                    <button
                        onClick={() => {
                            localStorage.clear();
                            navigate("/login");
                        }}
                        className="border py-2 rounded"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
