import { BiEdit, BiShow, BiTrash } from "react-icons/bi";
// import { ApplicationShell4 } from "./AppModel";
// import { TableTemplate } from "./Table1";
// import AddFeedbackButton from "./AddFeedbackButton";
import { SponsorTable } from "../../../Types/sponsor";
import { ApplicationShell4 } from "../Dashboard/ApplicationShell";
import { TableTemplate } from "../Dashboard/TableTemplate";
import AddFeedbackButton from "../Dashboard/AddFeedbackButton";
import { FeedbackTable } from "../../../Types/feedback";
import { Button, Input } from "@relume_io/relume-ui";
import { useGetListFeedbackQuery } from "../../../Features/FeedbackManage/feedbackApi";
import { Link } from "react-router-dom";

export const Feedback = () => {
  const tableHeaders = [
    "No",
    "Name",
    "Event",
    "state",
    "Detail",
    "Edit",
    "Delete",
  ];
  const { data: Feedbacks, isLoading, error } = useGetListFeedbackQuery('1');

  const tableRows: FeedbackTable[] = Feedbacks?.map((item, index) => ({
    No: index+1,
    Name: item.title,
    Event: item.eventName,
    state: item.state.stateName,
    Detail: 
    <Link to={`/eventoperator/dashboard/FeedbackDetail/${item.feedbackID}`}>
    <Button size="icon" variant="link">
      <BiEdit />
    </Button>
  </Link>,
    Edit: <BiEdit />,
    Delete: <BiTrash />,
  }));
  const tableHeaderClasses = [
    "w-[200px] pr-4 xxl:w-[25px]",
    "w-[200px] pr-4 xxl:w-[150px]",
    "w-[200px] pr-4 xxl:w-[150px]",
    "w-[128px] pr-4 xxl:w-[150px]",
    "w-[128px] pr-4 xxl:w-[50px]",
    "w-[128px] pr-4 xxl:w-[50px]",
    "w-[200px] pr-4 xxl:w-[50px]",
  ];
  const paginationItems = [1, 2, 3, 4, 5];
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
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
  );
};
