import { useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { useReviewContext } from "../../../context/review-context";
import { StarRating } from "../layout/rating";
import type { Review } from "../../../services/review/types";
import { Button } from "../../../components/ui/button";
import { Ban } from "lucide-react";

interface DetailReviewDialogProps {
  selectedRely: Review | null;
}

export default function RelyReviewDialog({
  selectedRely,
}: DetailReviewDialogProps) {
  const { modalType, setModalType } = useReviewContext();

  const dateText = useMemo(() => {
    if (!selectedRely?.created_at) return "";
    const d = new Date(selectedRely.created_at);
    return isNaN(d.getTime())
      ? selectedRely.created_at
      : d.toLocaleDateString();
  }, [selectedRely?.created_at]);

  return (
    <Dialog
      open={modalType === "reply"}
      onOpenChange={(open) => {
        if (!open) setModalType(null);
      }}
    >
      <DialogContent className="max-w-2xl p-0 overflow-hidden bg-primary text-white">
        <DialogHeader className="p-4 bg-white/5">
          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-medium">
                {selectedRely?.reviewer ? (
                  <img
                    src={selectedRely.reviewer.profile_photo}
                    alt={selectedRely.reviewer.name || "avatar"}
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
              <div className="min-w-0">
                <div className="text-sm/5 text-white font-medium truncate">
                  {selectedRely?.reviewer?.name || "—"}
                </div>
                <div className="text-xs text-white/50 truncate">
                  {dateText || "—"}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto">
              <span className="text-xs text-white/60">Rating</span>
              <div className="px-3 py-1 rounded-full bg-white/30 backdrop-blur-sm">
                <StarRating rating={selectedRely?.rating ?? 0} />
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="h-px -mt-10 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="p-6 space-y-6">
          <section className="rounded-2xl bg-white/10 shadow-inner p-4">
            <div className="text-xs uppercase tracking-wide text-white/50 mb-2">
              Reviewer Comment
            </div>
            <div className="max-h-40 overflow-auto pr-1">
              {selectedRely?.content ? (
                <p className="leading-relaxed whitespace-pre-line">
                  {selectedRely.content}
                </p>
              ) : (
                <p className="text-center text-white/50">No review selected</p>
              )}
            </div>
          </section>

          <section className="space-y-2">
            <label className="text-sm font-medium text-white/80">
              Your Reply
            </label>
            <textarea
              className="w-full h-32 rounded-xl bg-white/10 px-3 py-2 outline-none ring-1 ring-transparent focus:ring-2 focus:ring-white/30 placeholder:text-white/40  "
              placeholder="Reply..."
            />
            <div className="text-xs text-white/40">
              Be clear, respectful, and helpful.
            </div>
          </section>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="sticky bottom-0 w-full bg-black/85 backdrop-blur p-4 flex items-center justify-end gap-2">
          <Button
            onClick={() => setModalType(null)}
            className="px-4 bg-white/10 hover:bg-white/20 text-white"
            variant="secondary"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
