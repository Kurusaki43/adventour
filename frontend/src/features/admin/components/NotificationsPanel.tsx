import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell } from "lucide-react";
import { useState } from "react";
import NotificationCard from "./NotificationCard";
import type { Notification } from "@/features/admin/types/notification";

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "New user registered",
    description: "John Doe just signed up for your service",
    time: "2 minutes ago",
    read: false,
    type: "User",
  },
  {
    id: 2,
    title: "Payment received",
    description: "You received a payment of $99.00 from Sarah Wilson",
    time: "1 hour ago",
    read: false,
    type: "Booking",
  },
];

const NotificationsPanel = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative bg-transparent cursor-pointer"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="max-w-72 p-0 absolute left-0 -translate-x-[35%] sm:-translate-x-[70%]"
        align="end"
      >
        <Card className="border-0 shadow-none w-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">
                Notifications
              </CardTitle>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs h-auto p-1"
                >
                  Mark all read
                </Button>
              )}
            </div>
            <CardDescription>
              You have {unreadCount} unread notification
              {unreadCount !== 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0 border-t">
            <ScrollArea className="h-auto">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Bell className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No notifications
                  </p>
                </div>
              ) : (
                <div className="divide-y">
                  {notifications.map((notification) => (
                    <NotificationCard
                      key={notification.id}
                      notification={notification}
                      markAsRead={markAsRead}
                      removeNotification={removeNotification}
                    />
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPanel;
