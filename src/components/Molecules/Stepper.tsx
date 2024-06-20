import React, { useState } from "react";
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@relume_io/relume-ui";
import { BiCalendarAlt, BiUser, BiHourglass, BiTime } from "react-icons/bi";
import CkEditor from "../Atoms/CKEditor";
import Modal from "react-modal";
const steps = [
  { label: "Schedule" },
  { label: "Actor" },
  { label: "Description" },
  { label: "Finish" },
];

const AddEventSchedule = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <>
      <Button onClick={openModal}>New</Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        // className="z-"
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}          // Đóng khi nhấn phím Escape
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Đảm bảo overlay có thể nhìn thấy được
            pointerEvents: 'auto' // Đảm bảo overlay có thể nhận sự kiện nhấp chuột
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          }
        }}
      >
        <div className="container mx-auto p-4">
          <div className="flex items-left justify-center items-center min-h-screen">
            <div className="w-full max-w-lg p-8 bg-white h-1/3 shadow-md">
              <div className="relative flex justify-between items-center mb-8">
                {steps.map((step, index) => (
                  <div key={index} className="flex-1 text-center relative">
                    <div className="relative flex items-center justify-center mb-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                          index <= currentStep
                            ? "bg-black text-white"
                            : "bg-gray-300 text-gray-500"
                        }`}
                      >
                        {index + 1}
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`absolute top-1/2 w-full h-0.5 transform -translate-y-1/2 ${
                            index < currentStep ? "bg-black" : "bg-gray-300"
                          }`}
                          style={{ left: "50%", right: "calc(-50% + 2rem)" }}
                        ></div>
                      )}
                    </div>
                    {/* <p className="relative z-10">{step.label}</p */}
                  </div>
                ))}
              </div>
              {currentStep === 0 && <Step1 />}
              {currentStep === 1 && <Step2 />}
              {currentStep === 2 && <Step3 />}
              {currentStep === 3 && <Step4 />}
              <div className="flex justify-between mt-4">
                <Button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  variant="secondary"
                >
                  Back
                </Button>
                
                <Button
                  onClick={nextStep}
                  // disabled={currentStep === steps.length - 1}
                >
                  {currentStep === steps.length -1 ? "Get Started" : "Next"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* <button onClick={closeModal}>Close Modal</button> */}
      </Modal>
      
    </>
  );
};

const Step1 = () => (
  <>
    <h2 className="mb-4 text-2xl font-bold text-center">
      Let's start with your survey
    </h2>
    <p className="mb-8 text-center text-gray-600">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
      varius enim in eros.
    </p>
    <form>
      <div className="mb-4">
        <Label htmlFor="name">Schedule Name</Label>

        <Input
          type="text"
          id="name"
          value=""
          // onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block mb-2 text-sm font-medium text-gray-700"
          htmlFor="objectives"
        >
          Date
        </label>
        {/* <DatePicker /> */}

        <Input
          id="search"
          placeholder="Search"
          icon={<BiCalendarAlt className="size-6" />}
        />
      </div>
      <div className="mb-4">
        <label
          className="block mb-2 text-sm font-medium text-gray-700"
          htmlFor="time"
        >
          Time
        </label>
        <Input
          type="email"
          id="time"
          placeholder="Hours"
          value=""
          icon={<BiTime className="size-6" />}
          // onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block mb-2 text-sm font-medium text-gray-700"
          htmlFor="Duration"
        >
          Duration
        </label>
        <Input
          type="email"
          id="Duration"
          placeholder="Hours"
          value=""
          icon={<BiHourglass className="size-6" />}

          // onChange={(e) => setEmail(e.target.value)}
        />
      </div>
    </form>
  </>
);

const Step2 = () => (
  <>
    <h2 className="mb-4 text-2xl font-bold text-center">
      What is your actor ?
    </h2>
    <p className="mb-8 text-center text-gray-600">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
      varius enim in eros.
    </p>
    <form>
      <div>
        <label
          className="block mb-2 text-sm font-medium text-gray-700"
          htmlFor="time"
        >
          Actor
        </label>
        <Input
          type="email"
          id="time"
          placeholder=""
          value=""
          icon={<BiUser className="size-6" />}
          // onChange={(e) => setEmail(e.target.value)}
        />
      </div>
    </form>
  </>
);

const Step3 = () => (
  <>
    <h2 className="mb-4 text-2xl font-bold text-center">Description</h2>
    <p className="mb-8 text-center text-gray-600">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
      varius enim in eros.
    </p>
    <CkEditor />
  </>
);

const Step4 = () => (
  <>
    <h2 className="mb-4 text-2xl font-bold text-center">
      Finally, where event happens
    </h2>
    <p className="mb-8 text-center text-gray-600">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
      varius enim in eros.
    </p>
    <div className="mb-4">
      <label
        className="block mb-2 text-sm font-medium text-gray-700"
        htmlFor="time"
      >
        Event Types
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
    <div className="mb-4">
      <label
        className="block mb-2 text-sm font-medium text-gray-700"
        htmlFor="time"
      >
        Platform/Location
      </label>
      <Input
        type="email"
        id="time"
        placeholder=""
        value=""
        // onChange={(e) => setEmail(e.target.value)}
      />
    </div>
  </>
);

export default AddEventSchedule;
