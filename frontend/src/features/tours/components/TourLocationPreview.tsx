import { MdLocationOn } from "react-icons/md";
import type { Location } from "../types/location";
import { Button } from "@/components/ui/button";

const TourLocationPreview = ({
  locations = [],
  onDelete,
}: {
  locations: Location[];
  onDelete?: (location: Location) => void;
}) => {
  return (
    <div className="flex flex-row flex-wrap gap-2 mb-4">
      {locations.length > 0 &&
        locations.map((location) => (
          <div
            className="relative p-2 flex flex-row items-center gap-2 rounded-sm shadow-sm text-sm bg-gray-600 text-white"
            key={location.name}
          >
            <MdLocationOn />
            <span className="capitalize">{location.name}</span>
            {onDelete && (
              <Button
                className="size-5 text-xs p-0 bg-red-400 rounded-full hover:bg-red-500"
                onClick={() => onDelete?.(location)}
              >
                X
              </Button>
            )}
          </div>
        ))}
    </div>
  );
};

export default TourLocationPreview;
