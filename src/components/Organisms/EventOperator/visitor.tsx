import {BiTrash, BiAddToQueue, BiMailSend, BiShow, BiCheck } from "react-icons/bi";
// import { TableTemplate } from "../Dashboard/TableTemplate";
import { Button} from "@relume_io/relume-ui";
import { EventTable } from "../../../Types/event.type";
// import { useDeleteEventMutation, useGetListEventQuery } from "../../../Features/EventManage/eventApi";
import { Link, useParams } from "react-router-dom";
// import { addNotification } from "../../../Features/Utils/notificationsSlice";
import { useDispatch } from "react-redux";
import { TableTemplate } from "../Dashboard/TableTemplate";
import { useDeleteEventMutation, useGetListEventQuery } from "../../../Features/EventManage/eventApi";
import { addNotification } from "../../../Features/Utils/notificationsSlice";
import { EventInprogress } from "../../../Types/eo.type";
import { useGetListVistiorsQuery } from "../../../Features/Visitor/visitorApi";
import { visitorTable } from "../../../Types/account";
import { useGetAttendanceQuery } from "../../../Features/CheckingStaff/checkingApi";
import { StaffTable } from "../../../Types/checkingstaff";

export const Visitor = () => {
  const tableHeaders = ["No", "Name","Attendance","ViewFeedback"];
  const {id} = useParams();
const { data: Visitors, isLoading, isError,error } = useGetListVistiorsQuery(id);
const { data: attendance, isLoading: attendanceIsLoading, isError: attendanceIsError, error: attendanceError } = useGetAttendanceQuery(id);
attendanceIsLoading
console.log(Visitors)
const attendancePaid = attendance?.filter((item) => item.ticket.status === "PAID");
console.log(attendancePaid)
const tableRows: visitorTable[] = attendancePaid?.map((item, index) => ({
    No: index + 1, // Số thứ tự bắt đầu từ 1
    Name: item.ticket.visitor.information, // Tên sự kiện
    Attendance: item.status, // Biểu tượng đánh dấu đã điểm danh
    ViewFeedback: <BiMailSend />,
    // (
    //   <Link to={`/event/dashboard/analytics/${item.id}`}>
    //     <Button size="icon" variant="link">
    //       <BiShow />
    //     </Button>
    //   </Link>
    // ), // Nút chi tiết
   
    // Delete:         <BiTrash />

    // (
    //   <Button size="icon" variant="link" onClick={(e)=> handleDelete(e,item.id)}>
    //     <BiTrash />
    //   </Button>
    // ), // Nút xóa
   
}));
  // const 
  // const tableRows: visitorTable[] = 
  // Visitors?.map((item, index) => ({
  //   No: index + 1, // Số thứ tự bắt đầu từ 1
  //   Name: item.account.email, // Tên sự kiện
  //   Attendance: <BiCheck />, // Biểu tượng đánh dấu đã điểm danh
  //   SendFeedback: <BiMailSend />,
  //   // (
  //   //   <Link to={`/event/dashboard/analytics/${item.id}`}>
  //   //     <Button size="icon" variant="link">
  //   //       <BiShow />
  //   //     </Button>
  //   //   </Link>
  //   // ), // Nút chi tiết
   
  //   // Delete:         <BiTrash />

  //   // (
  //   //   <Button size="icon" variant="link" onClick={(e)=> handleDelete(e,item.id)}>
  //   //     <BiTrash />
  //   //   </Button>
  //   // ), // Nút xóa
   
  // }));
   

  const tableHeaderClasses = [
    "w-[200px] pr-4 xxl:w-[25px]",
    "w-[200px] pr-4 xxl:w-[150px]",
    "w-[200px] pr-4 xxl:w-[20px]",
    "w-[200px] pr-4 xxl:w-[20px]",
  ];
  return (
    <>
      {attendanceIsLoading ? (
        "Vui lòng đợi trong giây lát"
      ) : isError ? "Event này không có visitor nào được ghi nhận " : (
        <TableTemplate
          headerTitle="In progress events"
          headerDescription="Danh sách những sự kiện đang diễn ra"
          tableHeaders={tableHeaders}
          tableRows={tableRows} // Truyền dữ liệu mới cho tableRows
          // paginationItems={paginationItems}
          tableHeadersClasses={tableHeaderClasses}
        />
      )}
    </>
  );
};
