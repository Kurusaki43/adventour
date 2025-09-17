import RHFDateTimePicker from "@/components/RHF/RHFDatePicker";
import RHFMultiField from "@/components/RHF/RHFMultiField";
import { useFormContext } from "react-hook-form";
import type { TourData } from "../../schema/toursSchema";

const TourScheduleStep = () => {
  const { control } = useFormContext<TourData>();

  return (
    <RHFMultiField
      control={control}
      label="Start Dates *"
      name="startDates"
      defaultItem={{ date: new Date() }}
      renderField={(index) => (
        <RHFDateTimePicker
          index={index + 1}
          control={control}
          name={`startDates.${index}.date`}
          placeholder="Pick a date"
        />
      )}
    />
  );
};

export default TourScheduleStep;
