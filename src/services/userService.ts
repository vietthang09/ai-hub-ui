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
  const { data } = await axiosInstance.post<User>(
    `${BASE_URL}/admin/users`,
    payload
  );
  return data;
};

export const updateUser = async (
  oldEmail: string,
  payload: { role?: string }
): Promise<UpdateUserPayload> => {
  const { data } = await axiosInstance.put<UpdateUserPayload>(
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
