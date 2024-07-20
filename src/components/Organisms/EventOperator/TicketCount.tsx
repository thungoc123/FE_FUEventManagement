import React, { useEffect } from 'react';
import { useGetPaidTicketCountByEventIdQuery } from '../../../Features/Order/ticketApi';

interface TicketCountProps {
  eventId: number;
}

const TicketCount: React.FC<TicketCountProps> = ({ eventId }) => {
  const { data, isLoading, error } = useGetPaidTicketCountByEventIdQuery(eventId);

  useEffect(() => {
    console.log(`Fetching ticket count for eventId: ${eventId}`);
  }, [eventId]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    console.error(`Error loading ticket count for eventId: ${eventId}`, error);
    return <span>Error loading ticket count</span>;
  }

  console.log(`Ticket count for eventId ${eventId}:`, data);

  return <span>{data?.Amount || 0}</span>;
};

export default TicketCount;
