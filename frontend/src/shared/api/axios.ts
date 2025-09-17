import axios from "axios";
import { authStore } from "@/features/auth/store/auth.store";
import { getErrorMessage } from "../utils/getErrorMessage";

// Main instance used throughout the app
const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

// Set Authorization header from store
axiosInstance.interceptors.request.use((config) => {
  const token = authStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor for handling 401 + token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and retry has not been attempted yet
    // Prevent refresh on login failure
    const isLoginRequest = originalRequest.url.includes("/login");
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isLoginRequest
    ) {
      originalRequest._retry = true;

      try {
        // Use base axios to avoid infinite loop
        const res = await axios.get("/api/auth/refresh", {
          withCredentials: true,
        });

        const { accessToken, user } = res.data;
        // Update store with new token
        authStore.getState().setAuth(accessToken, user);
        // Update header for original failed request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // Retry original request
        return axiosInstance(originalRequest);
      } catch (err) {
        // If refresh fails, logout and redirect to login
        await authStore.getState().logout();
        console.log(getErrorMessage(err));
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
