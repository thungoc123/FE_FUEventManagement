import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
  Label,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  Input,
} from "@relume_io/relume-ui";
import Modal from "react-modal";

const AddFeedbackButton: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <Button onClick={openModal}>Add Feedback</Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        // className="z-"
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true} // Đóng khi nhấn phím Escape
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Đảm bảo overlay có thể nhìn thấy được
            pointerEvents: "auto", // Đảm bảo overlay có thể nhận sự kiện nhấp chuột
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <h2 className="mb-4 text-2xl font-bold text-center">
        Add Feedback        </h2>
        <p className="mb-8 text-center text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros.
        </p>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-700"
            htmlFor="time"
          >
            Choose Feedback
          </label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select one..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="first-choice">Online</SelectItem>
              <SelectItem value="second-choice">Offline</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-between mt-4">
          <Button variant="secondary">Back</Button>

          <Button

          // disabled={currentStep === steps.length - 1}
          >
            Next
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default AddFeedbackButton;
