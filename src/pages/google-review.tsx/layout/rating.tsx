import { Star } from "lucide-react";

 export function StarRating({ rating = 0, size = 18 }: { rating?: number; size?: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          fill={i < rating ? "currentColor" : "none"}   
          className={i < rating ? "text-yellow-400" : "text-gray-600"}
        />
      ))}
    </div>
  );
}