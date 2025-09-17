import BaseModal from "@/components/common/Modal";
import { useUserModal } from "../store/useUserModal";
import UserForm from "../form/UserForm";

const UserModal = () => {
  const { isOpen, mode, closeModal, data: user } = useUserModal();

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={closeModal}
      title={mode === "CREATE" ? "Create New User" : "Update User"}
      maxWidth="sm:max-w-xl"
    >
      <UserForm mode={mode} editedUser={user} onSuccess={closeModal} />
    </BaseModal>
  );
};

export default UserModal;
