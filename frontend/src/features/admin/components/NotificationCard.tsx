import { Button } from "@/components/ui/button";
import type { Notification } from "@/features/admin/types/notification";
import { getNotificationIcon } from "@/features/admin/utils/getNotificationIcon";
import { Check, X } from "lucide-react";

type NotificationCardProps = {
  notification: Notification;
  removeNotification: (id: Notification["id"]) => void;
  markAsRead: (id: Notification["id"]) => void;
};

const NotificationCard = ({
  notification,
  markAsRead,
  removeNotification,
}: NotificationCardProps) => {
  return (
    <div
      key={notification.id}
      className={`p-4 hover:bg-muted/50 transition-colors ${
        !notification.read ? "bg-primary/10 dark:bg-primary/10" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="text-lg mt-0.5">
          {getNotificationIcon(notification.type)}
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <p
              className={`text-sm font-medium leading-none ${
                !notification.read ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {notification.title}
            </p>
            <div className="flex items-center gap-1">
              {!notification.read && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => markAsRead(notification.id)}
                >
                  <Check className="h-3 w-3" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => removeNotification(notification.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            {notification.description}
          </p>
          <p className="text-xs text-muted-foreground">{notification.time}</p>
        </div>
        {!notification.read && (
          <div className="w-2 h-2 bg-primary rounded-full mt-2" />
        )}
      </div>
    </div>
  );
};

export default NotificationCard;
