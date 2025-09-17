import { Steps } from "@/constants/Steps";
import type { Tour } from "../types/tour";
import { tourSchema, type TourData } from "../schema/toursSchema";
import CustomForm from "@/components/common/Form";
import { useForm } from "react-hook-form";
import MultiStepFormHeader from "./MultiStepFormHeader";
import MultiStepFormFooter from "./MultiStepFormFooter";
import { useMutateTour } from "../toursQueries";
import { useMultiStepForm } from "../context/multiStepForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseDefaultTour } from "../utils/parseDefaultTour";

type MultiStepFormProps = {
  mode: "CREATE" | "UPDATE";
  editedTour?: Partial<Tour>;
  onSuccess?: () => void;
};

const MultiStepTourForm = ({
  mode,
  editedTour,
  onSuccess,
}: MultiStepFormProps) => {
  const { currentStep } = useMultiStepForm();
  const StepComponent = Steps[currentStep].component;
  const form = useForm<TourData>({
    resolver: zodResolver(tourSchema),
    mode: "onChange",
    defaultValues:
      mode === "UPDATE"
        ? parseDefaultTour(editedTour!)
        : { durationUnit: "hour" },
  });

  const { createUpdateTour, isPending } = useMutateTour(mode, onSuccess);

  const handleSubmit = async (data: TourData) => {
    createUpdateTour(data);
  };

  return (
    <div className="mt-4 border p-4 rounded-lg border-dashed grid gap-4">
      <CustomForm
        form={form}
        onSubmit={handleSubmit}
        className="bg-transparent p-0 shadow-none flex flex-col gap-8 mt-4 min-h-[500px]"
      >
        <MultiStepFormHeader />
        <StepComponent editedTour={editedTour} />
        <MultiStepFormFooter isSubmitting={isPending} />
      </CustomForm>
    </div>
  );
};

export default MultiStepTourForm;
