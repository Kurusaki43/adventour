import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import type { Control, FieldValues, Path } from "react-hook-form";

type Option = {
  label: string; // tour.name
  value: string; // tour.id
  image?: string; // optional tour.imageCover
};

type RHFComboboxProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  options: Option[];
  placeholder?: string;
  description?: string;
  className?: string;
  imagesPath?: string;
  disabled?: boolean;
};

const RHFCombobox = <T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder = "Select an option",
  description,
  className,
  imagesPath = "",
  disabled = false,
}: RHFComboboxProps<T>) => {
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selected = options.find((opt) => opt.value === field.value);

        return (
          <FormItem className={cn("flex flex-col", className)}>
            {label && (
              <FormLabel className="text-sm font-normal tracking-wide">
                {label}
              </FormLabel>
            )}
            <FormControl>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                    disabled={disabled}
                  >
                    {selected ? (
                      <div className="flex items-center gap-2">
                        {selected.image && (
                          <img
                            src={`${imagesPath}/${selected.image}`}
                            className="size-6 rounded-sm shrink-0"
                          />
                        )}
                        <span>{selected.label}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">
                        {placeholder}
                      </span>
                    )}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder={`Search ${
                        label?.toLowerCase() ?? "items"
                      }...`}
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup>
                        {options.map((opt) => (
                          <CommandItem
                            key={opt.value}
                            value={opt.label} // searchable by name
                            onSelect={() => {
                              field.onChange(opt.value); // save id
                              setOpen(false);
                            }}
                          >
                            {opt.image && (
                              <img
                                src={`${imagesPath}/${opt.image}`}
                                className="size-6 rounded-sm shrink-0"
                              />
                            )}
                            <span>{opt.label}</span>
                            <Check
                              className={cn(
                                "ml-auto",
                                field.value === opt.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage className="text-white bg-rose-500 text-center rounded-full px-4 py-1 text-xs ml-2 font-semibold tracking-wider" />
          </FormItem>
        );
      }}
    />
  );
};

export default RHFCombobox;
