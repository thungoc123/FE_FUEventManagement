import {
<<<<<<< HEAD
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
  Input,
} from "@relume_io/relume-ui";
import React, { useState } from "react";
=======
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
    Input,
  } from "@relume_io/relume-ui";
import React from "react";
>>>>>>> TienMerge
import { Link } from "react-router-dom";
import { ButtonDashboard, Search } from "../../../Types/global.type";
import { BiSearch } from "react-icons/bi";
import EventTag from "../../Atoms/EventTag";
<<<<<<< HEAD
import SearchFilterForm from "../../Atoms/SearchFilterForm";
import { useSelector } from "react-redux";

type Props<T> = {
  headerTitle: string;
  headerDescription: string;
  buttons?: ButtonProps[];
  tableHeaders: string[];
  tableRows: T[];
  paginationItems?: number[];
  tableHeadersClasses: string[];
  addNew?: React.ReactNode;
  searchValue?: string;
  // data: T[];
  // search?: Search;
};

export const TableTemplate = <T extends Record<string, any>>(
  props: React.ComponentPropsWithoutRef<"section"> & Props<T>
) => {
  const {
    headerTitle,
    headerDescription,
    buttons,
    tableHeaders,
    tableRows,
    paginationItems,
    tableHeadersClasses,
    addNew,
    searchValue,
  } = {
=======


  type Props<T> = {
    headerTitle: string;
    headerDescription: string;
    buttons?: ButtonProps[];
    tableHeaders: string[];
    tableRows: T[];
    paginationItems?: number[];
    tableHeadersClasses: string[];
    addNew? : React.ReactNode;
    
    // search?: Search;
  };
  
  export const TableTemplate = <T extends Record<string, any>>(
    props: React.ComponentPropsWithoutRef<"section"> & Props<T>
  ) => {
    const { headerTitle, headerDescription, buttons, tableHeaders, tableRows, paginationItems, tableHeadersClasses, addNew} = {
>>>>>>> TienMerge
    //   ...TableTemplateDefaults,
    ...props,
  } as Props<T>;

  // truyền vào type
  // truyền vào dữ liệu tương ứng với type đó
  const [filteredData, setFilteredData] = useState<T[]>(tableRows);

  // const handleSearchSubmit = (searchData: { searchTerm: string }) => {
  //   console.log("Search query:", searchData.searchTerm);
  //   // console.log(tableRows)
  //   if (searchData.searchTerm.trim()) {
  //     const filtered = tableRows.filter((event) =>
  //       event["Name"]
  //         .toLowerCase()
  //         .includes(searchData.searchTerm.toLowerCase())
  //     );
  //     setFilteredData(filtered); // Cập nhật danh sách sự kiện đã lọc

  //     if (filteredData.length === 0) {
  //       // setFill("Event not found and cannot be empty !");
  //     }
  //   }
  //   // console.log(filteredData)
  // };
  const handleSearchSubmit = (searchData: { searchTerm: string }) => {
    console.log("Search query:", searchData.searchTerm);
    
    const trimmedSearchTerm = searchData.searchTerm.trim();
    
    if (trimmedSearchTerm === "") {
      setFilteredData(tableRows); // Hiển thị tất cả dữ liệu nếu không có ký tự nào
    } else {
      const filtered = tableRows.filter((event) =>
        event["Name"].toLowerCase().includes(trimmedSearchTerm.toLowerCase())
      );
      setFilteredData(filtered); // Cập nhật danh sách sự kiện đã lọc
  
<<<<<<< HEAD
      if (filtered.length === 0) {
        // setFill("Event not found and cannot be empty !");
      }
    }
  };

  return (
    <section className="px-[1%] py-2 md:py-1 lg:py-1">
      <div className="container relative pb-2">
        <div className="flex flex-col items-start justify-between gap-6 border border-b-0 border-border-primary p-6 sm:flex-row sm:items-center">
          {headerTitle}
          <div className="flex gap-6 w-[1/2]">
            {/* <Input
              className="w-full my-1"
              placeholder="Search"
              icon={<BiSearch className="size-6" />}
            /> */}
            <SearchFilterForm onSubmit={handleSearchSubmit} />
            {/* <EventTag text="Staff Name"/> */}
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              {tableHeaders.map((header, index) => (
                <TableHead key={index} className={tableHeadersClasses[index]}>
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
          
              {filteredData.map((row, rowIndex) => (
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
=======
   
  
    return (
      <section className="px-[1%] py-2 md:py-1 lg:py-1">
        <div className="container relative pb-2">
        <div className="flex flex-col items-start justify-between gap-6 border border-b-0 border-border-primary p-6 sm:flex-row sm:items-center">
         {headerTitle}
          <div className="flex gap-6 w-[1/2]">
          <Input
              className="w-full my-1"
              placeholder="Search"
              icon={<BiSearch className="size-6" />}
            />
            <EventTag text="Staff Name"/>
          </div>
          
        </div>
       
          <Table>
            <TableHeader>
              <TableRow>
                {tableHeaders.map((header, index) => (
                  <TableHead key={index} className={tableHeadersClasses[index]}>
                    {header}
                  </TableHead>
>>>>>>> TienMerge
                ))}
            
          </TableBody>
        </Table>
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" size="sm" variant="secondary" />
            </PaginationItem>
            <PaginationItem className="hidden md:block">
              {paginationItems &&
                paginationItems.map((item, index) => (
                  <PaginationLink
                    key={index}
                    href="#"
                    size="sm"
                    variant="link"
                    className="px-4 py-2"
                  >
                    {item}
                  </PaginationLink>
                ))}
<<<<<<< HEAD
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" size="sm" variant="secondary" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      {addNew}
    </section>
  );
};
TableTemplate.displayName = "Table1";
=======
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" size="sm" variant="secondary" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
                {addNew}
      </section>
    );
  };
TableTemplate.displayName = "Table1";
  
>>>>>>> TienMerge
