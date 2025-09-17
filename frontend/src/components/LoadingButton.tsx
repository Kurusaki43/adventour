import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";

type LoadingButtonProps = {
  loading: boolean;
  children: ReactNode;
  loadingLabel?: string;
} & ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

const LoadingButton = ({
  loading,
  children,
  className,
  disabled,
  loadingLabel = "Submitting",
  ...props
}: LoadingButtonProps) => {
  return (
    <Button
      className={cn("cursor-pointer disabled:opacity-70", className)}
      {...props}
      disabled={disabled || loading}
    >
      {loading ? (
        <div className="flex items-center gap-1">
          <span className="border-t-2 border-b-2 border-l-2 border-r-2 border-l-transparent border-r-transparent border-current w-4 h-4 rounded-full animate-spin" />
          <span>{loadingLabel}</span>
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default LoadingButton;
