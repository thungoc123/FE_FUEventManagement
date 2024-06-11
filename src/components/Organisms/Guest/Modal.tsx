// Modal.tsx
import React, { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RiCloseCircleLine } from "react-icons/ri";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white p-4 rounded-lg shadow-lg relative">
            <button className="absolute top-4 right-2 p-2 text-2xl" onClick={onClose}>
            <RiCloseCircleLine />

            </button>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
