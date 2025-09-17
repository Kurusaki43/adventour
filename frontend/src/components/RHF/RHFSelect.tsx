import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { Control, FieldValues, Path } from "react-hook-form";
import type { ComponentPropsWithoutRef } from "react";
import type { IconType } from "react-icons";

type Option = {
  label: string;
  value: string;
};

type RHFSelectProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  options: Option[];
  placeholder?: string;
  description?: string;
  className?: string;
  icon?: IconType;
} & ComponentPropsWithoutRef<"select">;

const RHFSelect = <T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder = "Select an option",
  description,
  className,
  icon: Icon,
  ...props
}: RHFSelectProps<T>) => {
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
            <div className="relative flex items-center w-full">
              {Icon && (
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Icon className="w-4 h-4 text-muted-foreground" />
                </span>
              )}
              <Select
                onValueChange={field.onChange}
                value={field.value ?? ""}
                disabled={props.disabled}
              >
                <SelectTrigger
                  className={cn("h-10 w-full", `${Icon && "pl-8"}`, className)}
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="capitalize"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="text-white bg-rose-500 text-center rounded-full px-4 py-1 text-xs ml-2 font-semibold tracking-wider" />
        </FormItem>
      )}
    />
  );
};

export default RHFSelect;
