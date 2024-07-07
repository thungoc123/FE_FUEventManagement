import { BiTrash, BiAddToQueue, BiMailSend, BiShow, BiCheck } from "react-icons/bi";
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

export const CheckingStaffDashboard = () => {
 const tableHeaders = ["No", "Name", "Attendance", "SendFeedback"];
 // const {id} = useParams();
 // const accountId = accountID(sessionStorage.getItem("token"));
 const { data: Visitors, isLoading, isError, error } = useGetListVistiorsQuery(1);
 console.log(Visitors)
 // const 
 const tableRows =[
   {
     No: 1, // Số thứ tự bắt đầu từ 1
     Name: "item.account.email", // Tên sự kiện
     Attendance: <BiCheck />, // Biểu tượng đánh dấu đã điểm danh
     SendFeedback: <BiMailSend />,
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

   }
  ];
 

 const tableHeaderClasses = [
  "w-[200px] pr-4 xxl:w-[25px]",
  "w-[200px] pr-4 xxl:w-[150px]",
  "w-[200px] pr-4 xxl:w-[20px]",
  "w-[200px] pr-4 xxl:w-[20px]",
 ];
 return (
  <>
   {isLoading ? (
    "Vui lòng đợi trong giây lát"
   ) : isError ? "Event này không có visitor nào được ghi nhận " : (
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
