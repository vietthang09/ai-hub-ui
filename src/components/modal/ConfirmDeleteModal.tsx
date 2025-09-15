import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
} from "@heroui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useUserContext } from "../../context/UserContext";

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  email,
}: {
  isOpen: boolean;
  onClose: () => void;
  email: string | null;
}) {
  const { removeUser } = useUserContext();
  const [submitting, setSubmitting] = useState(false);

  const onDelete = async () => {
    if (!email) return;
    setSubmitting(true);
    try {
      await removeUser(email);
      toast.success("Xóa user thành công");
      onClose();
    } catch (e: any) {
      console.error(e);
      toast.error(
        e?.response?.data?.error || e?.message || "Xóa user thất bại"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} backdrop="blur">
      <ModalContent>
        <ModalHeader className="text-xl font-semibold">Xóa User</ModalHeader>
        <ModalBody>
          Bạn chắc chắn muốn xóa user:{" "}
          <span className="font-medium">{email}</span>?
        </ModalBody>
        <ModalFooter>
          <Button variant="flat" onClick={onClose} disabled={submitting}>
            Hủy
          </Button>
          <Button color="danger" onClick={onDelete} isDisabled={submitting}>
            {submitting ? <Spinner size="sm" /> : "Xóa"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
