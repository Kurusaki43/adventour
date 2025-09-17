import Modal from "@/components/common/Modal";
import { useTourModal } from "../store/useTourModal";
import MultiStepTourForm from "../form/MultiStepTourForm";
import { useMultiStepForm } from "../context/multiStepForm";

const TourModal = () => {
  const { isOpen, mode, closeModal, data } = useTourModal();
  const { goToStep } = useMultiStepForm();
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        closeModal();
        goToStep(0);
      }}
      title={mode === "CREATE" ? "Create New Tour" : "Update Tour"}
    >
      <MultiStepTourForm mode={mode} editedTour={data} onSuccess={closeModal} />
    </Modal>
  );
};

export default TourModal;
