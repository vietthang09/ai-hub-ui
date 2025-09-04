import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

export default function Home() {
  const navigate = useNavigate();

  const handleGoToProfile = () => {
    // localStorage.removeItem("isLoggedIn");
    navigate("/profile");
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">Welcome to Home Page</h1>
      <LogoutButton />
      <button
        onClick={handleGoToProfile}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Go to Profile (Login again)
      </button>
    </div>
  );
}
