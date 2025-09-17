import { useEffect, useState } from "react";
import { GuidePreviewCard } from "./GuidePreviewCard";
import { useFormContext } from "react-hook-form";
import type { User } from "@/features/users/types/user.types";
import type { Tour } from "@/features/tours/types/tour";
import type { TourData } from "@/features/tours/schema/toursSchema";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

type GuidesPreviewProps = {
  guides: User[];
  editedTour?: Partial<Tour>;
};

export const GuidesPreview = ({ guides, editedTour }: GuidesPreviewProps) => {
  const [selectedGuidesId, setSelectedGuidesId] = useState<string[]>([]);
  const { setValue } = useFormContext<TourData>();

  // Sync default selected guides when editedTour is loaded
  useEffect(() => {
    if (editedTour?.guides) {
      const defaultIds = editedTour.guides;
      setSelectedGuidesId(defaultIds);
      setValue("guides", defaultIds);
    }
  }, [editedTour?.guides, setValue]);

  const handleSelectGuide = (guideId: string) => {
    setSelectedGuidesId((prev) => {
      const newSelected = prev.includes(guideId)
        ? prev.filter((id) => id !== guideId)
        : [...prev, guideId];

      setValue("guides", newSelected);
      return newSelected;
    });
  };

  useEffect(() => {
    setValue("status", selectedGuidesId.length > 0 ? "published" : "draft");
  }, [selectedGuidesId, setValue]);

  return (
    <div>
      <Label className="mb-2"> Guides *</Label>
      {guides.length === 0 ? (
        <p className="text-muted-foreground mb-2">
          No guides available. Save as draft until guides are available.
        </p>
      ) : (
        <ScrollArea className="max-h-84">
          <div className="grid gap-1">
            {guides.map((guide) => (
              <GuidePreviewCard
                key={guide.id}
                guide={guide}
                selectGuide={handleSelectGuide}
                isSelected={selectedGuidesId.includes(guide.id!)}
              />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};
