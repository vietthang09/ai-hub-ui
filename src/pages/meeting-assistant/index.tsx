import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../../components/common/Navbar";
import SearchBar from "../../components/common/SearchBar";
import MeetingRow from "./components/MeetingRow";
import MeetingDialogs from "./components/MeetingDialogs";
import Pagination from "../users/components/Pagination";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead,
} from "../../components/ui/table";
import { useMeetingContext } from "../../context/meeting-context";
import { Button } from "../../components/ui/button";
import { CirclePlus } from "lucide-react";

export default function MeetingAssistant() {
  const { setModalType } = useMeetingContext();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [meetings, setMeetings] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [selectedMeeting, setSelectedMeeting] = useState<any | null>(null);

  const fetchMeetings = async () => {
    setLoading(true);
    try {
const data = [
  {
    id: "m1",
    title: "Marketing",
    appIconBg: "bg-emerald-600",
    appIconEmoji: "📅",
    participants: 19,
    dateLabel: "Tue, April 9",
    timeLabel: "10:00–11:00",
    enabled: true,
    shareLocked: false,
    roomLocked: true,
     link: "https://meet.google.com/m1abc",
    datetime: "2025-09-25T10:00",  
    description: "Discuss marketing strategy Q4",
  },
  {
    id: "m2",
    title: "Quarterly",
    appIconBg: "bg-indigo-600",
    appIconEmoji: "📊",
    participants: 12,
    dateLabel: "Wed, April 10",
    timeLabel: "14:30–15:30",
    enabled: false,
    shareLocked: true,
    roomLocked: false,
    link: "https://meet.google.com/m2xyz",
    datetime: "2025-09-26T14:30",
    description: "Quarterly business review",
  },
  {
    id: "m3",
    title: "Design Handoff",
    appIconBg: "bg-amber-600",
    appIconEmoji: "🎨",
    participants: 8,
    dateLabel: "Fri, April 12",
    timeLabel: "09:00–09:45",
    enabled: true,
    shareLocked: true,
    roomLocked: true,
    link: "https://meet.google.com/m3def",
    datetime: "2025-09-27T09:00",
    description: "Handoff UI/UX to development team",
  },
];

      setMeetings(data);
    } catch (err: any) {
      toast.error(err?.message || "Failed to fetch meetings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const filteredMeetings = meetings.filter(
    (m) =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.participants.toString().includes(searchQuery)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMeetings = filteredMeetings.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="flex h-screen w-full bg-primary text-white">
      <Navbar>
         <div className="flex flex-col h-full p-6 gap-4">
          <div className="flex items-center justify-between">
            <SearchBar onSearch={setSearchQuery} />
            <Button
              onClick={() => setModalType("add")}
              variant="outline"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 text-white hover:bg-gray-800 transition"
            >
              <CirclePlus size={20} />
              <span>Create Meeting</span>
            </Button>
          </div>

          <div className="flex-1 p-2 border border-gray-700 rounded-lg">
            {loading ? (
              <p className="text-gray-300">Loading meetings...</p>
            ) : filteredMeetings.length > 0 ? (
              <>
                <Table>
                  <TableHeader>
                    <TableRow className="text-white border-b border-gray-700">
                      <TableHead className="px-4 py-2 text-left">
                        Meeting
                      </TableHead>
                      <TableHead className="px-4 py-2 text-center">
                        Date
                      </TableHead>
                      <TableHead className="px-4 py-2 pr-12 text-end">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <MeetingRow
                      meetings={currentMeetings}
                      onEdit={(meeting) => {
                        setSelectedMeeting(meeting);
                        setModalType("edit");
                      }}
                    />
                  </TableBody>
                </Table>

                <Pagination
                  totalItems={filteredMeetings.length}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  itemsPerPage={itemsPerPage}
                />
              </>
            ) : (
              <p className="text-red-400 text-center mt-8">No meetings found</p>
            )}
          </div>

          <MeetingDialogs selectedMeeting={selectedMeeting} />
        </div>
      </Navbar>
    </div>
  );
}
