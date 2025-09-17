import Filter from "@/components/common/Filter";
import SortBy from "@/components/common/SortBy";
import { Button } from "@/components/ui/button";
import { useFilter } from "@/hooks/useFilter";
import { XIcon } from "lucide-react";

const PaymentsTableOperations = () => {
  const { handleResetAll } = useFilter();

  return (
    <div className="flex flex-wrap gap-4 items-end justify-center">
      <Filter
        label="Method"
        fieldName="method"
        options={[
          { value: "stripe", label: "Stripe" },
          { value: "cash", label: "Cash" },
        ]}
      />
      <Filter
        label="Status"
        fieldName="status"
        options={[
          { value: "pending", label: "Pending" },
          { value: "paid", label: "Paid" },
          { value: "failed", label: "Failed" },
        ]}
      />
      <SortBy
        defaultValue="createdAt-desc"
        options={[
          { value: "createdAt-desc", label: "Newest First" },
          { value: "createdAt-asc", label: "Oldest First" },
          { value: "amount-asc", label: "Amount: Low -> High" },
          { value: "amount-desc", label: "Amount: High -> Low" },
        ]}
      />

      <Button size="default" variant="ghost" onClick={handleResetAll}>
        <XIcon />
        Reset Filters
      </Button>
    </div>
  );
};

export default PaymentsTableOperations;
