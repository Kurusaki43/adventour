import MapView from "@/components/common/MapView";
import { useMemo } from "react";
import type { Tour } from "../types/tour";
import TourLocationPreview from "./TourLocationPreview";
import { calcCentroid } from "../utils/calcCentroid";
type TourLocationsPreview = {
  locations: Tour["locations"];
};
const TourLocationsPreview = ({ locations }: TourLocationsPreview) => {
  const markers = useMemo(() => {
    const prev = locations.map((loc) => ({
      lat: loc.coordinates[1],
      lng: loc.coordinates[0],
      label: loc.name,
    }));
    return prev;
  }, [locations]);

  return (
    <div className="">
      <TourLocationPreview locations={locations} />
      <div className="w-full h-96 overflow-hidden border-2 rounded-sm">
        <MapView markers={markers} zoom={5} center={calcCentroid(locations)} />
      </div>
    </div>
  );
};

export default TourLocationsPreview;
