import { BiEdit, BiShow, BiTrash } from "react-icons/bi";

import { SponsorTable } from "../../../Types/sponsor";

import { FeedbackTable } from "../../../Types/feedback";
import { Input } from "@relume_io/relume-ui";
import { ApplicationShell4 } from "../../Organisms/Dashboard/ApplicationShell";
import { TableTemplate } from "../../Organisms/Dashboard/TableTemplate";
import AddFeedbackButton from "../../Organisms/Dashboard/AddFeedbackButton";

export const QuestionManage = () => {
  const tableHeaders = ["Name", "Date", "Detail", "Delete"];
  const tableRows: FeedbackTable[] = [
    {
      Name: "Nguyen Van A",
      Date: "01/01/2023",
      Detail: <BiShow />,
      Delete: <BiTrash />,
    },
    {
      Name: "Nguyen Van A",
      Date: "01/01/2023",
      Detail: <BiShow />,
      Delete: <BiTrash />,
    },
    {
      Name: "Nguyen Van A",
      Date: "01/01/2023",
      Detail: <BiShow />,
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
      <ApplicationShell4
        MainComponent={
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
        }
        StateComponent={
          <div className="grid auto-cols-fr grid-cols-1 items-end gap-4 pb-5 md:grid-cols-[1fr_max-content] md:gap-6 md:pb-6">
            <div className="w-full max-w-lg">
              <h1 className="text-xl font-bold md:text-2xl">
                Heading goes here
              </h1>
              <p className="mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros.
              </p>
            </div>
            <div className="flex items-center justify-between gap-4 md:justify-normal">
              <div className="flex items-center gap-4">
                <AddFeedbackButton />
              </div>
            </div>
          </div>
        }
      />
    </>
  );
};
