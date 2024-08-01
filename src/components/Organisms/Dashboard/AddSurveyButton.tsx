import React, { useState } from "react";
import {
  Button,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@relume_io/relume-ui";
import Modal from "react-modal";

const AddSurveyButton: React.FC<{ survey: any[] }> = ({ survey }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  console.log("Feedbacks in AddFeedbackButton: ", survey); // Log để kiểm tra dữ liệu

  return (
    <>
      <Button onClick={openModal}>Add Survey</Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            pointerEvents: "auto",
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
        <h2 className="mb-4 text-2xl font-bold text-center">Add Survey</h2>
        <p className="mb-8 text-center text-gray-600">
          
        </p>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-700"
            htmlFor="feedback"
          >
            Choose Survey
          </label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select one..." />
            </SelectTrigger>
            <SelectContent>
              {survey && survey.length > 0 ? (
                survey.map((survey, index) => (
                  <SelectItem key={index} value={survey.surveyId}>
                    {survey.title}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="no-feedback">No feedback available</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-between mt-4">
          <Button variant="secondary" onClick={closeModal}>Back</Button>
          <Button>Next</Button>
        </div>
      </Modal>
    </>
  );
};

export default AddSurveyButton;
