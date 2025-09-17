import { format, parse } from "date-fns";

export const formatTime = (t: string) => {
  const parsed = parse(t, "HH:mm:ss", new Date());
  return format(parsed, "hh:mm a");
};
