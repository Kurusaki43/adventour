import { Rating } from "@smastrom/react-rating";
import { Trash2 } from "lucide-react";
import type { Review } from "../types/review";
import { useDeleteReview } from "../reviewsQueries";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import LoadingButton from "@/components/LoadingButton";

type ReviewRowProps = {
  review: Review;
  index?: number;
};

const ReviewRow = ({ review, index }: ReviewRowProps) => {
  const { mutate: deleteReviewMutate, isPending } = useDeleteReview();
  return (
    <TableRow key={review.id} className="[&>*]:py-2 whitespace-nowrap">
      {index !== undefined && (
        <TableCell className="font-medium text-center text-accent-foreground/70 w-[45px]">
          {index < 9 ? `0${index + 1}` : index + 1}
        </TableCell>
      )}

      <TableCell className="font-medium text-accent-foreground">
        <div className="flex items-center gap-3">
          <img
            src={`/uploads/tours/${review.tour.imageCover}`}
            className="size-12 rounded-md shrink-0 object-cover shadow-lg"
            alt={review.tour.name}
          />
          <p className="truncate">{review.tour.name}</p>
        </div>
      </TableCell>

      <TableCell className="text-center text-accent-foreground/70">
        <div className="flex items-center gap-4">
          <img
            src={`/uploads/users/${review.user.avatar}`}
            className="size-10 rounded-full shrink-0 object-cover shadow-lg"
            alt={review.user.name}
          />
          <p className="truncate">{review.user.name}</p>
        </div>
      </TableCell>

      <TableCell className="text-left text-accent-foreground ">
        <Tooltip>
          <TooltipTrigger asChild>
            <p className="truncate w-36">{review.review}</p>
          </TooltipTrigger>
          <TooltipContent>
            <p>{review.review}</p>
          </TooltipContent>
        </Tooltip>
      </TableCell>

      <TableCell className="font-medium text-center text-accent-foreground flex flex-col mt-3">
        <div className="flex items-center gap-2">
          <Rating value={review.rating} readOnly className="max-w-18" />
          <span className="text-xs">({review.rating})</span>
        </div>
      </TableCell>
      <TableCell className="font-medium text-accent-foreground text-center">
        {review?.createdAt
          ? new Date(review?.createdAt).toDateString()
          : "Unknown"}
      </TableCell>
      <TableCell>
        <LoadingButton
          variant="destructive"
          size="sm"
          loading={isPending}
          loadingLabel="Deleting"
          onClick={() => deleteReviewMutate(review.id!)}
        >
          <Trash2 />
          Delete
        </LoadingButton>
      </TableCell>
    </TableRow>
  );
};
export default ReviewRow;
