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
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>{date}</AccordionTrigger>
          <AccordionContent>
            {events.map((event, index) => (
              <EventItem key={index} {...event} />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {/* <div className="my-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-2 text-left">{date}</h2>
        </div>
        <ChevronDoubleDownIcon className="h-5 w-5 text-black" />
      </div>

      <div>
        {events.map((event, index) => (
          <EventItem key={index} {...event} />
        ))}
      </div> */}
    </div>
  );
};

export default DaySchedule;
