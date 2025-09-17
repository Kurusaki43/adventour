import { FaSearch } from "react-icons/fa";
import { useState, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type SearchInputProps = {
  collapse?: boolean;
} & ComponentPropsWithoutRef<"input">;

const SearchInput = ({
  collapse = true,
  value,
  onChange,
  className,
  placeholder = "Search",

  ...props
}: SearchInputProps) => {
  const [hidden, setHidden] = useState(false);
  const InputWithIcon = (
    <div className="relative">
      <Input
        {...props}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          "bg-white sm:bg-gray-100 sm:border-0 placeholder:text-sm pr-10",
          className
        )}
      />
      <FaSearch className="absolute top-2.5 right-2 text-muted-foreground" />
    </div>
  );
  if (!collapse) return InputWithIcon;
  return (
    <>
      {/* Mobile toggle button */}
      <Button
        className="bg-foreground w-8 h-8  shadow-lg flex items-center justify-center rounded-lg sm:hidden cursor-pointer"
        onClick={() => setHidden((prev) => !prev)}
      >
        <FaSearch className="size-3.5" />
      </Button>

      {/* Search input container */}
      <div
        className={`absolute top-full left-0 w-full px-4 mt-2 sm:static sm:mt-0 sm:px-0 sm:flex-1 sm:max-w-md transform  ${
          hidden
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none sm:opacity-100 sm:pointer-events-auto"
        }`}
      >
        {InputWithIcon}
      </div>
    </>
  );
};

export default SearchInput;
