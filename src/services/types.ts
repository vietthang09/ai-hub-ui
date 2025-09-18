export interface UserItem {
  email: string;
  role: string;
}

export interface User extends UserItem {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserPayload {
  email: string;
  password: string;
  role?: UserItem["role"];
}

export interface UpdateUserPayload {
  role: string;
}
