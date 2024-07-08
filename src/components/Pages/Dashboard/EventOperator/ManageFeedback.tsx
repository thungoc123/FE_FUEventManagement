<<<<<<< HEAD
import { BiShow, BiTrash, BiEdit } from "react-icons/bi";
import { Feedback } from "../../../Organisms/EventOperator/feedback";
import { FeedbackTable } from "../../../../Types/feedback";
import { ApplicationShell4 } from "../../../Organisms/Dashboard/ApplicationShell";
import AddFeedbackButton from "../../../Organisms/Dashboard/AddFeedbackButton";
import { Button } from "@relume_io/relume-ui";
import SurveyForm from "../TestforCreateSurvey";
//
export const ManageFeedback = () => {
  
=======
import { BiShow, BiTrash } from "react-icons/bi";
import { Feedback } from "../../../Organisms/EventOperator/feedback";
import { FeedbackTable } from "../../../../Types/feedback";
// import { ApplicationShell4 } from "../../../Organisms/Dashboard/ApplicationShell";
import AddFeedbackButton from "../../../Organisms/Dashboard/AddFeedbackButton";
import { Button } from "@relume_io/relume-ui";
import { ApplicationShell4 } from "../../../Organisms/Dashboard/AppModel";

export const ManageFeedback = () => {
  const tableHeaders = ["Name", "Date", "Detail", "State", "Delete"];
  const tableRows: FeedbackTable[] = [
    {
      Name: "Nguyen Van A",
      Date: "01/01/2023",
      Detail: (
        <Button asChild variant="link" size="icon">
          <a href="/FeedbackDetail" target="_blank" rel="noopener">
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
    "w-[128px] pr-4 xxl:w-[250px]",
    "w-[200px] pr-4 xxl:w-[250px]",
  ];
  const paginationItems = [1, 2, 3, 4, 5];
>>>>>>> TienMerge
  return (
    <>
      <ApplicationShell4
        MainComponent={<Feedback />}
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
<<<<<<< HEAD
                {/* <AddFeedbackButton /> */}
                <SurveyForm />
=======
                <AddFeedbackButton />
>>>>>>> TienMerge
              </div>
            </div>
          </div>
        }
      />
    </>
  );
};
