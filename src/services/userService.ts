import axiosInstance from "./axiosInstance";
import type { User } from "./types";

export const getUserService = async (): Promise<User> => {
  const { data } = await axiosInstance.get<User>(`/user_info`);
  return data;
};
