import { useAuthUser } from "@/features/auth/store/useAuth";
import { useForm } from "react-hook-form";
import { bookingSchema, type CreateBookingData } from "../bookingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@/components/LoadingButton";
import CustomForm from "@/components/common/Form";
import RHFNumberInput from "@/components/RHF/RHFNumberInput";
import RHFSelect from "@/components/RHF/RHFSelect";
import type { PopulatedTour, Tour } from "@/features/tours/types/tour";
import { format } from "date-fns";
import { Calendar, Users } from "lucide-react";
import { BiMoney } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { mutateBooking } from "../bookingApi";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";
import Notification from "@/components/Notification";
import { queryClient } from "@/shared/api/queryClient";

const ClientBookingForm = ({ tour }: { tour: Tour | PopulatedTour }) => {
  const user = useAuthUser();
  const form = useForm<CreateBookingData>({
    resolver: zodResolver(bookingSchema),
    mode: "onChange",
    defaultValues: {
      tour: tour.id,
      user: user?.id,
      peopleCount: undefined,
      tourStartDate: undefined,
      method: "cash",
    },
  });

  const {
    mutate: createUpdateBooking,
    isPending,
    isSuccess,
    error,
    isError,
  } = useMutation({
    mutationFn: mutateBooking,
    onSuccess: (data, { method }) => {
      form.reset({
        tour: tour.id,
        user: user?.id,
        tourStartDate: undefined,
        method: "cash",
      });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      queryClient.invalidateQueries({ queryKey: ["tours"] });

      if (method === "stripe") {
        window.location.href = data.url;
      }
    },
  });

  const handleSubmit = (data: CreateBookingData) => createUpdateBooking(data);
  return (
    <CustomForm
      form={form}
      onSubmit={handleSubmit}
      className="bg-transparent p-0 shadow-none grid gap-6 mt-4"
    >
      {isError && <Notification type="Fail" message={getErrorMessage(error)} />}
      {isSuccess && (
        <Notification
          type="Success"
          message="Your booking created successfully"
        />
      )}
      <RHFNumberInput
        icon={Users}
        control={form.control}
        name="peopleCount"
        label="Number of People *"
        disabled={!user}
        placeholder="Enter guests number"
      />
      <RHFSelect
        disabled={!user}
        icon={Calendar}
        control={form.control}
        name="tourStartDate"
        label="Booking Date *"
        placeholder="Select a tour date"
        options={tour.startDates?.map((d) => ({
          value: `${d}`,
          label: format(d, "yyyy-MM-dd hh:mm a"),
        }))}
      />

      <RHFSelect
        icon={BiMoney}
        control={form.control}
        name="method"
        label="Payment Method *"
        placeholder="Select a method"
        disabled={user?.role === "client" ? false : true}
        options={[
          { value: "cash", label: "Cash" },
          { value: "stripe", label: "stripe" },
        ]}
      />
      {user ? (
        <LoadingButton
          className="self-end"
          loading={isPending}
          loadingLabel="Saving"
          disabled={
            user.role === "admin" ||
            user.role === "guide" ||
            user.role === "lead-guide"
          }
        >
          {user.role === "client" && "Book Now"}
          {(user.role === "admin" ||
            user.role === "guide" ||
            user.role === "lead-guide") &&
            "You can't book with this account"}
        </LoadingButton>
      ) : (
        <Link
          to={`/login`}
          state={{ from: location.pathname, tourId: tour.id }}
          className="ml-auto"
        >
          <Button>Login First</Button>
        </Link>
      )}
    </CustomForm>
  );
};

export default ClientBookingForm;
