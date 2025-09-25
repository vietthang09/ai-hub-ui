 import { useReviewContext } from "../../../context/review-context";
 import DetailReviewDialog from "./DetailReviewDialog";
import RelyReviewDialog from "./RelyReviewDialog";

export default function ReviewDialog({ selectedReview }: { selectedReview: any | null }) {
    const { modalType } = useReviewContext();

    if (modalType === "detail") {
        return <DetailReviewDialog selectedReview={selectedReview} />
    }

    if (modalType === "reply") {
        return <RelyReviewDialog />
    }

    return null;
}
