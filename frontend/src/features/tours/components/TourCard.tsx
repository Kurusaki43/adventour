import { Clock, User } from "lucide-react";
import { FaBoltLightning } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Tour } from "@/features/tours/types/tour";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { formatCurrency } from "@/features/admin/utils/formatCurrency";

const TourCard = ({
  tour,
  direction = "column",
}: {
  tour: Tour;
  direction?: "row" | "column";
}) => {
  return (
    <Card
      className={`p-0 gap-0 w-full shadow-none border-1 mx-auto rounded-sm overflow-hidden flex h-full ${
        direction === "row" ? "flex-row" : "flex-col max-w-[380px]"
      }`}
    >
      <div
        className={
          direction === "row"
            ? "w-1/3 min-h-[200px]" // row: 1/3 width, fixed min height
            : "w-full h-64" // column: full width, fixed height
        }
      >
        <img
          src={`/uploads/tours/${tour.imageCover}`}
          alt="name"
          className="w-full h-full object-cover"
        />
      </div>
      <div className={direction === "row" ? "w-2/3 flex flex-col" : "w-full"}>
        <CardContent className="p-0 space-y-3 block px-6 py-4">
          <h3 className="text-xl py-2 leading-snug font-bold uppercase tracking-wider">
            {tour.name}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="size-5" />
              <span>
                {tour.duration} {tour.durationUnit}
              </span>
            </div>

            <div className="flex items-center text-muted-foreground gap-2">
              <User className="size-5" />
              <span>{tour.maxGroupSize} Person (max)</span>
            </div>
          </div>
          <div className="flex items-center gap-0 justify-between">
            <div className="flex items-center">
              <Rating
                readOnly
                value={tour.ratingsAverage || 1}
                className="max-w-24"
              />
              <span className="ml-1 text-xs text-muted-foreground font-light">
                ({tour.ratingsQuantity || 0} Reviews)
              </span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <FaBoltLightning />
              <span className="tracking-wide uppercase text-sm">
                {tour.difficulty}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-6 pt-4 pb-4 flex flex-row items-center justify-between mt-auto">
          <Link
            to={`/tours/${tour.id}`}
            // state={{ tourId: tour.id }}
          >
            <Button className="rounded-full">Explore</Button>
          </Link>
          <div className="flex flex-col items-center">
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
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};

export default TourCard;
