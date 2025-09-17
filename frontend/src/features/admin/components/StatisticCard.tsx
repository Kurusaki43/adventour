import { Card } from "@/components/ui/card";
import type { ReactNode } from "react";
import type { IconType } from "react-icons";

type StatisticsCardProps = {
  title: string;
  value: number | string;
  icon: IconType;
  color: "chart-1" | "chart-2" | "chart-3" | "chart-4";
  renderFooterMetrics?: () => ReactNode;
};

const colorClasses = {
  "chart-1": {
    bg: "bg-chart-1/10 dark:bg-chart-1",
    text: "text-chart-1 dark:text-white",
  },
  "chart-2": {
    bg: "bg-chart-2/10 dark:bg-chart-2",
    text: "text-chart-2 dark:text-white",
  },
  "chart-3": {
    bg: "bg-chart-3/10 dark:bg-chart-3",
    text: "text-chart-3 dark:text-white",
  },
  "chart-4": {
    bg: "bg-chart-4/10 dark:bg-chart-4",
    text: "text-chart-4 dark:text-white",
  },
};

const StatisticCard = ({
  icon: Icon,
  title,
  value,
  color,
  renderFooterMetrics,
}: StatisticsCardProps) => {
  return (
    <Card className="border-muted justify-start gap-4 items-center flex flex-row overflow-x-auto scrollbar-hide border rounded-md p-5 bg-card shadow-none">
      <div
        className={`size-12 sm:size-14 lg:size-15 rounded-full grid place-content-center shrink-0 ${colorClasses[color].bg}`}
      >
        <Icon className={`size-6 ${colorClasses[color].text}`} />
      </div>
      <div className="flex flex-col w-full gap-[2px]">
        <span className="text-lg sm:text-xl font-bold lg:text-2xl">
          {value}
        </span>
        <span className="text-sm sm:text-base lg:text-lg tracking-wider font-semibold capitalize text-muted-foreground">
          {title}
        </span>
      </div>
      {renderFooterMetrics && renderFooterMetrics()}
    </Card>
  );
};

export default StatisticCard;
