import Filter from "@/components/common/Filter";
import { Button } from "@/components/ui/button";
import { Plus, XIcon } from "lucide-react";
import SortBy from "@/components/common/SortBy";
import { useBookingModal } from "../store/useBookingModal";
import { useFilter } from "@/hooks/useFilter";

const BookingsTableOperations = () => {
  const { openCreate } = useBookingModal();
  const { handleResetAll } = useFilter();
  return (
    <div className="flex flex-wrap gap-4 items-end justify-center">
      <Filter
        label="Status"
        fieldName="status"
        options={[
          { value: "pending", label: "Pending" },
          { value: "cancelled", label: "Cancelled" },
          { value: "confirmed", label: "Confirmed" },
          { value: "completed", label: "Completed" },
        ]}
      />

      <SortBy
        defaultValue="createdAt-desc"
        options={[
          { value: "createdAt-desc", label: "Newest First" },
          { value: "createdAt-asc", label: "Oldest First" },
          { value: "price-asc", label: "Price: Low → High" },
          { value: "price-desc", label: "Price: High → Low" },
          { value: "peopleCount-asc", label: "People Count Low -> High" },
          { value: "peopleCount-desc", label: "People Count High -> Low" },
        ]}
      />

      <Button size="default" variant="ghost" onClick={handleResetAll}>
        <XIcon />
        Reset Filters
      </Button>

      <div className="lg:ml-auto flex items-center gap-4">
        <Button onClick={openCreate} className="font-semibold capitalize">
          <Plus />
          Add booking
        </Button>
      </div>
    </div>
  );
};

export default BookingsTableOperations;
