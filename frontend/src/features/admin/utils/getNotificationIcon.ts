import type { Notification } from "../types/notification";

export const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "User":
      return "👤";
    case "Booking":
      return "💳";
    case "Tour":
      return "⚙️";
    case "Report":
      return "📊";
    default:
      return "🔔";
  }
};
