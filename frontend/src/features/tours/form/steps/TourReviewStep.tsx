import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import { format } from "date-fns";
import { useFormContext } from "react-hook-form";
import type { CreateTourData } from "../../schema/toursSchema";
import { Separator } from "@radix-ui/react-dropdown-menu";

const TourReviewStep = () => {
  const { getValues } = useFormContext<CreateTourData>();
  const values = getValues();

  const formatDate = (date: string | Date) =>
    typeof date === "string"
      ? format(new Date(date), "PPP")
      : format(date, "PPP");

  return (
    <ScrollArea className="h-[70vh] pr-4">
      <Card className="border-muted">
        <CardHeader>
          <CardTitle className="text-xl">Review Your Tour</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-sm">
          {/* General Info */}
          <div>
            <h4 className="font-semibold text-muted-foreground">Tour Info</h4>
            <Separator className="my-2" />
            <p>
              <strong>Name:</strong> {values.name}
            </p>
            <p>
              <strong>Description:</strong> {values.description}
            </p>
            <p>
              <strong>Duration:</strong> {values.duration} days
            </p>
          </div>

          {/* Dates */}
          <div>
            <h4 className="font-semibold text-muted-foreground">Start Dates</h4>
            <Separator className="my-2" />
            <ul className="list-disc list-inside">
              {values.startDates?.map((d, i) => (
                <li key={i}>{formatDate(d.date)}</li>
              ))}
            </ul>
          </div>

          {/* Guides */}
          <div>
            <h4 className="font-semibold text-muted-foreground">Guides</h4>
            <Separator className="my-2" />
            <p>
              <strong>Lead Guide:</strong> {values.leadGuide}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {values.guides?.map((guide, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 border p-2 rounded-md w-fit"
                >
                  {/* <Avatar className="w-6 h-6">
                    <AvatarImage src={guide?.avatarUrl} />
                    <AvatarFallback>{guide.label?.charAt(0)}</AvatarFallback>
                  </Avatar> */}
                  <span className="text-sm">{guide}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </ScrollArea>
  );
};
export default TourReviewStep;
