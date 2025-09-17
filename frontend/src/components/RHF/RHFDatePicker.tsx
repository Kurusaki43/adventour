import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { type Control, type FieldValues, type Path } from "react-hook-form";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";
import {
  format,
  isValid,
  setHours,
  setMinutes,
  getHours,
  getMinutes,
} from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";

type RHFDateTimePickerProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  index?: number;
};

const RHFDateTimePicker = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Select a date and time",
  description,
  index,
}: RHFDateTimePickerProps<T>) => {
  const [open, setOpen] = useState(false);

  const combineDateTime = (
    date: Date | undefined,
    time: string
  ): Date | null => {
    if (!date || !isValid(date)) return null;
    const [hours, minutes] = time.split(":").map(Number);
    return setMinutes(setHours(date, hours), minutes);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const dateValue = field.value ? new Date(field.value) : new Date();

        // Extract HH:mm every render safely
        const timeValue = isValid(dateValue)
          ? `${String(getHours(dateValue)).padStart(2, "0")}:${String(
              getMinutes(dateValue)
            ).padStart(2, "0")}`
          : "12:00";

        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <fieldset className="flex flex-col items-start gap-3 sm:flex-row sm:items-center border p-2 rounded-sm xs:border-none">
                <legend className="font-medium text-xs">Date: {index}</legend>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date-picker"
                      className="w-[200px] justify-between font-normal"
                    >
                      <CalendarIcon />
                      {dateValue && isValid(dateValue)
                        ? format(dateValue, "EEE, MMM d yyyy")
                        : placeholder}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto  p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateValue}
                      captionLayout="dropdown"
                      onSelect={(selectedDate) => {
                        const combined = combineDateTime(
                          selectedDate,
                          timeValue
                        );
                        if (combined) field.onChange(combined);
                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>

                <Input
                  type="time"
                  id="time-picker"
                  step="60"
                  value={timeValue}
                  onChange={(e) => {
                    const newTime = e.target.value;
                    const combined = combineDateTime(dateValue, newTime);
                    if (combined) field.onChange(combined);
                  }}
                  className="w-fit"
                />
              </fieldset>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default RHFDateTimePicker;
