import React, { MouseEventHandler, useEffect, useState } from "react";
import { Button, Checkbox, Input, Label, Textarea } from "@relume_io/relume-ui";
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
import { BiAddToQueue, BiTrash, BiEdit } from "react-icons/bi";

import { RootState } from "../../../Store/Store";
import {
  useCreateFeedbackMutation,
  useUpdateFeedbackMutation,
} from "../../../Features/FeedbackManage/feedbackApi";
import SearchFilterForm from "../../Atoms/SearchFilterForm";
import { EOevent } from "../../../Types/eo.type";
import { Alert } from "../../Molecules/Alert";
import {
  feedbackAnswer,
  FeedbackQuery,
  feedbackQuestions,
} from "../../../Types/feedback";
import { addNotification } from "../../../Features/Utils/notificationsSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

type props = {
  feedback: FeedbackQuery;
};

export const UpdateFeedback: React.FC<props> = (prop) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isQuestion, setIsQuestion] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [option, setOption] = useState("");
  const [number, setNumber] = useState(1);
  const [fill, setFill] = useState("");
  const [answers, setAnswers] = useState([
    { answer: "", deletedAt: null, modifiedAt: null },
  ]);

  console.log(prop.feedback);
  const [updateFeedback, { isLoading }] = useUpdateFeedbackMutation();

  const [formData, setFormData] = useState({
    title: prop.feedback.title,
    deleteAt: null,
    modifiedAt: null,
    stateID: 2,
    feedbackQuestions: [],
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
      await updateFeedback({
        id: prop.feedback.feedbackID,
        newFeedback: formData,
      }).unwrap();
      dispatch(
        addNotification({
          id: new Date().getTime(), // Sử dụng timestamp làm ID
          message: "Update feedback successfully!",
          type: "success",
          timestamp: Date.now(), // Thời gian hiện tại
        })
      );
    } catch (err) {
      dispatch(
        addNotification({
          id: new Date().getTime(), // Sử dụng timestamp làm ID
          message: "Update feedback unsuccessfully!",
          type: "error",
          timestamp: Date.now(), // Thời gian hiện tại
        })
      );
      console.error("Failed to create the event:", err);
    }
  };

  const Events = useSelector((state: RootState) => state.events.events);
  const PublishEvent = Events.filter(
    (event) => event.stateEvent.name !== "HAPPENED"
  );

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
  const filteredEventList = filteredEvents.filter(
    (event) =>
      event.name.toLowerCase().includes(eventData.eventName.toLowerCase()) &&
      event.name !== eventData.eventName
  );

  const handleSearchChange = (value: string) => {
    setEventData({ eventName: value });
    // Lọc sự kiện hoặc cập nhật gợi ý tìm kiếm dựa trên giá trị nhập vào
  };
  return (
    <>
      <Dialog onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {/* <Button>Create Feedback</Button> */}
          <BiEdit />
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay className="bg-black/25" />
          <DialogContent className="w-full max-w-md bg-white px-10 py-14 md:py-16 md:px-12 md:data-[state=open]:duration-300 md:data-[state=open]:animate-in md:data-[state=closed]:animate-out md:data-[state=closed]:fade-out-0 md:data-[state=open]:fade-in-0 md:data-[state=closed]:slide-out-to-left-1/2 md:data-[state=open]:slide-in-from-left-1/2">
            <>
              <DialogHeader>
                <DialogTitle className="mb-2">
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
                      value={formData.title}
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
                </div>
              </DialogFooter>
            </form>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  );
};

export default UpdateFeedback;