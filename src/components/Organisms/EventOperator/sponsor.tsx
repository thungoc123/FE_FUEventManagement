import { BiEdit, BiTrash } from "react-icons/bi";
// import { ApplicationShell4 } from "./AppModel";
// import { TableTemplate } from "./Table1";
// import AddFeedbackButton from "./AddFeedbackButton";
import { SponsorTable } from "../../../Types/sponsor";
import { ApplicationShell4 } from "../Dashboard/ApplicationShell";
import { TableTemplate } from "../Dashboard/TableTemplate";
import AddFeedbackButton from "../Dashboard/AddFeedbackButton";
import AddSponsor from "../Dashboard/AddSponsor";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../Store/Store";

export const AddSponsorTable = () => {
  const { id } = useParams();
  const Events = useSelector((state: RootState) => state.events.events);
  
  const sponsor = Events?.find((event) => event.id === parseInt(id))?.sponsorEvents || [];
  console.log(sponsor)
  const tableHeaders = [
    "No",
    "Name",
    "StaffEmail",
    "ProfitPercent",
    "Edit",
    "Delete",
  ];
  const tableRows: SponsorTable[] = sponsor.map((item, index) => ({
    No: index + 1,
    Name: item.sponsor.companyName,
    StaffEmail: item.sponsor.fptStaffEmail,
    ProfitPercent: item.profitPercent,
    Edit: <BiEdit />,
    Delete: <BiTrash />,
  }));

  const tableHeaderClasses = [
    "w-[200px] pr-4 xxl:w-[25px]",
    "w-[128px] pr-4 xxl:w-[150px]",
    "w-[200px] pr-4 xxl:w-[150px]",
    "w-[200px] pr-4 xxl:w-[100px]",
    "w-[192px] pr-4 xxl:w-[150px]",
    "w-[96px] pr-4",
  ];
  const paginationItems = [1, 2, 3, 4, 5];
  return (
    <>
    {sponsor.length === 0 ? <div className="text-center">No sponsor</div> : (
      <>
      <TableTemplate
        headerTitle="Sponsor"
        headerDescription="List of Sponsor"
        buttons={[
          {
            children: <AddFeedbackButton />,

            size: "sm",
          },
        ]}
        tableHeaders={tableHeaders}
        tableRows={tableRows} // Truyền dữ liệu mới cho tableRows
        // paginationItems={paginationItems}
        tableHeadersClasses={tableHeaderClasses}
      />
      </>
    )}
          <AddSponsor />
      
    </>
  );
};
