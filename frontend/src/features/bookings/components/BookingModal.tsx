import BaseModal from "@/components/common/Modal";
import { useBookingModal } from "../store/useBookingModal";
import BookingForm from "./BookingForm";

const BookingModal = () => {
  const { mode, isOpen, closeModal, data } = useBookingModal();
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={closeModal}
      title={`${mode === "CREATE" ? "Create" : "Update"} Booking`}
      maxWidth="sm:max-w-lg"
    >
      <BookingForm mode={mode} onSuccess={closeModal} editedBooking={data} />
    </BaseModal>
  );
};

export default BookingModal;
