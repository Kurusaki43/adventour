import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { User } from "@/features/users/types/user.types";
import { Rating } from "@smastrom/react-rating";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

const GuidePublicCard = ({ guide }: { guide: User }) => {
  return (
    <Card
      key={guide.id}
      className="w-full max-w-[350px] border-gray-200  rounded-none shadow-sm relative overflow-hidden gap-3"
    >
      <CardHeader className="flex flex-col items-center">
        <img
          src={`/uploads/users/${guide.avatar}`}
          alt={guide.name}
          className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-gray-300"
        />
        <CardTitle className="capitalize tracking-wide text-2xl">
          {guide.name}
        </CardTitle>
        <div className="flex flex-col items-center gap-2 mt-2 text-yellow-500">
          <div className="flex items-center gap-2 text-xs">
            <Rating value={4} className="max-w-18" />
            <strong>(4.5)</strong>
          </div>

          <span className="text-gray-500 text-sm">
            <strong>{guide.guideProfile?.yearsOfExperience}</strong> Years of
            experience
          </span>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-3">
        <div className="flex flex-wrap justify-center gap-2">
          {guide.guideProfile?.languagesSpoken.map((lang, idx) => (
            <Badge key={idx} variant="secondary">
              {lang}
            </Badge>
          ))}
        </div>
        <Link to={`${guide.id}`}>
          <Button className="mt-3 w-full">
            <Eye />
            View Profile
          </Button>
        </Link>
      </CardContent>
      <Badge
        className={`absolute top-5 -right-8 px-8 py-1 rounded-none rotate-45 font-black flex-col gap-0 ${
          guide.role === "lead-guide" ? "flex text-sm" : "hidden"
        }`}
      >
        Lead Guide
      </Badge>
    </Card>
  );
};

export default GuidePublicCard;
