import { ApplicationShell4 } from "../../../Organisms/Dashboard/ApplicationShell";
import SponsorEventProfit from "../../../Organisms/Sponsor/SponsorEventProfit";

export const Program = () => {
  return (
    <div>
      <ApplicationShell4 MainComponent={<SponsorEventProfit/>} />
    </div>
  );
};
