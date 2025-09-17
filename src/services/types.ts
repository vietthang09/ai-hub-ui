export interface User {
  email: string;
  role: string;
}

export interface CreateUserPayload {
  email: string;
  password: string;
  role?: User["role"];
}

export interface UpdateUserPayload {
  role: string;
}
