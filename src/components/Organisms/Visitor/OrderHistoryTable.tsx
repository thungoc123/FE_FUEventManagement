import React, { useState } from "react";
import "react-dropdown/style.css";

import { Input } from "@relume_io/relume-ui";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@relume_io/relume-ui";
import { BiSearch } from "react-icons/bi";
import { useGetCartQuery } from "../../../Features/Order/cartApi";

type Props = {
  paginationItems: number[];
};

const OrderHistoryTable: React.FC<Props> = (props) => {
  const { data, error, isLoading } = useGetCartQuery("1");
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="m-18 border border-b-0 border-border-primary p-10">
      <div className="flex justify-between items-center mb-6">
        <div className="sm:w-1/3 lg:w-1/3">
          <h2 className="text-xl font-bold text-left">Heading goes here</h2>
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros.
          </p>
        </div>
        <div className="lg:w-1/3 sm:w-1/2">
          <Input
            id="search"
            placeholder="Search"
            className=""
            icon={<BiSearch className="size-6" />}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">EventID</th>
              <th className="px-4 py-2 border-b">EventName</th>
              <th className="px-4 py-2 border-b">Price</th>
              <th className="px-4 py-2 border-b">Date</th>
              <th className="px-4 py-2 border-b">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {data.map((order: any, index: number) => (
              <tr key={index}>
                <td className="px-4 py-2 border-b text-center">
                  {order.eventID}
                </td>
                <td className="px-4 py-2 border-b text-center">
                  {order.eventName}
                </td>
                <td className="px-4 py-2 border-b text-center">
                  {order.price}
                </td>
                <td className="px-4 py-2 border-b text-center">{order.date}</td>
                <td className="px-4 py-2 border-b text-center">
                  {order.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination className="mt-8">
        <PaginationContent className="flex justify-center">
          <PaginationItem>
            <PaginationPrevious href="#" size="sm" variant="secondary" />
          </PaginationItem>
          <PaginationItem className="hidden md:block">
            {props.paginationItems.map((item, index) => (
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
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" size="sm" variant="secondary" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

OrderHistoryTable.defaultProps = {
  paginationItems: [1, 2, 3, 4, 5],
};

export default OrderHistoryTable;
