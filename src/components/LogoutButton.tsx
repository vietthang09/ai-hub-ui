import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "../context/auth-context";

export default function LogoutButton() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="absolute top-3 right-4">
      <Button onClick={handleLogout} variant="link" className="px-4 py-2">
        <LogOut className="w-4 h-4" />
      </Button>
    </div>
  );
}
