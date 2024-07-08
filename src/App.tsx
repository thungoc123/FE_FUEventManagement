// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import RoleChoosing from "./components/Pages/Guest/RoleChosing";
<<<<<<< HEAD
import SponsorHomepage from "./components/Pages/Guest/SponsorProgramePage";
=======
import QuestionForm from "./components/Pages/Dashboard/EventOperator/Question";
// import SponsorHomepage from "./components/Pages/Guest/SponsorProgramePage";
>>>>>>> TienMerge
import { Program } from "./components/Pages/Dashboard/Sponsor/Program";
import { AddProgram } from "./components/Pages/Dashboard/Sponsor/CreateProgram";
import { QuestionAnalyticsDashboard } from "./components/Pages/Dashboard/QuestionAnalyticsDashboard";
import { AnalyticsDashboard } from "./components/Pages/Dashboard/AnalyticsDashboard";
import { EO } from "./components/Pages/Dashboard/EventOperator/EO";
<<<<<<< HEAD
import { SponsorSignUp } from "./components/Pages/Guest/SponsorSignUp";
import { VisitorSignUp } from "./components/Pages/Guest/VisitorSignUp";
import { OrderHistory } from "./components/Pages/Visitor/OrderHistory";
import CreateEvent from "./components/Pages/Dashboard/EventOperator/CreateEvent";
import ServiceTerm from "./components/Pages/Guest/AboutPage";
import { Payment } from "./components/Pages/Visitor/Payment";
import HomePage from "./components/Pages/Guest/HomePage";
=======
import HomePageLogout from "./components/Pages/Guest/HomePageLogout";
import { SponsorSignUp } from "./components/Pages/Guest/SponsorSignUp";
import { VisitorSignUp } from "./components/Pages/Guest/VisitorSignUp";
import { OrderHistory } from "./components/Pages/Visitor/OrderHistory";
import SurveyForm from "./components/Pages/Dashboard/TestforCreateSurvey";
import CreateEvent from "./components/Pages/Dashboard/EventOperator/CreateEvent";
import ServiceTerm from "./components/Pages/Guest/AboutPage";
// import { Payment } from "./components/Pages/Visitor/Payment";
// import HomePage from "./components/Pages/Guest/HomePage";
>>>>>>> TienMerge
import EventDetail from "./components/Pages/Guest/EventDetail";
import { ManageFeedbackDetail } from "./components/Pages/Dashboard/EventOperator/ManageFeedbackDetail";
import { ManageFeedback } from "./components/Pages/Dashboard/EventOperator/ManageFeedback";
import ReactModal from "react-modal";
import TokenDecode from "./ulities/TokenDecode";
<<<<<<< HEAD
import { Login1 } from "./components/Pages/Login";
=======
// import { Login1 } from "./components/Pages/Login";
>>>>>>> TienMerge
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
<<<<<<< HEAD
import { RootState, store } from "./Store/Store";
import UpdateEvent from "./components/Pages/Dashboard/EventOperator/UpdateEvent";
import { useGetListFeedbackQuery } from "./Features/FeedbackManage/feedbackApi";
import { QuestionManage } from "./components/Organisms/Dashboard/Question";
import { InprogressEvent } from "./components/Organisms/EventOperator/InprogressEvent";
import VisitorAnswerPage from "./components/Pages/Visitor/VistiorAnswerPage";
import { AddEventToSponsor } from "./components/Organisms/Dashboard/AddEventToSponsor";
import { UpdateProgram } from "./components/Organisms/Dashboard/UpdateSponsorProgram";
import { Visitor } from "./components/Organisms/EventOperator/visitor";
import { CheckingStaffDashboard } from "./components/Pages/CheckingStaff";

function App() {
  ReactModal.setAppElement("#root");
  const { data: events, isLoading, error } = useGetListEventQuery();
  const dispatch = useDispatch();
  useGetListFeedbackQuery('1');

  useEffect(() => {
    if (events) {
      dispatch(setEvents(events));
      sessionStorage.setItem('currentTab', 'schedule')
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
=======
import { RootState } from "./Store/Store";
import UpdateEvent from "./components/Pages/Dashboard/EventOperator/UpdateEvent";
// import { PaymentPage } from "./components/Pages/Visitor/PaymentPage";
import HomePage from "./components/Pages/HomePage";
import SponsorProgram from "./components/Pages/Dashboard/Sponsor/SponsorProgram";
import SponsorProgramDetail from "./components/Pages/Dashboard/Sponsor/SponsorProgramDetail";
import { Payment } from "./components/Pages/Visitor/Payment";
import { PaymentPage } from "./components/Pages/Visitor/PaymentPage";
import { Login1 } from "./components/Pages/Login";

function App() {
  const eventId = "1";
  ReactModal.setAppElement("#root");
  const { data: events, isLoading, error } = useGetListEventQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    if (events) {
      dispatch(setEvents(events));
    }
  }, [events, dispatch]);

>>>>>>> TienMerge
  return (
    <>
      <Router>
        <Routes>
<<<<<<< HEAD
          {/* Guest  */}
          <Route path="/eventdetail" element={<EventDetail />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/sponsor-homepage" element={<SponsorHomepage />} />
          <Route path="/role-choosing" element={<RoleChoosing />} />
          {/* sponsor  */}
=======
          <Route
            path="/EventDetail"
            element={<EventDetail eventId={eventId} />}
          />
          {/* Guest  */}
          <Route path="/eventdetail" element={<EventDetail />} />
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/homepage" element={<HomePageLogout />} /> */}

          <Route path="/role-choosing" element={<RoleChoosing />} />

          {/* sponsor  */}

>>>>>>> TienMerge
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
          <Route
<<<<<<< HEAD
            path="/sponsor/dashboard/program/update/:id"
            element={
              <RequireAuth role="ROLE_SPONSOR">
                <UpdateProgram />
              </RequireAuth>
=======
            path="/sponsor-program"
            element={
                <SponsorProgram />
            }
          />
          <Route
            path="/sponsor-detail/:id"
            element={
                <SponsorProgramDetail />
>>>>>>> TienMerge
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
<<<<<<< HEAD

          <Route
            path="/event/dashboard/analytics/:id"
            element={
              <RequireAuth role="ROLE_EO">
                <AnalyticsDashboard />
              </RequireAuth>
            }
          />
=======
>>>>>>> TienMerge
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
<<<<<<< HEAD
            path="/eventoperator/event/publish/analytics/"
            element={
              <RequireAuth role="ROLE_EO">
                <ManageEvent component={<InprogressEvent />} />
              </RequireAuth>
            }
          />
          <Route
            path="/eventoperator/dashboard/event/:id"
            element={
              <RequireAuth role="ROLE_EO">
                <EO defaultTabbar={currentTab} />
=======
            path="/eventoperator/dashboard/event/:id"
            element={
              <RequireAuth role="ROLE_EO">
                <EO />
>>>>>>> TienMerge
              </RequireAuth>
            }
          />

          <Route
            path="/eventoperator/dashboard/event/update/:id"
            element={
              <RequireAuth role="ROLE_EO">
<<<<<<< HEAD
                <ManageEvent component={<InprogressEvent />} />              
=======
                <UpdateEvent />
>>>>>>> TienMerge
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
<<<<<<< HEAD
            path="/eventoperator/dashboard/visitor/:id"
            element={
              <RequireAuth role="ROLE_EO">
                <ManageEvent component={<Visitor />} />              
                </RequireAuth>
            }
          />
          <Route
=======
>>>>>>> TienMerge
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
<<<<<<< HEAD
            path="/eventoperator/dashboard/FeedbackDetail/:id"
=======
            path="/eventoperator/dashboard/FeedbackDetail"
>>>>>>> TienMerge
            element={
              <RequireAuth role="ROLE_EO">
                <ManageFeedbackDetail />
              </RequireAuth>
            }
          />
<<<<<<< HEAD
          <Route
            path="/eventoperator/dashboard/FeedbackQuestionDetail/:id"
            element={
              <RequireAuth role="ROLE_EO">
                <QuestionManage />
              </RequireAuth>
            }
          />
=======
>>>>>>> TienMerge

          {/* Visitor  */}
          <Route
            path="/payment"
<<<<<<< HEAD
=======
            Component={Payment}
>>>>>>> TienMerge
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
<<<<<<< HEAD
=======
          <Route
            path="/paymentpage"
            element={
              <RequireAuth role="ROLE_VISITOR">
                <PaymentPage />
              </RequireAuth>
            }
          />
>>>>>>> TienMerge

          {/* Admin  */}
          <Route
            path="/admin"
            element={
              <RequireAuth role="ROLE_ADMIN">
<<<<<<< HEAD
                <Admin Role="ROLE_SPONSOR" />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/visitor"
            element={
              <RequireAuth role="ROLE_ADMIN">
                <Admin Role="ROLE_VISITOR" />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/eventoperator"
            element={
              <RequireAuth role="ROLE_ADMIN">
                <Admin Role="ROLE_EO" />
              </RequireAuth>
            }
          />
          {/* Checking Staff  */}

          <Route
            path="/admin/checkingstaff"
            element={
              <RequireAuth role="ROLE_CHECKING_STAFF">
                {/* <Admin Role="ROLE_CHECKING_STAFF" /> */}
                <CheckingStaffDashboard />
              </RequireAuth>
            }
          />
=======
                <Admin />
              </RequireAuth>
            }
          />

>>>>>>> TienMerge
          <Route path="/sponsor" element={<SponsorSignUp />} />
          <Route path="/visitor" element={<VisitorSignUp />} />
          {/* <Route path="/survey" element={<SurveyForm />} /> */}
          {/* <Route path="/question" element={<QuestionForm />} /> */}
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/service-term" element={<ServiceTerm />} />
<<<<<<< HEAD
          <Route path="/test" element={<TokenDecode />} />
          <Route path="/login" element={<Login1 />} />
          <Route path="/visitorAnswer" element={<VisitorAnswerPage />} />
=======
          {/* <Route path="/checkstaff" element={<AddCheckStaffTable />} />
          <Route path="/sponsor-table" element={<AddSponsorTable />} />
          <Route path="/event-table" element={<EventScheduleTable />} /> */}
          <Route path="/event-detail/:id" element={<EventDetail />} />
>>>>>>> TienMerge

          <Route path="/test" element={<TokenDecode />} />
          <Route path="/login" element={<Login1 />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
