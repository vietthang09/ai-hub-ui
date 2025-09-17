export interface UserItem {
  email: string;
  role: string;
}

export interface CreateUserPayload {
  email: string;
  password: string;
  role?: UserItem["role"];
}

export interface UpdateUserPayload {
  role: string;
}
