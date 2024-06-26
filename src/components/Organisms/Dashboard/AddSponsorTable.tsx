// import { BiEdit } from "react-icons/bi";
// import { ApplicationShell4 } from "./AppModel";
// import { TableTemplate } from "./Table1";
// import AddFeedbackButton from "./AddFeedbackButton";
// import { SponsorTable } from "../../../Type/sponsor";

// export const AddSponsorTable = () => {
//   const tableHeaders = ["Name","Sponsor_Program", "Email", "Date", "Edit"];
//   const tableRows: SponsorTable[] = [
//     {
//       Name: "Nguyen Van A",
//       Sponsor_Program:"SU KIEN",
//       Email: "123@gmail.com",
//       Date: "01/01/2023",
//       Edit: <BiEdit />
//       ,
//     },
//     {
//         Name: "Nguyen Van A",
//         Sponsor_Program:"SU KIEN",
//         Email: "123@gmail.com",
//         Date: "01/01/2023",
//         Edit: <BiEdit />
//     },
//     {
//         Name: "Nguyen Van A",
//         Sponsor_Program:"SU KIEN",
//         Email: "123@gmail.com",
//         Date: "01/01/2023",
//         Edit: <BiEdit />
//     },
//   ];
//   const paginationItems = [1, 2, 3, 4, 5];
//   return (
//     <>
//       <ApplicationShell4
//         MainComponent={
//           <TableTemplate
//             headerTitle="Sponsor"
//             headerDescription="List of Sponsor"
//             buttons={[
//               {
//                 children: <AddFeedbackButton/>,
                
//                 size: "sm",
//               },
             
//             ]}
//             tableHeaders={tableHeaders}
//             tableRows={tableRows} // Truyền dữ liệu mới cho tableRows
//             paginationItems={paginationItems}
//           />
//         }
//         // MainComponent = { <Table1 />}
//         // StateComponent={<AddCheckingStaff />}
//       />
//     </>
//   );
// };
import { BiEdit } from "react-icons/bi";
import { ApplicationShell4 } from "./AppModel";
import { TableTemplate } from "./Table1";
import AddFeedbackButton from "./AddFeedbackButton";
import { SponsorTable } from "../../../Type/sponsor";
import { useGetSponsorQuery } from '../../../Features/Sponsor/sponsorApi';

export const AddSponsorTable = () => {
  const { data: sponsors, error, isLoading } = useGetSponsorQuery();

  // Hiển thị thông báo tải
  if (isLoading) return <div>Loading...</div>;

  // Hiển thị thông báo lỗi
  if (error) {
    let errorMessage;
    if ('status' in error) {
      errorMessage = 'error' in error ? error.error : JSON.stringify(error.data);
    } else {
      errorMessage = error.message;
    }
    return <div>Error: {errorMessage}</div>;
  }

  const tableRows: SponsorTable[] = sponsors?.map((sponsor) => ({
    Name: sponsor.companyName,
    Sponsor_Program: sponsor.information, 
    Email: sponsor.fptStaffEmail,
    Date: "01/01/2023", 
    Edit: <BiEdit />
  })) || [];

  const tableHeaders = ["Name", "Sponsor_Program", "Email", "Date", "Edit"];
  const paginationItems = [1, 2, 3, 4, 5];

  return (
    <ApplicationShell4
      MainComponent={
        <TableTemplate
          headerTitle="Sponsor"
          headerDescription="List of Sponsor"
          buttons={[
            {
              children: <AddFeedbackButton />,
              size: "sm",
            },
          ]}
          tableHeaders={tableHeaders}
          tableRows={tableRows} 
          paginationItems={paginationItems}
        />
      }
    />
  );
};
