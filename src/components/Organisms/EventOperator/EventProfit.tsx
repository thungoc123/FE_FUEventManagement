import { useEffect, useState } from "react";
import { useGetListEventQuery } from "../../../Features/EventManage/eventApi";
import { Link } from "react-router-dom";
import { BiEdit, BiShow, BiTrash, BiAddToQueue } from "react-icons/bi";
import { Button } from "@relume_io/relume-ui";
import { TableTemplate } from "../Dashboard/TableTemplate";
import { EventTable } from "../../../Types/eventSchedule";
import axios from "axios";

export const EventProfit = () => {
  const tableHeaders = [
    "No",
    "Name",
    "Date",
    "Price",          
    "Ticket Amount",
    "Event Profit",
  ];

  const { data: Events, isLoading, error } = useGetListEventQuery();
  const [ticketIdList, setTicketIdList] = useState<string[]>([]);
  const [paidTicketCounts, setPaidTicketCounts] = useState({});

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

  const publishEvents =
    Events?.filter((event) => event.stateEvent.name === "PUBLISH") || [];

  const tableRows: EventTable[] = publishEvents.map((item, index) => ({
    No: index + 1,
    Name: item.name,
    Date: new Date(item.timestart).toLocaleDateString(),
    Price: item.price,
    "Ticket Amount": paidTicketCounts[item.id] || 0,
    "Event Profit": (paidTicketCounts[item.id] || 0) * item.price,
  }));

  const tableHeaderClasses = [
    "w-[200px] pr-4 xxl:w-[30px]",
    "w-[200px] pr-4 xxl:w-[350px]",
    "w-[128px] pr-4 xxl:w-[250px]",
    "w-[200px] pr-4 xxl:w-[150px]",
    "w-[200px] pr-4 xxl:w-[250px]",
  ];

  return (
    <>
      {isLoading ? (
        "Vui lòng đợi trong giây lát"
      ) : (
        <TableTemplate
          headerTitle="Publish Event"
          headerDescription="List of unpublish event"
          tableHeaders={tableHeaders}
          tableRows={tableRows}
          tableHeadersClasses={tableHeaderClasses}
        />
      )}
    </>
  );
};
