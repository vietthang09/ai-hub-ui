import { useEffect, useState } from "react";

import toast, { Toaster } from "react-hot-toast";
import type { UserItem } from "../../services/types";
import { useUserContext } from "../../context/user-context";
import { deleteUser, getUsers } from "../../services/userService";
import { Button } from "../../components/ui/button";
import UserRow from "./components/UserRow";
import UserDialogs from "./components/UserDialogs";
import Navbar from "../../components/common/Navbar";
import SearchBar from "../../components/common/SearchBar";
 
export default function UsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { modalType, setModalType, setUser } = useUserContext();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err: any) {
      toast.error(err?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (email: string) => {
    try {
      await deleteUser(email);
      toast.success("User deleted!");
      fetchUsers();
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete user");
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.role?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

  return (
    <div className="ml-72 h-screen flex flex-col overflow-hidden bg-gray-50">
      <Toaster position="top-right" />
      <Navbar />

      <div className="flex-1 flex flex-col p-4 overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <SearchBar onSearch={setSearchQuery} />
          <Button variant="secondary" onClick={() => setModalType("add")}>
            Add User
          </Button>
        </div>

        <div className="flex-1 overflow-auto">
          {loading ? (
            <p className="text-gray-500">Loading users...</p>
          ) : filteredUsers.length > 0 ? (
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2 text-center">Email</th>
                  <th className="border px-4 py-2 text-center w-40">Role</th>
                  <th className="border px-4 py-2 text-center w-32">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <UserRow
                    key={user.email}
                    email={user.email}
                    role={user.role || "user"}
                    onEdit={() => {
                      setUser(user);
                      setModalType("edit");
                    }}
                    onDelete={() => handleDelete(user.email)}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-red-500">No users found</p>
          )}
        </div>
      </div>

      <UserDialogs />
    </div>
  );
}
