import { useMutation } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import type { Tour } from "../../types/tour";
import { ROLES, type User } from "@/features/users/types/user.types";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";
import Spinner from "@/components/Spinner";
import { getAvailableGuides, getGuidesByIds } from "@/features/users/userApi";
import { LeadGuidesPreview } from "@/features/users/components/guides/LeadGuidesPreview";
import { GuidesPreview } from "@/features/users/components/guides/GuidesPreview";
import type { TourData } from "../../schema/toursSchema";

const TourGuidesStep = ({ editedTour }: { editedTour?: Partial<Tour> }) => {
  const { watch } = useFormContext<TourData>();
  const [availableGuides, setAvailableGuides] = useState<User[]>([]);
  const runOnce = useRef(false);
  const startDates = watch("startDates");
  const duration = watch("duration");
  const durationUnit = watch("durationUnit");

  const { mutate: fetchAvailableGuides, isPending: isLoading } = useMutation({
    mutationFn: getAvailableGuides,
    mutationKey: ["guides", startDates, duration],
    onSuccess: (data) => {
      setAvailableGuides((prev) => {
        const newGuides = data.filter(
          (g) => !prev.some((existing) => existing.id === g.id)
        );
        return [...prev, ...newGuides];
      });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error), { duration: 10000 });
    },
  });

  useEffect(() => {
    if (!duration || !startDates?.length) return;

    const parsedDates = startDates.map((d) => d.date);

    const timer = setTimeout(() => {
      fetchAvailableGuides({
        startDates: parsedDates,
        tourDuration: duration,
        tourDurationUnit: durationUnit,
      });
    }, 300); // wait 300ms after last change

    return () => clearTimeout(timer); // cancel if values change quickly
  }, [duration, startDates, durationUnit, fetchAvailableGuides]);

  useEffect(() => {
    if (editedTour && !runOnce.current) {
      runOnce.current = true;
      const ids: string[] = [];
      if (editedTour?.leadGuide) {
        ids.push(editedTour.leadGuide);
      }
      editedTour?.guides?.forEach((guide) => {
        ids.push(guide);
      });

      if (ids.length > 0) {
        getGuidesByIds(ids).then((fetched) => {
          setAvailableGuides((prev) => {
            const newGuides = fetched.filter(
              (g) => !prev.some((existing) => existing.id === g.id)
            );

            return [...prev, ...newGuides];
          });
        });
      }
    }
  }, [editedTour]);

  // 🔄 Memoized subsets
  const leadGuides = useMemo(
    () => availableGuides.filter((g) => g.role === ROLES.LEADGUIDE),
    [availableGuides]
  );

  const normalGuides = useMemo(
    () => availableGuides.filter((g) => g.role === ROLES.GUIDE),
    [availableGuides]
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 items-start">
      {isLoading && (
        <div className="col-span-2 flex justify-center">
          <Spinner />
        </div>
      )}

      {!isLoading && availableGuides.length > 0 && (
        <>
          {/* Lead Guide Section */}
          <LeadGuidesPreview leadGuides={leadGuides} editedTour={editedTour} />
          <GuidesPreview guides={normalGuides} editedTour={editedTour} />
        </>
      )}

      {!isLoading && availableGuides.length === 0 && (
        <p className="text-muted-foreground col-span-2 text-center">
          No available guides found. Save as draft until{" "}
          <strong>guides are available</strong>, Or tweak tour's schedule.
        </p>
      )}
    </div>
  );
};

export default TourGuidesStep;
