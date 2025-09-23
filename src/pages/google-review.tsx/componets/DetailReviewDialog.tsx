 import { useReviewContext } from "../../../context/review-context";
import { Dialog, DialogContent, DialogHeader ,DialogTitle } from "../../../components/ui/dialog";

export default function DetailReviewDialog() {
  const { modalType, setModalType } = useReviewContext();

  return (
    <Dialog open={modalType === "detail"} onOpenChange={(open) => {
        if (!open){
            setModalType(null);    
        }
    }}>
      <DialogContent className="max-w-lg text-white">
        <DialogHeader>
          <DialogTitle>Detail Review</DialogTitle>
        </DialogHeader>
        <div>
          <h1>Thaooo2</h1>
          <p>hihihihih</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
