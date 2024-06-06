import React from "react";
import classNames from "classnames";
import {
  FaHome,
  FaTachometerAlt,
  FaChartLine,
  FaFileAlt,
  FaCube,
  FaQuestionCircle,
  FaCog,
} from "react-icons/fa";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@relume_io/relume-ui";
import { HomeIcon } from "@heroicons/react/16/solid";
import HeadlineWithIcon from "../../Atoms/HeadlineWithIcon";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import HeadlineRightWithIcon from "../../Atoms/HeadlineRightWithIcon";
import HeadlineCenterWithIcon from "../../Atoms/HeadlineCenterWithIcon";

interface SidebarProps {
  items: {
    title: string;
    submenu?: {
      name: string;
      icon: React.FC;
      submenu?: { name: string; icon: React.FC }[];
    }[];
    icon: React.FC;
  }[];
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ items, isOpen, onClose }) => {
  return (
    <>
      <div
        className={classNames(
          "fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden",
          {
            "opacity-100": isOpen,
            "opacity-0 pointer-events-none": !isOpen,
          }
        )}
        onClick={onClose}
      />
      <div
        className={classNames(
          "fixed inset-0 z-30 w-64 bg-white shadow-md transition-transform transform lg:translate-x-0 lg:static",
          {
            "translate-x-0": isOpen,
            "-translate-x-full": !isOpen,
          }
        )}
      >
        <button className="absolute top-4 right-4 lg:hidden" onClick={onClose}>
          Close
        </button>
        <ul className="relative">
          {items.map((item, index) => (
            <>
              <Accordion type="single" collapsible>
                <AccordionItem value={item.title}>
                  <AccordionTrigger>
                
                    <HeadlineWithIcon Child={item.icon} title={item.title} />
                  </AccordionTrigger>
                  {item.submenu && (
                    <AccordionContent>
                      <ul className="relative">
                        {item.submenu.map((subItem, subIndex) => (
                          <>
                            <Accordion type="single" collapsible>
                              <AccordionItem value={subItem.name}>
                                <AccordionTrigger className="items-center">
                                  <HeadlineCenterWithIcon
                                    Child={subItem.icon}
                                    title={subItem.name}
                                  />
                                </AccordionTrigger>
                                <AccordionContent>
                                  {subItem.submenu?.map((subitem, subindex) => (
                                    <HeadlineRightWithIcon
                                      Child={subitem.icon}
                                      title={subitem.name}
                                    />
                                  ))}
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                            {/* <li key={subIndex}>
                              <a
                                className="flex items-center text-xs py-2 px-8 h-8 overflow-hidden text-gray-500 text-ellipsis whitespace-nowrap rounded hover:text-gray-700 hover:bg-gray-100 transition duration-300 ease-in-out"
                                href="#!"
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="dark"
                              >
                                {subItem.name}
                              </a>
                            </li> */}
                          </>
                        ))}
                      </ul>
                    </AccordionContent>
                  )}
                </AccordionItem>
              </Accordion>
              {/* <li className="relative" key={index}>
                <a
                  className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
                  href="#!"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="dark"
                >
                  {item.title}
                </a>
                {item.submenu && (
                  <ul className="relative">
                    {item.submenu.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <a
                          className="flex items-center text-xs py-2 px-8 h-8 overflow-hidden text-gray-500 text-ellipsis whitespace-nowrap rounded hover:text-gray-700 hover:bg-gray-100 transition duration-300 ease-in-out"
                          href="#!"
                          data-mdb-ripple="true"
                          data-mdb-ripple-color="dark"
                        >
                          {subItem.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li> */}
            </>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
