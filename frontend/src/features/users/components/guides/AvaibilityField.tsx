import { useFormContext, type FieldValues, type Path } from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DAYS } from "@/constants/days";
import AvailibilitySlot from "./AvailibilitySlot";
import type { IAvailability } from "../../types/user.types";

type AvailabilityFieldProps<T extends FieldValues> = {
  fieldName?: Path<T>; // default = "availability"
};

const AvailabilityField = <T extends FieldValues>({
  fieldName = "availability" as Path<T>,
}: AvailabilityFieldProps<T>) => {
  const { watch, setValue, formState } = useFormContext<T>();
  const availabilities = (watch(fieldName) as IAvailability[]) || [];
  const [availability, setAvailability] = useState<IAvailability>({
    day: "",
    from: "08:00:00",
    to: "16:00:00",
  });

  const handleChange = (key: keyof IAvailability, value: string) => {
    setAvailability((prev) => ({ ...prev, [key]: value }));
  };

  const handleAdd = () => {
    const { day, from, to } = availability;
    if (day && from && to) {
      setValue(fieldName, [
        ...availabilities,
        availability,
      ] as T[typeof fieldName]);
      setAvailability({ day: "", from: "08:00:00", to: "16:00:00" });
    }
  };

  const handleDelete = (target: IAvailability) => {
    const updated = availabilities.filter(
      (a) =>
        !(a.day === target.day && a.from === target.from && a.to === target.to)
    );
    setValue(fieldName, updated as T[typeof fieldName], {
      shouldValidate: true,
    });
  };

  return (
    <div className="overflow-x-auto scrollbar-hide sm:col-span-2">
      <fieldset className="border p-4 rounded-md  w-full block">
        <legend className="text-sm font-semibold">Availability *</legend>

        {availabilities?.map((a) => (
          <AvailibilitySlot
            availibility={a}
            onDelete={handleDelete}
            key={`${a.day}-${a.from}-${a.to}`}
          />
        ))}

        <div className="mt-4 flex flex-col sm:flex-row sm:flex-wrap gap-3 items-start">
          <div className="flex items-center gap-2">
            <Label className="w-10">Day</Label>
            <Select
              value={availability.day}
              onValueChange={(d) => handleChange("day", d)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Day" />
              </SelectTrigger>
              <SelectContent>
                {DAYS.map((day) => (
                  <SelectItem key={day.value} value={day.value}>
                    {day.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Label className="w-10">From</Label>
            <Input
              type="time"
              step="1"
              value={availability.from}
              onChange={(e) => handleChange("from", e.target.value)}
              className="w-42"
            />
          </div>

          <div className="flex items-center gap-2">
            <Label className="w-10">To</Label>
            <Input
              type="time"
              step="1"
              value={availability.to}
              onChange={(e) => handleChange("to", e.target.value)}
              className="w-42"
            />
          </div>

          <Button type="button" onClick={handleAdd}>
            + Add
          </Button>
        </div>

        {formState.errors[fieldName] && (
          <p className="text-white bg-rose-500 text-center rounded-full px-4 py-1 text-xs ml-2 font-semibold tracking-wider mt-2 w-fit">
            {String(
              (formState.errors[fieldName] as { message?: string })?.message
            )}
          </p>
        )}
      </fieldset>
    </div>
  );
};

export default AvailabilityField;
