import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter as FilterIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";

type FilterProps = {
  label: string;
  fieldName?: string;
  options: { value: string; label: string }[];
  disabled?: boolean;
};

const Filter = ({
  label,
  options = [],
  disabled = false,
  fieldName,
}: FilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const key = fieldName ?? label.toLowerCase();
  const initial = searchParams.get(key) ?? "all";
  const [selected, setSelected] = useState(initial);

  const handleChange = (value: string) => {
    setSelected(value);
    if (value === "all") {
      searchParams.delete(key);
    } else {
      searchParams.set(key, value);
    }
    setSearchParams(searchParams);
  };

  // Keep in sync with URL
  useEffect(() => {
    setSelected(searchParams.get(key) ?? "all");
  }, [searchParams, key]);

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-muted-foreground font-semibold tracking-wide">
        {label}
      </Label>
      <Select value={selected} onValueChange={handleChange} disabled={disabled}>
        <SelectTrigger className="w-full min-w-36 bg-background text-muted-foreground">
          <FilterIcon className="h-4 w-4" />
          <span className="mr-auto">
            <SelectValue placeholder={label} />
          </span>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            <SelectItem value="all">All</SelectItem>
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

export default Filter;
