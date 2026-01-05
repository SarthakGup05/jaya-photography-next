import axios from "axios";

// Ensure this points to your backend URL
const baseURL = process.env.NEXT_PUBLIC_API_URL || "https://backend.jayaphotography.in/api/v1";

const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

// Add token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    // ✅ FIX: Check if we are running in the browser
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;