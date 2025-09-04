import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || "/";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "thu thao" && password === "123") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify({ email }));
      navigate(from, { replace: true });
    } else {
      alert("Invalid email or password!");
      localStorage.setItem("isLoggedIn", "false");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleLogin}
        className="bg-gray-100 p-8 rounded-lg shadow-lg w-[400px]"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
        <Input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className=" p-2 w-full mb-2"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className=" p-2 w-full mb-2"
        />
        <Button type="submit" className=" px-4 py-2 rounded w-full">
          Login
        </Button>
      </form>
    </div>
  );
}
