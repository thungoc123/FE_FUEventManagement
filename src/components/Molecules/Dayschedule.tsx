import React from "react";
import EventItem from "./EventItems";
import { ChevronDoubleDownIcon } from "@heroicons/react/24/outline";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@relume_io/relume-ui";
interface Event {
  time: string;
  title: string;
  tags: string[];
  speaker: string;
  location: string;
}

interface DayScheduleProps {
  date: string;
  events: Event[];
}

const DaySchedule: React.FC<DayScheduleProps> = ({ date, events }) => {
  return (
    <div>
      {/* <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>{date}</AccordionTrigger>
          <AccordionContent> */}
    
      <div className="flex items-center border-b border-gray-300 py-4 w-full shedule_header">
        <div className="w-1/6 md:w-1/6 text-gray-700 mb-2 md:mb-0"><h2 className="font-bold">Time</h2></div>
        <div className="md:w-1/3 mb-2 md:mb-0">
          {/* w-1/3  */}
          <h2 className="font-bold">Program Objective</h2>

        </div>
        <div className="md:w-1/4 mb-2 md:mb-0"><h2 className="font-bold">Speaker</h2></div>
        <div className="md:w-1/6 mb-2 md:mb-0"><h2 className="font-bold">Location</h2></div>
        <div className="md:w-1/6">
        </div>
      </div>
      <div style={{color:'#ffff'}} className="mt-2 mb-2">{date}</div>
      {events.map((event, index) => (
        <EventItem key={index} {...event} />
      ))}
      {/* </AccordionContent>
        </AccordionItem>
      </Accordion> */}

    </div>
  );
};

export default DaySchedule;
