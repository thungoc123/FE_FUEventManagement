import React from 'react';
import Tag from '../../Atoms/Tag';
import { formatDate, formatNumber } from '../../../ulities/Stringhandle';

interface EventDetailsProps {
  eventId:String;
  eventName: string;
  summary: string;
  tags: string[];
  client: string;
  date: string;
  duration: string;
  location: string;
  quantity:number;
  price:number;
  timeOpenSale: string;
  timeCloseSale: string;
}

const EventDetails: React.FC<EventDetailsProps> = ({ 
  eventId,
  eventName, 
  summary, 
  tags, 
  client, 
  date, 
  duration, 
  location,
  quantity,
  price,
  timeOpenSale,
  timeCloseSale
}) => {
  return (
    <div className='p-10 event_infor'>
      <div className="p-6 flex flex-row event_detail">
      {/* <div className="mb-4 w-2/3">
        <h1 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">{eventName}</h1>
        <p className="text-gray-700">{summary}</p>
        <div className="flex flex-wrap mt-2 justify-between">
          {tags.map((tag, index) => (
            <Tag key={index} text={tag} />
          ))}
        </div>
      </div> */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="mb-2">
            <h2 className="text-gray-700 font-semibold">Client</h2>
            <p>{client}</p>
          </div>
          <div className="mb-2">
            <h2 className="text-gray-700 font-semibold">Duration</h2>
            <p>{duration}</p>
          </div>
          <div className="mb-2">
            <h2 className="text-gray-700 font-semibold">Time Open Sale</h2>
            <p>{formatDate(timeOpenSale)}</p>
          </div>
          <div className="mb-2">
            <h2 className="text-gray-700 font-semibold">Time Close Sale</h2>
            <p>{formatDate(timeCloseSale)}</p>
          </div>
        </div>
        <div>
          <div className="mb-2">
            <h2 className="text-gray-700 font-semibold">Date</h2>
            <p>{date}</p>
          </div>
          <div className="mb-2">
            <h2 className="text-gray-700 font-semibold">Location</h2>
            <p className="whitespace-pre-line">{location}</p>
          </div>
          {/* <div className="mb-2">
            <h2 className="text-gray-700 font-semibold">quantity</h2>
            <p>{quantity}</p>
          </div> */}
          <div className="mb-2">
            <h2 className="text-gray-700 font-semibold">Price</h2>
            <p className="whitespace-pre-line">{formatNumber(price)} VND / Person</p>
          </div>
        </div>
      </div>
      </div>
    </div>
    
  );
}

export default EventDetails;
