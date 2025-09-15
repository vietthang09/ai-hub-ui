import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { User } from "../services/types";
import {
  getUsers,
  getUserInfo,
  createUser,
  updateUser,
  deleteUser,
} from "../services/userService";

interface UserContextType {
  users: User[];
  selectedUser: User | null;
  loading: boolean;

  fetchUsers: () => Promise<User[]>;
  fetchUserInfo: () => Promise<User | null>;
  addUser: (
    email: string,
    password: string,
    role?: User["role"]
  ) => Promise<User | undefined>;
  editUser: (oldEmail: string, changes: { role?: string }) => Promise<User>;
  removeUser: (email: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUserContext must be used within UserProvider");
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUserInfo = useCallback(async () => {
    setLoading(true);
    try {
      const user = await getUserInfo();
      setSelectedUser(user);
      return user;
    } finally {
      setLoading(false);
    }
  }, []);

  const addUser = async (
    email: string,
    password: string,
    role?: User["role"]
  ) => {
    if (!selectedUser || selectedUser.role !== "admin") {
      throw new Error("Bạn không có quyền thêm user mới");
    }

    const created = await createUser(
      role ? { email, password, role } : { email, password }
    );

    setUsers((prev) => {
      const exists = prev.some((u) => u.email === created.email);
      return exists
        ? prev.map((u) => (u.email === created.email ? created : u))
        : [...prev, created];
    });

    return created;
  };

  const editUser = async (oldEmail: string, changes: { role?: string }) => {
    const payload: { role?: string } = {};
    if (changes.role?.trim()) payload.role = changes.role.trim();

    await updateUser(oldEmail, payload);
    const updatedUsers = await getUsers();

    setUsers(updatedUsers);
    setSelectedUser((prev) =>
      prev?.email === oldEmail
        ? updatedUsers.find((u) => u.email === oldEmail) || prev
        : prev
    );

    return updatedUsers.find((u) => u.email === oldEmail)!;
  };

  const removeUser = async (email: string) => {
    await deleteUser(email);
    setUsers((prev) => prev.filter((u) => u.email !== email));
    setSelectedUser((prev) => (prev?.email === email ? null : prev));
  };

  return (
    <UserContext.Provider
      value={{
        users,
        selectedUser,
        loading,
        fetchUsers,
        fetchUserInfo,
        addUser,
        editUser,
        removeUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
