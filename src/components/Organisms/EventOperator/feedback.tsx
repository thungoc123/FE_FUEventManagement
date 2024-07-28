import { BiEdit, BiTrash } from "react-icons/bi";
import { TableTemplate } from "../Dashboard/TableTemplate";
import AddFeedbackButton from "../Dashboard/AddFeedbackButton";
import { Button } from "@relume_io/relume-ui";
import { useDeleteFeedbackMutation, useGetListFeedbackQuery } from "../../../Features/FeedbackManage/feedbackApi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNotification } from "../../../Features/Utils/notificationsSlice";
import UpdateFeedback from "./updateFeedback";
import { accountID } from "../../../ulities/ProtectedRoute";
import { FeedbackTable } from "../../../Types/feedback";

export const Feedback = () => {
  const tableHeaders = [
    "No",
    "Name",
    "Event",
    "State",
    "Question",
    "Edit",
    "Delete",
  ];
  
  const accountId = accountID(sessionStorage.getItem("token"));
  const { data: Feedbacks, isLoading, error } = useGetListFeedbackQuery(accountId);
  const [deleteFeedback] = useDeleteFeedbackMutation();
  const dispatch = useDispatch();
  
  const handleDeleteFeedback = async (e, fbid: number) => {
    e.preventDefault();
    try {
      await deleteFeedback({ fbid }).unwrap();
      dispatch(
        addNotification({
          id: new Date().getTime(),
          message: "Delete feedback successfully!",
          type: "success",
          timestamp: Date.now(),
        })
      );
    } catch (err) {
      dispatch(
        addNotification({
          id: new Date().getTime(),
          message: "Delete feedback unsuccessfully!",
          type: "error",
          timestamp: Date.now(),
        })
      );
      console.error("Failed to delete the feedback:", err);
    }
  };

  console.log("Fetched Feedbacks: ", Feedbacks);
  
  const tableRows: FeedbackTable[] = Feedbacks?.map((item, index) => ({
    No: index + 1,
    Name: item.title,
    Event: item.eventName,
    State: "PUBLISHED",
    Question: (
      <Link to={`/eventoperator/dashboard/FeedbackDetail/${item.feedbackID}`}>
        <Button size="icon" variant="link">
          <BiEdit />
        </Button>
      </Link>
    ),
    Edit: <UpdateFeedback feedback={item} />,
    Delete: (
      <Button size="icon" variant="link" onClick={(e) => handleDeleteFeedback(e, item.feedbackID)}>
        <BiTrash />
      </Button>
    ),
  }));

  console.log("Table Rows: ", tableRows);
  console.log("Is Feedbacks empty? ", Feedbacks?.length === 0);

  const tableHeaderClasses = [
    "w-[200px] pr-4 xxl:w-[25px]",
    "w-[200px] pr-4 xxl:w-[150px]",
    "w-[200px] pr-4 xxl:w-[150px]",
    "w-[128px] pr-4 xxl:w-[150px]",
    "w-[128px] pr-4 xxl:w-[50px]",
    "w-[128px] pr-4 xxl:w-[50px]",
    "w-[128px] pr-4 xxl:w-[50px]",
    "w-[200px] pr-4 xxl:w-[50px]",
  ];

  if (isLoading) return <div className="loader">Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {Feedbacks?.length === 0 ? (
        "No feedback"
      ) : (
        <TableTemplate
          headerTitle="Feedback"
          headerDescription="List of Feedback"
          buttons={[
            {
              children: <AddFeedbackButton feedbacks={Feedbacks || []} />,
              size: "sm",
            },
          ]}
          tableHeaders={tableHeaders}
          tableRows={tableRows}
          tableHeadersClasses={tableHeaderClasses}
        />
      )}
    </>
  );
};
