<<<<<<< HEAD
import React, { MouseEventHandler, useEffect, useState } from "react";
import { Button, Checkbox, Input, Label, Textarea } from "@relume_io/relume-ui";
=======
import React, { useEffect, useState } from "react";
import { Button, Checkbox, Input, Label, Textarea } from "@relume_io/relume-ui";
import EventTag from "../../Atoms/EventTag";
>>>>>>> TienMerge
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
<<<<<<< HEAD
import { BiAddToQueue, BiTrash } from "react-icons/bi";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Store/Store";
import { useCreateFeedbackMutation } from "../../../Features/FeedbackManage/feedbackApi";
import SearchFilterForm from "../../Atoms/SearchFilterForm";
import { EOevent } from "../../../Types/eo.type";
import { Alert } from "../../Molecules/Alert";
import { feedbackAnswer, feedbackQuestions } from "../../../Types/feedback";
import { addNotification } from "../../../Features/Utils/notificationsSlice";
import { useNavigate } from "react-router-dom";
=======
import { BiLogoGoogle, BiPlus } from "react-icons/bi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@relume_io/relume-ui";
>>>>>>> TienMerge

export const SurveyForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isQuestion, setIsQuestion] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
<<<<<<< HEAD
  const [option, setOption] = useState("");
  const [number, setNumber] = useState(1);
  const [fill, setFill] = useState("");
  const [answers, setAnswers] = useState([
    { answer: "", deletedAt: null, modifiedAt: null },
  ]);
  const [createFeedback , {isLoading}] = useCreateFeedbackMutation();
  // const steps = [
  //   { label: "Survey" },
  //   { label: "Actor" },
  //   { label: "Description" },
  //   { label: "Finish" },
  // ];

  const [formData, setFormData] = useState({
    title: "",
    deleteAt: null,
    modifiedAt: null,
    stateID: 2,
    feedbackQuestions: [
      // {
      //   typeQuestion: "",
      //   textQuestion: "",
      //   answers: [],
      // },
    ],
    eventid: 0,
  });
  const [eventData, setEventData] = useState({
    eventName: "",
  });
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleEventChange = (event: MouseEvent<HTMLLIElement>) => {
    const eventId = Number(event.currentTarget.getAttribute("data-event-id"));
    const eventName = String(
      event.currentTarget.getAttribute("data-event-name")
    );
    setFormData({
      ...formData,
      eventid: eventId,
    });
    setEventData({
      ...eventData,
      eventName: eventName,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData));
    try {
      await createFeedback({eventId:formData.eventid,newFeedback:formData}).unwrap();
      dispatch(
        addNotification({
          id: new Date().getTime(), // Sử dụng timestamp làm ID
          message: "Create feedback successfully!",
          type: "success",
          timestamp: Date.now(), // Thời gian hiện tại
        })
      );
      // navigate("/eventoperator/dashboard/feedback");
      window.location.reload();


      // alert('Event created successfully!');
    } catch (err) {
      dispatch(
        addNotification({
          id: new Date().getTime(), // Sử dụng timestamp làm ID
          message: "Create feedback unsuccessfully!",
          type: "error",
          timestamp: Date.now(), // Thời gian hiện tại
        })
      );
      console.error("Failed to create the event:", err);
    }
  };
  
  const Events = useSelector((state: RootState) => state.events.events);
  const PublishEvent = Events.filter((event) => event.stateEvent.name !== "HAPPENED");

  const [filteredEvents, setFilteredEvents] = useState<EOevent[]>(PublishEvent);

  const handleSearchSubmit = (searchData: { searchTerm: string }) => {
    console.log("Search query:", searchData.searchTerm);

    if (searchData.searchTerm.trim()) {
      const filtered = PublishEvent.filter((event) =>
        event.name.toLowerCase().includes(searchData.searchTerm.toLowerCase())
      );
      setFilteredEvents(filtered); // Cập nhật danh sách sự kiện đã lọc
      if (filteredEvents.length === 0) {
        setFill("Event not found and cannot be empty !");
      }
    }
  };
  const filteredEventList = filteredEvents.filter(event => event.name.toLowerCase().includes(eventData.eventName.toLowerCase()) && event.name !== eventData.eventName);

  const handleSearchChange = (value: string) => {
    setEventData({ eventName: value });
    // Lọc sự kiện hoặc cập nhật gợi ý tìm kiếm dựa trên giá trị nhập vào
  };
=======
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
>>>>>>> TienMerge
  return (
    <>
      <Dialog onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
<<<<<<< HEAD
          <Button>Create Feedback</Button>
=======
          <Button>Create Survey</Button>
>>>>>>> TienMerge
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay className="bg-black/25" />
          <DialogContent className="w-full max-w-md bg-white px-10 py-14 md:py-16 md:px-12 md:data-[state=open]:duration-300 md:data-[state=open]:animate-in md:data-[state=closed]:animate-out md:data-[state=closed]:fade-out-0 md:data-[state=open]:fade-in-0 md:data-[state=closed]:slide-out-to-left-1/2 md:data-[state=open]:slide-in-from-left-1/2">
            <>
              <DialogHeader>
                <DialogTitle className="mb-2">
<<<<<<< HEAD
                  Let's start with your Feedback
                </DialogTitle>
                <DialogDescription>
                  Create a feedback to get idea from customer
                </DialogDescription>
              </DialogHeader>
            </>
            <form onSubmit={handleSubmit}>
              {/* {currentStep === 0 && ( */}
                <>
                  <div className="grid gap-4 py-4">
                    <div className="grid items-center gap-2">
                      <Label htmlFor="surveyname">Feedback title</Label>
                      <Input
                        id="surveyname"
                        name="title"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid items-center gap-2">
                      <Label htmlFor="Objectives">Event</Label>
                      <SearchFilterForm
                        onSubmit={handleSearchSubmit}
                        searchValue={eventData.eventName}
                        onSearchChange={handleSearchChange}
                      />
                      <ul>
                        {eventData.eventName.length > 0 && (
                          <ul>
                            {filteredEventList.slice(0, 5).map((event) => (
                              <li
                                className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
                                key={event.id}
                                data-event-id={event.id}
                                data-event-name={event.name}
                                onClick={handleEventChange}
                              >
                                {event.name}
                              </li>
                            ))}
                          </ul>
                        )}
                      </ul>
                    </div>
                  </div>
                </>
             

              {filteredEvents.length === 0 && <Alert text={fill} />}

              <DialogFooter className="mt-6">
                <div className="mt-6 flex w-full flex gap-4 md:mt-8 justify-between">
               
                  <Button type="submit">
                      {isLoading ? "Creating" : "Get Started"}{" "}
                      
                    </Button>
                                          {/* {isLoading ? "Creating" : "Get Started"}{" "} */}

                  {/* {currentStep === steps.length - 1 ? (
                    <Button type="submit">
                      submit
                    </Button>
                  ) : (
                    <span
                      className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary bg-background-alternative text-text-alternative px-6 py-3"
                      onClick={nextStep}
                    >
                      Next
                    </span>
                  )} */}
                </div>
              </DialogFooter>
            </form>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  );
};

=======
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
>>>>>>> TienMerge
export default SurveyForm;
