import {
  BiShow,
  BiTrash,
  BiEdit,
  BiAddToQueue,
  BiMessageAltDetail,
  BiMessageSquareX,
} from "react-icons/bi";
import {
  FeedbackQuery,
  Question,
  feedbackAnswer,
  feedbackQuestionQuery,
} from "../../../Types/feedback";
// import { ApplicationShell4 } from "./ApplicationShell";
import { TableTemplate } from "./TableTemplate";
import AddFeedbackButton from "./AddFeedbackButton";
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
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateQuestionMutation,
  useDeleteFeedbackQuestionMutation,
  useGetListFeedbackQuestionQuery,
} from "../../../Features/FeedbackManage/feedbackApi";
import { addNotification } from "../../../Features/Utils/notificationsSlice";
import { useDispatch } from "react-redux";
// type Props = {
//   question: feedbackQuestionQuery[];
// };
export const QuestionManage = () => {
  const { id } = useParams();
  const tableHeaders = ["No", "Question", "Answer", "Edit", "Delete"];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [
    createQuestion,
    { isLoading: isCreating, isError: isMutationError, error: mutationError },
  ] = useCreateQuestionMutation();

  const {
    data: feedbackQuestions,
    refetch,
    isLoading,
    error,
  } = useGetListFeedbackQuestionQuery(id);
  console.log(feedbackQuestions);

  const [answerData, setAnswerData] = useState([
    {
      // "feedbackAnswerID": 0,
      answer: "",
      deletedAt: null,
      modifiedAt: null,
      question_id: 1,
    },
  ]);


  const handleAnswerChange = (answerIndex: number, value: string) => {
    setAnswerData((prevData) =>
      prevData.map((item, i) =>
        i === answerIndex
          ? { ...item, answer: value, modifiedAt: null }
          : item
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
        question_id: id, // hoặc giá trị phù hợp nếu cần
      },
    ]);
  };

  const removeAnswer = (answerIndex: number) => {
    setAnswerData((prevData) => prevData.filter((_, i) => i !== answerIndex));
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    // console.log(JSON.stringify([answerData]))
    const feedbackId = Number(e.currentTarget.getAttribute('data-feedback-id'));

    const updatedAnswerData = answerData.map((answer) => ({
      ...answer,
      question_id: feedbackId,
    }));

    console.log(JSON.stringify(updatedAnswerData));
  }
  const [deleteFeedbackQuestion] = useDeleteFeedbackQuestionMutation();
  const handleDeleteQuestion = async(e,feedbackQuestionId: number) => {
    e.preventDefault();
    console.log(feedbackQuestionId);
    try {
      await deleteFeedbackQuestion(feedbackQuestionId).unwrap();
      dispatch(
        addNotification({
          id: new Date().getTime(), // Sử dụng timestamp làm ID
          message: "Delete feedback question successfully!",
          type: "success",
          timestamp: Date.now(), // Thời gian hiện tại
        })
      );
      refetch();
      // window.location.reload();
    } catch (err) {
      dispatch(
        addNotification({
          id: new Date().getTime(), // Sử dụng timestamp làm ID
          message: "Delete feedback question unsuccessfully!",
          type: "error",
          timestamp: Date.now(), // Thời gian hiện tại
        })
      );
      console.error("Failed to delete the event:", err);
    }
  }

  const tableRows: Question[] = feedbackQuestions?.map((item, index) => ({
    No: index + 1,
    Question: item.textQuestion,
    Answer:
      item.typeQuestion == "Multi-choice" ? (
        // <BiMessageAltDetail onClick={}/>
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
                  <DialogTitle>Add Feedback Question</DialogTitle>
                  {/* <DialogDescription>Modal Description</DialogDescription> */}
                </DialogHeader>
                <form onSubmit={handleQuestionSubmit} data-feedback-id={item.feedbackQuestionID}>
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
                      {/* Creating */}
                      {isCreating ? "Creating" : "Done"}
                    </Button>
                  </DialogFooter>
                </form>
                {/* </form> */}
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
    Delete: 
    <Button size="icon" variant="link" onClick={(e) => handleDeleteQuestion(e,item.feedbackQuestionID)}>
      <BiTrash /></Button>,
  }));
 
  const tableHeaderClasses = [
    "w-[200px] pr-4 xxl:w-[25px]",
    "w-[200px] pr-4 xxl:w-[250px]",
    // "w-[200px] pr-4 xxl:w-[150px]",
    "w-[128px] pr-4 xxl:w-[50px]",
    "w-[128px] pr-4 xxl:w-[50px]",
    "w-[128px] pr-4 xxl:w-[50px]",
  ];
  const [formData, setFormData] = useState({
    textQuestion: "",
    deletedAt: null,
    modifiedAt: null,
    feedbackID: id,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  console.log(feedbackQuestions);
  console.log(id);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData));
    try {
      await createQuestion({ feedbackquestion: formData, feedbackId: id }).unwrap();
      dispatch(
        addNotification({
          id: new Date().getTime(), // Sử dụng timestamp làm ID
          message: "Create feedback question successfully!",
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
          message: "Create feedback question unsuccessfully!",
          type: "error",
          timestamp: Date.now(), // Thời gian hiện tại
        })
      );
      console.error("Failed to create the event:", err);
    }
    // window.location.reload();

  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <>
     {feedbackQuestions.length === 0 ? <div className="text-center">No feedback question</div> : (
      <TableTemplate
          headerTitle="Feedback Question"
          headerDescription="List of Sponsor"
          buttons={[
            {
              children: <AddFeedbackButton />,

              size: "sm",
            },
          ]}
          // addNew=
          tableHeaders={tableHeaders}
          tableRows={tableRows} // Truyền dữ liệu mới cho tableRows
          // paginationItems={paginationItems}

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
                <DialogTitle>Add Feedback </DialogTitle>
                {/* <DialogDescription>Modal Description</DialogDescription> */}
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div key="">
                  <div className="grid items-center gap-2">
                    <Label htmlFor="Question">Question</Label>
                    <Input
                      id="Question"
                      name="textQuestion"
                      value={formData.textQuestion}
                      onChange={handleInputChange}
                    />
                  </div>
              
                </div>
                {/* {fill && <Alert text={fill} />} */}
                <DialogFooter className="mt-4">
                  <Button size="sm">
                    {/* Creating */}
                    {isCreating ? "Creating" : "Done"}
                  </Button>
                </DialogFooter>
                {/* </form> */}
              </form>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </div>
      {/* }
      /> */}
    </>
  );
};


