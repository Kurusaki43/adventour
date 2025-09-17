import Lottie from "lottie-react";
import errorAnimation from "@/assets/lottie/Error.json";
import emptyAnimation from "@/assets/lottie/Empty.json";
import loadingAnimation from "@/assets/lottie/Loading.json";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardMessageProps {
  type?: "error" | "empty" | "loading";
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
  lottieSrc?: object;
}

const animationMap = {
  error: errorAnimation,
  empty: emptyAnimation,
  loading: loadingAnimation,
};

const defaultMessages = {
  error: {
    title: "Data Fetch Failed",
    message: "Something went wrong while fetching data.",
  },
  empty: {
    title: "No Data Available",
    message: "There are no records to show.",
  },
  loading: {
    title: "Loading...",
    message: "Please wait while we load your data.",
  },
};

const DashboardMessage = ({
  type = "error",
  title,
  message,
  onRetry,
  className,
  lottieSrc,
}: DashboardMessageProps) => {
  const animation = lottieSrc || animationMap[type];
  const { title: defaultTitle, message: defaultMsg } = defaultMessages[type];

  return (
    <div
      className={cn(
        "w-full h-auto flex flex-col items-center justify-center text-center space-y-3 bg-transparent transition-all",
        className
      )}
    >
      {animation ? (
        <div className="size-32 mb-4">
          <Lottie animationData={animation} loop autoplay />
        </div>
      ) : (
        <AlertTriangle className="w-12 h-12 text-destructive" />
      )}

      <h2 className="text-2xl font-bold text-foreground">
        {title || defaultTitle}
      </h2>

      <p className="text-muted-foreground text-sm max-w-md">
        {message || defaultMsg}
      </p>

      {onRetry && type === "error" && (
        <Button variant="outline" onClick={onRetry} className="mt-2">
          Retry
        </Button>
      )}
    </div>
  );
};

export default DashboardMessage;
