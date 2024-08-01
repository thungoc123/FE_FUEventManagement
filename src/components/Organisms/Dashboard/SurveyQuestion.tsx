import {
  BiTrash,
  BiEdit,
  BiAddToQueue,
  BiMessageAltDetail,
  BiMessageSquareX,
} from "react-icons/bi";
import { SurveyQuestions } from "../../../Types/survey";
import { TableTemplate } from "./TableTemplate";
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
  Input,
  Label,
} from "@relume_io/relume-ui";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { addNotification } from "../../../Features/Utils/notificationsSlice";
import { useDispatch } from "react-redux";
import {
  useCreateSurveyQuestionMutation,
  useGetSurveyQuestionsQuery,
} from "../../../Features/Survey/survey";
import AddSurveyButton from "./AddSurveyButton";

export const SurveyQuestionManage = () => {
  const { id } = useParams();
  const tableHeaders = ["No", "Question", "Answer", "Edit", "Delete"];
  const dispatch = useDispatch();
  const [createQuestion, { isLoading: isCreating }] =
    useCreateSurveyQuestionMutation();

  const {
    data: surveyQuestions,
    isLoading,
    error,
  } = useGetSurveyQuestionsQuery(id);

  const [answerData, setAnswerData] = useState([
    {
      answer: "",
      deleteAt: null,
      modifiedAt: null,
      question_id: 1,
    },
  ]);
  console.log(id);
  const handleAnswerChange = (answerIndex: number, value: string) => {
    setAnswerData((prevData) =>
      prevData.map((item, i) =>
        i === answerIndex ? { ...item, answer: value, modifiedAt: null } : item
      )
    );
  };

  const addAnswer = (id: number) => {
    setAnswerData((prevData) => [
      ...prevData,
      {
        answer: "",
        deletedAt: null,
        modifiedAt: null,
        question_id: id,
      },
    ]);
  };

  const removeAnswer = (answerIndex: number) => {
    setAnswerData((prevData) => prevData.filter((_, i) => i !== answerIndex));
  };

  const [formData, setFormData] = useState({
    typeQuestion: "",
    deleteAt: null,
    modifiedAt: null,
    // surveyId: id,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    try {
      await createQuestion({
        newSurveyQuestion: formData,
        surveyId: Number(id),
      }).unwrap();
      dispatch(
        addNotification({
          id: new Date().getTime(),
          message: "Create survey question successfully!",
          type: "success",
          timestamp: Date.now(),
        })
      );
    } catch (err) {
      dispatch(
        addNotification({
          id: new Date().getTime(),
          message: "Create survey question unsuccessfully!",
          type: "error",
          timestamp: Date.now(),
        })
      );
      console.error("Failed to create event survey:", err);
    }
  };

  if (isLoading) return <div className="loader"></div>;
  if (error) return <div>Error: {error.message}</div>;

  const tableRows: SurveyQuestions[] = surveyQuestions?.map((item, index) => ({
    No: index + 1,
    Question: item.typeQuestion,
    Answer:
      item.typeQuestion == "Multi-choice" ? (
        <>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="icon" variant="link">
                <BiMessageAltDetail />
              </Button>
            </DialogTrigger>
            <DialogPortal>
              <DialogOverlay className="bg-black/50" />
              <DialogContent className="w-full max-w-md bg-white p-10 md:p-12">
                <DialogHeader>
                  <DialogTitle>Add Survey Question</DialogTitle>
                </DialogHeader>
                <form
                  onSubmit={handleQuestionSubmit}
                  data-survey-id={item.surveyQuestions}
                >
                  {answerData.map((answer, answerIndex) => (
                    <div key={answerIndex} className="mb-4">
                      <Label htmlFor={`answer-${answerIndex}`}>
                        Answer {answerIndex + 1}
                      </Label>
                      <div className="relative">
                        <Input
                          type="text"
                          className="w-full pr-10"
                          id={`answer-${answerIndex}`}
                          value={answer.answer}
                          onChange={(e) =>
                            handleAnswerChange(answerIndex, e.target.value)
                          }
                          placeholder="Answer"
                        />
                        <Button
                          size="icon"
                          variant="link"
                          onClick={() => removeAnswer(answerIndex)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        >
                          <BiTrash className="text-gray-600 hover:text-red-600" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button size="icon" variant="link" onClick={addAnswer}>
                    <BiAddToQueue />
                  </Button>
                  <DialogFooter className="mt-4">
                    <Button size="sm">
                      {isCreating ? "Creating" : "Done"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </DialogPortal>
          </Dialog>
        </>
      ) : (
        <Button size="icon" variant="link" disabled>
          <BiMessageSquareX />
        </Button>
      ),
    Edit: <BiEdit />,
    Delete: (
      <Button
        size="icon"
        variant="link"
        onClick={(e) => handleDeleteQuestion(e, item.surveyQuestionsID)}
      >
        <BiTrash />
      </Button>
    ),
  }));

  const tableHeaderClasses = [
    "w-[200px] pr-4 xxl:w-[25px]",
    "w-[200px] pr-4 xxl:w-[250px]",
    "w-[128px] pr-4 xxl:w-[50px]",
    "w-[128px] pr-4 xxl:w-[50px]",
    "w-[128px] pr-4 xxl:w-[50px]",
  ];

  return (
    <>
      {surveyQuestions.length === 0 ? (
        <div className="text-center">No survey question</div>
      ) : (
        <TableTemplate
          headerTitle="Feedback Question"
          headerDescription="List of Sponsor"
          buttons={[
            {
              children: <AddSurveyButton />,
              size: "sm",
            },
          ]}
          tableHeaders={tableHeaders}
          tableRows={tableRows}
          tableHeadersClasses={tableHeaderClasses}
        />
      )}
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>New</Button>
          </DialogTrigger>
          <DialogPortal>
            <DialogOverlay className="bg-black/50" />
            <DialogContent className="w-full max-w-md bg-white p-10 md:p-12">
              <DialogHeader>
                <DialogTitle>Add Survey Question</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleQuestionSubmit}>
                <div key="">
                  <div className="grid items-center gap-2">
                    <Label htmlFor="Question">Question</Label>
                    <Input
                      id="Question"
                      name="typeQuestion"
                      value={formData.typeQuestion}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <DialogFooter className="mt-4">
                  <Button size="sm">{isCreating ? "Creating" : "Done"}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </div>
    </>
  );
};
