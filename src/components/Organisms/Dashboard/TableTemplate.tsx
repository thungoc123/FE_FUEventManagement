import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    ButtonProps,
  } from "@relume_io/relume-ui";
import { Link } from "react-router-dom";
  
  type Props<T> = {
    headerTitle: string;
    headerDescription: string;
    buttons: ButtonProps[];
    tableHeaders: string[];
    tableRows: T[];
    paginationItems: number[];
  };
  
  export const TableTemplate = <T extends Record<string, any>>(
    props: React.ComponentPropsWithoutRef<"section"> & Props<T>
  ) => {
    const { headerTitle, headerDescription, buttons, tableHeaders, tableRows, paginationItems } = {
    //   ...TableTemplateDefaults,
      ...props,
    } as Props<T>;
  
    const tableHeaderClasses = [
      "w-[200px] pr-4 xxl:w-[25px]",
      "w-[200px] pr-4 xxl:w-[250px]",
      "w-[128px] pr-4 xxl:w-[250px]",
      "w-[200px] pr-4 xxl:w-[250px]",
      "w-[192px] pr-4 xxl:w-[150px]",
      "w-[96px] pr-4 text-center",
    ];
  
    return (
      <section className="px-[1%] py-2 md:py-1 lg:py-1">
        <div className="container relative pb-2">
          <div className="flex flex-col items-start justify-between gap-2 border border-b-0 border-border-primary p-6 sm:flex-row sm:items-center">
            <div>
              <h1 className="mb-1 text-md font-semibold md:text-lg">{headerTitle}</h1>
              <p>{headerDescription}</p>
            </div>
            <div className="flex gap-4">
              {buttons.map((buttonProps, index) => (
                <Button key={index} {...buttonProps} />
              ))}
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                {tableHeaders.map((header, index) => (
                  <TableHead key={index} className={tableHeaderClasses[index]}>
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
            {tableRows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {/* Duyệt qua từng cột trong tableHeaders để hiển thị dữ liệu tương ứng từ row */}
                {tableHeaders.map((header, colIndex) => (
                  <TableCell key={colIndex}>
                    {/* Hiển thị dữ liệu của từng cột, sử dụng [header] để truy cập giá trị trong row */}
                    {row[header]}
                    {/* <Link to="/EventDetail" target="_blank">View Details</Link> */}
                    </TableCell>
                ))}
              </TableRow>
            ))}
            </TableBody>
          </Table>
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" size="sm" variant="secondary" />
              </PaginationItem>
              <PaginationItem className="hidden md:block">
                {paginationItems && paginationItems.map((item, index) => (
                  <PaginationLink key={index} href="#" size="sm" variant="link" className="px-4 py-2">
                    {item}
                  </PaginationLink>
                ))}
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" size="sm" variant="secondary" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </section>
    );
  };
  
//   export const TableTemplateDefaults: Props<Record<string, any>> = {
//     headerTitle: "Table Header",
//     headerDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     buttons: [
//       { children: "Button", variant: "secondary", size: "sm" },
//       { children: "Button", size: "sm" },
//     ],
//     tableHeaders: ["No", "Question", "Number", "Survey Name", "Date", "View"],
//     tableRows: [
//       {
//         No: "1" ,
//         Question: 'Question 1',
//         Number: 2,
//         SurveyName: "Test",
//         Date: "20/11/2023",
//         View: "view"
//       },
//       {
//         No: "2" ,
//         Question: 'Question 1',
//         Number: 2,
//         SurveyName: "Test",
//         Date: "20/11/2023",
//         View: "view"
//       },
//       {
//         No: "3" ,
//         Question: 'Question 1',
//         Number: 2,
//         SurveyName: "Test",
//         Date: "20/11/2023",
//         View: "view"
//       },
//     ],
//     paginationItems: [1, 2, 3, 4, 5],
//   };
  
  TableTemplate.displayName = "Table1";
  