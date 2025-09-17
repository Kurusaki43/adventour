import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { FaCheck } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

type NotificationProps = {
  type: "Success" | "Fail";
  message: string;
  className?: string;
  duration?: number; // ms
  onClose?: () => void; // callback if parent needs to know
};

const Notification = ({
  type,
  message,
  className,
  duration = 5000,
  onClose,
}: NotificationProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-1.5 rounded-full text-sm transition-opacity duration-500",
        type === "Success"
          ? "border-lime-500 bg-lime-500/40"
          : "border-rose-500 bg-rose-500/40",
        className
      )}
    >
      <span
        className={`size-7 rounded-full flex justify-center items-center shrink-0 ${
          type === "Success" ? "bg-lime-500" : "bg-rose-500"
        }`}
      >
        {type === "Success" ? (
          <FaCheck className="text-lg text-white" />
        ) : (
          <IoCloseSharp className="text-lg text-white" />
        )}
      </span>
      <p className="tracking-wide text-left font-semibold">{message}</p>
    </div>
  );
};

export default Notification;
