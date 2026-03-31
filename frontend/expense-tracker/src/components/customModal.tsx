import { Modal } from "antd";

type CustomModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onConfirm?: () => void;
  modalType?: "add" | "delete";
  confirmText?: string;
};

const CustomModal = ({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  modalType,
  confirmText,
}: CustomModalProps) => {
  const getConfirmButtonStyle = () => {
    switch (modalType) {
      case "add":
        return "add-btn";
      case "delete":
        return "del-btn";
      default:
        return "add-btn";
    }
  };
  return (
    <Modal
      title={title}
      okText=""
      open={isOpen}
      onCancel={onClose}
      footer={
        <div className="flex justify-end">
          <button className={getConfirmButtonStyle()} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      }
    >
      <div className="w-full border border-gray-400/50 my-4"></div>
      {children}
    </Modal>
  );
};

export default CustomModal;
