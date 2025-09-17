import { useState } from "react";
import { updateUser } from "../../services/userService";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import toast from "react-hot-toast";
import { useUserContext } from "../../context/user-context";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";

export default function EditUserDialog({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const { user, setUser, setModalType, modalType } = useUserContext();
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!user.email) return;
    try {
      setLoading(true);
      await updateUser(user.email, { role: user.role });
      toast.success("User updated!");
      onSuccess();
      setModalType(null);
      setUser("", "");
    } catch {
      toast.error("Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={modalType === "edit"}
      onOpenChange={(open) => {
        if (!open) {
          setModalType(null);
          setUser("", "");
        }
      }}
    >
      <DialogContent className="sm:max-w-[33rem] bg-white rounded-lg shadow-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-base text-gray-500">
            Edit User Role
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Input
            value={user.email || ""}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
          />
          <select
            value={user.role}
            onChange={(e) => user.email && setUser(user.email, e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <DialogFooter className="flex justify-end gap-2 mt-4">
          <Button onClick={handleUpdate} variant="secondary" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setModalType(null);
              setUser("", "");
            }}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
