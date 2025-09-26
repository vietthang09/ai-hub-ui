import axiosInstance from "../axiosInstance";
import type { CreateUserPayload, UpdateUserPayload, User } from "./types";

 
export const getUsers = async (): Promise<User[]> => {
  const { data } = await axiosInstance.get<User[]>(`/admin/users`);
  return data;
};


export const createUser = async (payload: CreateUserPayload): Promise<User> => {
  try {
    const { data } = await axiosInstance.post<User>(
      `/admin/users`,
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
  message: string;
}
export const updateUser = async (
  oldEmail: string,
  payload: { role?: string }
): Promise<UpdateUserResponse> => {
  const { data } = await axiosInstance.put<UpdateUserResponse>(
    `/admin/user/${encodeURIComponent(oldEmail)}`,
    payload
  );
  return data;
};

export const deleteUser = async (email: string): Promise<void> => {
  await axiosInstance.delete(
    `/admin/user/${encodeURIComponent(email)}`
  );
};
