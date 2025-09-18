import type { UserItem } from "../services/types";
import { createContext, useContext, useState, type ReactNode } from "react";

type UserModalType = "add" | "edit";

interface UserContextType {
  user: UserItem | null;
  setUser: (user: UserItem | null) => void;
  modalType: UserModalType | null;
  setModalType: (modalType: UserModalType | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserItem | null>(null);
  const [modalType, setModalType] = useState<UserModalType | null>(null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        modalType,
        setModalType,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUserContext must be used inside UserProvider");
  return context;
};
