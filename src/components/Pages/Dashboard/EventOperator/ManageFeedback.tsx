import { BiShow, BiTrash, BiEdit } from "react-icons/bi";
import { Feedback } from "../../../Organisms/EventOperator/feedback";
import { FeedbackTable } from "../../../../Types/feedback";
import { ApplicationShell4 } from "../../../Organisms/Dashboard/ApplicationShell";
import AddFeedbackButton from "../../../Organisms/Dashboard/AddFeedbackButton";
import { Button } from "@relume_io/relume-ui";
import SurveyForm from "../TestforCreateSurvey";
//
export const ManageFeedback = () => {
  
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
                {/* <AddFeedbackButton /> */}
                <SurveyForm />
              </div>
            </div>
          </div>
        }
      />
    </>
  );
};
