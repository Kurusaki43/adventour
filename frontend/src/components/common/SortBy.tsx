import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ArrowUpDown } from "lucide-react";
import { Label } from "../ui/label";

type SortByProps = {
  options: { value: string; label: string }[];
  defaultValue?: string;
  placeholder?: string;
  showLabel?: boolean;
};

const SortBy = ({
  options,
  placeholder = "Sort by",
  defaultValue,
  showLabel = true,
}: SortByProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState(
    searchParams.get("sort") ?? defaultValue
  );

  const handleOnSort = (value: string) => {
    setSelected(value);

    if (value === defaultValue || !value) {
      searchParams.delete("sort");
    } else {
      searchParams.set("sort", value);
    }

    setSearchParams(searchParams);
  };

  // Sync with URL changes
  useEffect(() => {
    setSelected(searchParams.get("sort") ?? defaultValue);
  }, [searchParams, defaultValue]);

  return (
    <div className="flex flex-col gap-2">
      {showLabel && (
        <Label className="text-muted-foreground font-semibold tracking-wide">
          SortBy
        </Label>
      )}
      <Select value={selected || ""} onValueChange={handleOnSort}>
        <SelectTrigger className="w-full min-w-36 bg-background text-muted-foreground">
          <ArrowUpDown className="h-4 w-4 mr-2" />
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort By</SelectLabel>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

SortBy.displayName = "SortBy";

export default SortBy;
