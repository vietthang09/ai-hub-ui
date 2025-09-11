// src/services/axiosInstance.ts
import axios from "axios";
import type { User } from "./authService";
import { useAuth } from "../context/auth-context";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

let currentAccessToken: string | null = null;
let currentRefreshToken: string | null = null;
let logout: (() => void) | null = null;

// Function to set tokens and logout function
export const setAuthTokens = (
  access: string | null,
  refresh: string | null
) => {
  currentAccessToken = access;
  currentRefreshToken = refresh;
};

export const setLogoutHandler = (handler: () => void) => {
  logout = handler;
};

// request interceptor
axiosInstance.interceptors.request.use((config) => {
  if (currentAccessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${currentAccessToken}`,
    };
  }
  return config;
});

// response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("[Response] Success:", response.status);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log("originalRequest:", originalRequest);

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { user } = useAuth();
      if (!user) {
        if (logout) logout();
      }
      if (currentRefreshToken) {
        try {
          const response = await axios.post(`${BASE_URL}/refresh`, {
            refresh_token: user?.refresh_token,
          });
          const data = response.data as User;

          currentAccessToken = data.access_token;
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${data.access_token}`;

          return axiosInstance(originalRequest);
        } catch (err) {
          console.log("[Interceptor] Refresh token failed, call logout()");
          if (logout) logout();
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
