import React from "react";
import DaySchedule from "../../Molecules/Dayschedule";
interface Event {
  time: string;
  title: string;
  tags: string[];
  speaker: string;
  location: string;
}

interface ScheduleProps {
  days: {
    date: string;
    events: Event[];
  }[];
}

const Schedule: React.FC<ScheduleProps> = ({ days }) => {
  let dateCount = 1;
  return (
    <div className="p-6 shedule">
     
     <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Event Schedule</h1>
        <p className="text-gray-700">
        </p>
      </div>
      <div className="date_infor">Day {dateCount}</div>

    
     
      {days.map((day, index) => {
        dateCount++;
        return (
          <DaySchedule key={index} date={day.date} events={day.events} />
        );
      })}
    </div>
  );
};

export default Schedule;
