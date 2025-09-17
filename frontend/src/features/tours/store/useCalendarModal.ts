import { createEntityModal } from "@/shared/store/modal";
import type { Tour } from "../types/tour";

export const useCalendarModal = createEntityModal<Tour>();
