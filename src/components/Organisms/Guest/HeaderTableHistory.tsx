import React, { useState, ChangeEvent } from "react";
import SearchBar from "./SearchBar";
import CustomPagination from "./components/Organisms/Guest";
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

type TableData = {
  TransactionID: string;
  Event: string;
  Date: number;
  Price: number;
  Quantity: number;
  Status: string;
  link: string;
};

type Props = {
  headerTitle: string;
  headerDescription: string;
  buttons: ButtonProps[];
  tableHeaders: string[];
  tableRows: TableData[];
  paginationItems: number[];
};

export type Table1Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Table1 = (props: Table1Props) => {
  const { headerTitle, headerDescription, buttons, tableHeaders, tableRows, paginationItems } = {
    ...Table1Defaults,
    ...props,
  } as Props;

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container relative pb-20">
        <div className="flex flex-col items-start justify-between gap-4 border border-b-0 border-border-primary p-6 sm:flex-row sm:items-center">
          <div>
            <h1 className="mb-1 text-md font-semibold md:text-lg text-left">{headerTitle}</h1>
            <p>{headerDescription}</p>
          </div>
          <SearchBar value={searchQuery} onChange={handleSearchChange} />
        </div>
        <Table className="min-w-full bg-white border border-gray-200">
          <TableHead>
            <TableRow>
              {tableHeaders.map((header, index) => (
                <TableCell key={index} className="h-12 px-6 py-4 text-left align-middle text-base font-semibold text-text-primary underline [&:has([role=checkbox])]:pr-0">
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell className="h-12 px-6 py-4 text-left align-middle text-base font-semibold text-text-primary underline [&:has([role=checkbox])]:pr-0">{row.TransactionID}</TableCell>
                <TableCell className="h-12 px-6 py-4 text-left align-middle text-base font-semibold text-text-primary underline [&:has([role=checkbox])]:pr-0">{row.Event}</TableCell>
                <TableCell className="h-12 px-6 py-4 text-left align-middle text-base font-semibold text-text-primary underline [&:has([role=checkbox])]:pr-0">{row.Date}</TableCell>
                <TableCell className="h-12 px-6 py-4 text-left align-middle text-base font-semibold text-text-primary underline [&:has([role=checkbox])]:pr-0">{row.Price}</TableCell>
                <TableCell className="h-12 px-6 py-4 text-left align-middle text-base font-semibold text-text-primary underline [&:has([role=checkbox])]:pr-0">{row.Quantity}</TableCell>
                <TableCell className="h-12 px-6 py-4 text-left align-middle text-base font-semibold text-text-primary underline [&:has([role=checkbox])]:pr-0">
                  <span className={`px-2 py-1 rounded ${row.Status.toLowerCase() === 'not complete' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {row.Status}
                  </span>
                </TableCell>
                <TableCell className="h-12 px-6 py-4 text-left align-middle text-base font-semibold text-text-primary underline [&:has([role=checkbox])]:pr-0 text-center font-semibold">
                  <a href={row.link}>View</a>
                </TableCell>
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
              {paginationItems.map((item, index) => (
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

export const Table1Defaults: Table1Props = {
  headerTitle: "Table Header",
  headerDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  tableHeaders: ["Transaction ID", "Event", "Date", "Price", "Quantity", "Status", ""],
  tableRows: [
    {
      TransactionID: "Full name",
      Event: "Company name",
      Date: 14,
      Price: "Team name",
      Quantity: "Jan 11, 2050",
      Status: "#",
      link: "#",
    },
    {
      TransactionID: "Full name",
      Event: "Company name",
      Date: 14,
      Price: "Team name",
      Quantity: "Jan 11, 2050",
      Status: "#",
      link: "#",
    },
    {
      TransactionID: "Full name",
      Event: "Company name",
      Date: 14,
      Price: "Team name",
      Quantity: "Jan 11, 2050",
      Status: "#",
      link: "#",
    },
    {
      TransactionID: "Full name",
      Event: "Company name",
      Date: 14,
      Price: "Team name",
      Quantity: "Jan 11, 2050",
      Status: "#",
      link: "#",
    },
    {
      TransactionID: "Full name",
      Event: "Company name",
      Date: 14,
      Price: "Team name",
      Quantity: "Jan 11, 2050",
      Status: "#",
      link: "#",
    },
    {
      TransactionID: "Full name",
      Event: "Company name",
      Date: 14,
      Price: "Team name",
      Quantity: "Jan 11, 2050",
      Status: "#",
      link: "#",
    },
  ],
  paginationItems: [1, 2, 3, 4, 5, 6],
};

Table1.displayName = "Table1";
