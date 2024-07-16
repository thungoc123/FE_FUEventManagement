import { BiMailSend, BiCheck, BiX } from "react-icons/bi";
import { ApplicationShell4 } from "../Organisms/Dashboard/ApplicationShell";
import { TableTemplate } from "../Organisms/Dashboard/TableTemplate";
import { useGetAttendanceQuery, useGetEventDetailQuery, useGetListFeedbackEventQuery } from "../../Features/CheckingStaff/checkingApi";
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

export const CheckingStaffDashboard = () => {
  const tableHeaders = ["No", "Name", "Status", "Event", "Attendance", "SendFeedback"];
  // const {id} = useParams();
  // const accountId = accountID(sessionStorage.getItem("token"));
  const [selectedFeedback, setSelectedFeedback] = useState('');
  const [selectedVisitor, setSelectedVisitor] = useState<string | null>(null);
  const [feedbackQuestionLink, setFeedbackQuestionLink] = useState('');
  const { data: event, isLoading: eventIsLoading, isError: eventIsError, error: eventError } = useGetEventDetailQuery();

  console.log(event?.event.id)
  const { data: attendance, isLoading: attendanceIsLoading, isError: attendanceIsError, error: attendanceError } = useGetAttendanceQuery(event?.event.id ?? 0);
  // console.log(attendance)
  const attendancePaid = attendance?.filter((item) => item.ticket.status === "PAID");
  // const 
  console.log(attendancePaid)

  const { data: feedback, isLoading: feedbackIsLoading, isError: feedbackIsError, error: feedbackError } = useGetListFeedbackEventQuery(event?.event.id ?? 0);
  const getFeedback = () => {
    trigger(event?.id ?? 0);
  }
  console.log(feedback)

  const tableRows: StaffTable[] = attendancePaid?.map((item, index) => ({
    No: index + 1, // Số thứ tự bắt đầu từ 1
    Name: item.ticket.visitor.information, // Tên sự kiện
    Status: item.status,
    Event: item.eventName,
    Attendance: <BiCheck />, // Biểu tượng đánh dấu đã điểm danh
    SendFeedback: <Button style={{ background: '#5321af', borderRadius: '10px' }} onClick={(e) => {setSelectedVisitor(item.ticket.visitor.information); openModal()}}><BiMailSend /></Button>,
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


  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFeedbackQuestionLink(`http:localhost:5173/visitorAnswer/feedback/${selectedFeedback}`);
    console.log(feedbackQuestionLink)
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
          <BiX style={{color:'red'}}/>
        </button>
        </div>

        <Select onValueChange={setSelectedFeedback}>
          <SelectTrigger>
            <SelectValue placeholder="Choose Feedback ... "/>
          </SelectTrigger>
          <SelectContent>
          {feedback?.map((item, index) => (
            <SelectItem  key={index} value={item.feedbackID}>{item.title}</SelectItem>
           ))} 

          </SelectContent>
        </Select>
        <form onSubmit={handleSubmit}>
          <Button type="submit" className="mt-4">Submit</Button>
        </form>
      </Modal>
    </>
  );
};

