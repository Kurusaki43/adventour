import { Button } from "@/components/ui/button";
import type { IAvailability } from "../../types/user.types";
import { Trash } from "lucide-react";
import { formatTime } from "@/features/guides/utils/formatTime";

type AvailibilitySlotProps = {
  availibility: IAvailability;
  readonly?: boolean;
  onDelete?: (v: IAvailability) => void;
};

const AvailibilitySlot = ({
  availibility,
  readonly = false,
  onDelete,
}: AvailibilitySlotProps) => {
  return (
    <div
      key={`${availibility.day}-${availibility.from}-${availibility.to}`}
      className="flex items-center gap-2 my-1 w-[450px]"
    >
      <p className="text-sm w-12 lg:w-24">
        <span className="hidden lg:inline"> Day:</span>
        <span className="ml-2 bg-orange-500 text-white px-2 py-0.5 rounded-full w-full inline-block lg:inline">
          {availibility.day}
        </span>
      </p>
      <p className="text-sm lg:w-32">
        <span className="hidden lg:inline"> From:</span>
        <span className="ml-2 bg-cyan-600 text-white px-2 py-0.5 rounded-full w-full inline-block lg:inline">
          {formatTime(availibility.from)}
        </span>
      </p>
      <span className="inline-block w-2 h-0.5 bg-cyan-600 ml-2 lg:hidden" />
      <p className="text-sm lg:w-32 flex items-center">
        <span className="hidden lg:inline"> To:</span>
        <span className="lg:ml-2 bg-cyan-600 text-white px-2 py-0.5 rounded-full w-full inline-block lg:inline">
          {formatTime(availibility.to)}
        </span>
      </p>
      {!readonly && (
        <Button
          type="button"
          variant="ghost"
          onClick={() => onDelete?.(availibility)}
          className="text-red-600 ml-auto"
        >
          <Trash />
        </Button>
      )}
    </div>
  );
};

export default AvailibilitySlot;
