import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import type { User } from "../../services/auth/types";
import Navbar from "../../components/common/Navbar";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserInfo = async () => {
    try {
      setLoading(true);
    } catch (err: any) {
      console.error(err);
      toast.error(
        err?.response?.data?.error || err?.message || "Failed to fetch user"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div className="h-screen flex bg-primary">
      <Navbar>
        <Toaster position="top-right" />
        <div className="flex-1 flex items-center text-white justify-center">
          {loading ? (
            <p>Loading...</p>
          ) : user ? (
            <div className="p-8 rounded text-center space-y-4">
              <h1 className="text-2xl font-bold">Profile Page</h1>
              <p>
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-semibold">Role:</span> {user.role}
              </p>
            </div>
          ) : (
            <p>User data not available.</p>
          )}
        </div>
      </Navbar>
    </div>
  );
}
