import type { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { ComponentPropsWithoutRef } from "react";
import type { IconType } from "react-icons";
import { cn } from "@/lib/utils";

type RHFNumberInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  icon?: IconType;
} & Omit<ComponentPropsWithoutRef<"input">, "type">;

const RHFNumberInput = <T extends FieldValues>({
  control,
  name,
  label,
  description,
  icon: Icon,
  className,
  ...props
}: RHFNumberInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange, ...field } }) => (
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
              <Input
                {...field}
                {...props}
                type="number"
                inputMode="decimal"
                onChange={(e) => {
                  const val = e.target.value;
                  onChange(val);
                }}
                value={value ?? ""}
                className={cn(
                  Icon && "pl-9",
                  "h-10 m-0",
                  "appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]",
                  className
                )}
              />
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="text-white w-fit bg-rose-500 text-center rounded-full px-4 py-1 text-xs ml-2 font-semibold tracking-wider" />
        </FormItem>
      )}
    />
  );
};

export default RHFNumberInput;
