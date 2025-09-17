import { createContext, useContext, useState, type ReactNode } from "react";

export type UserModalType = "add" | "edit";
export type UserType = {
  email: string | null;
  role: string;
};

interface UserContextType {
  modalType: UserModalType | null;
  setModalType: (modalType: UserModalType | null) => void;

  user: { email: string | null; role: string };
  setUser: (email: string, role: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [modalType, setModalType] = useState<UserModalType | null>(null);
  const [user, _setUser] = useState<UserType>({email: null,role: "",});

  const setUser = (email: string, role: string) => {
    _setUser({ email, role });
  };

  return (
    <UserContext.Provider
      value={{
        modalType,
        setModalType,
        user,
        setUser,
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
