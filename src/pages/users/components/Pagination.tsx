import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import React from "react";

interface PaginationProps {
  totalItems: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage?: number;
}

export default function Pagination({
  totalItems,
  itemsPerPage = 10,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

   const getPages = () => {
    const pages: (number | "...")[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  return (
    <div className="fixed bottom-8 right-10 bg-gray-50 p-3 flex items-center gap-2 rounded">
      <button
        onClick={() => setCurrentPage(1)}
        disabled={currentPage === 1}
        className="p-1 border rounded disabled:opacity-50"
      >
        <ChevronsLeft size={16} />
      </button>
      <button
        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
        disabled={currentPage === 1}
        className="p-1 border rounded disabled:opacity-50"
      >
        <ChevronLeft size={16} />
      </button>

      {getPages().map((page, idx) =>
        page === "..." ? (
          <span key={idx} className="px-2">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 border rounded-lg ${
              page === currentPage
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
        disabled={currentPage === totalPages}
        className="p-1 border rounded disabled:opacity-50"
      >
        <ChevronRight size={16} />
      </button>
      <button
        onClick={() => setCurrentPage(totalPages)}
        disabled={currentPage === totalPages}
        className="p-1 border rounded disabled:opacity-50"
      >
        <ChevronsRight size={16} />
      </button>
    </div>
  );
}
