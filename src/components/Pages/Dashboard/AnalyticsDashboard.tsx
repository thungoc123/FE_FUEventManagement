import LineChart from "../../Atoms/LineChart";
import { QuestionAnalytics } from "../../Molecules/QuestionAnalytics";
import { ApplicationShell4 } from "../../Organisms/Dashboard/ApplicationShell";
import { Stat1 } from "../../Organisms/Dashboard/StateCard";

export const AnalyticsDashboard = () => {
  const labels = ["January", "February", "March", "April", "May", "June"];
  const views = [65, 59, 80, 81, 56, 55];
  const sell = [25, 59, 86, 21, 36, 25];

  return (
    <>
      <ApplicationShell4
        MainComponent={<Stat1 />}
        // StateComponent={<Stat1 />}
      />
    </>
  );
};
