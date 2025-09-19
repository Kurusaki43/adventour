import axiosInstance from "@/shared/api/axios";
import type { PaymentQueryOptions } from "./types/paymentQueryOptions";
import type { ResponseSuccess } from "./types/responseSuccess";

export const getPayments = async (options: PaymentQueryOptions = {}) => {
  const {
    page = 1,
    limit = Number(import.meta.env.VITE_LIMIT_PER_PAGE || 10),
    status,
    sort,
    method,
  } = options;

  const params = new URLSearchParams();

  if (status) params.set("status", status);
  if (method) params.set("method", method);

  if (sort) {
    const [field, direction] = sort.split("-");
    const finalSort = direction === "asc" ? field : `-${field}`;
    params.set("sort", finalSort);
  }

  params.set("page", `${page}`);
  params.set("limit", `${limit}`);

  const queryString = params.toString();
  const response = await axiosInstance.get<ResponseSuccess>(
    `/payments?${queryString}`
  );
  return {
    payments: response.data.data.payments,
    totalPayments: response.data.totalPayments,
  };
};
