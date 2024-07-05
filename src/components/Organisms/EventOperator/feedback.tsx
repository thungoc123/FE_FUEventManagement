import { BiEdit, BiShow, BiTrash } from "react-icons/bi";
// import { ApplicationShell4 } from "./AppModel";
// import { TableTemplate } from "./Table1";
// import AddFeedbackButton from "./AddFeedbackButton";
import { SponsorTable } from "../../../Types/sponsor";
import { ApplicationShell4 } from "../Dashboard/ApplicationShell";
import { TableTemplate } from "../Dashboard/TableTemplate";
import AddFeedbackButton from "../Dashboard/AddFeedbackButton";
import { FeedbackTable } from "../../../Types/feedback";
import { Button, Input } from "@relume_io/relume-ui";

export const Feedback = () => {
  const tableHeaders = ["Name", "Date", "Detail","State", "Delete"];
  const tableRows: FeedbackTable[] = [
    {
      Name: "Nguyen Van A",
      Date: "01/01/2023",
      Detail: (
        <Button asChild variant="link" size="icon">
          <a href="/dashboard/FeedbackDetail" target="_blank" rel="noopener">
          <BiShow />
          </a>
        </Button>
      ),
      State: "Unpublish",
      Delete: <BiTrash />,
    },
    {
      Name: "Nguyen Van A",
      Date: "01/01/2023",
      Detail: <BiShow />,
      State: "Unpublish",
      Delete: <BiTrash />,
    },
    {
      Name: "Nguyen Van A",
      Date: "01/01/2023",
      Detail: <BiShow />,
      State: "Unpublish",
      Delete: <BiTrash />,
    },
  ];
  const tableHeaderClasses = [
    "w-[200px] pr-4 xxl:w-[225px]",
    "w-[200px] pr-4 xxl:w-[150px]",
    "w-[128px] pr-4 xxl:w-[250px]",
    "w-[200px] pr-4 xxl:w-[250px]",
  ];
  const paginationItems = [1, 2, 3, 4, 5];
  return (
    <>
    
          <TableTemplate
            headerTitle="Sponsor"
            headerDescription="List of Sponsor"
            buttons={[
              {
                children: <AddFeedbackButton />,

                size: "sm",
              },
            ]}
            tableHeaders={tableHeaders}
            tableRows={tableRows} // Truyền dữ liệu mới cho tableRows
            // paginationItems={paginationItems}
            tableHeadersClasses={tableHeaderClasses}
            
        />
    </>
  );
};
