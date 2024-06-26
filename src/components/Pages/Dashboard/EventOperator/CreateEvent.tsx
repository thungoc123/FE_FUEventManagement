import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@relume_io/relume-ui";
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
import { BiCalendarAlt, BiUser, BiHourglass, BiTime } from "react-icons/bi";
import Modal from "react-modal";
import { useCreateEventMutation } from "../../../../Features/EventManage/eventApi";
import { RootState } from "../../../../Store/Store";
import { useDispatch, useSelector } from "react-redux";
const steps = [{ label: "Schedule" }, { label: "Actor" }];
import { DateTime } from 'luxon'
import { useNavigate } from "react-router-dom";
import { addNotification } from "../../../../Features/Utils/notificationsSlice";

const CreateEvent = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string[]>([]);
  const [createEvent, { isLoading, isSuccess, isError, error }] = useCreateEventMutation();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));
  const accountId = useSelector((state: RootState) => state.auth.accountId);

  const [eventData, setEventData] = useState({
    eventName: "",
    description: "",
    timeStart: "",
    timeEnd: "",
    timeOpenSale: "",
    timeCloseSale: "",
    price: 0,
    accountId: accountId,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
    let newErrors: string[] = [];

    if (name === "timeEnd" && value <= eventData.timeStart) {
      newErrors.push("End time must be after start time.");
    }
    if (name === "timeStart" && value <= eventData.timeCloseSale) {
      newErrors.push("Start time must be after ticket close sale time.");
    }
    if (name === "timeCloseSale" && value <= eventData.timeOpenSale) {
      newErrors.push(
        "Ticket close sale time must be after ticket open sale time."
      );
    }
    if (name === "timeOpenSale" && value >= eventData.timeCloseSale) {
      newErrors.push(
        "Ticket open sale time must be before ticket close sale time."
      );
    }
    if(name === "price" && +value <= -1) {
      newErrors.push(
        "Price must be greater than 0."
      );
    }
    if ((name === "eventName" || name === "description") && value.trim() === "") {
      // Hiển thị lỗi hoặc xử lý logic phù hợp
      newErrors.push(
        "Name and description cannot be empty ! "
      );
      return; // Ngừng xử lý tiếp tục nếu có lỗi
    }
   

    let formattedValue = value;
    if (name === "timeStart" || name === "timeEnd" || name === "timeOpenSale" || name === "timeCloseSale") {
      const dateTime = DateTime.fromISO(value);
      formattedValue = dateTime.toFormat("yyyy-MM-dd'T'HH:mm:ss");
    }

    setEventData({
      ...eventData,
      [name]: formattedValue,
    });
    console.log(newErrors)
    setSubmitError(newErrors);
    
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(eventData);
    try {
      await createEvent(eventData).unwrap();
      dispatch(addNotification({
        id: new Date().getTime(), // Sử dụng timestamp làm ID
        message: 'Create event successfully!',
        type: 'success',
        timestamp: Date.now(), // Thời gian hiện tại
      }));
      navigate('/eventoperator/dashboard/event')
      // alert('Event created successfully!');
    } catch (err) {
      dispatch(addNotification({
        id: new Date().getTime(), // Sử dụng timestamp làm ID
        message: 'Create event unsuccessfully!',
        type: 'error',
        timestamp: Date.now(), // Thời gian hiện tại
      }));
      console.error('Failed to create the event:', err);
    }
  };

 

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Event</Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="bg-black/50" />
        <DialogContent className="w-full max-w-md bg-white p-10 md:p-12">
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
          <form onSubmit={handleSubmit}>
            {currentStep === 0 && (
              // <Step1  handleChange={handleChange} />
              <div>
                <DialogHeader>
                  <DialogTitle>Let’s start with your event </DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid items-center gap-2">
                    <Label htmlFor="eventName">Name</Label>
                    <Input
                      id="eventName"
                      name="eventName"
                      onChange={handleChange}
                      required
                      value={eventData.eventName}
                    />
                  </div>
                  <div className="grid items-center gap-2">
                    <Label htmlFor="Objectives">Objectives</Label>
                    <Textarea
                      placeholder="Type your objectives..."
                      name="description"
                      id="Objectives"
                      onChange={handleChange}
                      required
                      value={eventData.description}
                    />
                  </div>
                </div>
              </div>
            )}
            {currentStep === 1 && (
              <div>
                <DialogHeader>
                  <DialogTitle>Time & Price </DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid items-center gap-2">
                    <Label htmlFor="time">Ticket Open Sale</Label>
                    <Input
                      id="time"
                      type="datetime-local"
                      placeholder="Time"
                      name="timeOpenSale"
                      value={eventData.timeOpenSale}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid items-center gap-2">
                    <Label htmlFor="tittle">Ticket Close Sale</Label>
                    <Input
                      id="tittle"
                      type="datetime-local"
                      placeholder="Tittle"
                      name="timeCloseSale"
                      value={eventData.timeCloseSale}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid items-center gap-2">
                    <Label htmlFor="tag">Time start</Label>
                    <Input
                      id="tag"
                      type="datetime-local"
                      placeholder="Time start"
                      name="timeStart"
                      value={eventData.timeStart}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid items-center gap-2">
                    <Label htmlFor="speaker">Time end</Label>
                    <Input
                      id="speaker"
                      type="datetime-local"
                      placeholder="Time end"
                      name="timeEnd"
                      value={eventData.timeEnd}
                      onChange={handleChange}
                    />
                   
                  </div>
                  <div className="grid items-center gap-2">
                    <Label htmlFor="Price">Price</Label>
                    <Input
                      id="Price"
                      type="number"
                      placeholder="Price"
                      name="price"
                      value={eventData.price}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                {submitError && (
                      <p>{submitError[submitError.length - 1]}</p>
                    )}
              </div>
            )}

            <DialogFooter>
              <div className="mt-6 flex w-full flex gap-4 md:mt-8 justify-between">
                <Button
                  variant="secondary"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                >
                  {currentStep === 0 ? "Cancel" : "Back"}
                </Button>
                {currentStep === steps.length - 1 ? (
                  <Button type="submit">{isLoading ? 'Creating' : 'Get Started'} </Button>
                ) : (
                  <span
                    className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary bg-background-alternative text-text-alternative px-6 py-3"
                    onClick={nextStep}
                  >
                    Next
                  </span>
                )}
                {/* <Button type={currentStep === steps.length - 1 ? "submit" : "button"} onClick={currentStep === steps.length - 1 ? undefined : nextStep}>
                {currentStep === steps.length - 1 ? "Get Started" : "Next"}
              </Button> */}
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
// type Step1Props = {
//   handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
// };

// const Step1:React.FC<{ handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined }> = (handleChange) => (
//   <>

//   </>
// );
// const Step2: React.FC<{
//   handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
// }> = (handleChange) => <></>;
export default CreateEvent;
