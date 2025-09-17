import TourGuidesStep from "@/features/tours/form/steps/TourGuidesStep";
import TourInfoStep from "@/features/tours/form/steps/TourInfoStep";
import TourLocationsStep from "@/features/tours/form/steps/TourLocationsStep";
import TourMediaStep from "@/features/tours/form/steps/TourMediaStep";
import TourScheduleStep from "@/features/tours/form/steps/TourScheduleStep";

import type { Step } from "@/features/tours/types/step";
import { BsCalendarDate } from "react-icons/bs";
import { FiInfo, FiUsers } from "react-icons/fi";
import { MdLocationOn, MdPhotoCamera } from "react-icons/md";

export const Steps: Step[] = [
  {
    title: "Tour Info",
    component: TourInfoStep,
    inputs: [
      "name",
      "price",
      "priceDiscount",
      "duration",
      "durationUnit",
      "maxGroupSize",
      "difficulty",
      "summary",
      "description",
    ],
    icon: FiInfo,
    status: "default",
  },
  {
    title: "Schedule",
    component: TourScheduleStep,
    inputs: ["startDates"],
    icon: BsCalendarDate,
    status: "default",
  },
  {
    title: "Locations",
    component: TourLocationsStep,
    inputs: ["locations"],
    icon: MdLocationOn,
    status: "default",
  },
  {
    title: "Media",
    component: TourMediaStep,
    inputs: ["imageCover", "images"],
    icon: MdPhotoCamera,
    status: "default",
  },
  {
    title: "Guides",
    component: TourGuidesStep,
    inputs: ["leadGuide", "guides"],
    icon: FiUsers,
    status: "default",
  },
];
