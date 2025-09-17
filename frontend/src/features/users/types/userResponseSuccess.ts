import type { User } from "./user.types";

export type ResponseSuccess = {
  status: string;
  totalUsers: number;
  data: {
    users: User[];
  };
};
