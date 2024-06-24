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
    ButtonProps,
  } from "@relume_io/relume-ui";
import AddCheckingStaff from "./AddCheckingStaff";
  
  type Props<T> = {
    headerTitle: string;
    headerDescription: string;
    buttons: ButtonProps[];
    tableHeaders: string[];
    tableRows: T[];
    paginationItems: number[];
  };
  
  const CustomButton = ({ href, size, variant, children }: ButtonProps) => (
    <Button href={href} size={size} variant={variant}>
      {children}
    </Button>
  );
  
  export const TableTemplate = <T extends Record<string, any>>(
    props: React.ComponentPropsWithoutRef<"section"> & Props<T>
  ) => {
    const { headerTitle, headerDescription, buttons, tableHeaders, tableRows, paginationItems } = {
      ...props,
    } as Props<T>;
  
    const tableHeaderClasses = [
      "w-[200px] pr-4 xxl:w-[250px]",
      "w-[200px] pr-4 xxl:w-[250px]",
      "w-[128px] pr-4 xxl:w-[250px]",
      "w-[200px] pr-4 xxl:w-[250px]",
      "w-[192px] pr-4 xxl:w-[150px]",
      "w-[192px] pr-4 xxl:w-[150px]",
      "w-[192px] pr-4 xxl:w-[150px]",
      "w-[192px] pr-4 xxl:w-[150px]",
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
                  {tableHeaders.map((header, colIndex) => (
                    <TableCell key={colIndex}>
                      {row[header]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <>
          
          
          
            </>
        <AddCheckingStaff/>
        </div>
      </section>
    );
  };
  
  TableTemplate.displayName = "Table1";
  