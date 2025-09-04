import Navbar from "../components/Navbar";
import { useAuth } from "../context/auth-context";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-col h-screen items-center justify-center space-y-4">
        <h1 className="text-3xl font-bold">Profile Page</h1>
        {user && <p className="text-lg">Welcome, {user.email}</p>}
      </div>
    </div>
  );
}
