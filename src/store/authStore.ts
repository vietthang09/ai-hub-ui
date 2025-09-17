import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser } from "../services/authService";

interface AuthState {
  authUser: AuthUser | null;
  setAuthUser: (user: AuthUser | null) => void;
  logout: () => void;
}

// Create a Zustand store for authentication state
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      authUser: null,
      setAuthUser: (user) => set({ authUser: user }),
      logout: () => set({ authUser: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
