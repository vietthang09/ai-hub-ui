import {
  loginService,
  registerSevice,
  type AuthUser,
} from "../services/authService";
import {
  setEmailError,
  setPasswordError,
  logout as logoutAction,
  setAuthUser,
} from "./authSlice";
import toast from "react-hot-toast";
import { validateLoginForm, validateRegisterForm } from "../utils/validation";
import { persistor, type AppDispatch } from ".";

export const login =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    const errors = validateLoginForm(email, password);
    dispatch(setEmailError(errors.email));
    dispatch(setPasswordError(errors.password));
    if (errors.email || errors.password) return false;

    try {
      const data = await loginService(email.trim(), password.trim());
      const authUser: AuthUser = {
        email,
        role: data.role,
        message: data.message,
        access_token: data.access_token,
        refresh_token: data.refresh_token,
      };

      dispatch(setAuthUser(authUser));

      return true;
    } catch (err: any) {
      if (err.response?.data?.error) toast.error(err.response.data.error);
      else toast.error("Network error. Check console.");
      return false;
    }
  };

export const register =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    const errors = validateRegisterForm(email, password);
    dispatch(setEmailError(errors.email));
    dispatch(setPasswordError(errors.password));
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

export const logout = () => async (dispatch: AppDispatch) => {
  dispatch(logoutAction());
  await persistor.flush();
  await persistor.purge();
  toast.success("Logged out!");
};
