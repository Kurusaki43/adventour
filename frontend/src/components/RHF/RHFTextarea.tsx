import type { ComponentPropsWithoutRef } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import type { IconType } from "react-icons";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type RHFTextareaProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  icon?: IconType;
  description?: string;
} & ComponentPropsWithoutRef<"textarea">;

const RHFTextarea = <T extends FieldValues>({
  control,
  name,
  label,
  icon: Icon,
  description,
  className,
  ...props
}: RHFTextareaProps<T>) => {
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
            <div className="w-full relative h-auto">
              {Icon && (
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Icon className="w-4 h-4" />
                </span>
              )}
              <Textarea
                {...field}
                {...props}
                className={cn(Icon && "pl-9", className)}
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

export default RHFTextarea;
