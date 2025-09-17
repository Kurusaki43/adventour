import { useUsers } from "../userQueries";
import UsersTableOperations from "../components/UsersTableOperations";
import DashboardMessage from "@/features/admin/components/DashboardMessage";
import { CustomTable } from "@/components/common/CustomTable";
import UserRow from "../components/UserRow";
import { Pagination } from "@/components/common/Pagination";
import UserModal from "../components/UserModal";
import { useFilter } from "@/hooks/useFilter";

const AdminUsersPage = () => {
  const { filter } = useFilter();
  const { data, isLoading, isError } = useUsers(filter);

  return (
    <div className="grid gap-6 w-full border py-8 px-4 sm:px-8 rounded-xl">
      <UsersTableOperations dataList={data?.data.users || []} />
      {isLoading && (
        <DashboardMessage
          type="loading"
          title="Fetching Users"
          message="Hold on while we load current users for you."
        />
      )}
      {!isLoading && isError && (
        <DashboardMessage
          type="error"
          title="Something Went Wrong"
          message={
            "We couldn't load the users right now. Please try again later or check your connection."
          }
        />
      )}
      {!isLoading && !isError && data?.totalUsers === 0 && (
        <DashboardMessage
          type="empty"
          title="No Users Found"
          message="Looks like you haven’t added any users yet. Maybe tweak your filters or start creating one!
        
        "
        />
      )}
      {!isLoading && data && data.totalUsers > 0 && (
        <>
          <CustomTable
            data={data?.data.users || []}
            cols={[
              "N°",
              "name",
              "email",
              "isVerified",
              "role",
              "isActive",
              "createdAt",
              "actions",
            ]}
            renderRow={(item, index) => (
              <UserRow user={item} index={index} key={item.id} />
            )}
          />
          <Pagination className="mt-4" totalDocuments={data.totalUsers || 1} />
        </>
      )}
      <UserModal />
    </div>
  );
};

export default AdminUsersPage;
