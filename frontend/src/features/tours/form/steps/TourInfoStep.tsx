import RHFTextarea from "@/components/RHF/RHFTextarea";
import { useFormContext } from "react-hook-form";
import { GiMoneyStack } from "react-icons/gi";
import RHFInput from "@/components/RHF/RHFInput";
import RHFNumberInput from "@/components/RHF/RHFNumberInput";
import RHFSelect from "@/components/RHF/RHFSelect";
import { DurationUnit } from "../../types/tour";
import type { TourData } from "../../schema/toursSchema";

const TourInfoStep = () => {
  const { control } = useFormContext<TourData>();
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        <RHFInput
          control={control}
          name="name"
          label="Name *"
          placeholder="Enter tour name"
        />
        <RHFNumberInput
          control={control}
          name="price"
          label="Price *"
          icon={GiMoneyStack}
          placeholder="Enter tour price"
        />
        <RHFNumberInput
          control={control}
          name="priceDiscount"
          label="Price Discount"
          placeholder="Enter tour price discount"
          icon={GiMoneyStack}
        />

        <div className="relative flex flex-col">
          <RHFNumberInput
            control={control}
            name="duration"
            label="Duration *"
            placeholder="Duration in hours/days"
          />
          <div className="absolute right-0.5 top-7.5">
            <RHFSelect
              control={control}
              name="durationUnit"
              options={[
                { label: "Day", value: DurationUnit.Day },
                { label: "Hour", value: DurationUnit.Hour },
              ]}
              placeholder="Unit"
            />
          </div>
        </div>
        <RHFNumberInput
          control={control}
          name="maxGroupSize"
          label="Max Group Size *"
          placeholder="Enter max group size"
        />
        <RHFSelect
          control={control}
          name="difficulty"
          options={[
            { label: "Easy", value: "easy" },
            { label: "Medium", value: "medium" },
            { label: "Difficult", value: "difficult" },
          ]}
          label="Difficulty *"
          placeholder="Select difficulty level"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4 items-start">
        <RHFTextarea
          control={control}
          name="summary"
          label="Summary *"
          placeholder="Enter tour summary"
          className="h-24"
        />
        <RHFTextarea
          control={control}
          name="description"
          label="Description *"
          placeholder="Enter tour description"
          className="h-24"
        />
      </div>
    </>
  );
};

export default TourInfoStep;
