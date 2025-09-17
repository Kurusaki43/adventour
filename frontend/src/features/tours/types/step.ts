import type { ComponentType } from "react";
import type { IconType } from "react-icons";
import type { Tour } from "./tour";
import type { TourData } from "../schema/toursSchema";

export type Step = {
  title: string;
  icon: IconType;
  component: ComponentType<{
    editedTour?: Partial<Tour>;
  }>;
  inputs: Partial<keyof TourData>[];
  status: "default" | "active" | "error" | "completed";
};
