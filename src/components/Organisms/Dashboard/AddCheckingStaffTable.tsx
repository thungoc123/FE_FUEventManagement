import { StaffTable } from "../../../Types/checkingstaff";
import { BiTrash } from "react-icons/bi";
import { ApplicationShell4 } from "./AppModel";
import AddCheckingStaff from "./AddCheckingStaff";
import { TableTemplate } from "./Table1";
import AddFeedbackButton from "./AddFeedbackButton";
import { Button } from "@relume_io/relume-ui";

export const AddCheckStaffTable = () => {
  const tableHeaders = ["Name", "Email", "Date", "Delete"];
  const tableRows: StaffTable[] = [
    {
      Name: "Nguyen Van A",
      Email: "123@gmail.com",
      Date: "01/01/2023",
      Delete: <BiTrash />,
    },
    {
      Name: "Nguyen Van A",
      Email: "123@gmail.com",
      Date: "01/01/2023",
      Delete: <BiTrash />,
    },
    {
      Name: "Nguyen Van A",
      Email: "123@gmail.com",
      Date: "01/01/2023",
      Delete: <BiTrash />,
    },
  ];
  const paginationItems = [1, 2, 3, 4];
  return (
    <>
     
          <TableTemplate
          
            headerTitle="Checking Staff"
            headerDescription="List of Checking Staff"
            
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
          <Button>New</Button>
      
    </>
  );
};
