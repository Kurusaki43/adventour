import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { locationSchema, type LocationData } from "../schema/locationSchema";
import CustomForm from "@/components/common/Form";
import RHFInput from "@/components/RHF/RHFInput";
import RHFTextarea from "@/components/RHF/RHFTextarea";
import { Button } from "@/components/ui/button";
import type { Location } from "../types/location";

type TourLocationFormProps = {
  address: string;
  coords: [number, number] | null;
  onAdd: (loc: Location) => void;
};

const TourLocationForm = ({
  address,
  coords,
  onAdd,
}: TourLocationFormProps) => {
  const form = useForm<LocationData>({
    resolver: zodResolver(locationSchema),
  });

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const valid = await form.trigger();
    if (!valid) return;
    const loc = form.getValues() as Location;
    onAdd(loc);
    form.reset({ address: "", coordinates: [], name: "", description: "" });
  };

  useEffect(() => {
    if (address) form.setValue("address", address, { shouldValidate: true });
    if (coords)
      form.setValue("coordinates", [...coords].reverse(), {
        shouldValidate: true,
      });
  }, [address, coords, form]);

  return (
    <CustomForm
      form={form}
      className="shadow-none border flex flex-col gap-4 w-full sm:w-1/2 bg-transparent"
    >
      <RHFInput
        control={form.control}
        name="name"
        label="Location Name"
        placeholder="Enter Location Name"
      />
      <RHFTextarea
        control={form.control}
        name="description"
        label="Description"
        placeholder="Enter a description"
      />
      <RHFTextarea
        control={form.control}
        name="address"
        label="Location Address"
        placeholder="location address (try click on the map)"
      />
      <RHFInput
        control={form.control}
        name="coordinates"
        label="Coordinates"
        placeholder="location coords (try click on the map)"
      />
      <Button
        size="sm"
        className="self-end w-18"
        type="button"
        onClick={handleSubmit}
      >
        Save
      </Button>
    </CustomForm>
  );
};

export default TourLocationForm;
