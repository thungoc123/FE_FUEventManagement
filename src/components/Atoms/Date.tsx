import { CalendarIcon } from '@heroicons/react/16/solid';
import React from 'react';


type Props = {
    date?: string;
}

const DateDisplay:React.FC<Props> = (props) => {
//   const date = new Date('2024-02-09'); // Set the desired date here
  // const formattedDate = props.date.toLocaleDateString('en-GB', {
  //   weekday: 'short',
  //   day: '2-digit',
  //   month: 'short',
  //   year: 'numeric',
  // });

  return (
    <div className="flex items-center space-x-2">
      <CalendarIcon style={{color: '#00fff9'}} className="h-5 w-5 text-black" />
      <span className="text-black" style={{color: '#00fff9'}}>{props.date}</span>
    </div>
  );
};
DateDisplay.defaultProps = {
    date : '2024-02-09'
}
export default DateDisplay;