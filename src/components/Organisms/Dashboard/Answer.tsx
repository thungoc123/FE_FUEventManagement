import { BiSearch, BiTrash, BiEdit } from "react-icons/bi";
import {Answer, Question} from "../../../Types/feedback"
import { ApplicationShell4 } from "./ApplicationShell";
import { TableTemplate } from "./TableTemplate";
import AddFeedbackButton from "./AddFeedbackButton";
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@relume_io/relume-ui";

export const AnswerManage = () => {
  const tableHeaders = ["No", "Answer", "Question","Edit","Delete"];
  const tableRows: Answer[] = [
    {
        No: 1, 
        Answer: "I wanna be supperman !", 
        Question: "Who do you wanna be ?", 
        Edit :  <BiEdit/>,
        Delete: <BiTrash/>,
    },
    {
        No: 1, 
        Answer: "I wanna be supperman !", 
        Question: "Who do you wanna be ?", 
        Edit :  <BiEdit/>,
        Delete: <BiTrash/>,
    },
    {
        No: 1, 
        Answer: "I wanna be supperman !", 
        Question: "Who do you wanna be ?", 
        Edit :  <BiEdit/>,
        Delete: <BiTrash/>,
    },
  ];
  const   selectItems = ["Option 1", "Option 2", "Option 3"]

  const tableHeaderClasses = [
    "w-[200px] pr-4 xxl:w-[25px]",
    "w-[200px] pr-4 xxl:w-[250px]",
    "w-[128px] pr-4 xxl:w-[250px]",
    "w-[128px] pr-4 xxl:w-[50px]",
    "w-[200px] pr-4 xxl:w-[50px]",
  ];
  const paginationItems = [1, 2, 3, 4, 5];
  return (
    <>
    <div className="grid auto-cols-fr grid-cols-1 items-end gap-4 pb-5 md:grid-cols-[1fr_max-content] md:gap-6 md:pb-6">
        <div className="w-full max-w-lg">
          <h1 className="text-xl font-bold md:text-2xl">heading</h1>
          <p className="mt-2">description</p>
        </div>
        <div className="flex items-center justify-between md:justify-normal">
          <Select>
            <SelectTrigger className="w-[110px] px-4 py-2">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {selectItems.map((item, index) => (
                <SelectItem key={index} value={`${item.toLowerCase().replace(/\s/g, "-")}`}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <TableTemplate
            headerTitle="Answer"
            headerDescription="List of Answer"
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
