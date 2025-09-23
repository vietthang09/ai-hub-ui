import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../../components/common/Navbar";
 import SearchBar from "../../components/common/SearchBar";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead as Th,
} from "../../components/ui/table";
import Pagination from "../users/components/Pagination";
import ReviewRow from "./componets/ReviewRow";
import ReviewDialog from "./componets/ReviewDialog";
import { useReviewContext } from "../../context/review-context";

export default function GoogleReviewPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { modalType, setModalType } = useReviewContext();

  // Mock fetch API
  const fetchReviews = async () => {
    setLoading(true);
    try {
      const data = [
        {
          id: 1,
          name: "Expamle A",
          date: "22/09/2025",
          review:
            "Dịch vụ rất tuyệt vời, nhân viên thân thiện và hỗ trợ nhiệt tình. Tôi sẽ quay lại lần sau.",
          rating: 5,
          activity: "Replied",
        },
        {
          id: 2,
          name: "Example B",
          date: "20/09/2025",
          review:
            "Không gian thoáng mát nhưng phục vụ hơi chậm. Hy vọng lần sau cải thiện hơn.",
          rating: 3,
          activity: "Not reply",
        },
      ];
      setReviews(data);
    } catch (err: any) {
      toast.error(err?.message || "Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Filter by name + review content
  const filteredReviews = reviews.filter(
    (r) =>
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.review.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReviews = filteredReviews.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <div className="flex h-screen w-full bg-primary">
      <Navbar>
        <Toaster position="top-right" />

        <div className="flex flex-col h-full p-4">
          <div className="flex justify-between items-center -mt-4 mb-6">
            <SearchBar onSearch={setSearchQuery} />
          </div>

          {/* Table */}
          <div className="flex-1 p-2 border border-gray-700 rounded-lg">
            {loading ? (
              <p className="text-white">Loading reviews...</p>
            ) : filteredReviews.length > 0 ? (
              <>
                <Table>
                  <TableHeader>
                    <TableRow className="text-white border-b border-gray-700">
                      <Th className="px-4 py-2 text-left">#</Th>

                      <Th className="px-4 py-2 text-left">Name</Th>
                      <Th className="px-4 py-2 text-center">Date</Th>
                      <Th className="px-4 py-2 text-left">Reviews</Th>
                      <Th className="px-4 py-2 text-center">Rating</Th>
                      <Th className="px-4 py-2 text-center">Activity</Th>
                      <Th className="px-4 py-2 text-center">Actions</Th>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentReviews.map((r, index) => (
                      <ReviewRow
                        key={r.id}
                        index={index}
                        name={r.name}
                        date={r.date}
                        reviews={r.review}
                        rating={r.rating}
                        activity={r.activity}
                        onDetail={() => {
                          setModalType("detail");
                        }}
                        onRely={() => setModalType("reply")}
                      />
                    ))}
                  </TableBody>
                </Table>

                <Pagination
                  totalItems={filteredReviews.length}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  itemsPerPage={itemsPerPage}
                />
              </>
            ) : (
              <p className="text-red-500">No reviews found</p>
            )}
          </div>
        </div>
        <ReviewDialog />
      </Navbar>
    </div>
  );
}
