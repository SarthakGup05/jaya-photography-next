import axios from "axios";

// Ensure this points to backend URL (relative in browser to proxy via Next.js rewrites & bypass CORS; absolute on server)
const getBaseURL = () => {
  if (typeof window !== "undefined") {
    return "/api/v1";
  }
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (envUrl && envUrl.startsWith("http")) {
    return envUrl;
  }
  return "https://oriera-admin-main-1.onrender.com/api/v1";
};

const axiosInstance = axios.create({
  baseURL: getBaseURL(),
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