import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { validateLoginForm, validateRegisterForm } from "../utils/validation";
import toast from "react-hot-toast";
import {
  loginService,
  registerSevice,
  type User,
} from "../services/authService";
import { setAuthTokens, setLogoutHandler } from "../services/axiosInstance";

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoggedIn: boolean;
  register: (email: string, password: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  emailError: string;
  passwordError: string;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser) as User;

      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
      setAuthTokens(parsedUser.access_token, parsedUser.refresh_token);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const errors = validateLoginForm(email, password);
    setEmailError(errors.email);
    setPasswordError(errors.password);
    if (errors.email || errors.password) return false;

    try {
      const data = await loginService(email.trim(), password.trim());

      const userData: User = {
        role: data.role,
        email,
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        message: data.message,
      };

      setUser(userData);
      setIsLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(userData));

      setAuthTokens(userData.access_token, userData.refresh_token);

      return true;
    } catch (err: any) {
      if (err.response?.data?.error) toast.error(err.response.data.error);
      else toast.error("Network error. Check console.");
      return false;
    }
  };

  const register = async (email: string, password: string) => {
    const errors = validateRegisterForm(email, password);
    setEmailError(errors.email);
    setPasswordError(errors.password);

    if (errors.email || errors.password) return false;

    try {
      const res = await registerSevice(email.trim(), password.trim());
      toast.success(res.message || "Registered successfully!");
      return true;
    } catch (err: any) {
      if (err.response?.data?.error) toast.error(err.response.data.error);
      else toast.error("Network error. Check console.");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
    toast.success("Logged out ");
    setAuthTokens(null, null);
  };

  setLogoutHandler(logout);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        login,
        register,
        loading,
        logout,
        emailError,
        passwordError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
