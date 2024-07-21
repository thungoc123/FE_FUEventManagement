import { useEffect, useState } from "react";
import { useGetListEventQuery } from "../../../Features/EventManage/eventApi";
import { useNavigate } from "react-router-dom";
import { BiEdit, BiShow, BiTrash } from "react-icons/bi";
import axios from "axios";
import { TableTemplate } from "../Dashboard/TableTemplate";
import { EventTable } from "../../../Types/eventSchedule";

export const EventProfit = () => {
  const tableHeaders = [
    "No",
    "Name",
    "Date",
    "Attendance",          
    "Detail",
    "Delete",
  ];

  const { data: Events, isLoading, error } = useGetListEventQuery();
  const [ticketIdList, setTicketIdList] = useState<string[]>([]);
  const [paidTicketCounts, setPaidTicketCounts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {          
    if (Events) {
      const publishEventList = Events?.filter(    
        (event) => event.stateEvent.name === "PUBLISH"
      ).map((event) => event.id);

      setTicketIdList(publishEventList);
    }
  }, [Events]);

  useEffect(() => {
    const fetchTicketCounts = async () => {
      const counts = await Promise.all(
        ticketIdList.map(async (id) => {
          const response = await axios.get(
            `http://localhost:7979/api-ticket/count/paid/${id}`
          );
          
          return { id, count: response.data.Amount }; // Adjust according to your API response
        })
      );
  
      const countsMap = counts.reduce((acc, { id, count }) => {
        acc[id] = count;
        return acc;
      }, {});

      setPaidTicketCounts(countsMap);
    };

    if (ticketIdList.length > 0) {
      fetchTicketCounts();
    }

  }, [ticketIdList]);

  const handleDetailClick = (id: string) => {
    navigate(`/eventoperator/dashboard/analytics/${id}`); // Include the event ID in the URL
  };

  const publishEvents =
    Events?.filter((event) => event.stateEvent.name === "PUBLISH") || [];

  const tableRows: EventTable[] = publishEvents.map((item, index) => ({
    No: index + 1,
    Name: item.name,
    Date: new Date(item.timestart).toLocaleDateString(),
    Attendance: <BiEdit />,
    Detail: <BiShow onClick={() => handleDetailClick(item.id)} className="cursor-pointer" />,
    Delete: <BiTrash />,
  }));

  const tableHeaderClasses = [
    "w-[200px] pr-4 xxl:w-[30px]",
    "w-[200px] pr-4 xxl:w-[400px]",
    "w-[128px] pr-4 xxl:w-[250px]",
    "w-[200px] pr-4 xxl:w-[150px]",
    "w-[200px] pr-4 xxl:w-[150px]",
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
          headerTitle="Publish Event"
          headerDescription="List of publish event"
          tableHeaders={tableHeaders}
          tableRows={tableRows}
          tableHeadersClasses={tableHeaderClasses}
        />
        )
      )}
    
    </>
  );
};
