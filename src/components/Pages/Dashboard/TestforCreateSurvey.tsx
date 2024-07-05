import React, { useEffect, useState } from "react";
import { Button, Checkbox, Input, Label, Textarea } from "@relume_io/relume-ui";
import EventTag from "../../Atoms/EventTag";
// import EventTag from "../Atoms/EventTag";
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
} from "@relume_io/relume-ui";
import { BiLogoGoogle, BiPlus } from "react-icons/bi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@relume_io/relume-ui";

export const SurveyForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isQuestion, setIsQuestion] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    { label: "Survey" },
    { label: "Actor" },
    { label: "Description" },
    { label: "Finish" },
  ];
  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));
  // useEffect(() => {
  //   // location.reload();
  // },[setIsOpen])
  return (
    <>
      <Dialog onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>Create Survey</Button>
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay className="bg-black/25" />
          <DialogContent className="w-full max-w-md bg-white px-10 py-14 md:py-16 md:px-12 md:data-[state=open]:duration-300 md:data-[state=open]:animate-in md:data-[state=closed]:animate-out md:data-[state=closed]:fade-out-0 md:data-[state=open]:fade-in-0 md:data-[state=closed]:slide-out-to-left-1/2 md:data-[state=open]:slide-in-from-left-1/2">
            <>
              <DialogHeader>
                <DialogTitle className="mb-2">
                  Let's start with your Survey
                </DialogTitle>
                <DialogDescription>
                  Create a survey to get idea from customer
                </DialogDescription>
              </DialogHeader>
            </>
            {/* ))} */}
            {currentStep === 0 && <Step1 />}
            {currentStep === 1 && <Step2 />}
            {currentStep === 2 && <Step3 />}

            <DialogFooter className="mt-6">
              <div className="mt-6 flex w-full flex gap-4 md:mt-8 justify-between">
                <Button
                  variant="secondary"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                >
                  {currentStep === 0 ? "Cancel" : "Back"}
                </Button>
                <Button onClick={nextStep}>
                  {currentStep === steps.length - 1 ? "Get Started" : "Next"}
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </Dialog>
      {isQuestion && <Question />}
    </>
  );
};
const Step1 = () => (
  <>
    <div className="grid gap-4 py-4">
      <div className="grid items-center gap-2">
        <Label htmlFor="surveyname">Survey Name</Label>
        <Input id="surveyname" />
      </div>
      <div className="grid items-center gap-2">
        <Label htmlFor="Objectives">Objectives</Label>
        <Input id="Objectives" type="text" />
      </div>
      <div className="grid items-center gap-2">
        <Label htmlFor="event">Event</Label>
        {/* <Input id="event" type="text" /> */}
        <select
          name=""
          id=""
          className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-black py-2 shadow-sm"
        >
          <option value="">Online</option>
          <option value="">Offline</option>
        </select>
      </div>
    </div>
  </>
);
const Step2 = () => (
  <>
    <div className="grid gap-4 py-4">
      <div className="grid items-center gap-2">
        <Label htmlFor="Question">Question</Label>
        <Input id="Question" />
      </div>
      <div className="grid items-center gap-2">
        <Label htmlFor="Type">Type</Label>
        <select
          name=""
          id=""
          className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-black py-2 shadow-sm"
        >
          <option value="">Online</option>
          <option value="">Offline</option>
        </select>
      </div>
    </div>
  </>
);
const Step3 = () => (
  <>
   
        <form>
          {/* <div className="mb-4">
            <Label htmlFor="Question">Question</Label>
            <Input
              type="text"
              id="question"
              value=""
              // onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <div className="grid items-center gap-2">
              <Label htmlFor="Type">Type</Label>
              <select
                name=""
                id=""
                className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-black py-2 shadow-sm"
              >
                <option value="">MultiQuestion</option>
                <option value="">Text</option>
              </select>
            </div>
          </div> */}
          <div className="mb-4">
            <Label htmlFor="answer">Answer 1</Label>
            <Input
              type="text"
              id="answer"
              value=""
              // onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="answer">Answer 2</Label>
            <Input
              type="text"
              id="answer"
              value=""
              // onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="answer">Answer 3</Label>
            <Input
              type="text"
              id="answer"
              value=""
              // onChange={(e) => setEmail(e.target.value)}
            />
          </div>
         
        </form>
      {/* </div>
    </div> */}
  </>
);
// const Step2 = () => {
//   <>
<div className="grid gap-4 py-4">
  <div className="grid items-center gap-2">
    <Label htmlFor="Question">Question</Label>
    <Input id="Question" />
  </div>
  <div className="grid items-center gap-2">
    <Label htmlFor="Type">Type</Label>
    <select
      name=""
      id=""
      className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-black py-2 shadow-sm"
    >
      <option value="">Online</option>
      <option value="">Offline</option>
    </select>
  </div>
</div>;
//   </>
// };
const Question = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Next</Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="bg-black/50" />
        <DialogContent className="w-full max-w-md bg-white p-10 md:p-12">
          <DialogHeader>
            <DialogTitle>Let’s start with question</DialogTitle>
            <DialogDescription>Modal Description</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center gap-2">
              <Label htmlFor="Question">Question</Label>
              <Input id="Question" />
            </div>
            <div className="grid items-center gap-2">
              <Label htmlFor="Type">Type</Label>
              {/* <Input id="event" type="text" /> */}
              <select
                name=""
                id=""
                className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-black py-2 shadow-sm"
              >
                <option value="">Online</option>
                <option value="">Offline</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="link" size="link" asChild>
              <a
                href="https://www.relume.io"
                className="underline"
                target="_blank"
                rel="noopener"
              >
                Modal Footer
              </a>
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
export default SurveyForm;
