import DateFilter from "@/components/common/DateFilter";
import Filter from "@/components/common/Filter";
import MinMaxFilter from "@/components/common/MinMaxFilter";
import RatingFilter from "@/components/common/RatingFilter";
import { Button } from "@/components/ui/button";
import SearchFilter from "@/features/admin/components/SearchFilter";
import { useFilter } from "@/hooks/useFilter";
import { X } from "lucide-react";

const ToursListSidebar = () => {
  const { handleResetAll } = useFilter();

  return (
    <div className="max-w-[340px] self-start mx-auto sm:w-[300px] border p-6 flex flex-col gap-8 rounded-2xl">
      <SearchFilter placeholder="Enter Keywords" />
      <Filter
        label="Difficulty"
        fieldName="difficulty"
        options={[
          { value: "easy", label: "Easy" },
          { value: "medium", label: "Medium" },
          { value: "difficult", label: "Difficult" },
        ]}
      />
      <Filter
        label="Duration"
        fieldName="duration"
        options={[
          { value: "1", label: "1 Day" },
          { value: "2", label: "2-4 Days" },
          { value: "5", label: "5-7 Days" },
        ]}
      />
      <DateFilter />

      <MinMaxFilter label="Price" fieldName="Price" />
      <RatingFilter />
      <Button onClick={handleResetAll} variant="ghost">
        <X />
        clear Filters
      </Button>
    </div>
  );
};

export default ToursListSidebar;
