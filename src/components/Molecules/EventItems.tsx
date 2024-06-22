import React, { useState } from 'react';
import Tag from '../Atoms/Tag';
import { Button } from '@relume_io/relume-ui';
import { Content1 } from '../Organisms/Guest/EventScheduleDetail';
interface EventItemProps {
  time: string;
  title: string;
  tags: string[];
  speaker: string;
  location: string;
}

const EventItem: React.FC<EventItemProps> = ({ time, title, tags, speaker, location }) => {
  const [eventSheduleDetailOpen, seteventSheduleDetailOpen] = useState(false);
  const handleEventOpen = () => {
    seteventSheduleDetailOpen(true);
  };
  const handleCloseEvent = () => {
    seteventSheduleDetailOpen(false);
  };
  return (
    <div className="flex items-center border-b border-gray-300 py-4 w-full">
      <div className="w-1/6 md:w-1/6 text-gray-700 mb-2 md:mb-0">{time}</div>
      <div className="md:w-1/3 mb-2 md:mb-0">
        {/* w-1/3  */}
        <h2 className="font-bold">{title}</h2>
        {/* <div className="flex"> */}
          {tags.map((tag, index) => (
            <Tag key={index} text={tag} />
          ))}
        {/* </div> */}
      </div>
      <div className="md:w-1/4 mb-2 md:mb-0">{speaker}</div>
      <div className="md:w-1/6 mb-2 md:mb-0">{location}</div>
      <div className="md:w-1/6">
          <Button variant = "secondary" size="sm" onClick={handleEventOpen}>View Detail</Button>
      </div>   



      {eventSheduleDetailOpen && (
        <Content1 onClose={handleCloseEvent} />
      )}
    </div>
  );
};

export default EventItem;
