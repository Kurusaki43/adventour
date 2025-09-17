import { useCallback, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import type { TourData } from "../../schema/toursSchema";
import type { Location } from "../../types/location";
import axiosInstance from "@/shared/api/axios";
import TourLocationPreview from "../../components/TourLocationPreview";
import TourLocationForm from "../TourLocationForm";
import MapView from "@/components/common/MapView";

const TourLocationsStep = () => {
  const [coords, setCoords] = useState<[number, number] | null>(null);
  const [address, setAddress] = useState("");
  const [activeMarker, setActiveMarker] = useState<{
    lat: number;
    lng: number;
    type: string;
  } | null>(null);

  const {
    watch,
    setValue,
    formState: {
      errors: { locations: locationsError },
    },
  } = useFormContext<TourData>();
  const tourLocations = (watch("locations") || []) as Location[];

  const markers = useMemo(() => {
    const prev = tourLocations.map((loc) => ({
      lat: loc.coordinates[1],
      lng: loc.coordinates[0],
      type: "previous",
    }));
    return activeMarker ? [...prev, { ...activeMarker, type: "active" }] : prev;
  }, [tourLocations, activeMarker]);

  // Fetch address for given coords
  const fetchAddress = useCallback(async (lat: number, lng: number) => {
    try {
      const { data } = await axiosInstance.get(`/tours/reverse-geocode`, {
        params: { lat, lon: lng },
      });

      const displayName = data?.data?.address?.display_name || "";
      setAddress(displayName);
    } catch (error) {
      console.error("Failed to fetch address:", error);
      setAddress("");
    }
  }, []);

  // When a map location is clicked
  const handleSelect = useCallback(
    ({ lat, lng }: { lat: number; lng: number }) => {
      setCoords([lat, lng]);
      setActiveMarker({ lat, lng, type: "active" });
      fetchAddress(lat, lng);
    },
    [fetchAddress]
  );

  const onAddLocation = useCallback(
    (location: Location) => {
      const exists = tourLocations.some((loc) => loc.name === location.name);
      if (exists) return;

      setValue("locations", [...tourLocations, location], {
        shouldValidate: true,
      });
    },
    [tourLocations, setValue]
  );

  const onDeleteLocation = useCallback(
    (location: Location) => {
      setValue(
        "locations",
        tourLocations.filter((loc) => loc.name !== location.name),
        { shouldValidate: true }
      );
    },
    [tourLocations, setValue]
  );

  return (
    <div>
      {locationsError && (
        <p className="text-white w-fit bg-rose-500 text-center rounded-full px-4 py-1 text-xs ml-2 font-semibold tracking-wider">
          {locationsError.message}
        </p>
      )}
      <TourLocationPreview
        locations={tourLocations}
        onDelete={onDeleteLocation}
      />

      <div className="flex flex-col sm:flex-row gap-2">
        <TourLocationForm
          address={address}
          coords={coords}
          onAdd={onAddLocation}
        />

        <div className="w-full sm:w-1/2 overflow-hidden border-2 rounded-sm">
          <MapView handleSelect={handleSelect} markers={markers} />
        </div>
      </div>
    </div>
  );
};

export default TourLocationsStep;
