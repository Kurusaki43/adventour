import { Status, type Tour } from "../types/tour";
import { Button } from "@/components/ui/button";
import Filter from "@/components/common/Filter";
import { Plus, XIcon } from "lucide-react";
import SortBy from "@/components/common/SortBy";
import ExportPDF from "./ExportToursPDF";
import logo from "@/assets/Logo.svg";
import { useTourModal } from "../store/useTourModal";
import SearchFilter from "@/features/admin/components/SearchFilter";
import { useFilter } from "@/hooks/useFilter";

const ToursTableOperations = ({ dataList }: { dataList: Tour[] }) => {
  const { openCreate } = useTourModal();
  const { handleResetAll } = useFilter();

  return (
    <div className="flex flex-wrap gap-4 items-end justify-center">
      <SearchFilter placeholder="By tour name" />
      <Filter
        label="Status"
        fieldName="status"
        options={[
          { value: Status.Published, label: "Published" },
          { value: Status.Draft, label: "Draft" },
        ]}
      />
      <Filter
        label="Difficulty"
        fieldName="difficulty"
        options={[
          { value: "easy", label: "Easy" },
          { value: "medium", label: "Medium" },
          { value: "difficult", label: "Difficult" },
        ]}
      />
      <SortBy
        defaultValue="createdAt-desc"
        options={[
          { value: "createdAt-desc", label: "Newest First" },
          { value: "createdAt-asc", label: "Oldest First" },
          { value: "price-asc", label: "Price: Low → High" },
          { value: "price-desc", label: "Price: High → Low" },
          { value: "maxGroupSize-asc", label: "Group Size: Small → Large" },
          { value: "maxGroupSize-desc", label: "Group Size: Large → Small" },
          { value: "ratingsAverage-asc", label: "Rating: Low → High" },
          { value: "ratingsAverage-desc", label: "Rating: High → Low  " },
          { value: "ratingsQuantity-asc", label: "Reviews: Low → High" },
          { value: "ratingsQuantity-desc", label: "Reviews: High → Low" },
        ]}
      />

      <Button size="default" variant="ghost" onClick={handleResetAll}>
        <XIcon />
        Reset Filters
      </Button>

      <div className="lg:ml-auto flex items-center gap-4">
        <ExportPDF<Tour>
          dataList={dataList}
          headCols={[
            "name",
            "duration",
            "difficulty",
            "price",
            "maxGroupSize",
            "ratingsAverage",
          ]}
          pageTitle={`List of Tours For ${new Date().getFullYear()}`}
          fileName="toursList"
          labels={{
            name: "Tour Name",
            duration: "Duration (days)",
            difficulty: "   Level  ",
            price: "  Price ($) ",
          }}
          logoUrl={logo}
        />
        <Button onClick={openCreate} className="font-semibold capitalize">
          <Plus />
          Add tour
        </Button>
      </div>
    </div>
  );
};

export default ToursTableOperations;
