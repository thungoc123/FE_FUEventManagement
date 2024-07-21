import {BiTrash, BiAddToQueue, BiShow, BiCheck } from "react-icons/bi";
// import { TableTemplate } from "../Dashboard/TableTemplate";
import { Button} from "@relume_io/relume-ui";
import { EventTable } from "../../../Types/event.type";
// import { useDeleteEventMutation, useGetListEventQuery } from "../../../Features/EventManage/eventApi";
import { Link } from "react-router-dom";
// import { addNotification } from "../../../Features/Utils/notificationsSlice";
import { useDispatch } from "react-redux";
import { TableTemplate } from "../Dashboard/TableTemplate";
import { useDeleteEventMutation, useGetListEventQuery } from "../../../Features/EventManage/eventApi";
import { addNotification } from "../../../Features/Utils/notificationsSlice";
import { EventInprogress } from "../../../Types/eo.type";

export const InprogressEvent = () => {
  const tableHeaders = ["No", "Name", "Date","Attendance", "Detail", "Delete"];

  const { data: Events, isLoading, error } = useGetListEventQuery();
  console.log(Events)
  const dispatch = useDispatch();

  const publishEvents =
    Events?.filter((event) => event.stateEvent.name === "PUBLISH") || [];
    console.log(publishEvents)
  const [deleteEvent] = useDeleteEventMutation()
    const handleDelete = async (e: MouseEvent<HTMLButtonElement>, eventId: number) => {
      e.preventDefault(); // Ngăn chặn hành vi mặc định của button nếu có
  
      try {
        await deleteEvent({ eventId: eventId }).unwrap();
        // alert('Staff deleted successfully');    
        dispatch(
          addNotification({
            id: new Date().getTime(), // Sử dụng timestamp làm ID
            message: "Event deleted successfully",
            type: "success",
            timestamp: Date.now(), // Thời gian hiện tại
          })
        );
      } catch (error) {
        console.error('Failed to delete the event:', error);
        alert('Failed to delete the event');
      }
    };
  // const 
  const tableRows: EventInprogress[] = publishEvents?.map((item, index) => ({
    No: index + 1, // Số thứ tự bắt đầu từ 1
    Name: item.name, // Tên sự kiện
    Date: new Date(item.timestart).toLocaleDateString(), // Ngày diễn ra sự kiện, chuyển đổi sang định dạng chuỗi
    Attendance: (
      <Link to={`/eventoperator/dashboard/visitor/${item.id}`} >
        <Button size="icon" variant="link">
        <BiCheck />        
        </Button>
      </Link>
    )
    
    , // Biểu tượng đánh dấu đã điểm danh
    Detail: (
      <Link to={`/eventoperator/dashboard/analytics/${item.id}`}>
        <Button size="icon" variant="link">
          <BiShow />
        </Button>
      </Link>
    ), // Nút chi tiết
   
    Delete: (
      <Button size="icon" variant="link" onClick={(e)=> handleDelete(e,item.id)}>
        <BiTrash />
      </Button>
    ), // Nút xóa
   
  }));

  const tableHeaderClasses = [
    "w-[200px] pr-4 xxl:w-[25px]",
    "w-[200px] pr-4 xxl:w-[150px]",
    "w-[128px] pr-4 xxl:w-[150px]",
    "w-[200px] pr-4 xxl:w-[50px]",
    "w-[200px] pr-4 xxl:w-[20px]",
    "w-[200px] pr-4 xxl:w-[20px]",
    "w-[200px] pr-4 xxl:w-[20px]",
  ];
  return (
    <>
      {isLoading ? (
        "Vui lòng đợi trong giây lát"
      ) : (
        publishEvents.length === 0 ? (
          "Không có sự kiện nào"
        ) : (
        <TableTemplate
          headerTitle="In progress events"
          headerDescription="Danh sách những sự kiện đang diễn ra"
          tableHeaders={tableHeaders}
          tableRows={tableRows} // Truyền dữ liệu mới cho tableRows
          // paginationItems={paginationItems}
          tableHeadersClasses={tableHeaderClasses}
        />
        )
      )}
    </>
  );
};
