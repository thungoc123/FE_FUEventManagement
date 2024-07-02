import { BiEdit, BiShow, BiTrash } from "react-icons/bi";
// import { ApplicationShell4 } from "./AppModel";
// import { TableTemplate } from "./Table1";
// import AddFeedbackButton from "./AddFeedbackButton";
import { EventTable } from "../../../Types/eventSchedule";
import { TableTemplate } from "../Dashboard/TableTemplate";
import AddFeedbackButton from "../Dashboard/AddFeedbackButton";
import { Button } from "@relume_io/relume-ui";
import AddEventSchedule from "../../Molecules/Stepper";
import { EventSchedule } from "../../../Types/eo.type";
import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../Store/Store";
type Props = {
  eventSchedule: EventSchedule[];
};
export const EventScheduleTable:React.FC<Props> = (prop) => {
  const { id } = useParams();
  const Events = useSelector((state: RootState) => state.events.events);

  const eventSchedule = Events?.find(event => event.id === parseInt(id))?.eventSchedules || []
  
  
  console.log(eventSchedule)
  const tableHeaders = ["No","Schedule", "Duration", "Actor", "Time","Date","Hinh_Thuc","Detail","Edit","Delete"];
  const tableHeaderClasses = [
    "w-[200px] pr-4 xxl:w-[25px]",
    "w-[200px] pr-4 xxl:w-[100px]",
    "w-[128px] pr-4 xxl:w-[30px]",
    "w-[200px] pr-4 xxl:w-[100px]",
    "w-[192px] pr-4 xxl:w-[50px]",
    "w-[192px] pr-4 xxl:w-[70px]",
    "w-[192px] pr-4 xxl:w-[50px]",
    "w-[192px] pr-4 xxl:w-[50px]",
    "w-[192px] pr-4 xxl:w-[50px]",
    "w-[96px] pr-4 text-center",
  ];
  // const addnew = 
  const tableRows: EventTable[] =eventSchedule.map((item, index) => ({
    No: index + 1,
    Schedule: item.name,
    Duration: item.duration,
    Actor: item.actor,
    Time:item.timestart,
    Date:item.date, 
    Hinh_Thuc:item.eventType,
    Detail:<Button size="icon" variant="link"> <BiShow /></Button>,
    Edit:<Button size="icon" variant="link"> <BiEdit /></Button>,
    Delete:<Button size="icon" variant="link"> <BiTrash /></Button>
    ,
  }));
  // const paginationItems = [1, 2, 3, 4, 5,6,7,8,9];
  return (
    <>
     
          <TableTemplate
            headerTitle="Event"
            headerDescription="List of Event"
            buttons={[
              {
                children: <AddFeedbackButton/>,
                
                size: "sm",
              },
             
            ]}
            tableHeaders={tableHeaders}
            tableRows={tableRows} // Truyền dữ liệu mới cho tableRows
            // paginationItems={paginationItems}
            tableHeadersClasses={tableHeaderClasses}
            addNew={<AddEventSchedule />}
          />
       
    </>
  );
};
