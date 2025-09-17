import { useSearchParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const DateFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="space-y-2 w-full relative">
      <Label className="text-muted-foreground font-semibold tracking-wide">
        Date
      </Label>
      <Input
        type="date"
        className="w-full grid text-muted-foreground pr-16 pb-0 mb-0"
        value={searchParams.get("date") ?? ""}
        onChange={(e) => {
          searchParams.set("date", e.target.value);
          setSearchParams(searchParams);
        }}
      />
      <Button
        size={"sm"}
        variant={"outline"}
        className="h-6 absolute top-7 right-1"
        onClick={() => {
          searchParams.delete("date");
          setSearchParams(searchParams);
        }}
      >
        clear
      </Button>
    </div>
  );
};

export default DateFilter;
