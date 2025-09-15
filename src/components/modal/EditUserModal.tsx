import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { Button } from "../ui/button";

interface EditUserModalProps {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  email: string | null;
  role: string;
  onSave: (role: string) => Promise<void>;
}

export default function EditUserModal({
  open,
  onOpenChange,
  email,
  role,
  onSave,
}: EditUserModalProps) {
  const [editRole, setEditRole] = useState(role);

  useEffect(() => {
    setEditRole(role);
  }, [role]);

  const handleSave = async () => {
    if (!email) return;
    if (!editRole.trim()) {
      toast("Role không đổi");
      onOpenChange(false);
      return;
    }
    await onSave(editRole.trim());
    onOpenChange(false);
  };

  return (
    <Modal
      isOpen={open}
      onOpenChange={onOpenChange}
      classNames={{
        backdrop: "bg-black/30 backdrop-blur-sm",
      }}
      placement="center"
    >
      <ModalContent className="w-[33rem] bg-white rounded-lg shadow-lg flex flex-col p-6">
        <ModalHeader className="flex justify-center">
          <h2 className="text-lg font-semibold">Edit User Role</h2>
        </ModalHeader>
        <ModalBody className="flex flex-col gap-4">
          <p>Email: {email}</p>
          <select
            value={editRole}
            onChange={(e) => setEditRole(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </ModalBody>
        <ModalFooter className="flex justify-end gap-2 mt-2">
          <Button onClick={handleSave}>Save</Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
