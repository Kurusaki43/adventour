import { useFormContext } from "react-hook-form";
import type { CreateTourData } from "../schema/toursSchema";
import { Button } from "@/components/ui/button";
import { useMultiStepForm } from "../context/multiStepForm";
import { Steps } from "@/constants/Steps";

const MultiStepFormHeader = () => {
  const { currentStep, goToStep: goTo } = useMultiStepForm();
  const {
    formState: { errors },
  } = useFormContext<CreateTourData>();
  const hasError = Steps[currentStep].inputs.some((input) =>
    Boolean(errors[input])
  );

  return (
    <div>
      {/* Step Buttons */}
      <div className="flex items-center gap-2">
        {Steps.map((step, index) => {
          const Icon = step.icon;
          let className = "text-gray-400 border-gray-400";
          let barClassName = "bg-gray-200";
          if (currentStep === index && !hasError) {
            className = "text-primary border-primary";
            barClassName = "bg-primary";
          }
          if (currentStep === index && hasError) {
            className = "text-red-400 border-red-400";
            barClassName = "bg-red-400";
          }
          if (currentStep > index) {
            className = "text-primary border-primary";
            barClassName = "bg-primary";
          }

          return (
            <div className={`text-sm font-semibold flex-1 flex flex-col gap-1`}>
              <Button
                variant="ghost"
                type="button"
                size="sm"
                onClick={() => goTo(index)}
                key={index}
                className={`flex flex-row justify-center items-center gap-3  ${className}`}
              >
                <Icon className="size-5" />
                <span className="hidden sm:block">{step.title}</span>
              </Button>
              {/* Progress Bar */}
              <div className="relative w-full h-1 bg-gray-200 rounded-full mt-2">
                <div
                  className={`absolute top-0 left-0 h-1 rounded-full transition-all duration-300 w-full ${barClassName}`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MultiStepFormHeader;
