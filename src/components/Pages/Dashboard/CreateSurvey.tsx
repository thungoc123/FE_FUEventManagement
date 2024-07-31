import React, { MouseEvent, useState } from "react";
import { Button, Input, Label } from "@relume_io/relume-ui";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Store/Store";
import SearchFilterForm from "../../Atoms/SearchFilterForm";
import { EOevent } from "../../../Types/eo.type";
import { Alert } from "../../Molecules/Alert";
import { addNotification } from "../../../Features/Utils/notificationsSlice";
import { useNavigate } from "react-router-dom";
import { useCreateSurveyMutation } from "../../../Features/Survey/survey";

const SurveyForm2: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [fill, setFill] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    deleteAt: null,
    modifiedAt: null,
    stateID: 2,
    surveyQuestions: [],
    eventid: null
  });
  const [eventData, setEventData] = useState({
    eventName: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createSurvey, { isLoading }] = useCreateSurveyMutation();
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEventChange = (event: MouseEvent<HTMLLIElement>) => {
    const eventId = Number(event.currentTarget.getAttribute("data-event-id"));
    const eventName = String(event.currentTarget.getAttribute("data-event-name"));
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
    console.log("Submitting form data:", JSON.stringify(formData));
    try {
      await createSurvey({
        eventId: formData.eventid,
        newSurvey: {
          title: formData.title,
          deleteAt: formData.deleteAt,
          modifiedAt: formData.modifiedAt,
          stateID: formData.stateID,
          surveyQuestions: formData.surveyQuestions,
        },
      }).unwrap();
      dispatch(
        addNotification({
          id: new Date().getTime(),
          message: "Create survey successfully!",
          type: "success",
          timestamp: Date.now(),
        })
      );
    } catch (err) {
      dispatch(
        addNotification({
          id: new Date().getTime(),
          message: "Create survey unsuccessfully!",
          type: "error",
          timestamp: Date.now(),
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
      setFilteredEvents(filtered);
      if (filteredEvents.length === 0) {
        setFill("Event not found and cannot be empty!");
      }
    }
  };

  const filteredEventList = filteredEvents.filter(event => event.name.toLowerCase().includes(eventData.eventName.toLowerCase()) && event.name !== eventData.eventName);

  const handleSearchChange = (value: string) => {
    setEventData({ eventName: value });
  };

  return (
    <>
      <Dialog onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>Create Survey</Button>
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay className="bg-black/25" />
          <DialogContent className="w-full max-w-md bg-white px-10 py-14">
            <DialogHeader>
              <DialogTitle className="mb-2">
                Let's start with your survey
              </DialogTitle>
              <DialogDescription>
                Create a survey to get idea from customer
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid items-center gap-2">
                  <Label htmlFor="surveyname">Survey title</Label>
                  <Input id="surveyname" name="title" onChange={handleInputChange} />
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
                            className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50"
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
              {filteredEvents.length === 0 && <Alert text={fill} />}
              <DialogFooter className="mt-6">
                <div className="mt-6 flex w-full flex gap-4 justify-between">
                  <Button type="submit">
                    {isLoading ? "Creating" : "Get Started"}
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

export default SurveyForm2;
