import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { api } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [step, setStep] = useState("email");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const inputsRef = useRef([]);
    const abortRef = useRef(null);

    const { setUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            if (abortRef.current) {
                abortRef.current.abort();
            }
        };
    }, []);

    const sendOtp = async () => {
        if (!email.includes("@")) {
            setError("Please enter a valid email address");
            return;
        }

        try {
            abortRef.current = new AbortController();
            setLoading(true);
            setError("");

            await api.post(
                "/auth/send-otp",
                { email },
                { signal: abortRef.current.signal }
            );

            setStep("otp");
        } catch (err) {
            if (err.name !== "CanceledError") {
                setError("Failed to send OTP. Try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = async () => {
        const code = otp.join("");

        if (code.length !== 6) {
            setError("Enter 6 digit OTP");
            return;
        }

        try {
            abortRef.current = new AbortController();
            setLoading(true);
            setError("");

            const res = await api.post(
                "/auth/verify-otp",
                { email, otp: code },
                { signal: abortRef.current.signal }
            );

            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);
            localStorage.setItem("role", res.data.user.role);

            setUser(res.data.user);
            navigate("/dashboard");
        } catch (err) {
            if (err.name !== "CanceledError") {
                setError("Invalid or expired OTP");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleOtpChange = (value, index) => {
        if (!/^\d?$/.test(value)) return;

        const nextOtp = [...otp];
        nextOtp[index] = value;
        setOtp(nextOtp);

        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 new-font">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
            >
                <h1 className="text-2xl font-semibold text-center mb-6">
                    Admin Login
                </h1>

                {step === "email" && (
                    <>
                        <input
                            type="email"
                            inputMode="email"
                            autoComplete="email"
                            placeholder="Enter email"
                            className="w-full p-3 border rounded mb-4"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <button
                            onClick={sendOtp}
                            disabled={loading}
                            className="w-full bg-black text-white p-3 rounded"
                        >
                            {loading ? "Sending OTP..." : "Send OTP"}
                        </button>
                    </>
                )}

                {step === "otp" && (
                    <>
                        <div className="flex justify-between mb-4">
                            {otp.map((digit, i) => (
                                <input
                                    key={i}
                                    ref={(el) => (inputsRef.current[i] = el)}
                                    value={digit}
                                    inputMode="numeric"
                                    maxLength={1}
                                    onChange={(e) =>
                                        handleOtpChange(e.target.value, i)
                                    }
                                    className="w-10 h-12 border text-center text-lg rounded"
                                />
                            ))}
                        </div>

                        <button
                            onClick={verifyOtp}
                            disabled={loading}
                            className="w-full bg-black text-white p-3 rounded"
                        >
                            {loading ? "Verifying..." : "Verify OTP"}
                        </button>
                    </>
                )}

                {error && (
                    <p className="text-red-500 text-sm mt-4 text-center">
                        {error}
                    </p>
                )}
            </motion.div>
        </div>
    );
}
