// src/Pages/SponsorProgram.js

import { useGetSponsorProgramQuery } from "../../../../Features/Sponsor/sponsor_programApi";
import { Footer1 } from "../../../Organisms/Guest/Footer";
import { Navbar2 } from "../../../Organisms/Guest/Navbar";
import { DisplayProgram } from "../../../Organisms/Sponsor/DisplaySponsorProgram";



function SponsorProgram() {
  const { data: sponsorPrograms = [], isLoading, isError } = useGetSponsorProgramQuery();

  if (isLoading) return <div className="loader"></div>;
  if (isError) return <div>Error loading sponsor programs</div>;

  const displayProgramProps = {
    tagline: "",
    heading: "Sponsor List Program",
    description: "List of Sponsor Program",
    sponsorPrograms,
  };

  return (
    <>
      <Navbar2 />
      <DisplayProgram {...displayProgramProps} />
      <Footer1 />
    </>
  );
}

export default SponsorProgram;
