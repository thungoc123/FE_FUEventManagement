import { BiEdit } from "react-icons/bi";
// import { ApplicationShell4 } from "./AppModel";
// import { TableTemplate } from "./Table1";
// import AddFeedbackButton from "./AddFeedbackButton";
import { SponsorTable } from "../../../Types/sponsor";
import { ApplicationShell4 } from "../Dashboard/ApplicationShell";
import { TableTemplate } from "../Dashboard/TableTemplate";
import AddFeedbackButton from "../Dashboard/AddFeedbackButton";
import AddSponsor from "../Dashboard/AddSponsor";

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
  const tableHeaderClasses = [
    "w-[200px] pr-4 xxl:w-[225px]",
    "w-[200px] pr-4 xxl:w-[250px]",
    "w-[128px] pr-4 xxl:w-[250px]",
    "w-[200px] pr-4 xxl:w-[250px]",
    "w-[192px] pr-4 xxl:w-[150px]",
    "w-[96px] pr-4 text-center",
  ];
  const paginationItems = [1, 2, 3, 4, 5];
  return (
    <>
    
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
            // paginationItems={paginationItems}
            tableHeadersClasses={tableHeaderClasses}
          />
          <AddSponsor />
       
    </>
  );
};
