import { useReviewContext } from "../../../context/review-context";
 import DetailReviewDialog from "./DetailReviewDialog";
import RelyReviewDialog from "./RelyReviewDialog";

export default function ReviewDialog() {
    const { modalType } = useReviewContext()

    if (modalType === "detail") {
        return <DetailReviewDialog />
    }

    if (modalType === "reply") {
        return <RelyReviewDialog />
    }

}