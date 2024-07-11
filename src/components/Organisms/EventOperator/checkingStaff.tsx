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
import {
  BiEnvelope,
} from "react-icons/bi";
import { eventCheckingStaff } from "../../../Types/eo.type";
import React, { useState } from "react";
import { RootState } from "../../../Store/Store";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAddCheckingStaffMutation, useDeleleCheckingStaffMutation, useGetListEventQuery } from "../../../Features/EventManage/eventApi";
import { addNotification } from "../../../Features/Utils/notificationsSlice";
import { Alert } from "../../Molecules/Alert";
import { setTab } from "../../../Features/Utils/tabSlice";
// import { Alert } from "../../../Molecules/Alert";

type Props = {
  Staff: eventCheckingStaff[];
};
export const AddCheckStaffTable: React.FC<Props> = (props) => {
  const { id } = useParams();
  // const Events = useSelector((state: RootState) => state.events.events);
  const { data, error, isLoading, isFetching } = useGetListEventQuery();
  const [deleleCheckingStaff] = useDeleleCheckingStaffMutation()
  const [fill, setFill] = useState("")
  const Staff = data?.find((event) => event.id === parseInt(id))?.eventCheckingStaffs || [];
  
  const tableHeaders = ["No", "Email", "Password", "Delete"];
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>, checkingStaffId: number) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của button nếu có

    try {
      await deleleCheckingStaff({ checkingStaffId, eventId: id }).unwrap();
      dispatch(
        addNotification({
          id: new Date().getTime(), // Sử dụng timestamp làm ID
          message: "Staff deleted successfully",
          type: "success",
          timestamp: Date.now(), // Thời gian hiện tại
        })
      );
      dispatch(setTab("checking"));
      window.location.reload();
    } catch (error) {
      console.error('Failed to delete the staff:', error);
      alert('Failed to delete the staff');
    }
  };
  const tableRows: StaffTable[] = Staff.map((item, index) => ({
    No: index + 1,
    Email: item.account.email,
    Password: item.account.password,
    // Date: "01/01/2023",
    Delete: (
      <Button size="icon" variant="link"  onClick={(e) => handleDelete(e,item.id)}>
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
  const [addCheckingStaff, {isLoading: isCreating}] =
    useAddCheckingStaffMutation();
  const [email, setEmail] = useState("");
  const checkingStaff = {
    email: email,
    accountId: accountId,
    information: null,
    eventId: id,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(JSON.stringify(checkingStaff))
      // Check if the checkingStaff array is empty
  if (!checkingStaff.email || checkingStaff.email.trim() === ""){
    // Handle the case when checkingStaff is empty
    // For example, display an error message or disable the submission
    setFill("Email can be not empty !")
    return; // Exit the function to prevent further execution
  } else {
    try {
      await addCheckingStaff({ id: id, newStaff: checkingStaff }).unwrap();
      dispatch(
        addNotification({
          id: new Date().getTime(), // Sử dụng timestamp làm ID
          message: "Create staff successfully!",
          type: "success",
          timestamp: Date.now(), // Thời gian hiện tại
        })
      );
      dispatch(setTab("checking"));
      // window.location.reload();
    } catch (err) {
      dispatch(
        addNotification({
          id: new Date().getTime(), // Sử dụng timestamp làm ID
          message: "Create staff unsuccessfully!",
          type: "error",
          timestamp: Date.now(), // Thời gian hiện tại
        })
      );
      console.error("Failed to create the event:", err);
      setFill("This Email is already existed !")
    }
  }
    
  };
  const paginationItems = [1, 2, 3, 4];
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  {isFetching && <div>Updating...</div>}
  return (
    <>
    {Staff.length === 0 ? <div className="text-center">No checking staff</div> : (
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
      
      </>
    )}
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
              {fill && <Alert text={fill} />}
              <DialogFooter className="mt-4">
                <Button size="sm">{isCreating ? "Creating" : "Done"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  );
};
