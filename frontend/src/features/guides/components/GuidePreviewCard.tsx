import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { User } from "@/features/users/types/user.types";
import { Check } from "lucide-react";

export const GuidePreviewCard = ({
  guide,
  isSelected,
  selectGuide,
  readonly,
  largeAvatar,
}: {
  guide: User;
  isSelected?: boolean;
  selectGuide?: (guideId: string) => void;
  readonly?: boolean;
  largeAvatar?: boolean;
}) => {
  return (
    <div
      onClick={() => selectGuide?.(guide.id!)}
      className={`relative flex items-center gap-3 px-2 py-1 ${
        isSelected && "border border-dashed rounded-sm border-primary"
      }  ${!readonly ? "cursor-pointer" : "cursor-default"}`}
    >
      <Avatar
        className={`border-2 border-muted-foreground shadow-lg ${
          largeAvatar && "size-12"
        }`}
      >
        <AvatarImage src={`/uploads/users/${guide.avatar}`}></AvatarImage>
        <AvatarFallback>{guide.name}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        <span className="capitalize text-muted-foreground font-medium text-sm">
          {guide.name}
        </span>
        <span className="text-xs">
          Languages: {guide.guideProfile?.languagesSpoken.join(", ")}
        </span>
      </div>
      {isSelected && <Check className="text-primary ml-auto size-5" />}
      {guide.role === "lead-guide" && (
        <Badge className="absolute top-1.5 right-1/4">Lead-guide</Badge>
      )}
    </div>
  );
};
