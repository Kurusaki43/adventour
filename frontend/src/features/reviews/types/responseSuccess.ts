import type { Review } from "./review";

export type ResponseSuccess = {
  status: string;
  totalReviews: number;
  data: {
    reviews: Review[];
  };
};
