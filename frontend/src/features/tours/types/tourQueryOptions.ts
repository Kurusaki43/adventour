export type TourQueryOptions = {
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;

  status?: string;
  difficulty?: string;
  duration?: string;
  date?: string;
  month?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
};
