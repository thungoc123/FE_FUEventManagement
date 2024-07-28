import { Survey } from "../../../Organisms/EventOperator/Survey";
import { ApplicationShell4 } from "../../../Organisms/Dashboard/ApplicationShell";

import SurveyForm2 from "../CreateSurvey";
//
export const ManageSurvey = () => {
  
  return (
    <>
      <ApplicationShell4
        MainComponent={<Survey/>}
        StateComponent={
          <div className="grid auto-cols-fr grid-cols-1 items-end gap-4 pb-5 md:grid-cols-[1fr_max-content] md:gap-6 md:pb-6">
            <div className="w-full max-w-lg">
             </div>
            <div className="flex items-center justify-between gap-4 md:justify-normal">
              <div className="flex items-center gap-4">
                <SurveyForm2 />
              </div>
            </div>
          </div>
        }
      />
    </>
  );
};
