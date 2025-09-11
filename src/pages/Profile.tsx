import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getUserService } from "../services/userService";
import type { User } from "../services/types";

export default function Profile() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserService();
        setUser(res);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);
  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-col h-screen items-center justify-center space-y-4">
        <h1 className="text-3xl font-bold">Profile Page</h1>
        {user && <p className="text-lg">Welcome, {user.role}</p>}
      </div>
    </div>
  );
}
