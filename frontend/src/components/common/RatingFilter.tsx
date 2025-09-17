import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Label } from "../ui/label";
import { useSearchParams } from "react-router-dom";

const RatingFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div className="space-y-2">
      <Label className="text-muted-foreground font-semibold tracking-wide">
        Rating
      </Label>
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <Rating
          value={Number(searchParams.get("rating")) || 0}
          className="max-w-20"
          onChange={(e: number) => {
            searchParams.set("rating", `${e}`);
            setSearchParams(searchParams);
          }}
        />
        <span>or more</span>
      </div>
    </div>
  );
};

export default RatingFilter;
