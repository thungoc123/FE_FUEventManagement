import { BiMailSend, BiCheck, BiX } from "react-icons/bi";
import { ApplicationShell4 } from "../Organisms/Dashboard/ApplicationShell";
import { TableTemplate } from "../Organisms/Dashboard/TableTemplate";
import { useCheckAttendanceMutation, useGetAttendanceQuery, useGetEventDetailQuery, useGetListFeedbackEventQuery, useSendMailMutation } from "../../Features/CheckingStaff/checkingApi";
import { StaffTable } from "../../Types/checkingstaff";
import Modal from 'react-modal';
import { useState } from "react";
import { Button } from "@relume_io/relume-ui";
import '../Organisms/Style/checkingStaff.css'
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
  const tableHeaders = ["No", "Name", "Status", "Event", "Attendance", "SendFeedback"];
  // const {id} = useParams();
  // const accountId = accountID(sessionStorage.getItem("token"));
  const [selectedFeedback, setSelectedFeedback] = useState('');
  const [selectedVisitor, setSelectedVisitor] = useState<string | null>(null);
  const [feedbackQuestionLink, setFeedbackQuestionLink] = useState('');
  const { data: event, isLoading: eventIsLoading, isError: eventIsError, error: eventError } = useGetEventDetailQuery();
  const [eventName, setEventName] = useState('');

  console.log(event?.event.id)
  const { data: attendance, isLoading: attendanceIsLoading, isError: attendanceIsError, error: attendanceError } = useGetAttendanceQuery(event?.event.id ?? 0);
  // console.log(attendance)
  const attendancePaid = attendance?.filter((item) => item.ticket.status === "PAID");
  // const 
  console.log(attendancePaid)
  const [checkAttendance] = useCheckAttendanceMutation();

  const handleCheckAttendance = async (ticketId: number, status: string) => {
    try {
      await checkAttendance({ ticketId, status }).unwrap();
    } catch (err) {
      console.error("Failed to check attendance");
    }
  }
  const { data: feedback, isLoading: feedbackIsLoading, isError: feedbackIsError, error: feedbackError } = useGetListFeedbackEventQuery(event?.event.id ?? 0);
  const getFeedback = () => {
    trigger(event?.id ?? 0);
  }
  console.log(feedback)
  const [sendMail, isSuccess] = useSendMailMutation();
  console.log(isSuccess)
  const tableRows: StaffTable[] = attendancePaid?.map((item, index) => ({
    No: index + 1, // Số thứ tự bắt đầu từ 1
    Name: item.ticket.visitor.information, // Tên sự kiện
    Status: item.status,
    Event: item.eventName,
    Attendance: item.status === "ABSENT" ? <Button onClick={() => handleCheckAttendance(item.ticket.id,"ATTENDANCE")} style={{ background: '#5321af', borderRadius: '10px' }}><BiCheck /></Button> : <Button onClick={() => handleCheckAttendance(item.ticket.id,"ABSENT")} style={{ background: '#5321af', borderRadius: '10px' }}><BiX /></Button>, // Biểu tượng đánh dấu đã điểm danh
    SendFeedback: item.status === "ATTENDANCE" && <Button style={{ background: isSuccess ? 'green' : 'blue', borderRadius: '10px' }} onClick={(e) => { setSelectedVisitor(item.ticket.visitor.information); openModal(); setEventName(item.eventName) }}><BiMailSend /></Button>,
  }));

  console.log(selectedVisitor) 
  console.log(selectedFeedback)
  const tableHeaderClasses = [
    "w-[200px] pr-4 xxl:w-[25px]",
    "w-[200px] pr-4 xxl:w-[70px]",
    "w-[200px] pr-4 xxl:w-[50px]",
    "w-[200px] pr-4 xxl:w-[50px]",
    "w-[200px] pr-4 xxl:w-[20px]",
    "w-[200px] pr-4 xxl:w-[20px]",
  ];

  const emailInfor = {
    to: selectedVisitor,
    subject: `[FEEDBACK] ${eventName}`,
    feedbackLink: feedbackQuestionLink,
  }

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const dispatch = useDispatch();

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(emailInfor)
    console.log(JSON.stringify(emailInfor))
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
    }catch(err){
      console.error("Failed to send mail")
    }

  }

  return (
    <>
      {attendanceIsLoading ? (
        "Vui lòng đợi trong giây lát"
      ) : attendanceError ? "Event này không có visitor nào được ghi nhận " : (
        <ApplicationShell4
          MainComponent={
            <>
              <TableTemplate
                headerTitle="Event Attendances"
                headerDescription="Danh sách những người tham gia sự kiện"
                tableHeaders={tableHeaders}
                tableRows={tableRows} // Truyền dữ liệu mới cho tableRows
                // paginationItems={paginationItems}
                tableHeadersClasses={tableHeaderClasses}
              />

            </>
          }
        />)}
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
              <SelectItem key={index} value={item.feedbackID}>{item.title}</SelectItem>
            ))}

          </SelectContent>
        </Select>
        <form onSubmit={handleSubmit}>
          <Button type="submit" onClick={(e) => setFeedbackQuestionLink(`http://localhost:5173/visitorAnswer/feedback/${selectedFeedback}`)} className="mt-4">Submit</Button>
      </form>
    </Modal >
    </>
  );
};

