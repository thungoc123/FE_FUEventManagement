import {  BiMailSend, BiCheck } from "react-icons/bi";
// import { TableTemplate } from "../Dashboard/TableTemplate";
import { Button } from "@relume_io/relume-ui";
import { EventTable } from "../../../Types/event.type";
// import { useDeleteEventMutation, useGetListEventQuery } from "../../../Features/EventManage/eventApi";
import { Link, useParams } from "react-router-dom";
// import { addNotification } from "../../../Features/Utils/notificationsSlice";
import { useDispatch } from "react-redux";
import { useDeleteEventMutation, useGetListEventQuery } from "../../../Features/EventManage/eventApi";
import { addNotification } from "../../../Features/Utils/notificationsSlice";
import { EventInprogress } from "../../../Types/eo.type";
import { ApplicationShell4 } from "../Organisms/Dashboard/ApplicationShell";
import { useGetListVistiorsQuery } from "../../Features/Visitor/visitorApi";
import { visitorTable } from "../../Types/account";
import { TableTemplate } from "../Organisms/Dashboard/TableTemplate";
import { accountID } from "../../ulities/ProtectedRoute";
import { useGetAttendanceQuery, useGetEventDetailQuery } from "../../Features/CheckingStaff/checkingApi";
import { StaffTable } from "../../Types/checkingstaff";

export const CheckingStaffDashboard = () => {
 const tableHeaders = ["No", "Name","Status","Event" ,"Attendance", "SendFeedback"];
 // const {id} = useParams();
 // const accountId = accountID(sessionStorage.getItem("token"));
const { data: event, isLoading: eventIsLoading, isError: eventIsError, error: eventError } = useGetEventDetailQuery();

console.log(event?.id)
const { data: attendance, isLoading: attendanceIsLoading, isError: attendanceIsError, error: attendanceError } = useGetAttendanceQuery(event?.id);
// console.log(attendance)
const attendancePaid = attendance?.filter((item) => item.ticket.status === "PAID");
 // const 
 console.log(attendancePaid)
 const tableRows: StaffTable[] = attendancePaid?.map((item, index) => ({
  No: index + 1, // Số thứ tự bắt đầu từ 1
  Name: item.ticket.visitor.information, // Tên sự kiện
  Status: item.status,
  Event: item.eventName,
  Attendance: <BiCheck />, // Biểu tượng đánh dấu đã điểm danh
  SendFeedback: <BiMailSend />,
}));
  

 const tableHeaderClasses = [
  "w-[200px] pr-4 xxl:w-[25px]",
  "w-[200px] pr-4 xxl:w-[70px]",
  "w-[200px] pr-4 xxl:w-[50px]",
  "w-[200px] pr-4 xxl:w-[50px]",
  "w-[200px] pr-4 xxl:w-[20px]",
  "w-[200px] pr-4 xxl:w-[20px]",
 ];
 return (
  <>
   {attendanceIsLoading ? (
    "Vui lòng đợi trong giây lát"
   ) : attendanceError ? "Event này không có visitor nào được ghi nhận " : (
    <ApplicationShell4
     MainComponent={

      <TableTemplate
       headerTitle="Event Attendances"
       headerDescription="Danh sách những người tham gia sự kiện"
       tableHeaders={tableHeaders}
       tableRows={tableRows} // Truyền dữ liệu mới cho tableRows
       // paginationItems={paginationItems}
       tableHeadersClasses={tableHeaderClasses}
      />

     }
    />)}

  </>
 );
};
