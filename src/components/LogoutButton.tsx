import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="absolute top-4 right-4">
      <Button
        onClick={handleLogout}
        variant="destructive"
        className="px-4 py-2"
      >
        Logout
      </Button>
    </div>
  );
}
