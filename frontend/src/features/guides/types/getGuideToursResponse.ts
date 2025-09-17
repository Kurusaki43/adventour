import type { Tour } from "@/features/tours/types/tour";
import type { User } from "@/features/users/types/user.types";

export type GetGuideToursResponse = {
  status: string;
  totalTours: number;
  data: {
    tours: Tour[];
  };
};

export type GetGuidesResponse = {
  status: string;
  totalUsers: number;
  data: {
    users: User[];
  };
};

export type GetProfileResponse = {
  status: string;
  data: {
    guide: User;
  };
};
