import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ROLES, type User } from "../types/user.types";
import {
  createUserSchema,
  updateUserSchema,
  type CreateUserData,
  type UpdateUserData,
} from "../schema/user.schema";
import CustomForm from "@/components/common/Form";
import RHFInput from "@/components/RHF/RHFInput";
import RHFSelect from "@/components/RHF/RHFSelect";
import RHFFileInput from "@/components/RHF/RHFFileInput";
import RHFSwitch from "@/components/RHF/RHFSwitch";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";
import { useMutateUser } from "../userQueries";
import { useSetAuth } from "@/features/auth/store/useAuth";

type UserFormProps = {
  mode: "CREATE" | "UPDATE";
  editedUser?: Partial<User>;
  onSuccess?: () => void;
};

const UserForm = ({ mode, onSuccess, editedUser }: UserFormProps) => {
  const setAuth = useSetAuth();
  const form = useForm<CreateUserData | UpdateUserData>({
    resolver: zodResolver(
      mode === "CREATE" ? createUserSchema : updateUserSchema
    ),
    mode: "onChange",
    defaultValues: mode === "UPDATE" ? editedUser : {},
  });

  const handleOsSuccess = () => {
    onSuccess?.();
    if (editedUser && editedUser.role === "admin" && mode === "UPDATE") {
      setAuth(null, null);
    }
  };
  const { createUpdateUser, isPending } = useMutateUser(mode, handleOsSuccess);

  const handleSubmit = async (data: CreateUserData | UpdateUserData) =>
    await createUpdateUser(data);

  return (
    <CustomForm
      form={form}
      onSubmit={handleSubmit}
      className="bg-transparent p-0 shadow-none grid gap-6 mt-4"
    >
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-6">
        <RHFInput
          control={form.control}
          name="name"
          label="Name *"
          placeholder="Please Enter Name"
        />
        <RHFInput
          control={form.control}
          name="email"
          label="Email *"
          placeholder="Please Enter Email"
        />

        {mode === "CREATE" && (
          <>
            <RHFInput
              control={form.control}
              name="password"
              label="Password *"
              type="password"
              placeholder="Please Enter Password"
            />
            <RHFInput
              control={form.control}
              name="confirmPassword"
              label="Confirm Password *"
              type="password"
              placeholder="Please Enter Password"
            />
          </>
        )}

        <RHFSelect
          control={form.control}
          name="role"
          placeholder="Select a role"
          options={[
            { value: ROLES.ADMIN, label: "Admin" },
            { value: ROLES.CLIENT, label: "Client" },
            { value: ROLES.GUIDE, label: "Guide" },
            { value: ROLES.LEADGUIDE, label: "Lead Guide" },
          ]}
        />
        {editedUser?.role === ROLES.ADMIN && (
          <RHFFileInput
            control={form.control}
            name="avatar"
            placeholder="Upload avatar"
            existing={
              mode === "UPDATE" && editedUser?.avatar
                ? [editedUser.avatar]
                : undefined
            }
            imagesPath="/uploads/users"
          />
        )}

        <RHFSwitch control={form.control} name="isVerified" label="Verified" />
        <RHFSwitch control={form.control} name="isActive" label="Active" />
      </div>
      <div className="flex gap-2 items-center justify-end">
        <Button type="reset" variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>
        <LoadingButton
          disabled={!form.formState.isValid}
          loading={isPending}
          type="submit"
        >
          {mode === "CREATE" ? "Create user" : "Update user"}
        </LoadingButton>
      </div>
    </CustomForm>
  );
};

export default UserForm;
