import axiosInstance from "./axiosInstance";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export interface User {
  email: string;
  role: string;
  message: string;
  access_token: string;
  refresh_token: string;
}

export interface RegisterResponse {
  role: string;
  message: string;
  user?: User;
}

export const loginService = async (
  email: string,
  password: string
): Promise<User> => {
  const { data } = await axiosInstance.post<User>(`${BASE_URL}/login`, {
    email,
    password,
  });
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
