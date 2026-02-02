import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ================================
   REQUEST INTERCEPTOR
================================ */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Access token attached");
    } else {
      console.warn("No access token found");
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

    // Handle expired access token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.warn("Access token expired. Trying refresh...");

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          console.error("No refresh token found");
          throw new Error("No refresh token");
        }

        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
          { refreshToken },
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
