import type { Tour } from "../types/tour";

export const parseDefaultTour = (tour: Partial<Tour>) => ({
  ...tour,
  imageCover: undefined,
  images: [],
  startDates: tour?.startDates?.map((d) => ({ date: d })),
});
