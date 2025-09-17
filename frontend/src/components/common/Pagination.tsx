import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button"; // adjust for your UI
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  totalDocuments: number;
  documentsPerPage?: number;
  className?: string;
};

export const Pagination = ({
  totalDocuments,
  documentsPerPage = Number(import.meta.env.VITE_LIMIT_PER_PAGE || 10),
  className = "",
}: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") || "1");
  const totalPages = Math.ceil(totalDocuments / documentsPerPage);

  const goToPage = (page: number) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  };

  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Previous
      </Button>

      <span className="text-sm font-medium">
        Page {currentPage} of {totalPages}
      </span>

      <Button
        variant="outline"
        size="sm"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Next
        <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );
};
