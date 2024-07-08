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
    
    </div>
  );
};

export default DaySchedule;
