import { useUserContext } from "../context/UserContext";
import { useAuthStore } from "../store/authStore";
import { useNavigate, useLocation } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import { loginService } from "../services/authService";

import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../utils/validation";
import type z from "zod";
import { useForm } from "react-hook-form";

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/";

  const { setAuthUser } = useAuthStore();
  const { fetchUserInfo } = useUserContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await loginService(data.email.trim(), data.password.trim());
      setAuthUser(res);
      toast.success("Login successful!");
      await fetchUserInfo();
      navigate(from, { replace: true, state: { justLoggedIn: true } });
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Toaster position="top-right" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-100 p-8 rounded-lg shadow-lg w-[400px]"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>

        <Input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="p-2 w-full mb-1"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
        )}

        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="p-2 w-full mb-1"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>
        )}

        <div className="flex justify-end mt-2 text-sm mb-4">
          <p>
            Don&apos;t have an account?{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 rounded w-full"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
