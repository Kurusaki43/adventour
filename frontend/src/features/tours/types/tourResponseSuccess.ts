import type { Review } from "@/features/reviews/types/review";
import type { PopulatedTour, Tour } from "./tour";

export type ResponseSuccess = {
  status: string;
  totalTours: number;
  data: {
    tours: Tour[];
  };
};

export type ResponseGetTour = {
  status: string;
  data: {
    tour: PopulatedTour;
  };
};

export type GetTourReviewsResponse = {
  status: string;
  totalReviews: number;
  data: {
    reviews: Review[];
  };
};

export type GetTop5ToursStats = {
  status: string;
  data: {
    stats: {
      nbBookings: number;
      totalRevenue: number;
      tourId: string;
      tourName: string;
    }[];
  };
};
