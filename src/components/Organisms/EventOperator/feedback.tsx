import { BiEdit, BiShow, BiTrash, BiHide } from "react-icons/bi";
// import { ApplicationShell4 } from "./AppModel";
// import { TableTemplate } from "./Table1";
// import AddFeedbackButton from "./AddFeedbackButton";
import { SponsorTable } from "../../../Types/sponsor";
import { ApplicationShell4 } from "../Dashboard/ApplicationShell";
import { TableTemplate } from "../Dashboard/TableTemplate";
import AddFeedbackButton from "../Dashboard/AddFeedbackButton";
import { FeedbackTable } from "../../../Types/feedback";
import { Button, Input } from "@relume_io/relume-ui";
import { useDeleteFeedbackMutation, useGetListFeedbackQuery } from "../../../Features/FeedbackManage/feedbackApi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNotification } from "../../../Features/Utils/notificationsSlice";
import { useEffect, useState } from "react";
import UpdateFeedback from "./updateFeedback";
import { accountID } from "../../../ulities/ProtectedRoute";

export const Feedback = () => {
  const tableHeaders = [
    "No",
    "Name",
    "Event",
    "state",
    "Question",
    "Edit",
    // "Publish",
    "Delete",
  ];
  const accountId = accountID(sessionStorage.getItem("token"));
  const { data: Feedbacks, isLoading, error } = useGetListFeedbackQuery(accountId);
  const [deleteFeedback] = useDeleteFeedbackMutation();
  const dispatch  = useDispatch();
  
  const handleDeleteFeedback = async (e, fbid: number) => {
    e.preventDefault();
    try {
      await deleteFeedback(fbid).unwrap();
      dispatch(
        addNotification({
          id: new Date().getTime(), // Sử dụng timestamp làm ID
          message: "Delete feedback successfully!",
          type: "success",
          timestamp: Date.now(), // Thời gian hiện tại
        })
      );
      // refetch();
      // window.location.reload();
    } catch (err) {
      dispatch(
        addNotification({
          id: new Date().getTime(), // Sử dụng timestamp làm ID
          message: "Delete feedback unsuccessfully!",
          type: "error",
          timestamp: Date.now(), // Thời gian hiện tại
        })
      );
      console.error("Failed to create the event:", err);
    }
    // window.location.reload();
  }
  console.log(Feedbacks)
  const tableRows: FeedbackTable[] = Feedbacks?.map((item, index) => ({
    No: index+1,
    Name: item.title,
    Event: item.eventName,
    state: "PUBLISH",
    Question: 
    <Link to={`/eventoperator/dashboard/FeedbackDetail/${item.feedbackID}`}>
    <Button size="icon" variant="link">
      <BiEdit />
    </Button>
    </Link>,
    Edit: <UpdateFeedback feedback={item}/>,
    // Publish: item.state?.stateName === "UNPUBLISH" ? <Button size="icon" asChild variant="link"><BiShow /></Button>  : <Button size="icon" asChild variant="link"><BiHide/></Button>,
    Delete:  <Button size="icon" variant="link" onClick={(e) => handleDeleteFeedback(e,item.feedbackID)}>
      <BiTrash /></Button>,
  }));

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
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
    {Feedbacks.length === 0 ? (
        "No feedback"
      ) : (
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
      )
    }
    </>
  );
};
