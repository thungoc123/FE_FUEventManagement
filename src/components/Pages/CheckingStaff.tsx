import { BiMailSend, BiCheck, BiX } from "react-icons/bi";
import { ApplicationShell4 } from "../Organisms/Dashboard/ApplicationShell";
import { TableTemplate } from "../Organisms/Dashboard/TableTemplate";
import { useCheckAttendanceMutation, useGetAttendanceQuery, useGetEventDetailQuery, useGetListFeedbackEventQuery, useSendMailMutation } from "../../Features/CheckingStaff/checkingApi";
import { StaffTable } from "../../Types/checkingstaff";
import Modal from 'react-modal';
import { useState } from "react";
import { Button } from "@relume_io/relume-ui";
import '../Organisms/Style/checkingStaff.css';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@relume_io/relume-ui';
import { useDispatch } from "react-redux";
import { addNotification } from "../../Features/Utils/notificationsSlice";

export const CheckingStaffDashboard = () => {
  const tableHeaders = ["No", "Name", "Status", "Event", "Attendance", "SendFeedback", "SendSurvey"];
  const [selectedFeedback, setSelectedFeedback] = useState('');
  const [selectedVisitor, setSelectedVisitor] = useState<string | null>(null);
  const [feedbackQuestionLink, setFeedbackQuestionLink] = useState('');
  const [surveyLink, setSurveyLink] = useState('https://forms.gle/r4GwfDqZCbw26f2YA'); // Link Google Form
  const { data: event, isLoading: eventIsLoading, isError: eventIsError, error: eventError } = useGetEventDetailQuery();
  const [eventName, setEventName] = useState('');

  const { data: attendance, isLoading: attendanceIsLoading, isError: attendanceIsError, error: attendanceError } = useGetAttendanceQuery(event?.event.id ?? 0);
  const attendancePaid = attendance?.filter((item) => item.ticket.status === "PAID");

  const [checkAttendance] = useCheckAttendanceMutation();
  const handleCheckAttendance = async (ticketId: number, status: string) => {
    try {
      await checkAttendance({ ticketId, status }).unwrap();
    } catch (err) {
      console.error("Failed to check attendance");
    }
  };

  const { data: feedback, isLoading: feedbackIsLoading, isError: feedbackIsError, error: feedbackError } = useGetListFeedbackEventQuery(event?.event.id ?? 0);
  const [sendMail, { isSuccess: mailSuccess }] = useSendMailMutation();
  const [sendSurvey, { isSuccess: surveySuccess }] = useSendMailMutation(); // Assuming the same mutation for sending surveys
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailInfor = {
      to: selectedVisitor,
      subject: `[FEEDBACK] ${eventName}`,
      feedbackLink: feedbackQuestionLink,
    };

    try {
      await sendMail(emailInfor).unwrap();
      dispatch(
        addNotification({
          id: new Date().getTime(), // Sử dụng timestamp làm ID
          message: "Send email successfully!",
          type: "success",
          timestamp: Date.now(), // Thời gian hiện tại
        })
      );
      setIsOpen(false);
    } catch (err) {
      console.error("Failed to send mail");
    }
  };

  const handleSendSurvey = async (visitor) => {
    const surveyInfo = {
      to: visitor,
      subject: `[SURVEY] ${eventName}`,
      surveyLink: surveyLink, // Link Google Form
    };

    try {
      await sendSurvey(surveyInfo).unwrap();
      dispatch(
        addNotification({
          id: new Date().getTime(),
          message: "Send survey successfully!",
          type: "success",
          timestamp: Date.now(),
        })
      );
    } catch (err) {
      console.error("Failed to send survey");
    }
  };

  const tableRows: StaffTable[] = attendancePaid?.map((item, index) => ({
    No: index + 1, // Số thứ tự bắt đầu từ 1
    Name: item.ticket.visitor.information, // Tên sự kiện
    Status: item.status,
    Event: item.eventName,
    Attendance: item.status === "ABSENT" ? <Button onClick={() => handleCheckAttendance(item.ticket.id, "ATTENDANCE")} style={{ background: '#5321af', borderRadius: '10px' }}><BiCheck /></Button> : <Button onClick={() => handleCheckAttendance(item.ticket.id, "ABSENT")} style={{ background: '#5321af', borderRadius: '10px' }}><BiX /></Button>, // Biểu tượng đánh dấu đã điểm danh
    SendFeedback: item.status === "ATTENDANCE" && <Button style={{ background: mailSuccess ? 'green' : 'blue', borderRadius: '10px' }} onClick={() => { setSelectedVisitor(item.ticket.visitor.information); openModal(); setEventName(item.eventName) }}><BiMailSend /></Button>,
    SendSurvey: item.status === "ATTENDANCE" && <Button style={{ background: surveySuccess ? 'green' : 'blue', borderRadius: '10px' }} onClick={() => handleSendSurvey(item.ticket.visitor.information)}><BiMailSend /></Button>,
  }));

  const tableHeaderClasses = [
    "w-[200px] pr-4 xxl:w-[25px]",
    "w-[200px] pr-4 xxl:w-[70px]",
    "w-[200px] pr-4 xxl:w-[50px]",
    "w-[200px] pr-4 xxl:w-[50px]",
    "w-[200px] pr-4 xxl:w-[20px]",
    "w-[200px] pr-4 xxl:w-[20px]",
    "w-[200px] pr-4 xxl:w-[20px]", // Thêm class cho cột SendSurvey
  ];

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      {attendanceIsLoading ? (
        "Vui lòng đợi trong giây lát"
      ) : attendanceError ? (
        "Event này không có visitor nào được ghi nhận "
      ) : (
        <ApplicationShell4
          MainComponent={
            <>
              <TableTemplate
                headerTitle="Event Attendances"
                headerDescription="Danh sách những người tham gia sự kiện"
                tableHeaders={tableHeaders}
                tableRows={tableRows}
                tableHeadersClasses={tableHeaderClasses}
              />
            </>
          }
        />
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
        contentLabel="Example Modal"
        id="modalStyle"
      >
        <div className="flex justify-between items-center mb-2">
          <h2>Select Feedback</h2>
          <button id="close" onClick={closeModal}>
            <BiX style={{ color: 'red' }} />
          </button>
        </div>
        <Select onValueChange={setSelectedFeedback}>
          <SelectTrigger>
            <SelectValue placeholder="Choose Feedback ... " />
          </SelectTrigger>
          <SelectContent>
            {feedback?.map((item, index) => (
              <SelectItem key={index} value={item.feedbackID}>
                {item.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <form onSubmit={handleSubmit}>
          <Button type="submit" onClick={() => setFeedbackQuestionLink(`http://localhost:5173/visitorAnswer/feedback/${selectedFeedback}`)} className="mt-4">
            Submit
          </Button>
        </form>
      </Modal>
    </>
  );
};
