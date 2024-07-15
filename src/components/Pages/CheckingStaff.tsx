import { BiMailSend, BiCheck } from "react-icons/bi";
import { ApplicationShell4 } from "../Organisms/Dashboard/ApplicationShell";
import { TableTemplate } from "../Organisms/Dashboard/TableTemplate";
import { useGetAttendanceQuery, useGetEventDetailQuery, useGetListFeedbackEventQuery, useLazyGetListFeedbackEventQuery } from "../../Features/CheckingStaff/checkingApi";
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
  const { data: event, isLoading: eventIsLoading, isError: eventIsError, error: eventError } = useGetEventDetailQuery();

  console.log(event?.id)
  const { data: attendance, isLoading: attendanceIsLoading, isError: attendanceIsError, error: attendanceError } = useGetAttendanceQuery(event?.id);
  // console.log(attendance)
  const attendancePaid = attendance?.filter((item) => item.ticket.status === "PAID");
  // const 
  // console.log(attendancePaid)

  // const { data: feedback, isLoading: feedbackIsLoading, isError: feedbackIsError, error: feedbackError } = useGetListFeedbackEventQuery(event?.id ?? 0);
  // const getFeedback = () => {
  //   trigger(event?.id ?? 0);
  // }
  // console.log(feedback)

  const tableRows: StaffTable[] = attendancePaid?.map((item, index) => ({
    No: index + 1, // Số thứ tự bắt đầu từ 1
    Name: item.ticket.visitor.information, // Tên sự kiện
    Status: item.status,
    Event: item.eventName,
    Attendance: <BiCheck />, // Biểu tượng đánh dấu đã điểm danh
    SendFeedback: <Button style={{ background: '#5321af', borderRadius: '10px' }} onClick={openModal}><BiMailSend /></Button>,
  }));


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
        id = "modalStyle"
      >
        <h2>Select Feedback</h2>
        <button id="close" onClick={closeModal}>close</button>
        
            <div className="flex flex-col">
            {/* {feedback?.map((item, index) => ( */}
              <Button className="tags" 
              // key={index} value={item.id}
              >
                Test
              </Button>
            {/* ))} */}
            </div>
           
        <form>
          <label>
            Feedback:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </Modal>
    </>
  );
};
