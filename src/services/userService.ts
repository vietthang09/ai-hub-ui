import axiosInstance from "./axiosInstance";
import type { CreateUserPayload, UpdateUserPayload, User } from "./types";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getUsers = async (): Promise<User[]> => {
  const { data } = await axiosInstance.get<User[]>(`${BASE_URL}/admin/users`);
  return data;
};

export const getUserInfo = async (): Promise<User> => {
  const { data } = await axiosInstance.get<User>(`${BASE_URL}/user_info`);
  return data;
};

export const createUser = async (payload: CreateUserPayload): Promise<User> => {
  try {
    const { data } = await axiosInstance.post<User>(
      `${BASE_URL}/admin/users`,
      payload
    );
    return data;
  } catch (err: any) {
    if (err.response?.status === 409) {
      throw new Error("Email already exists");
    }
    throw err;
  }
};

interface UpdateUserResponse {
  message: string
}
export const updateUser = async (
  oldEmail: string,
  payload: { role?: string }
): Promise<UpdateUserResponse> => {
  const { data } = await axiosInstance.put<UpdateUserResponse>(
    `${BASE_URL}/admin/user/${encodeURIComponent(oldEmail)}`,
    payload
  );
  return data;
};

export const deleteUser = async (email: string): Promise<void> => {
  await axiosInstance.delete(
    `${BASE_URL}/admin/user/${encodeURIComponent(email)}`
  );
};
