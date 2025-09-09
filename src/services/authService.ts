import axios from "axios";

const API_URL = "http://192.168.1.130:5000";

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
  const { data } = await axios.post<User>(`${API_URL}/login`, {
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
    `${API_URL}/register`,
    { email, password, name }
  );
  return data;
};
