import {
  Calendar,
  Clock,
  Dock,
  Link,
   SquarePen,
   Users,
} from "lucide-react";
import { TableCell, TableRow } from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { useState } from "react";

interface MeetingRowProps {
  meetings: any[];
  onEdit: (meeting: any) => void;
}

export default function MeetingRow({ meetings, onEdit }: MeetingRowProps) {
  const [meetingList] = useState(meetings);

  return (
    <>
      {meetingList.map((m) => (
        <TableRow
          key={m.id}
          className="text-white border-b border-gray-700 hover:bg-gray-800 transition"
        >
          <TableCell colSpan={3} className="py-4 px-2">
            <div className="flex items-center justify-between gap-6 w-full">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`h-10 w-10 rounded-md grid place-items-center ${m.appIconBg}`}
                >
                  <span className="text-lg">{m.appIconEmoji}</span>
                </div>
                <div className="min-w-0 flex flex-col">
                  <div className="text-sm font-semibold text-white truncate">
                    {m.title}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-400">
                    <span className="inline-flex items-center gap-1">
                      <Users size={12} />
                      {m.participants}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Link size={12} />
                      Link
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Dock size={12} />
                      Dock
                    </span>
                  </div>
                </div>
              </div>

               <div className="flex flex-col sm:flex-row items-start mr-28 sm:items-center gap-2 text-sm text-gray-300">
                <span className="inline-flex items-center gap-1">
                  <Calendar size={12} />
                  {m.dateLabel}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock size={12} />
                  {m.timeLabel}
                </span>
              </div>
              <div className="flex justify-between items-center mr-8 mt-2 pt-8">
                <Button
                  type="button"
                    onClick={() => onEdit(m)}
                  className="h-8 w-auto px-3 rounded-full hover:bg-white/10 transition flex items-center gap-2"
                >
                  <span>Edit</span>
                  <SquarePen size={16} className="text-gray-400" />
                </Button>
              </div>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
