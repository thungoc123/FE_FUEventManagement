import React from 'react';
import Tag from '../Atoms/Tag';
import { Button } from '@relume_io/relume-ui';
interface EventItemProps {
  time: string;
  title: string;
  tags: string[];
  speaker: string;
  location: string;
}

const EventItem: React.FC<EventItemProps> = ({ time, title, tags, speaker, location }) => {
  return (
    <div className="flex items-center border-b border-gray-300 py-4 w-full">
      <div className="w-1/6 text-gray-700">{time}</div>
      <div className="w-1/3">
        <h2 className="font-bold">{title}</h2>
        {/* <div className="flex"> */}
          {tags.map((tag, index) => (
            <Tag key={index} text={tag} />
          ))}
        {/* </div> */}
      </div>
      <div className="w-1/4">{speaker}</div>
      <div className="w-1/6">{location}</div>
      <div className="w-1/6">
          <Button variant = "secondary" size="sm">View Detail</Button>
      </div>
    </div>
  );
};

export default EventItem;
