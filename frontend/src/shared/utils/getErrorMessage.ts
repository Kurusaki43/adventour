import { isAxiosError } from "axios";

export const getErrorMessage = (err: unknown): string => {
  if (isAxiosError(err)) {
    return (
      err.response?.data?.message ||
      err.response?.data?.error ||
      err.message ||
      "Unexpected error"
    );
  }
  if (err instanceof Error) {
    return err.message;
  }
  return "An unknown error occurred";
};
