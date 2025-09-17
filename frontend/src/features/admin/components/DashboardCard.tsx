import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { cn } from "@/lib/utils";

const DashboardCard = ({
  title,
  className,
  children,
}: {
  title?: string;
  className?: string;
  children: ReactNode;
}) => {
  return (
    <Card
      className={cn(
        className,
        "border-muted border rounded-md p-4 bg-card shadow-none gap-3 overflow-y-auto scrollbar-hide"
      )}
    >
      <CardHeader className="p-0">
        {title && (
          <CardTitle className="text-2xl font-bold capitalize">
            {title}
          </CardTitle>
        )}
      </CardHeader>
      <CardContent className="p-0 flex flex-col text-gray-600 dark:text-gray-200">
        {children}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
