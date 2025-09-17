import CustomForm from "@/components/common/Form";
import RHFFileInput from "@/components/RHF/RHFFileInput";
import RHFInput from "@/components/RHF/RHFInput";
import RHFMultiSelect from "@/components/RHF/RHFMultiSelect";
import RHFNumberInput from "@/components/RHF/RHFNumberInput";
import RHFTextarea from "@/components/RHF/RHFTextarea";
import DashboardCard from "@/features/admin/components/DashboardCard";
import {
  useAccessToken,
  useAuthUser,
  useSetAuth,
} from "@/features/auth/store/useAuth";
import {
  guideProfileSchema,
  type GuideProfileData,
} from "@/features/users/schema/guideProfile.schema";
import { updateProfile } from "@/features/users/userApi";
import { queryClient } from "@/shared/api/queryClient";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AvailabilityField from "../components/AvaibilityField";
import LoadingButton from "@/components/LoadingButton";

const GuideProfile = () => {
  const user = useAuthUser();
  const navigate = useNavigate();
  const accessToken = useAccessToken();
  const setAuth = useSetAuth();
  const form = useForm<GuideProfileData>({
    resolver: zodResolver(guideProfileSchema),
    mode: "onChange",
    defaultValues: {
      availability: user?.guideProfile?.availability || [],
      ...user,
      ...user?.guideProfile,
    },
  });
  const { mutate: updateProfileFn, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      toast.success("Profile Updated Successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setAuth(accessToken ?? undefined, data.data.user);
      navigate("/guide");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
  const onSubmit = async (data: GuideProfileData) =>
    await updateProfileFn(data);

  return (
    <DashboardCard title="Guide Profile" className="gap-2 w-full">
      <CustomForm
        className="shadow-none bg-transparent grid gap-6 grid-cols-1 sm:grid-cols-2 items-start p-0 sm:p-4 overflow-hidden"
        form={form}
        onSubmit={onSubmit}
      >
        <RHFInput control={form.control} name="name" label="Name" />
        <RHFInput control={form.control} name="email" label="Email" />
        <RHFInput
          control={form.control}
          name="phone"
          placeholder="Enter your phone"
          label="Phone *"
        />
        <RHFInput control={form.control} name="address" label="Address" />
        <RHFNumberInput
          control={form.control}
          name="yearsOfExperience"
          label="Years of experience *"
          placeholder="Number of years of experience"
        />
        <RHFMultiSelect
          control={form.control}
          name="languagesSpoken"
          label="Languages Spoken *"
          placeholder="Select your languages"
          options={[
            { value: "Ar", label: "Arabic" },
            { value: "Fr", label: "French" },
            { value: "En", label: "English" },
            { value: "Es", label: "Spanish" },
          ]}
        />

        <RHFFileInput
          control={form.control}
          name="avatar"
          label="Avatar"
          existing={[user?.avatar || ""]}
          imagesPath="/uploads/users"
        />
        <RHFFileInput
          control={form.control}
          name="imageCover"
          label="Image Cover *"
          multiple={false}
          existing={[user?.guideProfile?.imageCover || ""]}
          imagesPath="/uploads/guides"
        />
        <RHFFileInput
          control={form.control}
          name="images"
          label="Images"
          multiple={true}
          existing={user?.guideProfile?.images}
          imagesPath="/uploads/guides"
        />
        <RHFTextarea
          control={form.control}
          name="bio"
          label="Bio *"
          placeholder="Talk about yourself"
        />
        <AvailabilityField<GuideProfileData> fieldName="availability" />
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

export default GuideProfile;
