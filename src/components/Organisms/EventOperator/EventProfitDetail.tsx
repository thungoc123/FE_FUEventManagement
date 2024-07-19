// EventProfitDetail.tsx
import React from 'react';

interface EventProfitDetailProps {
  eventProfit: number;
}

const EventProfitDetail: React.FC<EventProfitDetailProps> = ({ eventProfit }) => {
  return (
    <div>
      <h3>Event Profit Detail</h3>
      <p>Event Profit: ${eventProfit}</p>
    </div>
  );
};

export default EventProfitDetail;
