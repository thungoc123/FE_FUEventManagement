import { BiEdit, BiShow, BiTrash } from "react-icons/bi";
// import { ApplicationShell4 } from "./AppModel";
// import { TableTemplate } from "./Table1";
// import AddFeedbackButton from "./AddFeedbackButton";
import { SponsorTable } from "../../../Types/sponsor";
import { ApplicationShell4 } from "../Dashboard/ApplicationShell";
import { TableTemplate } from "../Dashboard/TableTemplate";
import AddFeedbackButton from "../Dashboard/AddFeedbackButton";
import { FeedbackTable } from "../../../Types/feedback";
import { Button, Input } from "@relume_io/relume-ui";
import { EventTable } from "../../../Types/event.type";
import {
  useDeleteEventMutation,
  useGetListEventQuery,
  usePublishEventMutation,
} from "../../../Features/EventManage/eventApi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Store/Store";
import { addNotification } from "../../../Features/Utils/notificationsSlice";
import { useEffect, useState } from "react";
import { EOevent } from "../../../Types/eo.type";

export const UnpublishEvent = () => {
  const tableHeaders = ["No", "Name", "Date", "Detail","Edit", "Delete", "Publish"];
  const { data: Events, refetch, isLoading, error } = useGetListEventQuery();
  const dispatch = useDispatch();
  const [deleteEvent] = useDeleteEventMutation();
  const [publishEvent] = usePublishEventMutation();
  const [unpublishEvent, setUnpublishEvent] = useState<EOevent[]>([]);

  useEffect(() => {
    const unpublishEvents = Events?.filter((event) => event.stateEvent.name === "UNPUBLISH") || [];
    setUnpublishEvent(unpublishEvents);
  }, [Events]); // Phụ thuộc vào Events, cập nhật unpublishEvent mỗi khi Events thay đổi
  const unpublishEvents =
    Events?.filter((event) => event.stateEvent.name === "UNPUBLISH") || [];

  console.log(unpublishEvent);
  console.log(unpublishEvents);
  const handleDelete = async (
    e: MouseEvent<HTMLButtonElement>,
    eventId: number
  ) => {
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
      refetch()
      // window.location.reload()
    } catch (error) {
      console.error("Failed to delete the event:", error);
      alert("Failed to delete the event");
    }
  };

  const handlePublishEvent = async (
    e:MouseEvent<HTMLButtonElement>, 
    eventId:number
  ) => {
    e.preventDefault();
    // console.log(eventId)
    try {
      await publishEvent(eventId).unwrap();
      dispatch(
        addNotification({
          id: new Date().getTime(), // Sử dụng timestamp làm ID
          message: "Publish event successfully!",
          type: "success",
          timestamp: Date.now(), // Thời gian hiện tại
        })
      );
      window.location.reload()
      // refetch()
      // navigate("/eventoperator/dashboard/feedback");
      // alert('Event created successfully!');
    } catch (err) {
      dispatch(
        addNotification({
          id: new Date().getTime(), // Sử dụng timestamp làm ID
          message: "Publish event unsuccessfully!",
          type: "error",
          timestamp: Date.now(), // Thời gian hiện tại
        })
      );
      console.error("Failed to create the event:", err);
    }
  }
  
  const tableRows: EventTable[] = unpublishEvents?.map((event, index) => ({
    No: index + 1, // Số thứ tự bắt đầu từ 1
    Name: event.name, // Tên sự kiện
    Date: new Date(event.timestart).toLocaleDateString(), // Ngày diễn ra sự kiện, chuyển đổi sang định dạng chuỗi
    Detail: (
      <Link to={`/eventoperator/dashboard/event/${event.id}`}>
        <Button size="icon" variant="link">
          <BiEdit />
        </Button>
      </Link>
    ), // Nút chi tiết
    Edit: (
      <Link to={`/eventoperator/dashboard/event/update/${event.id}`}>
      <Button size="icon" variant="link">
        <BiEdit />
      </Button>
    </Link>
    ),
    Delete: (
      <Button size="icon" variant="link" onClick={(e)=> handleDelete(e,event.id)}>
        <BiTrash />
      </Button>
    ), // Nút xóa
    Publish: (
      <Button size="icon" variant="link" onClick={(e)=>handlePublishEvent(e,event.id)}>
        <BiShow />
      </Button>
    ), // Nút xuất bản
  }));

  console.log(tableRows);
  const tableHeaderClasses = [
    "w-[200px] pr-4 xxl:w-[25px]",
    "w-[200px] pr-4 xxl:w-[150px]",
    "w-[128px] pr-4 xxl:w-[150px]",
    "w-[200px] pr-4 xxl:w-[50px]",
    "w-[200px] pr-4 xxl:w-[50px]",
    "w-[200px] pr-4 xxl:w-[50px]",
    "w-[200px] pr-4 xxl:w-[50px]",
  ];
  const paginationItems = [1, 2, 3, 4, 5];
  return (
    <>
      {isLoading ? (
        "Vui lòng đợi vài giây"
      ) : (
        <TableTemplate
          headerTitle={"Unpublish Event"}
          headerDescription="List of unpublish event"
          // buttons={[
          //   {
          //     children: <AddFeedbackButton />,

          //     size: "sm",
          //   },
          // ]}
          searchValue="Name"
          tableHeaders={tableHeaders}
          tableRows={tableRows} // Truyền dữ liệu mới cho tableRows
          tableHeadersClasses={tableHeaderClasses}
        />
      )}
    </>
  );
};
