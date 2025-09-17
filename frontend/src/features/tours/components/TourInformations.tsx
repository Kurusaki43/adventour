import { Rating } from "@smastrom/react-rating";
import { format } from "date-fns";
import type { ReactNode } from "react";
import type { PopulatedTour, Tour } from "../types/tour";
import { formatCurrency } from "@/features/admin/utils/formatCurrency";

type TourInformationsProps = {
  tour: Tour | PopulatedTour;
};

const TourInformations = ({
  tour: {
    maxGroupSize,
    difficulty,
    duration,
    durationUnit,
    ratingsAverage,
    startDates,
    price,
    priceDiscount,
  },
}: TourInformationsProps) => {
  return (
    <div className="space-y-2 rounded-2xl p-4 bg-card shadow-sm">
      <h3 className="font-bold tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
        Tour Details
      </h3>
      <div className="flex flex-col gap-2">
        <InfoRow
          label="Price"
          value={formatCurrency(price)}
          render={() => (
            <div className="flex gap-2 items-center">
              {
                <span
                  className={`${
                    priceDiscount && priceDiscount > 0
                      ? "line-through text-xs"
                      : "font-semibold"
                  }`}
                >
                  {formatCurrency(price)}
                </span>
              }
              {Number(priceDiscount) > 0 && (
                <span className="font-semibold">
                  {formatCurrency(Number(priceDiscount))}
                </span>
              )}
            </div>
          )}
        />
        <InfoRow
          label="Duration"
          value={`${duration} ${
            duration === 1 ? durationUnit : durationUnit + "s"
          }`}
        />
        <InfoRow label="Difficulty" value={difficulty} />
        <InfoRow label="Max Groupe Size" value={`${maxGroupSize} person`} />
        <InfoRow
          label="Rating"
          value={ratingsAverage || 4.5}
          render={() => (
            <p className="capitalize font-semibold flex gap-1 items-center">
              <Rating
                readOnly
                value={ratingsAverage || 4.5}
                className="max-w-14"
              />
              <span className="text-xs">({ratingsAverage?.toFixed(1)})</span>
            </p>
          )}
        />
        <InfoRow
          label="Start Dates"
          value={`${startDates}`}
          render={() => (
            <div className="flex flex-col gap-1 items-end">
              {startDates.map((date) => (
                <span className="text-xs font-semibold">
                  {format(date, "dd-MM-yyyy hh:mm a")}
                </span>
              ))}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default TourInformations;

type InfoRowProps = {
  label: string;
  value: string | number;
  render?: () => ReactNode;
};
const InfoRow = ({ label, value, render }: InfoRowProps) => {
  return (
    <div className="flex justify-between gap-14 text-sm">
      <span className="capitalize tracking-wider font-light">{label}</span>
      {render ? (
        render()
      ) : (
        <span className="capitalize font-semibold">{value}</span>
      )}
    </div>
  );
};
