import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTours } from "@/features/tours/toursQueries";
import { useUsers } from "@/features/users/userQueries";
import {
  bookingSchema,
  updateBookingSchema,
  type CreateBookingData,
  type UpdateBookingData,
} from "../bookingSchema";
import CustomForm from "@/components/common/Form";
import RHFCombobox from "@/components/RHF/RHFCombobox";
import RHFNumberInput from "@/components/RHF/RHFNumberInput";
import RHFSelect from "@/components/RHF/RHFSelect";
import { format } from "date-fns";
import LoadingButton from "@/components/LoadingButton";
import { useMutateBookings } from "../bookingsQueries";
import type { Booking } from "../types/booking";

type BookingFormProps = {
  mode: "CREATE" | "UPDATE";
  editedBooking?: Partial<Booking>;
  onSuccess?: () => void;
};

const BookingForm = ({ mode, editedBooking }: BookingFormProps) => {
  const { data: tours } = useTours();
  const { data: users } = useUsers();
  const { createUpdateBooking, isPending } = useMutateBookings();
  const form = useForm<CreateBookingData | UpdateBookingData>({
    resolver: zodResolver(
      mode === "CREATE" ? bookingSchema : updateBookingSchema
    ),
    mode: "onChange",
    defaultValues:
      mode === "CREATE"
        ? { peopleCount: 1, method: "cash" }
        : {
            ...editedBooking,
            tourStartDate: editedBooking?.tourStartDate,
            user: editedBooking?.user?.id,
            tour: editedBooking?.tour?.id,
            method: "cash",
          },
  });

  const selectedTourId = form.watch("tour");
  const startDates = selectedTourId
    ? tours?.data.tours.find((t) => t.id === selectedTourId)?.startDates || []
    : [];

  const handleSubmit = (data: CreateBookingData | UpdateBookingData) =>
    createUpdateBooking(data);

  return (
    <CustomForm
      form={form}
      onSubmit={handleSubmit}
      className="bg-transparent p-0 shadow-none grid gap-6 mt-4"
    >
      <RHFCombobox
        control={form.control}
        name="user"
        label="User *"
        placeholder="Select a user"
        disabled={mode === "UPDATE"}
        options={
          users?.data.users
            .filter((u) => u.role === "client")
            .map((u) => ({
              value: u.id!,
              label: u.name,
              image: u.avatar,
            })) ?? []
        }
        imagesPath="/uploads/users"
      />
      <RHFCombobox
        control={form.control}
        name="tour"
        label="Tour *"
        placeholder="select a tour"
        disabled={mode === "UPDATE"}
        options={
          tours?.data.tours.map((t) => ({
            value: t.id!,
            label: t.name,
            image: t.imageCover,
          })) ?? []
        }
        imagesPath="/uploads/tours"
      />
      <RHFNumberInput
        control={form.control}
        name="peopleCount"
        label="Number of People *"
      />
      {selectedTourId && (
        <RHFSelect
          control={form.control}
          name="tourStartDate"
          label="Booking Date *"
          placeholder="Select a date"
          options={startDates?.map((d) => ({
            value: `${d}`,
            label: format(d, "MMM d, yyyy hh:mm a"),
          }))}
        />
      )}
      {mode === "UPDATE" && (
        <RHFSelect
          control={form.control}
          name="status"
          label="Status *"
          placeholder="Pick your status"
          options={[
            { value: "pending", label: "Pending" },
            { value: "confirmed", label: "Confirmed" },
            { value: "completed", label: "Completed" },
            { value: "cancelled", label: "Cancelled" },
          ]}
        />
      )}
      <RHFSelect
        control={form.control}
        name="method"
        label="Payment Method *"
        placeholder="Select a method"
        disabled={true}
        options={[
          { value: "cash", label: "Cash" },
          { value: "stripe", label: "stripe" },
        ]}
      />
      <LoadingButton
        className="self-end"
        loading={isPending}
        loadingLabel="Saving"
      >
        Save
      </LoadingButton>
    </CustomForm>
  );
};

export default BookingForm;
