import type { Payment } from "./payment";

export type ResponseSuccess = {
  status: string;
  totalPayments: number;
  data: {
    payments: Payment[];
  };
};
