import { Button } from "@/components/ui/button";
import Filter from "@/components/common/Filter";
import DateFilter from "@/components/common/DateFilter";
import SearchFilter from "@/features/admin/components/SearchFilter";
import { Link, useSearchParams } from "react-router-dom";

const HeroSearchBar = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const duration = searchParams.get("duration");
  const date = searchParams.get("date");

  const url = new URLSearchParams();
  if (search) url.set("search", search);
  if (duration) url.set("duration", duration);
  if (date) url.set("date", date);

  return (
    <div className="flex flex-col md:flex-row md:items-end md:[&>*:not(:last-child)]:flex-1 gap-6 md:gap-4 bg-white py-6 px-10 rounded-xl md:rounded-full max-w-sm mx-auto w-full md:max-w-full">
      <SearchFilter placeholder="Search by location" />
      <DateFilter />
      <Filter
        label="Duration"
        fieldName="duration"
        options={[
          { value: "1", label: "1 Day" },
          { value: "2", label: "2-4 Days" },
          { value: "5", label: "5-7 Days" },
        ]}
      />

      <Link to={`/tours?${url.toString()}`}>
        <Button size={"lg"}>Search</Button>
      </Link>
    </div>
  );
};

export default HeroSearchBar;
