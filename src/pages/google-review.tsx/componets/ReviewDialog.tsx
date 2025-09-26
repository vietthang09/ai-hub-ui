 import { useReviewContext } from "../../../context/review-context";
 import DetailReviewDialog from "./DetailReviewDialog";
import RelyReviewDialog from "./RelyReviewDialog";

export default function ReviewDialog({
  selectedReview,
  selectedRely,
}: {
  selectedReview: any | null;
  selectedRely: any | null;
}) {
  const { modalType } = useReviewContext();

  if (modalType === "detail") {
    return <DetailReviewDialog selectedReview={selectedReview} />;
  }

  if (modalType === "reply") {
    return <RelyReviewDialog selectedRely={selectedRely} />;
  }

  return null;
}

