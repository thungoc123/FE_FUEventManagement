import { ApplicationShell4 } from "../../../Organisms/Dashboard/ApplicationShell";
import SponsorEventProfit from "../../../Organisms/Sponsor/SponsorEventProfit";
import { GridList6 } from "../../../Organisms/Sponsor/SponsorProgram";

export const Program = () => {
  return (
    <div>
      {/* <ApplicationShell4 MainComponent={<SponsorEventProfit/>} /> */}
      <ApplicationShell4 MainComponent={<GridList6/>} />

    </div>
  );
};
