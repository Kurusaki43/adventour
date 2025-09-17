import { useForm } from "react-hook-form";
import { reviewSchema, type CreateReviewData } from "../reviewSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomForm from "@/components/common/Form";
import { Rating } from "@smastrom/react-rating";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import RHFTextarea from "@/components/RHF/RHFTextarea";
import { useMutateTourReview } from "@/features/tours/toursQueries";
import LoadingButton from "@/components/LoadingButton";
import type { Review } from "../types/review";
import { useParams } from "react-router-dom";
import { useAuthUser } from "@/features/auth/store/useAuth";

type ReviewFormProps = {
  editedReview?: Partial<Review>;
  onSuccess?: () => void;
};

const ReviewForm = ({ editedReview, onSuccess }: ReviewFormProps) => {
  const { id: tourId } = useParams();
  const user = useAuthUser();
  const form = useForm<CreateReviewData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: editedReview ? editedReview : {},
  });
  const rating = form.watch("rating");
  const { mutate: mutateReview, isPending } = useMutateTourReview(onSuccess);
  const handleSubmit = (data: CreateReviewData) =>
    mutateReview({ tourId: tourId!, data, reviewId: editedReview?.id });
  return (
    <CustomForm
      form={form}
      onSubmit={handleSubmit}
      className="bg-transparent shadow-none flex flex-row gap-2 items-start p-0 py-6"
    >
      <div className="flex flex-col gap-2 items-center min-w-24 flex-1">
        <Avatar>
          <AvatarImage
            src={`/uploads/users/${user!.avatar}`}
            className="size-10 rounded-full border border-gray-300"
          />
        </Avatar>
        <span className="font-semibold capitalize tracking-wide text-sm text-center">
          {user!.name}
        </span>
      </div>

      <div className="flex flex-col gap-2 items-start flex-6">
        <div className="w-full">
          <RHFTextarea
            control={form.control}
            name="review"
            placeholder="Enter your review"
            className=""
          />
        </div>
        <div className="flex flex-row justify-between w-full">
          <div>
            <Rating
              value={rating}
              onChange={(v: number) => form.setValue("rating", v)}
              className="max-w-24"
            />
            {form.formState.errors.rating && (
              <p className="text-red-400 text-xs font-light">
                Please add Rating
              </p>
            )}
          </div>
          <LoadingButton size={"sm"} loading={isPending} loadingLabel="saving">
            Add
          </LoadingButton>
        </div>
      </div>
    </CustomForm>
  );
};

export default ReviewForm;
