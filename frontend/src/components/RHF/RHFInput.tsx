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
import { useState, type ComponentPropsWithoutRef } from "react";
import type { IconType } from "react-icons";
import { cn } from "@/lib/utils";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type RHFInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  icon?: IconType;
  description?: string;
} & ComponentPropsWithoutRef<"input">;

const RHFInput = <T extends FieldValues>({
  control,
  name,
  label,
  icon: Icon,
  description,
  className,
  ...props
}: RHFInputProps<T>) => {
  const [visible, setVisible] = useState(false);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, ...field } }) => (
        <FormItem>
          {label && (
            <FormLabel className="text-sm font-normal tracking-wide">
              {label}
            </FormLabel>
          )}
          <FormControl>
            <div className="w-full relative flex items-center">
              {Icon && (
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Icon className="w-4 h-4" />
                </span>
              )}
              <Input
                value={value ?? ""}
                {...field}
                {...props}
                type={
                  props.type === "password"
                    ? !visible
                      ? "password"
                      : "text"
                    : props.type
                }
                className={cn(
                  Icon && "pl-9",
                  "h-10 disabled:bg-slate-200 dark:disabled:bg-slate-900",
                  className
                )}
              />
              {props.type === "password" && (
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setVisible(!visible)}
                >
                  {visible ? (
                    <FaEyeSlash className="w-4 h-4" />
                  ) : (
                    <FaEye className="w-4 h-4" />
                  )}
                </span>
              )}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="text-white w-fit bg-rose-500 text-center rounded-full px-4 py-1 text-xs ml-2 font-semibold tracking-wider" />
        </FormItem>
      )}
    />
  );
};

export default RHFInput;
