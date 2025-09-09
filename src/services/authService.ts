import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL; 

export interface User {
  email: string;
  role: string;
}


export interface RegisterResponse {
  message: string;
  user?: User; 
}

export const loginService = async (
  email: string,
  password: string
): Promise<User> => {
  const { data } = await axios.post<User>(`${BASE_URL}/login`, {
    email,
    password,
  });
  return data;
};

export const registerSevice = async (
  email: string,
  password: string
 ): Promise<RegisterResponse> => {
  const { data } = await axios.post<RegisterResponse>(
    `${BASE_URL}/register`,
    { email, password }
  );
  return data;
};
