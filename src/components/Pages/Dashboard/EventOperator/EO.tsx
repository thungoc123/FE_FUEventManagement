<<<<<<< HEAD
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
=======
import { Button } from "@relume_io/relume-ui";
import LineChart from "../../../Atoms/LineChart";
import { QuestionAnalytics } from "../../../Molecules/QuestionAnalytics";
import { ApplicationShell4 } from "../../../Organisms/Dashboard/ApplicationShell";
import { Stat1 } from "../../../Organisms/Dashboard/StateCard";
import Tabbar from "../../../Organisms/Dashboard/Tabbar";
import AddFeedbackButton from "../../../Organisms/Dashboard/AddFeedbackButton";
import { useParams } from "react-router-dom";
import { useGetListEventQuery } from "../../../../Features/EventManage/eventApi";
import { useSelector } from "react-redux";
import { selectUnpublishEvents } from "../../../../Features/EventManage/eventSelector";
import { RootState } from "../../../../Store/Store";

export const EO = () => {
  const { id } = useParams();
  // const { data: events, error, isLoading } = useGetListEventQuery();
  // const Events = useSelector(selectUnpublishEvents);

  // const eventDetail = Events?.find(event => event.id.toString() === id);
>>>>>>> TienMerge
  const Events = useSelector((state: RootState) => state.events.events);

  return (
    <>
      <ApplicationShell4
<<<<<<< HEAD
        MainComponent={<Tabbar id={id} defaultDisplay={prop.defaultTabbar}/>}
=======
        MainComponent={<Tabbar id={id}/>}
>>>>>>> TienMerge
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
