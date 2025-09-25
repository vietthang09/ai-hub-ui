import { Dialog, DialogContent, DialogHeader ,DialogTitle } from "../../../components/ui/dialog";
import { useReviewContext } from "../../../context/review-context";

export default function RelyReviewDialog() {
  const { modalType,setModalType } = useReviewContext();

  return (
    <Dialog open={modalType === "reply"} onOpenChange={(open)=> {
        if (!open) {
            setModalType(null);
        }
    }}>
      <DialogContent className="max-w-lg text-white">
        <DialogHeader>
          <DialogTitle>Reply Review</DialogTitle>
        </DialogHeader>
        <div>
           <textarea
            className="w-full h-32 p-2 border rounded bg-gray-100 text-black"
            placeholder="Rely..."
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
