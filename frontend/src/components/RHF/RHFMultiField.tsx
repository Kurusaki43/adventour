import {
  useFieldArray,
  type ArrayPath,
  type Control,
  type FieldValues,
  useFormContext,
  type FieldArray,
  type Path,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";
import { FormLabel } from "@/components/ui/form";

interface RHFMultiFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: ArrayPath<T>;
  label?: string;
  placeholder?: string;
  className?: string;
  defaultItem: FieldArray<T, ArrayPath<T>> | FieldArray<T, ArrayPath<T>>[];
  renderField: (fieldIndex: number) => ReactNode;
}

const RHFMultiField = <T extends FieldValues>({
  control,
  name,
  label = "",
  className = "",
  defaultItem,
  renderField,
}: RHFMultiFieldProps<T>) => {
  const form = useFormContext<T>();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const error = form.formState.errors?.[name as keyof T] as {
    message?: string;
    root?: { message?: string };
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <FormLabel className="text-sm font-normal tracking-wide">
          {label}
        </FormLabel>
      )}

      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center gap-4">
          <div className="w-[95%]">{renderField(index)}</div>
          <Button
            className="w-[5%]"
            type="button"
            size="icon"
            variant="ghost"
            onClick={() => {
              remove(index);
            }}
          >
            <Trash2 className="size-4 text-red-500" />
          </Button>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() => {
          append(defaultItem);
          form.clearErrors(name as Path<T>);
        }}
      >
        ➕ Add
      </Button>

      {(error?.message || error?.root?.message) && (
        <p className="text-white bg-rose-500 text-center rounded-full px-4 py-1 text-xs ml-2 font-semibold tracking-wider">
          {error.message || error?.root?.message}
        </p>
      )}
    </div>
  );
};

export default RHFMultiField;
