import { useFormContext } from "react-hook-form";
import type { TourData } from "../schema/toursSchema";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";
import { useMultiStepForm } from "../context/multiStepForm";
import { Steps } from "@/constants/Steps";

const MultiStepFormFooter = ({ isSubmitting }: { isSubmitting: boolean }) => {
  const { currentStep, nextStep, prevStep } = useMultiStepForm();
  const { watch, trigger, getValues, setError } = useFormContext<TourData>();
  const StepInputsToValidate = Steps[currentStep].inputs;
  const leadGuide = watch("leadGuide");
  const guides = watch("guides");
  const isPublished = leadGuide && guides && guides.length > 0;

  const verifyFields = (fn: () => void) => {
    trigger(StepInputsToValidate).then((isValid) => {
      const isValidDiscountPrice =
        Number(getValues("priceDiscount") || 0) < Number(getValues("price"));
      if (getValues("priceDiscount") && !isValidDiscountPrice)
        setError("priceDiscount", {
          message: "Price Discount Should Be Less Than Price",
        });
      if (isValid && isValidDiscountPrice) {
        fn();
      }
    });
  };

  return (
    <div className="flex justify-between pt-4 mt-auto">
      <Button type="button" onClick={prevStep} disabled={currentStep === 0}>
        Back
      </Button>

      {currentStep < Steps.length - 1 && (
        <Button type="button" onClick={() => verifyFields(nextStep)}>
          Next
        </Button>
      )}
      {currentStep === Steps.length - 1 && (
        <LoadingButton loading={isSubmitting} type="submit">
          {isPublished ? "Published" : "Save as Draft"}
        </LoadingButton>
      )}
    </div>
  );
};

export default MultiStepFormFooter;
