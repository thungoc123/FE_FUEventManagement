import { BiEdit, BiShow, BiTrash, BiAddToQueue } from "react-icons/bi";
// import { ApplicationShell4 } from "./AppModel";
// import { TableTemplate } from "./Table1";
// import AddFeedbackButton from "./AddFeedbackButton";
import { SponsorTable } from "../../../Types/sponsor";
import { TableTemplate } from "../Dashboard/TableTemplate";
import AddFeedbackButton from "../Dashboard/AddFeedbackButton";
import { FeedbackTable } from "../../../Types/feedback";
import { Button, Input } from "@relume_io/relume-ui";
import { EventTable } from "../../../Types/event.type";
import { useGetListEventQuery } from "../../../Features/EventManage/eventApi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../Store/Store";
import { useState } from "react";
import UpdateEvent from "../../Pages/Dashboard/EventOperator/UpdateEvent";
// import { selectUnpublishEvents } from "../../../Features/EventManage/eventSelector";
// import { selectPublishEvents } from "../../../Features/EventManage/eventSelector";

export const PublishEvent = () => {
  const tableHeaders = ["No", "Name", "Date", "Detail","Edit", "Delete", "Publish"];

  const { data: Events, isLoading, error } = useGetListEventQuery();

  const publishEvents =
    Events?.filter((event) => event.stateEvent.name === "PUBLISH") || [];
  const tableRows: EventTable[] = publishEvents?.map((item, index) => ({
    No: index + 1, // Số thứ tự bắt đầu từ 1
    Name: item.name, // Tên sự kiện
    Date: new Date(item.timestart).toLocaleDateString(), // Ngày diễn ra sự kiện, chuyển đổi sang định dạng chuỗi
    Detail: (
      <Link to={`/eventoperator/dashboard/event/${item.id}`}>
        <Button size="icon" variant="link">
          <BiAddToQueue />
        </Button>
      </Link>
    ), // Nút chi tiết
    Edit: (
      <Link to={`/eventoperator/dashboard/event/update/${item.id}`}>
        <Button size="icon" variant="link">
          <BiEdit />
        </Button>
    </Link>

    ),
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
    "w-[200px] pr-4 xxl:w-[20px]",
    "w-[200px] pr-4 xxl:w-[20px]",
    "w-[200px] pr-4 xxl:w-[20px]",
  ];
  return (
    <>
      {isLoading ? (
        "Vui lòng đợi trong giây lát"
      ) : (
        <TableTemplate
          headerTitle="Publish Event"
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
      )}
    </>
  );
};
