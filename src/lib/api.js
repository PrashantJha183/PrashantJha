import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

/* ================================
   REQUEST INTERCEPTOR
================================ */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    // 🔐 Attach access token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Access token attached");
    }

    /**
     * 🧠 IMPORTANT:
     * If body is FormData → DO NOT set Content-Type
     * Axios will automatically set multipart/form-data with boundary
     */
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    } else {
      // Default for JSON APIs
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  },
);

/* ================================
   RESPONSE INTERCEPTOR
================================ */
api.interceptors.response.use(
  (response) => {
    console.log("API Response:", response.config.url, response.status);
    return response;
  },
  async (error) => {
    console.error("API Error:", error.config?.url, error.response?.status);

    const originalRequest = error.config;

    // 🔁 Handle expired access token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.warn("Access token expired. Trying refresh...");

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          throw new Error("No refresh token found");
        }

        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
          { refreshToken },
          { withCredentials: true },
        );

        localStorage.setItem("accessToken", res.data.accessToken);
        console.log("New access token stored");

        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);
