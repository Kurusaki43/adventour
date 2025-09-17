import { useFormContext } from "react-hook-form";
import type { Tour } from "../../types/tour";
import type { TourData } from "../../schema/toursSchema";
import RHFFileInput from "@/components/RHF/RHFFileInput";

const TourMediaStep = ({ editedTour }: { editedTour?: Partial<Tour> }) => {
  const { control } = useFormContext<TourData>();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4 mb-2 items-start">
      <RHFFileInput
        control={control}
        name="imageCover"
        label="Image Cover *"
        multiple={false}
        existing={
          typeof editedTour?.imageCover === "string"
            ? [editedTour.imageCover]
            : []
        }
      />
      <RHFFileInput
        control={control}
        name="images"
        label="Images"
        multiple={true}
        existing={editedTour?.images}
      />
    </div>
  );
};

export default TourMediaStep;
