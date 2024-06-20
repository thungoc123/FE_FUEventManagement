import { BiEdit } from "react-icons/bi";
import { ApplicationShell4 } from "./AppModel";
import { TableTemplate } from "./Table1";
import AddFeedbackButton from "./AddFeedbackButton";
import { EventTable } from "../../../Types/eventSchedule";

export const EventScheduleTable = () => {
  const tableHeaders = ["No","Schedule", "Duration", "Actor", "Time","Date","Hinh_Thuc","Detail","Edit"];
  const tableRows: EventTable[] = [
    {
        No: "1",
        Schedule: "Company",
        Duration: "2h",
        Actor: "Tien",
        Time: "4pc",
        Date:"01/01/2003", 
        Hinh_Thuc:"Online",
        Detail:"Cool",
        Edit:<BiEdit/>
      ,
    },
    {
        No: "1",
        Schedule: "Company",
        Duration: "2h",
        Actor: "Tien",
        Time: "4pc",
        Date:"01/01/2003", 
        Hinh_Thuc:"Online",
        Detail:"Cool",
        Edit:<BiEdit/>
    },
    {
        No: "1",
        Schedule: "Company",
        Duration: "2h",
        Actor: "Tien",
        Time: "4pc",
        Date:"01/01/2003", 
        Hinh_Thuc:"Online",
        Detail:"Cool",
        Edit:<BiEdit/>
    },
  ];
  const paginationItems = [1, 2, 3, 4, 5,6,7,8,9];
  return (
    <>
      <ApplicationShell4
        MainComponent={
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
            paginationItems={paginationItems}
          />
        }
        // MainComponent = { <Table1 />}
        // StateComponent={<AddCheckingStaff />}
      />
    </>
  );
};
