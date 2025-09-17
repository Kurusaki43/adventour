import { Steps } from "@/constants/Steps";
import { createContext, useContext, useState } from "react";

type MultiStepFormContextType = {
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
};

const MultiStepFormContext = createContext<
  MultiStepFormContextType | undefined
>(undefined);

export const MultiStepProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, Steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));
  const goToStep = (step: number) => setCurrentStep(step);

  return (
    <MultiStepFormContext.Provider
      value={{ currentStep, nextStep, prevStep, goToStep }}
    >
      {children}
    </MultiStepFormContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMultiStepForm = () => {
  const context = useContext(MultiStepFormContext);
  if (!context) {
    throw new Error("useMultiStepForm must be used within a MultiStepProvider");
  }
  return context;
};
