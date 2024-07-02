import { ApplicationShell4 } from "../../../Organisms/Dashboard/ApplicationShell";
import Tabbar from "../../../Organisms/Dashboard/Tabbar";
import AddFeedbackButton from "../../../Organisms/Dashboard/AddFeedbackButton";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Store/Store";
import React from "react";

type Props = {
  defaultTabbar: string | 'schedule'
}
export const EO:React.FC<Props> = (prop) => {
  const { id } = useParams();
  const Events = useSelector((state: RootState) => state.events.events);

  return (
    <>
      <ApplicationShell4
        MainComponent={<Tabbar id={id} defaultDisplay={prop.defaultTabbar}/>}
        StateComponent={
          <div className="grid auto-cols-fr grid-cols-1 items-end gap-4 pb-5 md:grid-cols-[1fr_max-content] md:gap-6 md:pb-6">
          
            <div className="w-full max-w-lg">
              <h1 className="text-xl font-bold md:text-2xl">Heading goes here</h1>
              <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.</p>
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
