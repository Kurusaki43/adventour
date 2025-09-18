import CustomForm from "@/components/common/Form";
import RHFFileInput from "@/components/RHF/RHFFileInput";
import RHFInput from "@/components/RHF/RHFInput";
import DashboardCard from "@/features/admin/components/DashboardCard";
import {
  useAccessToken,
  useAuthUser,
  useSetAuth,
} from "@/features/auth/store/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import LoadingButton from "@/components/LoadingButton";
import {
  updateUserSchema,
  type UpdateUserData,
} from "../../schema/user.schema";
import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "../../userApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";

const ClientProfile = () => {
  const navigate = useNavigate();
  const accessToken = useAccessToken();
  const setAuth = useSetAuth();
  const user = useAuthUser();
  const form = useForm<UpdateUserData>({
    resolver: zodResolver(updateUserSchema),
    mode: "onChange",
    defaultValues: {
      ...user,
    },
  });
  const { mutate: updateProfileFn, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      toast.success("Profile Updated Successfully");
      setAuth(accessToken ?? undefined, data.data.user);
      navigate("/me");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
  const onSubmit = async (data: UpdateUserData) => updateProfileFn(data);
  console.log("Uer avatart from profile :", user?.avatar);
  return (
    <DashboardCard title="Guide Profile" className="gap-2 w-full">
      <CustomForm
        className="shadow-none bg-transparent grid gap-6 grid-cols-1 sm:grid-cols-2 items-start p-0 sm:p-4 overflow-hidden"
        form={form}
        onSubmit={onSubmit}
      >
        <RHFInput control={form.control} name="name" label="Name" />
        <RHFInput control={form.control} name="phone" label="Phone" />
        <RHFInput control={form.control} name="email" label="Email" disabled />
        <RHFFileInput
          control={form.control}
          name="avatar"
          existing={[user?.avatar || ""]}
          imagesPath="/uploads/users"
        />

        <LoadingButton
          loading={isPending}
          className="self-end ml-auto sm:col-span-2"
        >
          Update Profile
        </LoadingButton>
      </CustomForm>
    </DashboardCard>
  );
};

export default ClientProfile;
