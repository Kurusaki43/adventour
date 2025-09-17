import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { MoreVertical, Pencil, Trash2, Plus } from "lucide-react";
import "@smastrom/react-rating/style.css";
import { Rating } from "@smastrom/react-rating";
import { useNavigate } from "react-router-dom";
import type { Tour } from "../types/tour";
import { formatCurrency } from "@/features/admin/utils/formatCurrency";
import { useTourModal } from "../store/useTourModal";
import { useMultiStepForm } from "../context/multiStepForm";
import { useDeleteTour } from "../toursQueries";

type TourDifficulty = Tour["difficulty"];

const difficultyColors: Record<TourDifficulty, string> = {
  easy: "bg-green-100 text-green-700 dark:bg-green-600 dark:text-green-100",
  medium:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-600 dark:text-yellow-100",
  difficult: "bg-red-100 text-red-700 dark:bg-red-600 dark:text-red-100",
};

const statusColors: Record<Tour["status"], string> = {
  published:
    "bg-green-100 text-green-700 dark:bg-green-600 dark:text-green-100",
  draft: "bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-100",
};

type TourRowProps = {
  tour: Tour;
  index?: number;
};

const TourRow = ({ tour, index }: TourRowProps) => {
  const { openUpdate } = useTourModal();
  const { goToStep } = useMultiStepForm();
  const navigate = useNavigate();
  const { mutate: deleteTourMutate } = useDeleteTour(tour);

  return (
    <TableRow key={tour.id} className="[&>*]:py-2 whitespace-nowrap">
      {index !== undefined && (
        <TableCell className="font-medium text-center text-accent-foreground/70 w-[45px]">
          {index < 9 ? `0${index + 1}` : index + 1}
        </TableCell>
      )}

      <TableCell className="font-medium text-accent-foreground">
        <div className="flex items-center gap-3">
          <img
            src={`/uploads/tours/${tour.imageCover}`}
            className="size-12 rounded-md shrink-0 object-cover shadow-lg"
            alt={tour.name}
          />
          <p className="truncate">{tour.name}</p>
        </div>
      </TableCell>

      <TableCell className="text-center text-accent-foreground/70">
        {`${tour.duration} ${tour.durationUnit}${tour.duration > 1 ? "s" : ""}`}
      </TableCell>

      <TableCell className="text-center text-accent-foreground">
        <Badge
          variant="secondary"
          className={`${
            difficultyColors[tour.difficulty]
          } font-semibold uppercase`}
        >
          {tour.difficulty}
        </Badge>
      </TableCell>

      <TableCell className="font-medium text-center text-accent-foreground flex flex-col mt-3">
        <span
          className={`${
            tour.priceDiscount
              ? "line-through text-muted-foreground text-xs"
              : ""
          }`}
        >
          {formatCurrency(tour.price)}
        </span>
        {Number(tour?.priceDiscount) > 0 && (
          <span className="mb-1">
            {formatCurrency(Number(tour?.priceDiscount))}
          </span>
        )}
      </TableCell>

      <TableCell className="text-center text-accent-foreground/70">
        {`${tour.maxGroupSize} people`}
      </TableCell>

      <TableCell className="font-medium text-center text-accent-foreground flex flex-col justify-center items-center">
        <div className="flex items-center gap-2">
          <Rating
            value={tour.ratingsAverage || 4.5}
            readOnly
            className="max-w-18"
          />
          <span className="text-xs">({tour.ratingsAverage})</span>
        </div>
        <span className="text-xs text-muted-foreground">
          {tour.ratingsQuantity} reviews
        </span>
      </TableCell>

      <TableCell className="capitalize font-medium text-center text-accent-foreground">
        <Badge
          variant="secondary"
          className={`${statusColors[tour.status]} font-semibold`}
        >
          {tour.status}
        </Badge>
      </TableCell>

      <TableCell className="text-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size={"icon"}>
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-32" align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuGroup>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => deleteTourMutate(tour.id!)}
              >
                <Trash2 />
                Delete
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  goToStep(0);
                  openUpdate(tour);
                }}
              >
                <Pencil />
                Update
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigate(`${tour.slug}`, { state: { tour } })}
              >
                <Plus />
                Detail
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default TourRow;
