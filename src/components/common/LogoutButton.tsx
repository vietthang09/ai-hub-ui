import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { logoutService } from "../../services/auth/authService";
import { useAuthStore } from "../../store/authStore";
import { Button } from "../ui/button";

export default function LogoutButton() {
  const navigate = useNavigate();
  const authStore = useAuthStore.getState();

  const handleLogout = async () => {
     console.log("Logout button clicked");
    try {
      const refreshToken = authStore.authUser?.refresh_token;
      if (!refreshToken) {
        toast.error("No refresh token found");
        return;
      }

       await logoutService(refreshToken);

       authStore.logout();

       toast.success("Logged out successfully");
      navigate("/login");
    } catch (err: any) {
      toast.error(err?.message || "Failed to log out");
    }
  };

  return (
  <Button
    onClick={handleLogout}
    variant="ghost"
  className="flex justify-start w-full -px-6"
  >
    Sign out
  </Button>

  );
}
