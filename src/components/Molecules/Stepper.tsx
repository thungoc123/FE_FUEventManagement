import React, { ChangeEvent, useState } from "react";
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
import { useAddScheduleMutation } from "../../Features/EventManage/eventApi";
import { useNavigate, useParams } from "react-router-dom";
import { parseTime } from "../../ulities/InputHandle";
import { DateTime } from 'luxon'
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Time } from "../../Types/global.type";
import { useDispatch } from "react-redux";
import { addNotification } from "../../Features/Utils/notificationsSlice";
import { CKEditor } from "@ckeditor/ckeditor5-react";
<<<<<<< HEAD
import { toggleHeaderVisibility } from "../../Features/Utils/HeaderDisplaySlice";

=======
>>>>>>> TienMerge
const steps = [
  { label: "Schedule" },
  { label: "Actor" },
  { label: "Description" },
  { label: "Finish" },
];

const AddEventSchedule = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const openModal = () => {
<<<<<<< HEAD
    dispatch(toggleHeaderVisibility("sticky top-0 flex min-h-16 w-full items-center border-b border-border-primary bg-white px-4 md:min-h-18 md:px-8"))
=======
>>>>>>> TienMerge
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));
  const { id } = useParams();

  const [timeStart, setTimeStart] = useState("")
  const [duration, setDuration] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [actor, setActor] = useState("");
  const [editorData, setEditorData] = useState("");
  const [eventType, setEventType] = useState("");
  const [location, setLocation] = useState("");

 
  const ScheduleData = {
    name: name,
    date: date,
    timeStart:timeStart,
    duration: duration,
    actor: actor,
    description: editorData,
    eventType: eventType,
    location: location,
};
<<<<<<< HEAD
const [addSchedule, { isLoading, isSuccess, isError, error }
] = useAddScheduleMutation();
=======
const [addSchedule, { isLoading, isSuccess, isError, error }] = useAddScheduleMutation();
>>>>>>> TienMerge


  const handleSubmit =  async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    console.log(JSON.stringify(ScheduleData))
=======
>>>>>>> TienMerge
    try {
        const response = await addSchedule({id: id, newSchedule: ScheduleData }).unwrap();
        console.log(response)
        dispatch(addNotification({
          id: new Date().getTime(), // Sử dụng timestamp làm ID
          message: 'Create event schedule successfully!',
          type: 'success',
          timestamp: Date.now(), // Thời gian hiện tại
        }));
<<<<<<< HEAD
        window.location.reload();
=======
>>>>>>> TienMerge
    } catch (err) {
      dispatch(addNotification({
        id: new Date().getTime(), // Sử dụng timestamp làm ID
        message: 'Create event schedule unsuccessfully!',
        type: 'error',
        timestamp: Date.now(), // Thời gian hiện tại
      }));
      console.error('Failed to create the event:', err);
    }
  }


  const [errors, setErrors] = useState<string | null>(null); // State để lưu trữ thông báo lỗi nếu có
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
              <form onSubmit={handleSubmit}>
              {currentStep === 0 && (
                <>
                    <h2 className="mb-4 text-2xl font-bold text-center">
                      Let's start with your survey
                    </h2>
                    <p className="mb-8 text-center text-gray-600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                      varius enim in eros.
                    </p>
                  
                      <div className="mb-4">
                        <Label htmlFor="name">Schedule Name</Label>

                        <Input
                          type="text"
                          id="name"
                          // value=""
                          onChange={(e) => setName(e.target.value)}
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
                        type="datetime-local"
                          id="date"
                          placeholder="Search"
                          onChange={(e) => setDate(DateTime.fromISO(e.target.value).toFormat("yyyy-MM-dd"))}
                          // icon={<BiCalendarAlt className="size-6" />}
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
                          type="time"
                          id="time"
                          placeholder="Hours"
                          // value=""
                          onChange={(e) => setTimeStart(e.target.value+":00")}
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
                          type="time"
                          id="Duration"
                          placeholder="Hours"
                          // value=""
                          

                          onChange={(e) => setDuration(e.target.value+":00")}
                        />
                      </div>
                    
                  </>
              )}
              {currentStep === 1 && (
                    <>
                    <h2 className="mb-4 text-2xl font-bold text-center">
                      What is your actor ?
                    </h2>
                    <p className="mb-8 text-center text-gray-600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                      varius enim in eros.
                    </p>
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
                          // value=""
                          icon={<BiUser className="size-6" />}
                          onChange={(e) => setActor(e.target.value)}
                        />
                      </div>
                  
                    </>

              )}
              {currentStep === 2 && (
                <>
                  <h2 className="mb-4 text-2xl font-bold text-center">Description</h2>
                  <p className="mb-8 text-center text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    varius enim in eros.
                  </p>
<<<<<<< HEAD
                  <div className="editor-container">
=======
>>>>>>> TienMerge
                  <CKEditor
            editor={ClassicEditor}
            data="<p>Type your content here!</p>"
            // Sử dụng đối tượng cấu hình
<<<<<<< HEAD
            config={{
              toolbar: [
                'bold', 'italic', '|',
                'link', '|',
                'bulletedList', 'numberedList', '|',
                'undo', 'redo',
                'insertImage', 'insertMedia', 'blockQuote', '|',
              ],
              // Include additional configuration options as needed
            }}
=======

>>>>>>> TienMerge
            onReady={(editor: any) => {
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event: any, editor: any) => {
              const data = editor.getData();
              setEditorData(data);
              console.log({ event, editor, data });
            }}
            onBlur={(event: any, editor: any) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event: any, editor: any) => {
              console.log("Focus.", editor);
            }}
          />
<<<<<<< HEAD
          </div>
=======
>>>>>>> TienMerge
                </>
              )}
              {currentStep === 3 && (
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
                  <Select onValueChange={setEventType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select one..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Online">Online</SelectItem>
                      <SelectItem value="Offline">Offline</SelectItem>
                    </SelectContent>
                  </Select>
                   {/* <Input
                    type="text"
                    id="time"
                    placeholder=""
                    // value=""
                    onChange={(e) => setEventType(e.target.value)}
                  /> */}
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-700"
                    htmlFor="time"
                  >
                    Platform/Location
                  </label>
                  <Input
                    type="text"
                    id="time"
                    placeholder=""
                    // value=""
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </>
              )}
              <div className="flex justify-between mt-4">
                <span
                    className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary bg-background-alternative text-text-alternative px-6 py-3"
                    onClick={prevStep}
                  >
                    Back
                  </span>
                
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
              </div>
              </form>
            </div>
          </div>
        </div>
        
        {/* <button onClick={closeModal}>Close Modal</button> */}
      </Modal>
      
    </>
  );
};

export default AddEventSchedule;
