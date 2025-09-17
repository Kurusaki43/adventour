import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Control, FieldValues, Path } from "react-hook-form";
import type { ComponentPropsWithoutRef } from "react";
import { ChevronDown } from "lucide-react";

export type Option = {
  label: string;
  value: string;
};

type RHFMultiSelectProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  options: Option[];
  placeholder?: string;
  description?: string;
  className?: string;
} & ComponentPropsWithoutRef<"div">;

const RHFMultiSelect = <T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder = "Select options",
  description,
  className,
}: RHFMultiSelectProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className="text-sm font-normal tracking-wide">
              {label}
            </FormLabel>
          )}
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-between text-left font-normal h-10 capitalize",
                    className
                  )}
                >
                  {field.value?.length ? (
                    options
                      .filter((o) => field.value.includes(o.value))
                      .map((o) => o.label)
                      .join(", ")
                  ) : (
                    <span className="text-muted-foreground">{placeholder}</span>
                  )}
                  <ChevronDown className="text-muted-foreground/60 size-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full max-h-60 overflow-y-auto p-2 space-y-1">
                {options.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2 p-1 rounded-md hover:bg-muted cursor-pointer"
                    onClick={() => {
                      const newValue = field.value?.includes(option.value)
                        ? field.value.filter(
                            (val: string) => val !== option.value
                          )
                        : [...(field.value || []), option.value];
                      field.onChange(newValue);
                    }}
                  >
                    <Checkbox
                      checked={
                        Array.isArray(field.value) &&
                        field.value.includes(option.value)
                      }
                    />

                    <span className="text-sm capitalize">{option.label}</span>
                  </div>
                ))}
              </PopoverContent>
            </Popover>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="text-white bg-rose-500 text-center rounded-full px-4 py-1 text-xs ml-2 font-semibold tracking-wider w-fit" />
        </FormItem>
      )}
    />
  );
};

export default RHFMultiSelect;
