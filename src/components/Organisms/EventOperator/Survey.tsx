import { BiEdit, BiTrash } from "react-icons/bi";
import { TableTemplate } from "../Dashboard/TableTemplate";
import { Button } from "@relume_io/relume-ui";
import { useDeleteFeedbackMutation, useGetListFeedbackQuery } from "../../../Features/FeedbackManage/feedbackApi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNotification } from "../../../Features/Utils/notificationsSlice";
import { accountID } from "../../../ulities/ProtectedRoute";
import { SurveyTable } from "../../../Types/survey";
import UpdateSurvey from "./updateSurvey";
import SurveyForm2 from "../../Pages/Dashboard/CreateSurvey";
import { useListSurveyQuery } from "../../../Features/Survey/survey";

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
  const { data: Survey, isLoading, error } = useListSurveyQuery(accountId);
  const [deleteFeedback] = useDeleteFeedbackMutation();
  const dispatch = useDispatch();
  
  const handleDeleteSurvey = async (e, fbid: number) => {
    e.preventDefault();
    try {
      await deleteFeedback({ fbid }).unwrap();
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

  const tableRows: SurveyTable[] = Survey?.map((item, index) => ({
    No: index + 1,
    Name: item.title,
    Event: item.eventName,
    State: "PUBLISHED",
    Question: (
      <Link to={`/eventoperator/dashboard/Survey/${item.surveyID}`}>
        <Button size="icon" variant="link">
          <BiEdit />
        </Button>
      </Link>
    ),
    Edit: <UpdateSurvey feedback={item} />,
    Delete: (
      <Button size="icon" variant="link" onClick={(e) => handleDeleteSurvey(e, item.feedbackID)}>
        <BiTrash />
      </Button>
    ),
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
      {Survey?.length === 0 ? (
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
