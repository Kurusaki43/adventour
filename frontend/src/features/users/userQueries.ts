import { useMutation, useQuery } from "@tanstack/react-query";
import { createUser, deleteUser, getUsers } from "./userApi";
import toast from "react-hot-toast";
import { queryClient } from "@/shared/api/queryClient";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";
import type { User } from "./types/user.types";
import type { UserQueryOptions } from "./types/userQueryOptions";

export const useUsers = (options?: UserQueryOptions) => {
  return useQuery({
    queryKey: ["users", options],
    queryFn: () => getUsers(options),
    staleTime: 5 * 60 * 1000,
  });
};

export const useMutateUser = (mode?: "CREATE" | "UPDATE", fn?: () => void) => {
  const {
    mutate: createUpdateUser,
    isPending,
    isError,
  } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success(
        `${
          mode === "CREATE"
            ? "User created Successfully"
            : "User updated Successfully"
        }`
      );
      fn?.();
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error), {});
    },
  });
  return { createUpdateUser, isPending, isError };
};

export const useDeleteUser = (user: User) => {
  const { mutate: deleteUserById } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success(`${user.name} deleted successfully`);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
  return { deleteUserById };
};
