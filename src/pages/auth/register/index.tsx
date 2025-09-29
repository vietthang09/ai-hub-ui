import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { registerSchema } from "./schemas/register.schema";
import { registerSevice } from "../../../services/auth/authService";
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
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      const res = await registerSevice(data.email.trim(), data.password.trim());
      toast.success(res.message || "Registered successfully!");
      navigate("/login");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.error || "Registration failed!");
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="gap-4">
           <CardHeader>
            <CardTitle className="text-lg tracking-tight">
              Create an account
            </CardTitle>
            <CardDescription className="text-sm">
              Enter your email and password to create an account. Already have
              an account?{" "}
              <Link
                to="/login"
                className="hover:text-primary underline underline-offset-4"
              >
                Sign In
              </Link>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-6">
              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  {...registerField("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="grid gap-2 -mt-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...registerField("password")}
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
                  <p className="text-sm text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Registering..." : "Register"}
            </Button>

            <div className="flex items-center my-4 w-full">
  
            </div>

          </CardFooter>
        </Card>
      </form>
    </AuthLayout>
  );
}
