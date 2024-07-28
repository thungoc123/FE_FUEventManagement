import { BiEdit, BiShow, BiTrash } from "react-icons/bi";
import { Button } from "@relume_io/relume-ui";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { EOevent } from "../../../Types/eo.type";
import { EventTable } from "../../../Types/event.type";
import { TableTemplate } from "../Dashboard/TableTemplate";
import {
  useDeleteEventMutation,
  useGetListEventQuery,
  usePublishEventMutation,
} from "../../../Features/EventManage/eventApi";
import { addNotification } from "../../../Features/Utils/notificationsSlice";
import { useGetUnPublishedEventsQuery } from "../../../Features/Event/eventDisplayApi";

export const UnpublishEvent = () => {
  const tableHeaders = ["No", "Name", "Date", "Detail", "Edit", "Delete", "Publish"];
  const { data: Events, refetch, isLoading } = useGetUnPublishedEventsQuery();
  const dispatch = useDispatch();
  const [deleteEvent] = useDeleteEventMutation();
  const [publishEvent] = usePublishEventMutation();
  const [unpublishEvent, setUnpublishEvent] = useState<EOevent[]>([]);

  useEffect(() => {
    if (Events) {
      console.log("Fetched Events: ", Events);
      const filteredUnpublishEvents = Events.filter((event) => {
        console.log("Event Structure: ", event);
        return event.stateEvent?.name === "UNPUBLISHED";
      });
      setUnpublishEvent(filteredUnpublishEvents);
      console.log("Unpublish Events after filtering: ", filteredUnpublishEvents);
    }
  }, [Events]);

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    eventId: number
  ) => {
    e.preventDefault();

    try {
      await deleteEvent({ eventId }).unwrap();
      dispatch(
        addNotification({
          id: new Date().getTime(),
          message: "Event deleted successfully",
          type: "success",
          timestamp: Date.now(),
        })
      );
      refetch();
    } catch (error) {
      console.error("Failed to delete the event:", error);
      alert("Failed to delete the event");
    }
  };

  const handlePublishEvent = async (
    e: React.MouseEvent<HTMLButtonElement>,
    eventId: number
  ) => {
    e.preventDefault();

    try {
      await publishEvent(eventId).unwrap();
      dispatch(
        addNotification({
          id: new Date().getTime(),
          message: "Publish event successfully!",
          type: "success",
          timestamp: Date.now(),
        })
      );
      refetch();
    } catch (err) {
      dispatch(
        addNotification({
          id: new Date().getTime(),
          message: "Publish event unsuccessfully!",
          type: "error",
          timestamp: Date.now(),
        })
      );
      console.error("Failed to publish the event:", err);
    }
  };

  const tableRows: EventTable[] = unpublishEvent.map((event, index) => ({
    No: index + 1,
    Name: event.name,
    Date: new Date(event.timestart).toLocaleDateString(),
    Detail: (
      <Link to={`/eventoperator/dashboard/event/${event.id}`}>
        <Button size="icon" variant="link">
          <BiEdit />
        </Button>
      </Link>
    ),
    Edit: (
      <Link to={`/eventoperator/dashboard/event/update/${event.id}`}>
        <Button size="icon" variant="link">
          <BiEdit />
        </Button>
      </Link>
    ),
    Delete: (
      <Button size="icon" variant="link" onClick={(e) => handleDelete(e, event.id)}>
        <BiTrash />
      </Button>
    ),
    Publish: (
      <Button size="icon" variant="link" onClick={(e) => handlePublishEvent(e, event.id)}>
        <BiShow />
      </Button>
    ),
  }));

  console.log("Table Rows: ", tableRows);
  console.log("Is unpublishEvent empty? ", unpublishEvent.length === 0);

  const tableHeaderClasses = [
    "w-[200px] pr-4 xxl:w-[25px]",
    "w-[200px] pr-4 xxl:w-[150px]",
    "w-[128px] pr-4 xxl:w-[150px]",
    "w-[200px] pr-4 xxl:w-[50px]",
    "w-[200px] pr-4 xxl:w-[50px]",
    "w-[200px] pr-4 xxl:w-[50px]",
    "w-[200px] pr-4 xxl:w-[50px]",
  ];

  return (
    <>
      {isLoading ? (
        "Vui lòng đợi vài giây"
      ) : unpublishEvent.length === 0 ? (
        "Không có sự kiện nào"
      ) : (
        <TableTemplate
          headerTitle={"Unpublish Event"}
          headerDescription="List of unpublish event"
          searchValue="Name"
          tableHeaders={tableHeaders}
          tableRows={tableRows}
          tableHeadersClasses={tableHeaderClasses}
        />
      )}
    </>
  );
};
