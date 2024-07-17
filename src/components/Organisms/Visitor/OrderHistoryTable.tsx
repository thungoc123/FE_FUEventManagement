import React, { useState, ChangeEvent } from "react";
import Modal from "react-modal";
import "react-dropdown/style.css";
import { Button } from "@relume_io/relume-ui";
import { RxCube } from "react-icons/rx";
import { RadioGroup, RadioGroupItem, Label } from "@relume_io/relume-ui";
import PaymentMethod from "../../Molecules/PaymentMethod";
import { Input } from "@relume_io/relume-ui";
import {

Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    ButtonProps,
  } from "@relume_io/relume-ui";
import { BiSearch } from "react-icons/bi";

type Props = {
    paginationItems: number[];
  };
const OrderHistoryTable: React.FC<Props> = (props) => {
  const [quantities, setQuantities] = useState<number[]>([1, 1]);
  const [showDropdown, setShowDropdown] = useState<number | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("option1");

  const handleQuantityChange = (index: number, value: number) => {
    if (value >= 0) {
      const newQuantities = [...quantities];
      newQuantities[index] = value;
      setQuantities(newQuantities);
    }
  };

  const handleMenuClick = (index: number) => {
    setShowDropdown(index === showDropdown ? null : index);
  };

  const handleOptionSelect = (option: string, index: number) => {
    if (option === "Edit") {
      alert(`Edit item at index ${index}`);
    } else if (option === "Delete") {
      alert(`Delete item at index ${index}`);
    }
    setShowDropdown(null);
  };

  const options = ["Edit", "Delete"];

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

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
        <Input id="search" placeholder="Search" className="" icon={<BiSearch className="size-6" />} />

        </div>

      </div>
      <div  className="overflow-x-auto">

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Transaction ID</th>
            <th className="px-4 py-2 border-b">Event</th>
            <th className="px-4 py-2 border-b">Date</th>
            <th className="px-4 py-2 border-b">Price</th>
            <th className="px-4 py-2 border-b">Quantity</th>
            <th className="px-4 py-2 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {quantities.map((quantity, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border-b text-center">123456</td>
              <td className="px-4 py-2 border-b text-center">Company name</td>
              <td className="px-4 py-2 border-b text-center">1/11/2050</td>
              <td className="px-4 py-2 border-b text-center">$55.00</td>
              <td className="px-4 py-2 border-b text-center">
                1
              </td>
              {/* bg-red-100 text-black font-bold p-4 rounded-md */}
              <td className="px-2 py-2 border-b text-center">
                <span className="text-500 text-black bg-red-100 py-1 px-1"> Not complete</span>
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
  );
};
OrderHistoryTable.defaultProps = {
    paginationItems: [1, 2, 3, 4, 5],
}
export default OrderHistoryTable;
