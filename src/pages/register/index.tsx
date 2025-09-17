import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { registerSchema } from "../users/schemas/register.schema";
import { registerSevice } from "../../services/authService";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const navigate = useNavigate();

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
    <div className="h-screen flex items-center justify-center">
      <Toaster position="top-right" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 p-6 bg-white rounded-2xl shadow-lg space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Register</h1>

        <Input
          type="email"
          placeholder="Email"
          {...registerField("email")}
          className="w-full p-2 border rounded-md"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <Input
          type="password"
          placeholder="Password"
          {...registerField("password")}
          className="w-full p-2 border rounded-md"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full text-white py-2 rounded-md"
        >
          {isSubmitting ? "Registering..." : "Register"}
        </Button>

        <p className="text-sm text-center mt-2">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
