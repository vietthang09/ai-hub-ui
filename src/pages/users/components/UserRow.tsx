import { Ellipsis, Trash2, UserPen } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { TableCell, TableRow } from "../../../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
   DropdownMenuPortal,
} from "../../../components/ui/dropdown-menu";
 
interface UserRowProps {
  index : number;
  email: string;
  role: string;
  onEdit: () => void;
  onDelete: () => void;
}

export default function UserRow({
  email,
  index,
  role,
  onEdit,
  onDelete,
}: UserRowProps) {
  return (
    <TableRow className=" hover:bg-gray-100">
      {/* <TableCell className="px-4 py-2 text-center">
        <input
          type="checkbox"
          checked={selected}
          onChange={(e) => onSelect(e.target.checked)}
        />
      </TableCell> */}
      <TableCell className="px-4 py-2 text-center">
        {index + 1}
      </TableCell>
      <TableCell className="px-4 py-2 text-center">invited</TableCell>
      <TableCell className="px-4 py-2 text-center">{email}</TableCell>
      <TableCell className="px-4 py-2 text-center">
        {role.toLowerCase()}
      </TableCell>
      <TableCell className="px-4 py-2 text-center">invited</TableCell>

      <TableCell className="px-4 py-2 text-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Ellipsis size={14} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuPortal>
            <DropdownMenuContent
              side="bottom"
              align="end"
              className="w-32 -mt-2 bg-gray-50"
            >
              <DropdownMenuItem
                onClick={onEdit}
                className="flex items-center gap-2 space-x-12"
              >
                <span>Edit</span>
                <UserPen size={16} className="text-gray-500" />
              </DropdownMenuItem>

              <div className=" border-t bg-gray-300"/>


              <DropdownMenuItem
              
                onClick={onDelete}
                className="flex items-center gap-2 space-x-8 text-red-600"
              >
                <span>Delete</span>

                <Trash2 size={16} className="text-gray-500" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
