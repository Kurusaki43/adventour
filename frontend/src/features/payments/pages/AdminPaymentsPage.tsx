import { Pagination } from "@/components/common/Pagination";
import PaymentsTableOperations from "../components/PaymentsTableOperations";
import { usePayments } from "../paymentsQueries";
import PaymentRow from "../components/PaymentRow";
import { CustomTable } from "@/components/common/CustomTable";
import DashboardMessage from "@/features/admin/components/DashboardMessage";
import { useFilter } from "@/hooks/useFilter";

const AdminPaymentsPage = () => {
  const { filter } = useFilter();
  const { data, isLoading, isError } = usePayments(filter);

  return (
    <div className="grid gap-6 w-full border py-8 px-4 sm:px-8 rounded-xl">
      <PaymentsTableOperations />

      {isLoading && (
        <DashboardMessage
          type="loading"
          title="Fetching Payments"
          message="Hold on while we load the payments."
        />
      )}
      {!isLoading && isError && (
        <DashboardMessage
          type="error"
          title="Something Went Wrong"
          message={
            "We couldn't load the payments right now. Please try again later or check your connection."
          }
        />
      )}
      {!isLoading && !isError && data?.totalPayments === 0 && (
        <DashboardMessage
          type="empty"
          title="No Payments Found"
          message="Looks like your client haven't start booking. Maybe tweak your filters or start booking!
        
        "
        />
      )}

      {!isLoading && data && data.totalPayments > 0 && (
        <>
          <CustomTable
            data={data?.payments || []}
            cols={["N°", "method", "amount", "status", "createdAt", "actions"]}
            renderRow={(item, index) => (
              <PaymentRow payment={item} index={index} key={item.id} />
            )}
          />
          <Pagination
            className="mt-4"
            totalDocuments={data?.totalPayments || 1}
          />
        </>
      )}
    </div>
  );
};

export default AdminPaymentsPage;
