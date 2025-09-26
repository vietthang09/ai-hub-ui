import axiosInstance from "../axiosInstance";
import type { User } from "./types";
import { useAuthStore } from "../../store/authStore";

 
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
  const { data } = await axiosInstance.post<AuthUser>(
    `/api/auth/login`,
    {
      email,
      password,
    }
  );

  useAuthStore.getState().setAuthUser(data);

  return data;
};

export const registerSevice = async (
  email: string,
  password: string
): Promise<RegisterResponse> => {
  const { data } = await axiosInstance.post<RegisterResponse>(
    `/api/auth/register`,
    { email, password }
  );
  return data;
};

export const logoutService = async (refresh_token: string) => {
  if (!refresh_token) throw new Error("Missing refresh token");

  const { data } = await axiosInstance.post<RegisterResponse>(
    `/api/auth/logout`,
    { refresh_token }
  );

  return data;
};

