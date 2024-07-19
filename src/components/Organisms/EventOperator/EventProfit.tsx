import { useEffect, useState } from "react";
import { useGetListEventQuery } from "../../../Features/EventManage/eventApi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { TableTemplate } from "../Dashboard/TableTemplate";
import { EventTable } from "../../../Types/eventSchedule";

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
  const [paidTicketCounts, setPaidTicketCounts] = useState<{ [key: string]: number }>({});
  const [eventProfits, setEventProfits] = useState<number[]>([]);
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

  useEffect(() => {
    if (Events && Object.keys(paidTicketCounts).length > 0) {
      const profits = Events.filter(event => event.stateEvent.name === "PUBLISH")
        .map(event => (paidTicketCounts[event.id] || 0) * event.price);
      setEventProfits(profits);
    }
  }, [Events, paidTicketCounts]);

  const publishEvents =
    Events?.filter((event) => event.stateEvent.name === "PUBLISH") || [];

  const tableRows: EventTable[] = publishEvents.map((item, index) => {
    const profit = (paidTicketCounts[item.id] || 0) * item.price;
    return {
      No: index + 1,
      Name: item.name,
      Date: new Date(item.timestart).toLocaleDateString(),
      Price: item.price,
      "Ticket Amount": paidTicketCounts[item.id] || 0,
      "Event Profit": profit,
    };
  });

  const tableHeaderClasses = [
    "w-[200px] pr-4 xxl:w-[30px]",
    "w-[200px] pr-4 xxl:w-[400px]",
    "w-[128px] pr-4 xxl:w-[250px]",
    "w-[200px] pr-4 xxl:w-[150px]",
    "w-[200px] pr-4 xxl:w-[150px]",
  ];

  const handleNavigate = () => {
    navigate('/event-profit-detail', { state: { eventProfits } });
  };

  return (
    <>
      {isLoading ? (
        "Vui lòng đợi trong giây lát"
      ) : (
        <>
          <TableTemplate
            headerTitle="Publish Event"headerDescription="List of publish events"
            tableHeaders={tableHeaders}
            tableRows={tableRows}
            tableHeadersClasses={tableHeaderClasses}
          />
        </>
      )}
    </>
  );
};