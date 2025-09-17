import { Badge } from "@/components/ui/badge";
import { getGuidesByIds } from "@/features/users/userApi";
import { useQuery } from "@tanstack/react-query";
import "@smastrom/react-rating/style.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const TourGuides = ({ guidesIds }: { guidesIds: string[] }) => {
  const { data: guides } = useQuery({
    queryFn: () => getGuidesByIds(guidesIds),
    queryKey: ["guides", guidesIds],
    enabled: guidesIds.length > 0,
  });

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:flex-wrap sm:justify-center">
      {!guides || guides.length === 0 ? (
        <p>Tour doesn't have guides yet.</p>
      ) : (
        guides.map((guide) => (
          <Card
            key={guide.id}
            className="max-w-[250px] min-w-[220px] flex-1 border-gray-200 border-1 rounded-none shadow-none relative overflow-hidden gap-3"
          >
            <CardHeader className="flex flex-col items-center">
              <img
                src={`/uploads/users/${guide.avatar}`}
                alt={guide.name}
                className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-gray-300"
              />
              <CardTitle className="capitalize tracking-wide">
                {guide.name}
              </CardTitle>
              <div className="flex items-center gap-1 mt-2 text-yellow-500">
                <Star size={18} fill="currentColor" />
                <span className="font-semibold">{4.0}</span>
                <span className="text-gray-500 text-sm">({15} tours)</span>
              </div>
            </CardHeader>

            <CardContent className="flex flex-col items-center gap-3">
              <div className="flex flex-wrap justify-center gap-2">
                {["En", "Ar", "Fr"].map((lang, idx) => (
                  <Badge key={idx} variant="secondary">
                    {lang}
                  </Badge>
                ))}
              </div>
              <Link to={`/guides/${guide.id}`}>
                {" "}
                <Button className="mt-3 w-full">View Profile</Button>
              </Link>
            </CardContent>
            <Badge
              className={`absolute top-5 -right-8 px-8 py-1 rounded-none rotate-45  flex-col gap-0 font-bold  ${
                guide.role === "lead-guide" ? "flex" : "hidden"
              }`}
            >
              Lead Guide
            </Badge>
          </Card>
        ))
      )}
    </div>
  );
};

export default TourGuides;
