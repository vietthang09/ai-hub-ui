import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { Mail, Phone, Shield, Calendar } from "lucide-react";
import EditProfileModal from "../components/modal/EditProfileDialog";
import { getUserInfo } from "../services/userService";
import type { User } from "../services/types";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      const data = await getUserInfo();
      setUser(data);
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
    <div className="h-screen flex">
      <Toaster position="top-right" />
      <Navbar />

      <div className="ml-72 flex-1 bg-gray-50 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            Loading profile...
          </div>
        ) : user ? (
          <div className="max-w-5xl mx-auto">
            {/* Banner */}
            <div className="relative h-48 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-b-xl shadow">
              {/* Avatar */}
              <div className="absolute -bottom-16 left-8">
                <img
                  src="https://i.pinimg.com/474x/37/81/49/3781495f0af90005c96520aee7cd0c21.jpg"
                  alt="User Avatar"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
              </div>
            </div>

            <div className="mt-20 px-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    {"Thu Thao"}
                  </h1>
                  <span
                    className={`inline-block mt-2 px-3 py-1 text-sm font-medium rounded-full ${
                      user.role === "admin"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {user.role}
                  </span>
                </div>
                <>
                  <EditProfileModal />
                </>
              </div>

              {/* Info grid */}
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow">
                  <Mail className="text-indigo-500" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow">
                  <Phone className="text-indigo-500" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{"N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow">
                  <Shield className="text-indigo-500" />
                  <div>
                    <p className="text-sm text-gray-500">Role</p>
                    <p className="font-medium">{user.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow">
                  <Calendar className="text-indigo-500" />
                  <div>
                    <p className="text-sm text-gray-500">Joined</p>
                    <p className="font-medium">{"Unknown"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-red-500">
            No user data
          </div>
        )}
      </div>
    </div>
  );
}
