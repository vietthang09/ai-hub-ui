import { useMemo } from "react";
import { useReviewContext } from "../../../context/review-context";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import { Star } from "lucide-react";

interface Review {
  id: string;
  reviewer: { name: string };
  created_at: string;
  content: string;
  rating: number;
  activity: "Replied" | "Pending" | string;
  avatarUrl?: string;
  title?: string;
}

interface DetailReviewDialogProps {
  selectedReview: Review | null;
}

function StarRating({ value = 0, size = 18 }: { value?: number; size?: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < value ? "text-yellow-400" : "text-gray-600"}
        />
      ))}
    </div>
  );
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

export default function DetailReviewDialog({ selectedReview }: DetailReviewDialogProps) {
  const { modalType, setModalType } = useReviewContext();

  const dateText = useMemo(() => {
    if (!selectedReview?.created_at) return "";
    const d = new Date(selectedReview.created_at);
    return isNaN(d.getTime()) ? selectedReview.created_at : d.toLocaleDateString();
  }, [selectedReview?.created_at]);

  return (
    <Dialog
      open={modalType === "detail"}
      onOpenChange={(open) => !open && setModalType(null)}
    >
      <DialogContent className="max-w-xl w-full bg-[#0B1220] text-slate-100 rounded-2xl p-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="p-5 border-b border-white/5 bg-white/5">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full overflow-hidden ring-1 ring-white/10">
              {selectedReview?.avatarUrl ? (
                <img
                  src={selectedReview.avatarUrl}
                  alt={selectedReview.reviewer.name || "avatar"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full grid place-items-center bg-slate-800">
                  <span className="text-lg">👤</span>
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

            <StarRating value={selectedReview?.rating ?? 0} />
          </div>
        </DialogHeader>

        {/* Body */}
        <div className="p-5">
          {selectedReview ? (
            <div className="space-y-5">
               <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="space-y-1">
                  <div className="text-slate-400">Title</div>
                  <div className="font-medium">
                    {selectedReview.title || "—"}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-slate-400">Rating</div>
                  <div className="font-medium">{selectedReview.rating}/5</div>
                </div>
                <div className="space-y-1">
                  <div className="text-slate-400 mb-1">Status</div>
                  <ActivityBadge status={selectedReview.activity} />
                </div>
                <div className="space-y-1">
                  <div className="text-slate-400">Date</div>
                  <div className="font-medium">{dateText || "—"}</div>
                </div>
              </div>

              {/* Review content */}
              <div className="rounded-xl bg-white/[0.03] ring-1 ring-white/10 p-4 relative">
                <div className="absolute -top-3 left-4 text-2xl">“</div>
                <p className="leading-relaxed text-slate-200 whitespace-pre-line">
                  {selectedReview.content}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-center text-slate-400">No review selected</p>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 pb-5 pt-3 flex justify-end gap-2 bg-white/5 border-t border-white/5">
          <button
            onClick={() => setModalType(null)}
            className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-100 transition"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
