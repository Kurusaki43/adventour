import { useEffect, useRef, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { addDays, addHours, format } from "date-fns";
import BaseModal from "@/components/common/Modal";
import { useCalendarModal } from "../store/useCalendarModal";
import FullCalendar from "@fullcalendar/react";
import type { EventContentArg } from "@fullcalendar/core/index.js";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DurationUnit, type Tour } from "../types/tour";

const ToursCalendar = ({ tours }: { tours: Tour[] }) => {
  const [mobileView, setMobileView] = useState<boolean>(
    window.innerWidth < 768
  );
  const calendarRef = useRef<FullCalendar | null>(null);
  const { isOpen, closeModal } = useCalendarModal();

  const events = tours.flatMap((tour) =>
    tour.startDates.map((date) => ({
      title: tour.name,
      start: date,
      end:
        tour.durationUnit === "day"
          ? addDays(new Date(date), tour.duration - 1)
          : addHours(new Date(date), tour.duration),
      allDay: false,
      extendedProps: {
        duration: tour.duration,
        durationUnit: tour.durationUnit,
        tourId: tour.id,
        imageCover: tour.imageCover,
      },
    }))
  );

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setMobileView(isMobile);

      const calendarApi = calendarRef.current?.getApi();
      if (calendarApi) {
        const newView = isMobile ? "listWeek" : "dayGridMonth";
        calendarApi.changeView(newView);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderEventContent = (arg: EventContentArg) => {
    const startTime = arg.event.start ? format(arg.event.start, "HH:mm") : "";
    const endTime = arg.event.end ? format(arg.event.end, "HH:mm") : "";
    const imageCover = arg.event.extendedProps.imageCover as string | undefined;
    const viewType = arg.view.type;

    return (
      <div
        className={`px-2 py-1 bg-blue-50 text-blue-400 rounded-md text-sm w-full overflow-auto scrollbar-hide  
       `}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex flex-col gap-3 items-center justify-center">
              {imageCover && (
                <img
                  src={`/uploads/tours/${imageCover}`}
                  alt={arg.event.title}
                  className="mt-1 rounded-full size-14 object-cover shrink-0"
                />
              )}

              <div
                className={`flex flex-col gap-1 ${
                  viewType === "listWeek" || viewType === "timeGridDay"
                    ? "self-center text-center"
                    : "self-start"
                }`}
              >
                <strong className="truncate">{arg.event.title}</strong>
                {arg.event.extendedProps.durationUnit === DurationUnit.Hour ? (
                  <div className="truncate text-xs">
                    {`${startTime} - ${endTime}`} (
                    <span>{arg.event.extendedProps.duration}h</span>)
                  </div>
                ) : (
                  <span className="text-xs">
                    {arg.event.extendedProps.duration} days
                  </span>
                )}
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="flex flex-col gap-1 self-start ">
              <strong className="truncate">{arg.event.title}</strong>
              <div className="truncate">
                {`${startTime} - ${endTime}`} (
                <span>{arg.event.extendedProps.duration}h</span>)
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
    );
  };

  return (
    <BaseModal isOpen={isOpen} onClose={closeModal} title="Tours Calendar">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView={mobileView ? "listWeek" : "dayGridMonth"}
        headerToolbar={
          mobileView
            ? {
                left: "",
                center: "title",
                right: "",
              }
            : {
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,listWeek",
              }
        }
        footerToolbar={
          mobileView
            ? {
                left: "",
                center: "prev,next today",
                right: "",
              }
            : {}
        }
        events={events}
        height="auto"
        eventContent={renderEventContent}
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          meridiem: true,
        }}
      />
    </BaseModal>
  );
};

export default ToursCalendar;
