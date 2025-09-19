import { useNavigate } from "react-router-dom";
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
    <Button
      onClick={handleLogout}
      variant="ghost"
      className=" justify-start -px-2"
    >
      Sign out
    </Button>
  );
}
