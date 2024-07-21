import { useEffect, useState } from "react";
import ProgressBar from "../../Atoms/ProgressBar";
import { Button, Input } from "@relume_io/relume-ui";
import { useGetListFeedbackQuestionQuery, useVisitorAnswerFeedbackMutation } from "../../../Features/FeedbackManage/feedbackApi";
import { useNavigate, useParams } from "react-router-dom";
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  // Button,
  Label,
  // Input,
} from "@relume_io/relume-ui"
import { BiLogoGoogle } from "react-icons/bi";
import { useLoginMutation } from "../../../Features/Auth/authApi";
import { useDispatch } from "react-redux";
import { accountID } from "../../../ulities/ProtectedRoute";
import { addNotification } from "../../../Features/Utils/notificationsSlice";
import "../../Organisms/Style/visitorAnswer.css";

interface visitorAnswerFeedback {
  visitorAnswerFeedback: string;
  feedbackQuestionId: number;
}

const VisitorAnswerPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  // const visitorID = 1;
  const { id } = useParams();
  const { data, error, isLoading, isFetching } = useGetListFeedbackQuestionQuery(id);
  // console.log(data?.length)
  const navigtation = useNavigate();
  // Login 
  const [login, { isError, isSuccess }] = useLoginMutation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const result = await login({ email, password }).unwrap();
      console.log(result.data);
      console.log(isSuccess);
      sessionStorage.setItem("token", result.data);
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("accountId", accountID(result.data));
      setIsLogin(false);
    } catch (err) {
      console.error("Failed to login:");
    }
  };


  const totalSteps = parseInt(data?.length);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        console.log('Enter key pressed');
        setCurrentStep(prev => Math.min(prev + 1, totalSteps))
        // Thực hiện hành động mong muốn tại đây, ví dụ: chuyển sang bước tiếp theo
      }
      if (event.key === 'ArrowLeft') {
        console.log('ArrowLeft key pressed');
        setCurrentStep(prev => Math.max(prev - 1, 1))
      }
    };

    // Thêm event listener
    document.addEventListener('keydown', handleKeyDown);

    // Dọn dẹp
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Đảm bảo rằng useEffect này chỉ chạy một lần

  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const visitorAnswersFeedback: visitorAnswerFeedback[] = [];

  // Populate initial answers from visitorAnswerFeedback

  useEffect(() => {
    const initialAnswers: { [key: number]: string } = {};
    visitorAnswersFeedback.forEach(answer => {
      initialAnswers[answer.feedbackQuestionId] = answer.visitorAnswerFeedback;
    });
    setAnswers(initialAnswers);
  }, []);

  // Handle input change
  const [visitorAnswerFeedback, { isError: failCreating, isLoading: creating }] = useVisitorAnswerFeedbackMutation();
  const handleInputChange = (questionId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    // console.log(answers);
  };

  const handleVisitorSubmit = async (e) => {
    e.preventDefault();
    const accountId = sessionStorage.getItem('accountId');
    // console.log(answers);
    const visitorAnswersFeedback = Object.entries(answers).map(([feedbackQuestionId, answer]) => ({
      visitorAnswerFeedback: answer,
      feedbackQuestionId: parseInt(feedbackQuestionId),
    }));
    console.log(JSON.stringify(visitorAnswersFeedback));
    try {
      await visitorAnswerFeedback({ accountId: accountId, visitorAnswer: visitorAnswersFeedback }).unwrap();
      dispatch(addNotification({
        id: new Date().getTime(), // Sử dụng timestamp làm ID
        message: 'Thank for submitting feedback successfully!',
        type: 'success',
        timestamp: Date.now(), // Thời gian hiện tại
      }));
      navigtation('/')
    }
    catch (err) {
      // dispatch(addNotification({
      //   id: new Date().getTime(), // Sử dụng timestamp làm ID
      //   message: 'Submit feedback unsuccessfully!',
      //   type: 'error',
      //   timestamp: Date.now(), // Thời gian hiện tại
      // }));
      console.error("Failed to submit visitor answers feedback");
    }

    // Now visitorAnswerFeedback is in the desired format
  };


  return (
    <>
      <div id="VisitorBackground">
        <div className="w-3/4 mx-auto mt-4 visitorAnswer">
          {/* <ProgressBar currentStep={currentStep} totalSteps={totalSteps} /> */}
          <form onSubmit={handleVisitorSubmit}>
            {currentStep === 1 && (
              <div className="w-full h-full mx-auto p-8 border border-black  shadow-md text-cente product">
                <h1 className="text-2xl font-bold mb-4">Product survey {isSuccess && sessionStorage.getItem('email')}</h1>
                <p className="text-gray-600 mb-6">We have a few questions for you to help us improve our product.</p>
                <div className="flex justify-center items-center space-x-4">
                  {!isSuccess && (
                    <Dialog open={isLogin}>
                      <DialogTrigger asChild>
                        <Button>Open modal</Button>
                      </DialogTrigger>
                      <DialogPortal>
                        <DialogOverlay className="bg-black/25" />
                        <DialogContent className="w-full max-w-md bg-white px-10 py-14 md:py-16 md:px-12 md:data-[state=open]:duration-300 md:data-[state=open]:animate-in md:data-[state=closed]:animate-out md:data-[state=closed]:fade-out-0 md:data-[state=open]:fade-in-0 md:data-[state=closed]:slide-out-to-left-1/2 md:data-[state=open]:slide-in-from-left-1/2">
                          <DialogHeader>
                            <DialogTitle className="mb-2">Login</DialogTitle>
                            <DialogDescription>Login to get started with Feedback</DialogDescription>
                          </DialogHeader>
                          <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 py-4">
                              <div className="grid items-center gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" onChange={(e) => setEmail(e.target.value)} />
                              </div>
                              <div className="grid items-center gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" onChange={(e) => setPassword(e.target.value)} />
                              </div>
                            </div>
                            <div className="mt-6 flex w-full flex-col gap-4 md:mt-8">
                              <Button>Login</Button>

                            </div>
                          </form>
                          <DialogFooter className="mt-6">
                          </DialogFooter>
                        </DialogContent>
                      </DialogPortal>
                    </Dialog>
                  )}
                  <Button type="submit" className="VisitorAnswerButton">{creating ? 'Submitting' : 'Submit' } </Button>
                  <span className="text-gray-600">Press <span className="font-bold">Enter ↵</span></span>
                </div>
                <div className="flex justify-center items-center text-gray-500 mt-4">
                  <span className="material-icons-outlined text-gray-400">schedule</span> {/* Biểu tượng thời gian */}
                  <span className="ml-2">Takes 1 minute</span>
                </div>
                {failCreating && <span>PLease fill all questions</span>}
              </div>
            )}

            {data?.map((question, index) => (
              <div key={question.feedbackQuestionID} className="w-full h-full mx-auto p-8 border border-black shadow-md text-center m-20 visitorCard">
                <h1 className="text-2xl font-bold mb-4">{question.textQuestion}</h1>
                <div className="flex justify-center items-center space-x-4">
                  <Input
                    className="py-2 px-6"
                    placeholder="Enter your answer"
                    value={answers[question.feedbackQuestionID] || ''}
                    onChange={(e) => handleInputChange(question.feedbackQuestionID, e.target.value)}
                  />
                </div>
                <div className="flex justify-center items-center text-gray-500 mt-4">
                  <span className="material-icons-outlined text-gray-400">schedule</span>
                  <span className="ml-2">Takes 1 minute</span>
                </div>
              </div>
            ))}
          </form>
          {/* {currentStep === 2 && (
          <div className="w-full h-full mx-auto p-8 border border-black  shadow-md text-center">
            <h1 className="text-2xl font-bold mb-4">Product survey</h1>
            <p className="text-gray-600 mb-6">We have a few questions for you to help us improve our product.</p>
            <div className="flex justify-center items-center space-x-4">
              <Input className="py-2 px-6" placeholder="Enter your answer" />
            </div>
            <div className="flex justify-center items-center text-gray-500 mt-4">
            </div>
          </div>
        )} */}
          {/* <button onClick={() => setCurrentStep(prev => Math.min(prev + 1, totalSteps))}>
        Next Step
      </button>
      <button onClick={() => setCurrentStep(prev => Math.max(prev - 1, 1))}>
        Previous Step
      </button> */}
        </div>
      </div>
    </>
  )
};

export default VisitorAnswerPage;