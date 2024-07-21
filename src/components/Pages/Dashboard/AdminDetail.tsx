import React, { FormEvent, useState } from "react";
import {
  useActiveAccountMutation,
  useCreateEventOperatorMutation,
  useDeactiveAccountMutation,
  useGetAccountsQuery,
} from "../../../Features/Admin/AdminApi";
import { AccountTable, account } from "../../../Types/account";
import { BiUserMinus, BiUserCheck } from "react-icons/bi";
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
  DialogDescription,
  Label,
  Input,
} from "@relume_io/relume-ui";
import { useDispatch } from "react-redux";
import { addNotification } from "../../../Features/Utils/notificationsSlice";
import { TableTemplate } from "../../Organisms/Dashboard/TableTemplate";

type AdminProps = {
  Role: string;
};
export const AdminDetail: React.FC<AdminProps> = (prop) => {
  const tableHeaders = [
    "No",
   
    "Email",
    "Role",
    "Password",
    "State",
    "Edit",
  ];

  const { data: accounts, refetch, isLoading, error } = useGetAccountsQuery();
  const tableHeaderClasses = [
    "w-[200px] pr-4 xxl:w-[25px]",
    // "w-[200px] pr-4 xxl:w-[100px]",
    "w-[128px] pr-4 xxl:w-[130px]",
    "w-[200px] pr-4 xxl:w-[100px]",
    "w-[192px] pr-4 xxl:w-[50px]",
    "w-[192px] pr-4 xxl:w-[50px]",
    "w-[192px] pr-4 xxl:w-[70px]",
  ];
  const dispatch = useDispatch();
  const sponsor = accounts?.filter(
    (account: account) => account.role.roleName === prop.Role
  );
  console.log(sponsor);
  const [deactiveAccount] = useDeactiveAccountMutation();
  const [activeAccount] = useActiveAccountMutation();
  const [createEventOperator, isCreating] = useCreateEventOperatorMutation();
  const handleDisableSubmit = async (e, id: number) => {
    e.preventDefault();

    try {
      await deactiveAccount(id).unwrap();
      dispatch(
        addNotification({
          id: new Date().getTime(), // Sử dụng timestamp làm ID
          message: "Deactive account successfully!",
          type: "success",
          timestamp: Date.now(), // Thời gian hiện tại
        })
      );
      // refetch()
      window.location.reload();
    } catch (err) {
      dispatch(
        addNotification({
          id: new Date().getTime(), // Sử dụng timestamp làm ID
          message: "Deactive account unsuccessfully!",
          type: "error",
          timestamp: Date.now(), // Thời gian hiện tại
        })
      );
      refetch();
      console.error("Failed to create the event:", err);
    }
  };
  const [eventOperatorData, setEventOperatorData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    information: null,
  });
  const handleChange = (e) => {
    setEventOperatorData({
      ...eventOperatorData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        await createEventOperator(eventOperatorData).unwrap();
        dispatch(
            addNotification({
              id: new Date().getTime(), // Sử dụng timestamp làm ID
              message: "Create account successfully!",
              type: "success",
              timestamp: Date.now(), // Thời gian hiện tại
            })
          );
          // refetch()
          window.location.reload();
        
      } catch (error) {
        dispatch(
            addNotification({
              id: new Date().getTime(), // Sử dụng timestamp làm ID
              message: "Create account unsuccessfully!",
              type: "error",
              timestamp: Date.now(), // Thời gian hiện tại
            })
          );
          refetch();
          console.error("Failed to create the event:", error);
    } 
  };
  const handleEnableSubmit = async (e, id: number) => {
    e.preventDefault();
    try {
      await activeAccount(id).unwrap();
      dispatch(
        addNotification({
          id: new Date().getTime(), // Sử dụng timestamp làm ID
          message: "Activate account successfully!",
          type: "success",
          timestamp: Date.now(), // Thời gian hiện tại
        })
      );
      window.location.reload();
    } catch (err) {
      dispatch(
        addNotification({
          id: new Date().getTime(), // Sử dụng timestamp làm ID
          message: "Activate account unsuccessfully!",
          type: "error",
          timestamp: Date.now(), // Thời gian hiện tại
        })
      );
      console.error("Failed to create the event:", err);
    }
  };
  const tableRows: AccountTable[] = sponsor?.map((account: account, index) => ({
    No: index + 1,
    // Name: account.email,
    Email: account.email,
    Role: account.role.roleName,
    Password: account.password,
    State: account.enabled == 1 ? "Active" : "Deactive",
    Edit:
      account.enabled == 1 ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button size="icon" variant="link">
              <BiUserMinus />
            </Button>
          </DialogTrigger>
          <DialogPortal>
            <DialogOverlay className="bg-black/50" />
            <DialogContent className="w-full max-w-md bg-white p-10 md:p-12">
              <DialogHeader>
                <DialogTitle>
                  Do you sure to deactive this account ?
                </DialogTitle>
              </DialogHeader>
              <DialogFooter className="p-5">
                <Button onClick={(e) => handleDisableSubmit(e, account.id)}>
                  Yes
                </Button>
              </DialogFooter>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      ) : (
        <Button
          size="icon"
          variant="primary"
          onClick={(e) => handleEnableSubmit(e, account.id)}
        >
          <BiUserCheck />
        </Button>
      ),
    // Delete: <BiTrash />,
  }));
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const paginationItems = [1, 2, 3, 4, 5];
  return (
    <>
      <TableTemplate
        headerTitle="Admin"
        headerDescription="List of Account"
        tableHeaders={tableHeaders}
        tableRows={tableRows}
        paginationItems={paginationItems}
        tableHeadersClasses={tableHeaderClasses}
      />
      {prop.Role == "ROLE_EO" && (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create EO Account</Button>
          </DialogTrigger>
          <DialogPortal>
            <DialogOverlay className="bg-black/50" />
            <DialogContent className="w-full max-w-md bg-white p-10 md:p-12">
              <DialogHeader>
                <DialogTitle>Create Event Operator</DialogTitle>
                {/* <DialogDescription>Modal Description</DialogDescription> */}
              </DialogHeader>
              <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
                <div className="grid w-full items-center text-left">
                  <Label htmlFor="email" className="mb-2">
                    Gmail*
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={eventOperatorData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid w-full items-center text-left">
                  <Label htmlFor="password" className="mb-2">
                    Password*
                  </Label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    value={eventOperatorData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
               
                
                    {/* {isLoading ? "Signing in..." : signUpButton.title} */}
                  
                
            
                {/* {isError && (
                  <p style={{ color: "red" }}>
                    {error?.data || "Sign up failed"}
                  </p>
                )} */}
                {/* <Button variant="link" size="link" asChild>
                
                Create
            
                </Button> */}
              <DialogFooter>
                <Button className="mt-5">
                  {isCreating ? "Create" : "Signing in..." }

                </Button>
              </DialogFooter>
              </form>

            </DialogContent>
          </DialogPortal>
        </Dialog>
      )}
    </>
  );
};
