import { Label } from "@/components/ui/label";
import type { TourData } from "@/features/tours/schema/toursSchema";
import type { Tour } from "@/features/tours/types/tour";
import { GuidePreviewCard } from "@/features/users/components/guides/GuidePreviewCard";
import type { User } from "@/features/users/types/user.types";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

type LeadGuidesPreviewProps = {
  leadGuides: User[];
  editedTour?: Partial<Tour>;
};

export const LeadGuidesPreview = ({
  leadGuides,
  editedTour,
}: LeadGuidesPreviewProps) => {
  const defaultLeadGuideId = editedTour?.leadGuide;

  const [selectedLeadGuideId, setSelectedLeadGuideId] = useState<string | null>(
    null
  );
  const { setValue } = useFormContext<TourData>();

  // Sync with editedTour once it's available
  useEffect(() => {
    if (defaultLeadGuideId) {
      setSelectedLeadGuideId(defaultLeadGuideId);
      setValue("leadGuide", defaultLeadGuideId);
    }
  }, [defaultLeadGuideId, setValue]);

  const handleSelectGuide = (guideId: string) => {
    setSelectedLeadGuideId(guideId);
    setValue("leadGuide", guideId);
  };

  return (
    <div>
      <Label className="mb-2">Lead Guide *</Label>
      {leadGuides.length === 0 && (
        <p className="text-muted-foreground mb-2">
          No lead guides available. Save as draft until lead guides are
          available.
        </p>
      )}
      {leadGuides.length > 0 &&
        leadGuides.map((guide) => (
          <GuidePreviewCard
            key={guide.id}
            guide={guide}
            selectGuide={handleSelectGuide}
            isSelected={selectedLeadGuideId === guide.id}
          />
        ))}
    </div>
  );
};
