import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { useUserContext } from "../context/UserContext";
import EditUserModal from "../components/modal/EditUserModal";
import AddUserModal from "../components/modal/AddUserModal";
import UserRow from "../components/modal/UserRow";
import { Button } from "../components/ui/button";

export default function UserTable() {
  const {
    users,
    loading,
    fetchUsers,
    fetchUserInfo,
    addUser,
    editUser,
    removeUser,
  } = useUserContext();

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editingEmail, setEditingEmail] = useState<string | null>(null);
  const [editingRole, setEditingRole] = useState("");

  useEffect(() => {
    Promise.all([fetchUsers(), fetchUserInfo()]).catch((err: any) => {
      toast.error(err?.message || "Failed to init");
    });
  }, [fetchUsers, fetchUserInfo]);

  const handleEditSave = async (role: string) => {
    if (!editingEmail) return;
    try {
      await editUser(editingEmail, { role });
      toast.success("User updated!");
      setOpenEdit(false);
      setEditingEmail(null);
    } catch (err: any) {
      toast.error(err?.message || "Failed to update user");
    }
  };

  const handleDelete = async (email: string) => {
    try {
      await removeUser(email);
      toast.success("User deleted!");
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete user");
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Toaster position="top-right" />
      <Navbar />

      <div className="flex flex-col flex-1 items-center  space-y-6 p-4">
        <h1 className="text-3xl font-bold">User List</h1>
        <div className="flex flex-col items-start space-y-4">
          <Button
            className="btn btn-primary"
            onClick={() => {
              console.log("click add user");
              setOpenAdd(true);
            }}
          >
            Add User
          </Button>
        </div>

        <div className="w-full max-w-3xl overflow-x-auto mt-4">
          {loading ? (
            <p className="text-gray-500">Loading users...</p>
          ) : users.length > 0 ? (
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left">Email</th>
                  <th className="border px-4 py-2 text-left">Role</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <UserRow
                    key={u.email}
                    email={u.email}
                    role={u.role || "user"}
                    onEdit={() => {
                      setEditingEmail(u.email);
                      setEditingRole(u.role || "user");
                      setOpenEdit(true);
                    }}
                    onDelete={() => handleDelete(u.email)}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-red-500 mt-2">No users found</p>
          )}
        </div>
      </div>

      <AddUserModal
        open={openAdd}
        onOpenChange={setOpenAdd}
        addUser={addUser}
      />
      <EditUserModal
        open={openEdit}
        onOpenChange={setOpenEdit}
        email={editingEmail}
        role={editingRole}
        onSave={handleEditSave}
      />
    </div>
  );
}
