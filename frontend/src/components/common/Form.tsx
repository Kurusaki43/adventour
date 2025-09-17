import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { Form } from "../ui/form";

type CustomFormProps<T extends FieldValues> = {
  children: React.ReactNode;
  form: UseFormReturn<T>;
  onSubmit?: (data: T) => Promise<void> | void;
  className?: ComponentPropsWithoutRef<"form">["className"];
};

const CustomForm = <T extends FieldValues>({
  children,
  form,
  className,
  onSubmit,
}: CustomFormProps<T>) => {
  return (
    <Form {...form}>
      <form
        className={cn("bg-white p-6 rounded-lg shadow-md w-full", className)}
        onSubmit={onSubmit && form.handleSubmit(onSubmit)}
      >
        {children}
      </form>
    </Form>
  );
};

export default CustomForm;
