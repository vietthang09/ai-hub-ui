import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useAuth } from "../context/auth-context";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const { login, emailError, passwordError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate(from, { replace: true, state: { justLoggedIn: true } });
    } else {
      toast.error("Network error. Check console.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Toaster position="top-right" />
      <form
        onSubmit={handleLogin}
        className="bg-gray-100 p-8 rounded-lg shadow-lg w-[400px]"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 w-full mb-2"
        />
        {emailError && (
          <p className="text-red-500 text-sm mb-2">{emailError}</p>
        )}

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 w-full mb-2"
        />
        {passwordError && (
          <p className="text-red-500 text-sm mb-2">{passwordError}</p>
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
          formNoValidate
          className="px-4 py-2 rounded w-full"
        >
          Login
        </Button>
      </form>
    </div>
  );
}
