import { format } from "date-fns";

export const formatDate = (date: string | Date): string => {
  const tempDate = new Date(date);
  return format(tempDate, "MMM dd, yyyy");
};
