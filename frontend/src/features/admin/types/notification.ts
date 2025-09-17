export type Notification = {
  id: number;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: "Tour" | "User" | "Booking" | "Report";
};
