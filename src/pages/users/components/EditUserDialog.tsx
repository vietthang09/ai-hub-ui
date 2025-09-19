import { useState } from "react";
import toast from "react-hot-toast";
import { useUserContext } from "../../../context/user-context";
import { updateUser } from "../../../services/userService";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

export default function EditUserDialog() {
  const { user, setUser, setModalType, modalType, setReload } =
    useUserContext();

  const handleSuccess = () => {
    setReload((prev) => !prev);
  };

  if (!user) return null;

  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!user) return;
    try {
      setLoading(true);
      await updateUser(user.email, { role: user.role }).then((res) => {
        toast.success(res.message);
        handleSuccess();
        setModalType(null);
        setUser(null);
      });
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
          setUser(null);
        }
      }}
    >
      <DialogContent className="sm:max-w-[28rem] bg-white rounded-lg shadow-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-base text-black">
            Edit User
            <DialogDescription className="text-gray-500 text-xs">
              Update the user here. Click save when you're done.
            </DialogDescription>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <label className="block text-sm font-medium">Email</label>

          <Input
            value={user.email || ""}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
          />
          <label className="block text-sm font-medium">Role</label>

          <Select
            value={user.role}
            onValueChange={(value) =>
              user.email && setUser({ ...user, role: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DialogFooter className="z-10">
          <Button onClick={handleUpdate} variant="default" disabled={loading}>
            {loading ? "Saving..." : "Save changes"}
          </Button>
         
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
