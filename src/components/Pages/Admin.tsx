import { AccountTable } from "../../Types/account";
import { ApplicationShell4 } from "../Organisms/Dashboard/ApplicationShell";
import { TableTemplate } from "../Organisms/Dashboard/TableTemplate";
import { BiEdit, BiTrash } from "react-icons/bi";

export const Admin = () => {
  const tableHeaders = ["Name", "Email", "Role", "Password", "Edit", "Delete"];
  const tableHeaderClasses = [
    "w-[200px] pr-4 xxl:w-[125px]",
    "w-[200px] pr-4 xxl:w-[100px]",
    "w-[128px] pr-4 xxl:w-[30px]",
    "w-[200px] pr-4 xxl:w-[100px]",
    "w-[192px] pr-4 xxl:w-[50px]",
    "w-[192px] pr-4 xxl:w-[70px]",
  ];
  const tableRows: AccountTable[] = [
    {
      Name: "Nguyen Van A",
      Email: "123@gmail.com",
      Role: "Sponsor",
      Password: "123",
      Edit: <BiEdit />,
      Delete: <BiTrash />,
    },
    {
      Name: "Nguyen Van A",
      Email: "123@gmail.com",
      Role: "Sponsor",
      Password: "123",
      Edit: <BiEdit />,
      Delete: <BiTrash />,
    },
    {
      Name: "Nguyen Van A",
      Email: "123@gmail.com",
      Role: "Sponsor",
      Password: "123",
      Edit: <BiEdit />,
      Delete: <BiTrash />,
    },
  ];
  const paginationItems = [1, 2, 3, 4, 5];

  return (
    <>
      <ApplicationShell4
        MainComponent={
          <TableTemplate
            headerTitle="Admin"
            headerDescription="List of Account"
            tableHeaders={tableHeaders}
            tableRows={tableRows}
            paginationItems={paginationItems}
            tableHeadersClasses={tableHeaderClasses}
          />
        }
      />
    </>
  );
};
