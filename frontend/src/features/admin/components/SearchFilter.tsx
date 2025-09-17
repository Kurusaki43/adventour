import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useEffect, useState, type HTMLAttributes } from "react";
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

type SearchFilterProps = {
  placeholder?: string;
  className?: string;
} & HTMLAttributes<HTMLInputElement>;

const SearchFilter = ({ placeholder, className }: SearchFilterProps) => {
  const [value, setValue] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setValue(searchParams.get("search") || "");
  }, [searchParams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (value === "") {
        searchParams.delete("search");
      } else {
        searchParams.set("search", value);
      }
      setSearchParams(searchParams);
    }, 300);

    return () => clearTimeout(timer);
  }, [value, searchParams, setSearchParams]);

  return (
    <div className="space-y-2">
      <Label className="text-muted-foreground font-semibold tracking-wide">
        Search
      </Label>
      <div className="relative">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full bg-background placeholder:text-sm placeholder:font-light pr-10 text-muted-foreground font-bold tracking-wide",
            className
          )}
        />
        <FaSearch className="absolute top-2.5 right-2 text-muted-foreground" />
      </div>
    </div>
  );
};

export default SearchFilter;
