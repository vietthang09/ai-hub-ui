import { TableRow, TableCell } from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { Ellipsis, MessageSquare, Info } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
} from "../../../components/ui/dropdown-menu";
 
interface GoogleReviewProps {
  index: number;
  name: string;
  date: string;
  reviews: string;
  rating: number;
  activity: "Not reply" | "Replied";
  onDetail: () => void;
  onRely: () => void;
}

export default function ReviewRow({
  index,
  name,
  date,
  reviews,
  rating,
  activity,
  onDetail,
  onRely,
}: GoogleReviewProps) {
 
  return (
    <TableRow className="text-white border-b border-gray-700 hover:bg-cyan-950">
      <TableCell className="px-4 py-2 text-center">{index + 1}</TableCell>
      <TableCell className="px-4 py-2 text-left">
        <div className="flex items-center gap-3">
          <img
            src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXcaKj0sbOI0nrVXLnFYC2anaYF2nF4meK00njokXMzoA98ouMfN4BQbu36-EkTtgrnH8KnYOl9R6fep9RMmPnUQglS7EkCvJ2cmwQBKHnc5OSVn6R5DAtfeBmLorbzQjIqT-O-oQhjvzDbBbISlzSb0lhaC?key=tE_qip6BHPL4g00JXL_X6Q"
            alt={name}
            className="w-8 h-8 rounded-full"
          />
          <span>{name}</span>
        </div>
      </TableCell>

      {/* Date */}
      <TableCell className="px-4 py-2 text-center">{date}</TableCell>

      {/* Reviews */}
      <TableCell className="px-4 py-2 text-left max-w-xs truncate">
        {reviews.length > 20 ? reviews.slice(0, 20) + "..." : reviews}
      </TableCell>

      {/* Rating */}
      <TableCell className="px-4 py-2 text-center">
        <div className="flex gap-1 justify-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={i < rating ? "text-yellow-400" : "text-gray-600"}
            >
              ★
            </span>
          ))}
        </div>
      </TableCell>

      {/* Activity */}
      <TableCell className="px-4 py-2 text-center">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            activity === "Replied"
              ? "bg-green-900 text-green-400"
              : "bg-gray-800 text-gray-300"
          }`}
        >
          {activity}
        </span>
      </TableCell>

      {/* Actions */}
      <TableCell className="px-4 py-2 text-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="bg-transparent hover:bg-cyan-950 data-[state=open]:bg-cyan-950"
              size="icon"
            >
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
                onClick={onDetail}
                className="flex items-center justify-between text-white focus:bg-gray-800 data-[highlighted]:bg-gray-500"
              >
                <span>Detail</span>
                <Info size={16} className="text-gray-400" />
              </DropdownMenuItem>

              <div className="border-t border-gray-800" />

              <DropdownMenuItem
                onClick={onRely}
                className="flex items-center justify-between text-white focus:bg-gray-800 data-[highlighted]:bg-gray-500"
              >
                <span>Reply</span>
                <MessageSquare size={16} className="text-gray-400" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
