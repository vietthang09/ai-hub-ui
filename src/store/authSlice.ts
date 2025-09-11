import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser } from "../services/authService";

interface AuthState {
  authUser: AuthUser | null;
  loading: boolean;
  emailError: string;
  passwordError: string;
}

const initialState: AuthState = {
  authUser: null,
  loading: false,
  emailError: "",
  passwordError: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<AuthUser | null>) => {
      const next = action.payload;
      state.authUser = next ? { ...(state.authUser ?? {}), ...next } : null;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setEmailError: (state, action: PayloadAction<string>) => {
      state.emailError = action.payload;
    },
    setPasswordError: (state, action: PayloadAction<string>) => {
      state.passwordError = action.payload;
    },
    logout: (state) => {
      state.authUser = null;
    },
  },
});

export const {
  setAuthUser,
  setLoading,
  setEmailError,
  setPasswordError,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
