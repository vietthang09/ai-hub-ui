import { useMemo } from "react";
import { useReviewContext } from "../../../context/review-context";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Ban } from "lucide-react";
import type { Review } from "../../../services/review/types";
import { StarRating } from "../layout/rating";
import { Button } from "../../../components/ui/button";

interface DetailReviewDialogProps {
  selectedReview: Review | null;
}

function ActivityBadge({ status }: { status?: string }) {
  const map =
    status === "Replied"
      ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30"
      : status === "Escalated"
      ? "bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/30"
      : "bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/30";
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${map}`}>
      {status || "Pending"}
    </span>
  );
}

export default function DetailReviewDialog({
  selectedReview,
}: DetailReviewDialogProps) {
  const { modalType, setModalType } = useReviewContext();

  const dateText = useMemo(() => {
    if (!selectedReview?.created_at) return "";
    const d = new Date(selectedReview.created_at);
    return isNaN(d.getTime())
      ? selectedReview.created_at
      : d.toLocaleDateString();
  }, [selectedReview?.created_at]);

  return (
    <Dialog
      open={modalType === "detail"}
      onOpenChange={(open) => !open && setModalType(null)}
    >
      <DialogContent className="max-w-xl p-0 overflow-hidden bg-primary text-white">
        <DialogHeader className="p-4 bg-white/5">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full overflow-hidden ring-1 ring-white/10">
              {selectedReview?.reviewer ? (
                <img
                  src={selectedReview.reviewer.profile_photo}
                  alt={selectedReview.reviewer.name || "avatar"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full grid place-items-center bg-slate-800">
                  <span className="text-lg">
                    <Ban />
                  </span>
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <DialogTitle className="text-base font-semibold text-slate-100">
                {selectedReview?.reviewer.name || "Guest"}
              </DialogTitle>
              <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                <span>{dateText}</span>
                <span>•</span>
                <ActivityBadge status={selectedReview?.activity} />
              </div>
            </div>
            <div className="flex items-center gap-2 self-start md:self-auto">
              <div className="px-3 py-1 rounded-full bg-white/30 backdrop-blur-sm">
                <StarRating rating={selectedReview?.rating ?? 0} />
              </div>
            </div>{" "}
          </div>
        </DialogHeader>

        <div className="p-5 space-y-6">
          <section className="rounded-2xl bg-white/10 shadow-inner p-4">
            <div className="text-xs uppercase tracking-wide text-white/50 mb-2">
              Reviewer Comment
            </div>
            <div className="max-h-80 overflow-auto pr-1">
              {selectedReview?.content ? (
                <p className="leading-relaxed whitespace-pre-line">
                  {selectedReview.content}
                </p>
              ) : (
                <p className="text-center text-white/50">No review selected</p>
              )}
            </div>
          </section>
        </div>

        <div className="px-5 pb-5 pt-3 flex justify-end gap-2 bg-white/5">
          <Button
            onClick={() => setModalType(null)}
            className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-100 transition"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
