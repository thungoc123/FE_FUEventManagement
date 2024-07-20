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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Store/Store";
import { useDeleteSponsorMutation, useGetListEventQuery } from "../../../Features/EventManage/eventApi";
import { addNotification } from "../../../Features/Utils/notificationsSlice";
import { setTab } from "../../../Features/Utils/tabSlice";
import { Button } from "@relume_io/relume-ui";

export const AddSponsorTable = () => {
  const { id } = useParams();
  // const Events = useSelector((state: RootState) => state.events.events);
  const { data, error, isLoading, isFetching } = useGetListEventQuery();
  const [deleteSponsor] = useDeleteSponsorMutation()
  const sponsor = data?.find((event) => event.id === parseInt(id))?.sponsorEvents || [];
  console.log(sponsor)
  const tableHeaders = [
    "No",
    "Name",
    "StaffEmail",
    "ProfitPercent",
    "Edit",
    "Delete",
  ];
  const dispatch = useDispatch();

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>, sponsorId: number) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của button nếu có

    try {
      await deleteSponsor({ eventId: id, sponsorId: sponsorId }).unwrap();
      dispatch(
        addNotification({
          id: new Date().getTime(), // Sử dụng timestamp làm ID
          message: "Sponsor deleted successfully",
          type: "success",
          timestamp: Date.now(), // Thời gian hiện tại
        })
      );
      dispatch(setTab("sponsor"));
      window.location.reload();
    } catch (error) {
      console.error('Failed to delete the staff:', error);
      alert('Failed to delete the staff');
    }
  };
  const total_profit = sponsor.reduce((total, item) => total + item.profitPercent, 0);
  console.log(total_profit);
  const tableRows: SponsorTable[] = sponsor.map((item, index) => ({
    No: index + 1,
    Name: item.sponsor.companyName,
    StaffEmail: item.sponsor.fptStaffEmail,
    ProfitPercent: item.profitPercent,
    Edit: <BiEdit />,
    Delete: <Button size="icon" variant="link"  onClick={(e) => handleDelete(e,item.sponsorId)}>
    <BiTrash />
  </Button>,
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
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  {isFetching && <div>Updating...</div>}
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

          <AddSponsor totalProfit={total_profit}/>
      
    </>
  );
};
