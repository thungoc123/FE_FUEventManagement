import React from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { TableTemplate } from "../Dashboard/TableTemplate";
import { Button } from "@relume_io/relume-ui";
import { useDeleteFeedbackMutation } from "../../../Features/FeedbackManage/feedbackApi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNotification } from "../../../Features/Utils/notificationsSlice";
import { accountID } from "../../../ulities/ProtectedRoute";
import { SurveyTable, SurveyQuery } from "../../../Types/survey";
import SurveyForm2 from "../../Pages/Dashboard/CreateSurvey";
import { useListSurveyQuery } from "../../../Features/Survey/survey";
import UpdateSurvey from "./updateSurvey";

export const Survey = () => {
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
  const { data: surveys, isLoading, error } = useListSurveyQuery(accountId);
  const [deleteFeedback] = useDeleteFeedbackMutation();
  const dispatch = useDispatch();

  const handleDeleteSurvey = async (e, surveyId: number) => {
    e.preventDefault();
    try {
      await deleteFeedback({ surveyId }).unwrap();
      dispatch(
        addNotification({
          id: new Date().getTime(),
          message: "Delete Survey successfully!",
          type: "success",
          timestamp: Date.now(),
        })
      );
    } catch (err) {
      dispatch(
        addNotification({
          id: new Date().getTime(),
          message: "Delete Survey unsuccessfully!",
          type: "error",
          timestamp: Date.now(),
        })
      );
      console.error("Failed to delete the survey:", err);
    }
  };

  console.log("Fetched Surveys: ", surveys); // Kiểm tra dữ liệu API

  const tableRows: SurveyTable[] = surveys?.map((item: SurveyQuery, index: number) => ({
    No: index + 1,
    Name: item.title,
    Event: item.eventName || "Unknown Event", // Sử dụng eventName từ API
    State: "PUBLISHED",
    Question: (
      <Link to={`/eventoperator/dashboard/Survey/${item.surveyId}`}>
        <Button size="icon" variant="link">
          <BiEdit />
        </Button>
      </Link>
    ),
    Edit: <UpdateSurvey survey={item} />,
    Delete: (
      <Button size="icon" variant="link" onClick={(e) => handleDeleteSurvey(e, item.surveyID)}>
        <BiTrash />
      </Button>
    ),
  }));

  console.log("Table Rows: ", tableRows); // Kiểm tra dữ liệu tableRows

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
      {surveys?.length === 0 ? (
        "No Survey"
      ) : (
        <TableTemplate
          headerTitle="Survey"
          headerDescription="List of Surveys"
          buttons={[
            {
              children: <SurveyForm2 />,
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
