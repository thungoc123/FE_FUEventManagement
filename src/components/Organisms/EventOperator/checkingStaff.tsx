import { StaffTable } from "../../../Types/checkingstaff";
import { BiTrash } from "react-icons/bi";
// import { ApplicationShell4 } from "./AppModel";
// import AddCheckingStaff from "./AddCheckingStaff";
// import AddFeedbackButton from "./AddFeedbackButton";
// import { TableTemplate } from "../Dashboard/Table1";
import AddFeedbackButton from "../Dashboard/AddFeedbackButton";
import { TableTemplate } from "../Dashboard/TableTemplate";
import { Button, Input, Label } from "@relume_io/relume-ui";
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
} from "@relume_io/relume-ui";
import { BiLogoGoogle } from "react-icons/bi";
import {
  BiCalendarAlt,
  BiUser,
  BiHourglass,
  BiTime,
  BiEnvelope,
} from "react-icons/bi";
import { eventCheckingStaff } from "../../../Types/eo.type";
import React, { useState } from "react";
import { RootState } from "../../../Store/Store";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAddCheckingStaffMutation } from "../../../Features/EventManage/eventApi";
import { addNotification } from "../../../Features/Utils/notificationsSlice";

type Props = {
  Staff: eventCheckingStaff[];
};
export const AddCheckStaffTable: React.FC<Props> = (props) => {
  const { id } = useParams();
  const Events = useSelector((state: RootState) => state.events.events);

  const Staff = Events?.find(event => event.id === parseInt(id))?.eventCheckingStaffs || []
  const tableHeaders = ["No", "Email", "Password", "Delete"];
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const tableRows: StaffTable[] = Staff.map((item, index) => ({
    No: index +1,
    Email: item.account.email,
    Password: item.account.password,
    // Date: "01/01/2023",
    Delete: ( 
      <Button size="icon" variant="link">
        {" "}
        <BiTrash />
      </Button>
    ),
  }));

  const tableHeaderClasses = [
    "w-[200px] pr-4 xxl:w-[225px]",
    "w-[200px] pr-4 xxl:w-[250px]",
    "w-[200px] pr-4 xxl:w-[250px]",
  ];
  const accountId = useSelector((state: RootState) => state.auth.accountId);
  const [addCheckingStaff, { isLoading, isSuccess, isError, error }] = useAddCheckingStaffMutation();
  const [email, setEmail] = useState("")
  const checkingStaff = {
    email: email,
    accountId: accountId,
    information: null,
    eventId: id
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log(JSON.stringify(checkingStaff))
    try {
      await addCheckingStaff({id: id, newStaff: checkingStaff}).unwrap();
      dispatch(addNotification({
        id: new Date().getTime(), // Sử dụng timestamp làm ID
        message: 'Create staff successfully!',
        type: 'success',
        timestamp: Date.now(), // Thời gian hiện tại
      }));
      navigate('/eventoperator/dashboard/event/')
      // alert('Event created successfully!');
    } catch (err) {
      dispatch(addNotification({
        id: new Date().getTime(), // Sử dụng timestamp làm ID
        message: 'Create staff unsuccessfully!',
        type: 'error',
        timestamp: Date.now(), // Thời gian hiện tại
      }));
      console.error('Failed to create the event:', err);
    }
  }
  const paginationItems = [1, 2, 3, 4];
  return (
    <>
      <TableTemplate
        headerTitle="Checking Staff"
        headerDescription="List of Checking Staff"
        buttons={[
          {
            children: <AddFeedbackButton />,

            size: "sm",
          },
        ]}
        tableHeaders={tableHeaders}
        tableRows={tableRows} // Truyền dữ liệu mới cho tableRows
        paginationItems={paginationItems}
        tableHeadersClasses={tableHeaderClasses}
      />
      <Dialog>
        <DialogTrigger asChild>
          <Button>New</Button>
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay className="bg-black/50" />
          <DialogContent className="w-full max-w-md bg-white p-10 md:p-12">
            <DialogHeader>
              <DialogTitle>Add Checking Staff</DialogTitle>
              <DialogDescription>Modal Description</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                // className="block mb-2 text-sm font-medium text-gray-700"
                htmlFor="objectives"
              >
                Enter your checking staff email *
              </label>
              {/* <DatePicker /> */}

              <Input
                className="h-1/2"
                id="search"
                placeholder="Search"
                icon={<BiEnvelope className="size-6" />}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <DialogFooter className="mt-4">
          
              <Button size="sm">Done</Button>
            </DialogFooter>
            </form>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  );
};
