// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import RoleChoosing from "./components/Pages/Guest/RoleChosing";
import QuestionForm from "./components/Pages/Dashboard/EventOperator/Question";
import SponsorHomepage from "./components/Pages/Guest/SponsorProgramePage";
import { Program } from "./components/Pages/Dashboard/Sponsor/Program";
import { AddProgram } from "./components/Pages/Dashboard/Sponsor/CreateProgram";
import { QuestionAnalyticsDashboard } from "./components/Pages/Dashboard/QuestionAnalyticsDashboard";
import { AnalyticsDashboard } from "./components/Pages/Dashboard/AnalyticsDashboard";
import { EO } from "./components/Pages/Dashboard/EventOperator/EO";
import HomePageLogout from "./components/Pages/Guest/HomePageLogout";
import { SponsorSignUp } from "./components/Pages/Guest/SponsorSignUp";
import { VisitorSignUp } from "./components/Pages/Guest/VisitorSignUp";
import { OrderHistory } from "./components/Pages/Visitor/OrderHistory";
import SurveyForm from "./components/Pages/Dashboard/TestforCreateSurvey";
import CreateEvent from "./components/Pages/Dashboard/EventOperator/CreateEvent";
import ServiceTerm from "./components/Pages/Guest/AboutPage";
import { Payment } from "./components/Pages/Visitor/Payment";
import HomePage from "./components/Pages/Guest/HomePage";
import EventDetail from "./components/Pages/Guest/EventDetail";
import { ManageFeedbackDetail } from "./components/Pages/Dashboard/EventOperator/ManageFeedbackDetail";
import { ManageFeedback } from "./components/Pages/Dashboard/EventOperator/ManageFeedback";
import ReactModal from "react-modal";
import TokenDecode from "./ulities/TokenDecode";
import { Login1 } from "./components/Pages/Login";
// import ProtectedRoute from "./ulities/ProtectedRoute";
import RequireAuth from "./ulities/ProtectedRoute";
import { Admin } from "./components/Pages/Admin";
import { ManageAccount } from "./components/Pages/Dashboard/Sponsor/ManageAccount";
import { ManageEvent } from "./components/Pages/Dashboard/EventOperator/ManageEvent";
import { UnpublishEvent } from "./components/Organisms/EventOperator/UnpublishEvent";
import { PublishEvent } from "./components/Organisms/EventOperator/PublishEvent";
import { useGetListEventQuery } from "./Features/EventManage/eventApi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setEvents } from "./Features/EventManage/eventSlice";
import { RootState, store } from "./Store/Store";
import UpdateEvent from "./components/Pages/Dashboard/EventOperator/UpdateEvent";
import { useGetListFeedbackQuery } from "./Features/FeedbackManage/feedbackApi";
import { QuestionManage } from "./components/Organisms/Dashboard/Question";

function App() {
  ReactModal.setAppElement("#root");
  const { data: events, isLoading, error } = useGetListEventQuery();
  const dispatch = useDispatch();
   useGetListFeedbackQuery('1');

  useEffect(() => {
    if (events) {
      dispatch(setEvents(events));
      sessionStorage.setItem('currentTab','schedule')
    }
  }, [events, dispatch]);

  if (!localStorage.getItem('notifications')) {
    // Nếu không có, thiết lập `notifications` với một mảng rỗng
    localStorage.setItem('notifications', JSON.stringify([]));
  }
  // localStorage.setItem('notifications', JSON.stringify([]));

  const notifications = JSON.parse(localStorage.getItem('notifications'));
  console.log(notifications)
  const currentTab = sessionStorage.getItem('currentTab') // Lấy giá trị tab hiện tại từ Redux
  return (
    <>
      <Router>
        <Routes>
          {/* Guest  */}
          <Route path="/eventdetail" element={<EventDetail />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/sponsor-homepage" element={<SponsorHomepage />} />
          <Route path="/role-choosing" element={<RoleChoosing />} />
          {/* sponsor  */}
          <Route
            path="/sponsor/dashboard/"
            element={
              <RequireAuth role="ROLE_SPONSOR">
                <AnalyticsDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/sponsor/dashboard/question"
            element={
              <RequireAuth role="ROLE_SPONSOR">
                <QuestionAnalyticsDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/sponsor/dashboard/question"
            element={
              <RequireAuth role="ROLE_SPONSOR">
                <QuestionAnalyticsDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/sponsor/dashboard/program"
            element={
              <RequireAuth role="ROLE_SPONSOR">
                <Program />
              </RequireAuth>
            }
          />
          <Route
            path="/sponsor/dashboard/create"
            element={
              <RequireAuth role="ROLE_SPONSOR">
                <AddProgram />
              </RequireAuth>
            }
          />
          <Route
            path="/sponsor/dashboard/manage"
            element={
              <RequireAuth role="ROLE_SPONSOR">
                <ManageAccount />
              </RequireAuth>
            }
          />
          {/* event operator  */}
          {/* <Route
            path="/eventoperator/dashboard/question"
            element={
              <RequireAuth role="ROLE_EO">
                <QuestionAnalyticsDashboard />
              </RequireAuth>
            }
          /> */}
          <Route
            path="/eventoperator/dashboard/question"
            element={
              <RequireAuth role="ROLE_EO">
                <QuestionAnalyticsDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/eventoperator/dashboard/"
            element={
              <RequireAuth role="ROLE_EO">
                <AnalyticsDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/eventoperator/dashboard/event/:id"
            element={
              <RequireAuth role="ROLE_EO">
                <EO defaultTabbar={currentTab}/>
              </RequireAuth>
            }
          />
          
          <Route
            path="/eventoperator/dashboard/event/update/:id"
            element={
              <RequireAuth role="ROLE_EO">
                <UpdateEvent />
              </RequireAuth>
            }
          />
          <Route
            path="/eventoperator/dashboard/feedback"
            element={
              <RequireAuth role="ROLE_EO">
                <ManageFeedback />
              </RequireAuth>
            }
          />
           <Route
            path="/eventoperator/dashboard/UnpublishEvent"
            element={
              <RequireAuth role="ROLE_EO">
                <ManageEvent component={<UnpublishEvent />} />
              </RequireAuth>
            }
          />
          <Route
            path="/eventoperator/dashboard/PublishEvent"
            element={
              <RequireAuth role="ROLE_EO">
                <ManageEvent component={<PublishEvent />} />
              </RequireAuth>
            }
          />
          <Route
            path="/eventoperator/dashboard/FeedbackDetail/:id"
            element={
              <RequireAuth role="ROLE_EO">
                <ManageFeedbackDetail />
              </RequireAuth>
            }
          />
           <Route
            path="/eventoperator/dashboard/FeedbackQuestionDetail/:id"
            element={
              <RequireAuth role="ROLE_EO">
                <QuestionManage />
              </RequireAuth>
            }
          />

          {/* Visitor  */}
          <Route
            path="/payment"
            element={
              <RequireAuth role="ROLE_VISITOR">
                <Payment />
              </RequireAuth>
            }
          />
          <Route
            path="/order-history"
            element={
              <RequireAuth role="ROLE_VISITOR">
                <OrderHistory />
              </RequireAuth>
            }
          />

          {/* Admin  */}
          <Route
            path="/admin"
            element={
              <RequireAuth role="ROLE_ADMIN">
                <Admin Role="ROLE_SPONSOR"/>
              </RequireAuth>
            }
          />
          <Route
            path="/admin/visitor"
            element={
              <RequireAuth role="ROLE_ADMIN">
                <Admin Role="ROLE_VISITOR"/>
              </RequireAuth>
            }
          />
          <Route
            path="/admin/eventoperator"
            element={
              <RequireAuth role="ROLE_ADMIN">
                <Admin Role="ROLE_EO"/>
              </RequireAuth>
            }
          />



          <Route path="/sponsor" element={<SponsorSignUp />} />
          <Route path="/visitor" element={<VisitorSignUp />} />
          {/* <Route path="/survey" element={<SurveyForm />} /> */}
          {/* <Route path="/question" element={<QuestionForm />} /> */}
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/service-term" element={<ServiceTerm />} />
          <Route path="/test" element={<TokenDecode />} />
          <Route path="/login" element={<Login1 />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
