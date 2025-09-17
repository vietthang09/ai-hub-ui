import { Trash, UserPen } from "lucide-react";
import { Button } from "../../../components/ui/button";

interface UserRowProps {
  email: string;
  role: string;
  onEdit: () => void;
  onDelete: () => void;
}

export default function UserRow({
  email,
  role,
  onEdit,
  onDelete,
}: UserRowProps) {
  return (
    <tr className="border-b">
      <td className="border px-4 py-2 text-center">{email}</td>
      <td className="border px-4 py-2 text-center">{role.toLowerCase()}</td>
      <td className="border px-4 py-2 flex gap-2 justify-center">
        <Button variant="secondary" size="icon" onClick={onEdit}>
          <UserPen size={16} />
        </Button>
        <Button variant="destructive" size="icon" onClick={onDelete}>
          <Trash size={16} />
        </Button>
      </td>
    </tr>
  );
}
