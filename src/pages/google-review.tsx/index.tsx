import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../../components/common/Navbar";
import SearchBar from "../../components/common/SearchBar";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead,
} from "../../components/ui/table";
import Pagination from "../users/components/Pagination";
import ReviewRow from "./componets/ReviewRow";
import ReviewDialog from "./componets/ReviewDialog";
import { useReviewContext } from "../../context/review-context";

import { getReviews } from "../../services/review/reviewService"; // import từ service
import type { Review } from "../../services/review/types";
import { Button } from "../../components/ui/button";
import { GitPullRequestArrow } from "lucide-react";

export default function GoogleReviewPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { modalType, setModalType } = useReviewContext();
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const data = await getReviews();
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

  // Filter by name
  const filteredReviews = reviews.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexLastItem = currentPage * itemsPerPage;
  const indexFirstItem = indexLastItem - itemsPerPage;
  const currentReviews = filteredReviews.slice(indexFirstItem, indexLastItem);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, reviews]);

  return (
    <div className="flex h-screen w-full bg-primary">
      <Navbar>
        <Toaster position="top-right" />

        <div className="flex flex-col h-full p-4">
          <div className="flex justify-between items-center -mt-4 mb-6">
            <SearchBar onSearch={setSearchQuery} />
            <Button
              variant={"outline"}
              className="flex items-center gap-2 px-6 py-4 rounded-lg border border-gray-700 text-white hover:bg-gray-500 transition"
              // onClick={() => }
            >
              <span>Pull Reviews</span> <GitPullRequestArrow size={18} />
            </Button>
          </div>

          <div className="flex-1 p-2 border border-gray-700 rounded-lg">
            {loading ? (
              <p className="text-white">Loading reviews...</p>
            ) : filteredReviews.length > 0 ? (
              <>
                <Table>
                  <TableHeader>
                    <TableRow className="text-white border-b border-gray-700">
                      <TableHead className="px-4 py-2 text-left">#</TableHead>
                      <TableHead className="px-4 py-2 text-left">
                        Name
                      </TableHead>
                      <TableHead className="px-4 py-2 text-center">
                        Date
                      </TableHead>
                      <TableHead className="px-4 py-2 text-left">
                        Reviews
                      </TableHead>
                      <TableHead className="px-4 py-2 text-center">
                        Rating
                      </TableHead>
                      <TableHead className="px-4 py-2 text-center">
                        Activity
                      </TableHead>
                      <TableHead className="px-4 py-2 text-center">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentReviews.map((r, index) => (
                      <ReviewRow
                        key={r.external_id}
                        index={index}
                        name={r.name}
                        date={new Date(r.created_at).toLocaleDateString()}
                        reviews={r.content}
                        rating={r.rating}
                        activity={"Not reply"}
                        onDetail={() => {
                          setSelectedReview(r);
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
        <ReviewDialog selectedReview={selectedReview} />
      </Navbar>
    </div>
  );
}
