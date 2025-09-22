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
  index: number;
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
    <TableRow className="text-white border-b border-gray-700 hover:bg-cyan-950">
      {/* <TableCell className="px-4 py-2 text-center">
        <input
          type="checkbox"
          checked={selected}
          onChange={(e) => onSelect(e.target.checked)}
        />
      </TableCell> */}
      <TableCell className="px-4 py-2 text-center">{index + 1}</TableCell>
      <TableCell className="px-4 py-2 text-center">invited</TableCell>
      <TableCell className="px-4 py-2 text-center">{email}</TableCell>
      <TableCell className="px-4 py-2 text-center">
        {role.toLowerCase()}
      </TableCell>
      <TableCell className="px-4 py-2 text-center">invited</TableCell>

      <TableCell className="px-4 py-2 text-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button   className="bg-transparent hover:bg-cyan-950 data-[state=open]:bg-cyan-950" size="icon">
              <Ellipsis size={14} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuPortal>
            <DropdownMenuContent
              side="bottom"
              align="end"
            
              className="w-36 -mt-2 border-gray-600 bg-gray-950"
            >
              <DropdownMenuItem
                onClick={onEdit}
                className="flex items-center text-white gap-6 space-x-12 focus:bg-gray-800 focus:text-white data-[highlighted]:bg-gray-800 data-[highlighted]:text-white"
              >
                <span>Edit</span>
                <UserPen size={16} className="text-gray-400" />
              </DropdownMenuItem>

              <div className=" border-t border-gray-800" />

              <DropdownMenuItem
                onClick={onDelete}
                className="flex items-center gap-6 space-x-8 text-red-600 
             focus:bg-gray-800 focus:text-red-600 
             data-[highlighted]:bg-gray-800 data-[highlighted]:text-red-600"
              >
                <span>Delete</span>

                <Trash2 size={16} className="text-gray-400" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
