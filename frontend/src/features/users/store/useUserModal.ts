import { createEntityModal } from "@/shared/store/modal";
import type { User } from "../types/user.types";

export const useUserModal = createEntityModal<User>();
