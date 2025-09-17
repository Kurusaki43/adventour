import type { PopulatedTour, Tour } from "../types/tour";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { getPluralOfWord } from "../utils/getPluralOfWord";
import { formatCurrency } from "@/features/admin/utils/formatCurrency";
import {
  CircleDollarSign,
  Clock,
  Footprints,
  LocateFixed,
  MapPinned,
  Users,
} from "lucide-react";

const TourBasicInformations = ({ tour }: { tour: Tour | PopulatedTour }) => {
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl capitalize font-semibold leading-snug mt-8 mb-2">
        {tour.name}
      </h2>
      <div className="flex items-center">
        <Rating
          readOnly
          value={tour?.ratingsAverage || 1}
          className="max-w-20"
        />
        <span className="ml-2 text-xs text-muted-foreground font-light">
          ({tour?.ratingsQuantity || 0} Reviews)
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-12">
        <div className="flex items-center gap-4 text-muted-foreground">
          <CircleDollarSign className="size-5 text-primary" />
          <span className="capitalize text-sm tracking-wide">
            price: <strong>{formatCurrency(tour.price)}</strong>
          </span>
        </div>
        <div className="flex items-center gap-4 text-muted-foreground">
          <Clock className="size-5 text-primary" />
          <span className="capitalize text-sm tracking-wide">
            duration:{" "}
            <strong>
              {tour.duration}{" "}
              {getPluralOfWord(tour.durationUnit!, tour.duration)}{" "}
            </strong>
          </span>
        </div>

        <div className="flex items-center gap-4 text-muted-foreground">
          <Footprints className="size-5 text-primary" />
          <span className="capitalize text-sm tracking-wide">
            difficulty: <strong>{tour.difficulty}</strong>
          </span>
        </div>

        <div className="flex items-center gap-4 text-muted-foreground">
          <Users className="size-5 text-primary" />
          <span className="capitalize text-sm tracking-wide">
            group:{" "}
            <strong>
              {tour.maxGroupSize} {getPluralOfWord("person", tour.maxGroupSize)}
            </strong>{" "}
            (max)
          </span>
        </div>

        <div className="flex items-center gap-4 text-muted-foreground">
          <MapPinned className="size-5 text-primary" />
          <span className="capitalize text-sm tracking-wide">
            visit:{" "}
            <strong>
              {tour.locations.length}{" "}
              {getPluralOfWord("place", tour.locations.length)}
            </strong>
          </span>
        </div>

        <div className="flex items-center gap-4 text-muted-foreground">
          <LocateFixed className="size-5 text-primary" />
          <span className="capitalize text-sm tracking-wide">
            start at: <strong>{tour.locations[0].name}</strong>
          </span>
        </div>
      </div>

      <hr className="my-8" />
      {/*Description */}
      <div className="text-sm tracking-wide space-y-2">
        {tour.description.split("\n").map((para, i) => (
          <p key={i} className="text-gray-700 leading-relaxed">
            {para}
          </p>
        ))}
      </div>
    </div>
  );
};

export default TourBasicInformations;
