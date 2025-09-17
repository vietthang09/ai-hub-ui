import axiosInstance from "./axiosInstance";
import type { User } from "./types";
import { useAuthStore } from "../store/authStore";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export interface AuthUser extends User {
  email: string;
  role: string;
  message: string;
  access_token: string;
  refresh_token: string;
}

export interface RegisterResponse {
  role: string;
  message: string;
  user?: AuthUser;
}

export const loginService = async (
  email: string,
  password: string
): Promise<AuthUser> => {
  const { data } = await axiosInstance.post<AuthUser>(`${BASE_URL}/login`, {
    email,
    password,
  });

  useAuthStore.getState().setAuthUser(data);

  return data;
};

export const registerSevice = async (
  email: string,
  password: string
): Promise<RegisterResponse> => {
  const { data } = await axiosInstance.post<RegisterResponse>(
    `${BASE_URL}/register`,
    { email, password }
  );
  return data;
};

export const logoutService = (): void => {
  const { logout } = useAuthStore.getState();
  logout();
};
