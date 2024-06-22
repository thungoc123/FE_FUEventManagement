import { Button, Dialog, DialogTrigger } from "@relume_io/relume-ui";
import { QuestionSurveyTable } from "../../../Types/event.type";
import { ApplicationShell4 } from "../../Organisms/Dashboard/ApplicationShell";
import { Stat1 } from "../../Organisms/Dashboard/StateCard";
import { TableTemplate } from "../../Organisms/Dashboard/TableTemplate";

import { QuestionAnalytics } from "../../Molecules/QuestionAnalytics";

export const QuestionAnalyticsDashboard = () => {
  const tableHeaders = ["No", "Question", "Number", "Survey", "Date", "View"];
  const tableRows: QuestionSurveyTable[] = [
    {
      No: 1,
      Question: "Who do you wanna be ?",
      Number: 12,
      Survey: "Sự kiện A",
      Date: "12/3/2021",
      View: <QuestionAnalytics />,
    },
    {
      No: 1,
      Question: "Who do you wanna be ?",
      Number: 12,
      Survey: "Sự kiện A",
      Date: "12/3/2021",
      View: <QuestionAnalytics />,
    },
    {
      No: 1,
      Question: "Who do you wanna be ?",
      Number: 12,
      Survey: "Sự kiện A",
      Date: "12/3/2021",
      View:<QuestionAnalytics />,
    },
    {
      No: 1,
      Question: "Who do you wanna be ?",
      Number: 12,
      Survey: "Sự kiện A",
      Date: "12/3/2021",
      View: <QuestionAnalytics />,
    },
  ];
  const paginationItems = [1, 2, 3, 4, 5];

  return (
    <>
      <ApplicationShell4
        MainComponent={
          <TableTemplate
            headerTitle="Survey Question"
            headerDescription="List of questions from various surveys."
            buttons={[
              {
                children: "Add New Question",
                variant: "secondary",
                size: "sm",
              },
              { children: "Export Data", size: "sm" },
            ]}
            tableHeaders={tableHeaders}
            tableRows={tableRows} // Truyền dữ liệu mới cho tableRows
            paginationItems={paginationItems}
          />
        }
        StateComponent={<Stat1 />}
      />
      {/* <QuestionAnalytics /> */}
    </>
  );
};
