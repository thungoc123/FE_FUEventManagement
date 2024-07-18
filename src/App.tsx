// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import RoleChoosing from "./components/Pages/Guest/RoleChosing";
import QuestionForm from "./components/Pages/Dashboard/EventOperator/Question";
// import SponsorHomepage from "./components/Pages/Guest/SponsorProgramePage";
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
// import { Payment } from "./components/Pages/Visitor/Payment";
// import HomePage from "./components/Pages/Guest/HomePage";
import EventDetail from "./components/Pages/Guest/EventDetail";
import { ManageFeedbackDetail } from "./components/Pages/Dashboard/EventOperator/ManageFeedbackDetail";
import { ManageFeedback } from "./components/Pages/Dashboard/EventOperator/ManageFeedback";
import ReactModal from "react-modal";
import TokenDecode from "./ulities/TokenDecode";
// import { Login1 } from "./components/Pages/Login";
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
import { RootState } from "./Store/Store";
import UpdateEvent from "./components/Pages/Dashboard/EventOperator/UpdateEvent";
// import { PaymentPage } from "./components/Pages/Visitor/PaymentPage";
import HomePage from "./components/Pages/HomePage";
import SponsorProgram from "./components/Pages/Dashboard/Sponsor/SponsorProgram";
import SponsorProgramDetail from "./components/Pages/Dashboard/Sponsor/SponsorProgramDetail";
import { Payment } from "./components/Pages/Visitor/Payment";
import { PaymentPage } from "./components/Pages/Visitor/PaymentPage";
import { Login1 } from "./components/Pages/Login";
import { EventProfit } from "./components/Organisms/EventOperator/EventProfit";
import PaymentSuccessfullPage from "./components/Pages/Visitor/PaymentSuccessfullPage";

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

  return (
    <>
      <Router>
        <Routes>
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
            path="/sponsor/dashboard/program/detail"
            element={
              <RequireAuth role="ROLE_SPONSOR">
                <SponsorProgramDetail />
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
          <Route path="/sponsor-program" element={<SponsorProgram />} />
          <Route
            path="/sponsor-detail/:id"
            element={<SponsorProgramDetail />}
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
                <EO />
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
            path="/eventoperator/dashboard/event-profit"
            element={
              <RequireAuth role="ROLE_EO">
                <ManageEvent component={<EventProfit />} />
              </RequireAuth>
            }
          />
          <Route
            path="/sponsor/dashboard/event-profit"
            element={
              <RequireAuth role="ROLE_EO">
                <ManageEvent component={<EventProfit />} />
              </RequireAuth>
            }
          />
          <Route
            path="/eventoperator/dashboard/FeedbackDetail"
            element={
              <RequireAuth role="ROLE_EO">
                <ManageFeedbackDetail />
              </RequireAuth>
            }
          />

          {/* Visitor  */}
          <Route
            path="/payment"
            Component={Payment}
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
          <Route
            path="/paymentpage"
            element={
              <RequireAuth role="ROLE_VISITOR">
                <PaymentPage />
              </RequireAuth>
            }
          />
          <Route
            path="/payment-successfull"
            element={
              <RequireAuth role="ROLE_VISITOR">
                 <PaymentSuccessfullPage/> 
              </RequireAuth>
            }
          />

          {/* Admin  */}
          <Route
            path="/admin"
            element={
              <RequireAuth role="ROLE_ADMIN">
                <Admin />
              </RequireAuth>
            }
          />

          <Route path="/sponsor" element={<SponsorSignUp />} />
          <Route path="/visitor" element={<VisitorSignUp />} />
          {/* <Route path="/survey" element={<SurveyForm />} /> */}
          {/* <Route path="/question" element={<QuestionForm />} /> */}
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/service-term" element={<ServiceTerm />} />
          {/* <Route path="/checkstaff" element={<AddCheckStaffTable />} />
          <Route path="/sponsor-table" element={<AddSponsorTable />} />
          <Route path="/event-table" element={<EventScheduleTable />} /> */}

          <Route
            path="/event-detail/:id"
            element={
              <RequireAuth role="ROLE_VISITOR">
                <EventDetail />
              </RequireAuth>
            }
          />

          <Route path="/test" element={<TokenDecode />} />
          <Route path="/login" element={<Login1 />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
