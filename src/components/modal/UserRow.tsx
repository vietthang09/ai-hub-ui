import { Button } from "../ui/button";

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
      <td className="border px-4 py-2">{email}</td>
      <td className="border px-4 py-2">{role.toLowerCase()}</td>
      <td className="border px-4 py-2 flex gap-2 justify-center">
        <Button variant="outline" onClick={onEdit}>
          Edit
        </Button>
        <Button variant="destructive" onClick={onDelete}>
          Delete
        </Button>
      </td>
    </tr>
  );
}
