import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function Register() {
  const { register, emailError, passwordError } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await register(email, password);
    if (success) navigate("/login");
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form
        onSubmit={handleRegister}
        className="w-96 p-6 bg-white rounded-2xl shadow-lg space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Register</h1>

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
        {emailError && <p className=" text-red-500 text-sm">{emailError}</p>}

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
        {passwordError && (
          <p className=" text-red-500 text-sm">{passwordError}</p>
        )}

        <Button
          type="submit"
          formNoValidate
          className="w-full  text-white py-2 rounded-md"
        >
          Register
        </Button>

        <p className="text-sm text-center mt-2">
          Already have an account?{" "}
          <span
            className=" text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
