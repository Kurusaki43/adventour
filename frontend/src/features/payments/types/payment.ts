export type PaymentMethod = "online" | "cash";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface Payment {
  id?: string;
  booking: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  stripeSessionId?: string;
  createdAt: Date;
  updatedAt?: Date;
}
