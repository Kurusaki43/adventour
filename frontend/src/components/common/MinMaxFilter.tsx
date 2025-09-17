import { useSearchParams } from "react-router-dom";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useState, type ChangeEvent } from "react";

type MinMaxFilterProps = {
  label: string;
  fieldName: string;
};

const MinMaxFilter = ({ label, fieldName }: MinMaxFilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // build consistent param names
  const minValueField = `min${fieldName}`;
  const maxValueField = `max${fieldName}`;

  // local state for debounce
  const [minValue, setMinValue] = useState(
    searchParams.get(minValueField) || ""
  );
  const [maxValue, setMaxValue] = useState(
    searchParams.get(maxValueField) || ""
  );

  // update when searchParams change externally (e.g. reset button)
  useEffect(() => {
    setMinValue(searchParams.get(minValueField) || "");
    setMaxValue(searchParams.get(maxValueField) || "");
  }, [searchParams, minValueField, maxValueField]);

  // debounce min
  useEffect(() => {
    const timer = setTimeout(() => {
      if (minValue === "") {
        searchParams.delete(minValueField);
      } else {
        searchParams.set(minValueField, minValue);
      }
      setSearchParams(searchParams);
    }, 300);
    return () => clearTimeout(timer);
  }, [minValue, minValueField, searchParams, setSearchParams]);

  // debounce max
  useEffect(() => {
    const timer = setTimeout(() => {
      if (maxValue === "") {
        searchParams.delete(maxValueField);
      } else {
        searchParams.set(maxValueField, maxValue);
      }
      setSearchParams(searchParams);
    }, 300);
    return () => clearTimeout(timer);
  }, [maxValue, maxValueField, searchParams, setSearchParams]);

  return (
    <div className="space-y-2">
      <Label className="text-muted-foreground font-semibold tracking-wide">
        {label}
      </Label>
      <div className="flex items-center gap-4 justify-between">
        <Input
          type="number"
          min={0}
          placeholder="Min"
          value={minValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setMinValue(e.target.value)
          }
        />
        <Input
          type="number"
          min={0}
          placeholder="Max"
          value={maxValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setMaxValue(e.target.value)
          }
        />
      </div>
    </div>
  );
};

export default MinMaxFilter;
