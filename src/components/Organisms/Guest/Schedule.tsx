import React from 'react';
import DaySchedule from '../../Molecules/Dayschedule';
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
  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Event Schedule</h1>
        <p className="text-gray-700">Stay on track with the detailed schedule of the event.</p>
      </div>
      {days.map((day, index) => (
        <DaySchedule key={index} date={day.date} events={day.events} />
      ))}
    </div>
  );
};
// Schedule.defaultProps = {
//     days = {
        
//     }
   
// }
    
export default Schedule;
