import { BiShow, BiTrash, BiEdit } from "react-icons/bi";
import {Question} from "../../../Types/feedback"
import { ApplicationShell4 } from "./ApplicationShell";
import { TableTemplate } from "./TableTemplate";
import AddFeedbackButton from "./AddFeedbackButton";

export const QuestionManage = () => {
  const tableHeaders = ["No", "Question", "Edit" ,"Delete"];
  const tableRows: Question[] = [
    {
        No: 1,
        Question: "Who do you wanna be ?", 
        Edit: <BiEdit/>,
        Delete: <BiTrash/>
    },
    {
        No: 1,
        Question: "Who do you wanna be ?", 
        Edit: <BiEdit/>,
        Delete: <BiTrash/>
    },
    {
        No: 1,
        Question: "Who do you wanna be ?", 
        Edit: <BiEdit/>,
        Delete: <BiTrash/>
    },
  ];
  const tableHeaderClasses = [
    "w-[200px] pr-4 xxl:w-[25px]",
    "w-[200px] pr-4 xxl:w-[250px]",
    "w-[128px] pr-4 xxl:w-[50px]",
    "w-[128px] pr-4 xxl:w-[50px]",
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
    </>
  );
};
