import axios from "axios";
import { useAuthStore } from "../store/authStore";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// request interceptor
axiosInstance.interceptors.request.use((config) => {
  const authUser = useAuthStore.getState().authUser;
  config.headers = config.headers ?? {};
  if (authUser?.access_token) {
    config.headers.Authorization = `Bearer ${authUser.access_token}`;
  }
  return config;
});

// response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { authUser, setAuthUser, logout } = useAuthStore.getState();

      if (!authUser?.refresh_token) {
        logout();
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${BASE_URL}/api/auth/refresh`, {
          refresh_token: authUser.refresh_token,
        });
        const data = response.data as { access_token: string };

        setAuthUser({
          ...authUser,
          access_token: data.access_token,
        });

        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${data.access_token}`;

        return axiosInstance(originalRequest);
      } catch (err) {
        console.log("[Interceptor] Refresh token failed, call logout()");
        logout();
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
