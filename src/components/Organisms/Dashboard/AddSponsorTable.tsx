import { BiEdit } from "react-icons/bi";
import { ApplicationShell4 } from "./AppModel";
import { TableTemplate } from "./Table1";
import AddFeedbackButton from "./AddFeedbackButton";
import { SponsorTable } from "../../../Type/sponsor";

export const AddSponsorTable = () => {
  const tableHeaders = ["Name","Sponsor_Program", "Email", "Date", "Edit"];
  const tableRows: SponsorTable[] = [
    {
      Name: "Nguyen Van A",
      Sponsor_Program:"SU KIEN",
      Email: "123@gmail.com",
      Date: "01/01/2023",
      Edit: <BiEdit />
      ,
    },
    {
        Name: "Nguyen Van A",
        Sponsor_Program:"SU KIEN",
        Email: "123@gmail.com",
        Date: "01/01/2023",
        Edit: <BiEdit />
    },
    {
        Name: "Nguyen Van A",
        Sponsor_Program:"SU KIEN",
        Email: "123@gmail.com",
        Date: "01/01/2023",
        Edit: <BiEdit />
    },
  ];
  const paginationItems = [1, 2, 3, 4, 5];
  return (
    <>
      <ApplicationShell4
        MainComponent={
          <TableTemplate
            headerTitle="Sponsor"
            headerDescription="List of Sponsor"
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
