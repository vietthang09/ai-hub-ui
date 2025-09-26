import { useNavigate, useLocation, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "./schemas/login.schema";
import { useAuthStore } from "../../../store/authStore";
import { loginService } from "../../../services/auth/authService";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { AuthLayout } from "../auth-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Label } from "../../../components/ui/label";
import { Eye, EyeOff, Facebook, Github } from "lucide-react";
import { useState } from "react";

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/";
  const [showPassword, setShowPassword] = useState(false);

  const { setAuthUser } = useAuthStore();

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
      navigate(from, { replace: true, state: { justLoggedIn: true } });
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.error || "Login failed");
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="gap-4">
          <CardHeader>
            <CardTitle className="text-lg tracking-tight">
              Login to your account
            </CardTitle>
            <CardDescription>
              Enter your email and password below to log into your account.{" "}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  {...register("email")}
                />
                <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                  {errors.password?.message}
                </p>
              </div>
              <div className="grid gap-2 relative -mt-4">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("password")}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                    ⚠️ {errors.password.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>

            <div className="flex items-center my-4 w-full">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="mx-3 text-xs uppercase text-muted-foreground whitespace-nowrap">
                Or continue with
              </span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" type="button">
                <Github className="h-4 w-4" /> GitHub
              </Button>
              <Button variant="outline" type="button">
                <Facebook className="h-4 w-4" /> Facebook
              </Button>
            </div>
            <Link
              to="/register"
              className="hover:text-primary underline underline-offset-4 text-sm"
            >
              Don’t have an account? Register
            </Link>
          </CardFooter>
        </Card>
      </form>
    </AuthLayout>
  );
}
