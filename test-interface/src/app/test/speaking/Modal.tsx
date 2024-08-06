// components/Modal.tsx
import React, { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onNextSection: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  onNextSection,
}) => {
  useEffect(() => {
    if (isOpen) {
      // Set a timeout to automatically close the modal after 5 seconds
      const timer = setTimeout(() => {
        onClose();
        onNextSection();
      }, 5000);

      // Cleanup the timer when the component is unmounted or when isOpen changes
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-10 rounded shadow-lg max-w-sm mx-auto">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
