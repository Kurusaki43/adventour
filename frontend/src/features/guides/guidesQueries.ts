import { useQuery } from "@tanstack/react-query";
import { getAllGuides, getGuide, getGuideAssignedTours } from "./guidesApi";

export const useGuideTours = (guideId: string) => {
  return useQuery({
    queryKey: ["guide", guideId],
    queryFn: () => getGuideAssignedTours(guideId),
    staleTime: 5 * 60 * 1000,
  });
};

export const useGuides = ({ page, limit }: { page: number; limit: number }) => {
  return useQuery({
    queryKey: ["guides", { page, limit }],
    queryFn: () => getAllGuides({ page, limit }),
    staleTime: 1 * 60 * 60 * 1000,
  });
};

export const useGuide = (id: string) => {
  return useQuery({
    queryKey: ["guide-profile", id],
    queryFn: () => getGuide(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });
};
