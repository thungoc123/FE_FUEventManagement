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
import { useGetListEventQuery } from "../../../Features/EventManage/eventApi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUnpublishEvents } from "../../../Features/EventManage/eventSelector";
import { RootState } from "../../../Store/Store";

export const UnpublishEvent = () => {
  const tableHeaders = ["No", "Name", "Date", "Detail", "Delete", "Publish"];
  // const Events = useSelector(selectUnpublishEvents);
  const Events = useSelector((state: RootState) => state.events.events);

  const unpublishEvents =
  Events?.filter((event) => event.stateEvent.name === "UNPUBLISH") || [];
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
    Delete: (
      <Button size="icon" variant="link">
        <BiTrash />
      </Button>
    ), // Nút xóa
    Publish: (
      <Button size="icon" variant="link">
        <BiShow />
      </Button>
    ), // Nút xuất bản
  }));

  const tableHeaderClasses = [
    "w-[200px] pr-4 xxl:w-[25px]",
    "w-[200px] pr-4 xxl:w-[150px]",
    "w-[128px] pr-4 xxl:w-[150px]",
    "w-[200px] pr-4 xxl:w-[50px]",
    "w-[200px] pr-4 xxl:w-[50px]",
    "w-[200px] pr-4 xxl:w-[50px]",
  ];
  const paginationItems = [1, 2, 3, 4, 5];
  return (
    <>
      {/* {isLoading && "Vui lòng đợi vài giây"} */}
      <TableTemplate
        headerTitle="Unpublish Event"
        headerDescription="List of unpublish event"
        // buttons={[
        //   {
        //     children: <AddFeedbackButton />,

        //     size: "sm",
        //   },
        // ]}
        tableHeaders={tableHeaders}
        tableRows={tableRows} // Truyền dữ liệu mới cho tableRows
        // paginationItems={paginationItems}
        tableHeadersClasses={tableHeaderClasses}
      />
    </>
  );
};
