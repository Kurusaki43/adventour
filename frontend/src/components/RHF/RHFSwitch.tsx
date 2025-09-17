import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import type { Control, FieldValues, Path } from "react-hook-form";
import type { ComponentPropsWithoutRef } from "react";
import { Switch } from "@/components/ui/switch";

type RHFSwitchProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  description?: string;
  className?: string;
} & ComponentPropsWithoutRef<"input">;

const RHFSwitch = <T extends FieldValues>({
  control,
  name,
  label,
  description,
  className,
}: RHFSwitchProps<T>) => {
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
            <Switch
              className={cn(className)}
              checked={field.value || false}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="text-white bg-rose-500 text-center rounded-full px-4 py-1 text-xs ml-2 font-semibold tracking-wider" />
        </FormItem>
      )}
    />
  );
};

export default RHFSwitch;
