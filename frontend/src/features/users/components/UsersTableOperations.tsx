import Filter from "@/components/common/Filter";
import SortBy from "@/components/common/SortBy";
import SearchFilter from "@/features/admin/components/SearchFilter";
import { ROLES, type User } from "../types/user.types";
import { useUserModal } from "../store/useUserModal";
import { Button } from "@/components/ui/button";
import { Plus, XIcon } from "lucide-react";
import ExportPDF from "@/features/tours/components/ExportToursPDF";
import { useFilter } from "@/hooks/useFilter";

const UsersTableOperations = ({ dataList }: { dataList: User[] }) => {
  const { openCreate } = useUserModal();
  const { handleResetAll, resetSearchKey } = useFilter();

  return (
    <div className="flex flex-wrap gap-4 items-end justify-center">
      <SearchFilter resetKey={resetSearchKey} placeholder="By user name" />

      <Filter
        label="Role"
        fieldName="role"
        options={[
          { value: ROLES.ADMIN, label: "Admin" },
          { value: ROLES.CLIENT, label: "Client" },
          { value: ROLES.GUIDE, label: "Guide" },
          { value: ROLES.LEADGUIDE, label: "Lead guide" },
        ]}
      />
      <SortBy
        defaultValue="createdAt-desc"
        options={[
          { value: "createdAt-desc", label: "Newest First" },
          { value: "createdAt-asc", label: "Oldest First" },
          { value: "name-asc", label: "Name: A → Z" },
          { value: "name-desc", label: "Name: Z → A" },
          { value: "email-asc", label: "Email: A → Z" },
          { value: "email-desc", label: "Email: Z → A" },
        ]}
      />

      <Button size="default" variant="ghost" onClick={handleResetAll}>
        <XIcon />
        Reset Filters
      </Button>

      <div className="lg:ml-auto flex items-center gap-4">
        <ExportPDF<User>
          dataList={dataList}
          headCols={["name", "email", "role", "createdAt", "isVerified"]}
          pageTitle={`List of Users For ${new Date().getFullYear()}`}
          fileName="userList"
          labels={{
            name: "Name",
            email: "Email",
            role: "   Role  ",
            createdAt: "  Created At ",
            isVerified: "isVerified",
          }}
        />
        <Button onClick={openCreate} className="font-semibold capitalize">
          <Plus />
          Add User
        </Button>
      </div>
    </div>
  );
};

export default UsersTableOperations;
