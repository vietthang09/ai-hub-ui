import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { logoutService } from "../../services/authService";
import { Button } from "../ui/button";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutService();
    toast.success("Logged out successfully");
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
