import { TableRow, TableCell } from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { Ellipsis, MessageSquare, Info, Star } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
} from "../../../components/ui/dropdown-menu";
import { StarRating } from "../layout/rating";

interface GoogleReviewProps {
  index: number;
  name: string;
  profile_photo: string;
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
  profile_photo,
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
            src={profile_photo}
            alt="Profile"
            className="w-8 h-8 rounded-full"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/default-avatar.png";
            }}
          />

          <span>{name}</span>
        </div>
      </TableCell>

      <TableCell className="px-4 py-2 text-center">{date}</TableCell>

      <TableCell className="px-4 py-2 text-left max-w-xs truncate">
        {reviews && reviews.length > 0
          ? reviews.length > 20
            ? reviews.slice(0, 20) + "..."
            : reviews
          : "—"}
      </TableCell>

      <TableCell className="px-4 py-2 text-center">
        <StarRating rating={rating} />
      </TableCell>

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
