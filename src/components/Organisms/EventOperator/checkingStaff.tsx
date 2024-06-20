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
import { BiCalendarAlt, BiUser, BiHourglass, BiTime, BiEnvelope } from "react-icons/bi";

export const AddCheckStaffTable = () => {
  const tableHeaders = ["Name", "Email", "Date", "Delete"];
  const tableRows: StaffTable[] = [
    {
      Name: "Nguyen Van A",
      Email: "123@gmail.com",
      Date: "01/01/2023",
      Delete: (
        <Button size="icon" variant="link">
          {" "}
          <BiTrash />
        </Button>
      ),
    },
    {
      Name: "Nguyen Van A",
      Email: "123@gmail.com",
      Date: "01/01/2023",
      Delete: (
        <Button size="icon" variant="link">
          {" "}
          <BiTrash />
        </Button>
      ),
    },
    {
      Name: "Nguyen Van A",
      Email: "123@gmail.com",
      Date: "01/01/2023",
      Delete: (
        <Button size="icon" variant="link">
          {" "}
          <BiTrash />
        </Button>
      ),
    },
  ];
  const tableHeaderClasses = [
    "w-[200px] pr-4 xxl:w-[225px]",
    "w-[200px] pr-4 xxl:w-[150px]",
    "w-[128px] pr-4 xxl:w-[250px]",
    "w-[200px] pr-4 xxl:w-[250px]",
    // "w-[192px] pr-4 xxl:w-[150px]",
    // "w-[96px] pr-4 text-right",
  ];
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
            <div className="mb-4">
              <label
                // className="block mb-2 text-sm font-medium text-gray-700"
                htmlFor="objectives"
              >
                Enter your checking staff email *
              </label>
              {/* <DatePicker /> */}

              <Input className="h-1/2"
                id="search"
                placeholder="Search"
                icon={<BiEnvelope className="size-6" />}
              />
            </div>
            <DialogFooter className="mt-4">
              <Button variant="secondary" size="sm">Cancel</Button>

              <Button size="sm">Done</Button>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </Dialog>{" "}
    </>
  );
};
