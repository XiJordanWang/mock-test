"use client";

import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline"; // Update import
import { TestDTO } from "./interface";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  testDTO: TestDTO | null;
  onModuleSelect: (module: string, ids: number[]) => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  testDTO,
  onModuleSelect,
}) => {
  if (!isOpen || !testDTO) return null;

  const handleModuleSelect = (module: string) => {
    onClose();
    const ids = testDTO[
      `${module.toLowerCase()}Ids` as keyof TestDTO
    ] as number[];
    onModuleSelect(module, ids);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <h2 className="text-lg font-bold mb-4">Select Module</h2>
        <div className="space-y-2">
          <button
            onClick={() => handleModuleSelect("Reading")}
            className="w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700"
          >
            Reading
          </button>
          <button
            onClick={() => handleModuleSelect("Listening")}
            className="w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700"
          >
            Listening
          </button>
          <button
            onClick={() => handleModuleSelect("Speaking")}
            className="w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700"
          >
            Speaking
          </button>
          <button
            onClick={() => handleModuleSelect("Writing")}
            className="w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700"
          >
            Writing
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
