import { useState } from "react";
import { deleteUser } from "../../services/userService";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { useUserContext } from "../../context/user-context";

export default function ConfirmDeleteDialog({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const { user, setModalType } = useUserContext();
  const [loading, setLoading] = useState(false);

  const handleRemove = async () => {
    try {
      if (!user) return;
      setLoading(true);
      await deleteUser(user.email);
      toast.success("User deleted!");
      onSuccess();
      setModalType(null);
    } catch {
      toast.error("Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button variant="destructive" onClick={handleRemove} disabled={loading}>
        {loading ? "Removing..." : "Remove"}
      </Button>
    </div>
  );
}
