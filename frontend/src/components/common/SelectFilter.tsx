import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

interface SelectFilterProps {
  paramKey: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
  label?: string;
  resetTrigger?: number;
}

const SelectFilter: React.FC<SelectFilterProps> = ({
  paramKey,
  options,
  defaultValue = "",
  label,
  resetTrigger,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentValue = searchParams.get(paramKey) || defaultValue;

  const handleChange = (value: string) => {
    if (value === "" || value === defaultValue) {
      searchParams.delete(paramKey);
    } else {
      searchParams.set(paramKey, value);
    }
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (resetTrigger !== undefined) {
      searchParams.delete(paramKey);
      setSearchParams(searchParams);
    }
  }, [resetTrigger, searchParams, setSearchParams]);

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <select
        value={currentValue}
        onChange={(e) => handleChange(e.target.value)}
        className="border rounded-lg p-2"
      >
        {defaultValue && <option value="">{defaultValue}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectFilter;
