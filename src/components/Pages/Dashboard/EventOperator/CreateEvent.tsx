import React, { useState, useEffect } from "react";
import {
  Button,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  Input,
  SheetClose,
  SheetOverlay,
  SheetPortal,
  SheetTrigger,
  SheetContent,
  Sheet,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@relume_io/relume-ui";
import {
  BiBell,
  BiSearch,
  BiHome,
  BiBarChartAlt2,
  BiArchive,
  BiHelpCircle,
  BiCog,
} from "react-icons/bi";
import { RxChevronDown, RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { AnimatePresence, motion } from "framer-motion";

import { RiDeleteBin6Line } from "react-icons/ri";
import CreateEventButton from "../../../Organisms/Dashboard/CreateEventButton";
import AddFeedbackButton from "../../../Organisms/Dashboard/AddFeedbackButton";
import Tabbar from "../../../Organisms/Dashboard/Tabbar";
const CreateEvent = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isSearchIconClicked, setIsSearchIconClicked] =
    useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 992);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <section>
      {/* Topbar */}
      <div className="sticky top-0 flex min-h-16 w-full items-center border-b border-border-primary bg-white px-4 md:min-h-18 md:px-8">
        <div className="mx-auto grid size-full grid-cols-2 items-center justify-between gap-4 lg:grid-cols-[1fr_1.5fr_1fr]">
          <a href="#" className="ml-14 justify-self-start lg:ml-0">
            <img
              src="https://relume-assets.s3.amazonaws.com/logo-image.svg"
              alt="Relume logo"
              className="shrink-0"
            />
          </a>

          <div className="hidden lg:block lg:w-full lg:max-w-md lg:justify-self-center">
            <Input
              className="w-full"
              placeholder="Search"
              icon={<BiSearch className="size-6" />}
            />
          </div>

          <div className="flex items-center gap-2 justify-self-end md:gap-4">
            <button
              onClick={() => setIsSearchIconClicked(!isSearchIconClicked)}
              className="p-2 lg:hidden"
            >
              <BiSearch className="size-6" />
            </button>
            <AnimatePresence>
              {isSearchIconClicked && (
                <motion.div
                  variants={{
                    visible: { opacity: 1 },
                    hidden: { opacity: 0 },
                  }}
                  initial="hidden"
                  exit="hidden"
                  animate={isSearchIconClicked ? "visible" : "hidden"}
                  className="absolute bottom-0 left-0 right-0 top-16 flex min-h-16 max-w-md items-center justify-center border-b border-border-primary bg-white px-6 lg:hidden"
                >
                  <Input
                    className="h-fit w-full"
                    placeholder="Search"
                    icon={<BiSearch className="size-6" />}
                  />
                  <button
                    onClick={() => setIsSearchIconClicked(!isSearchIconClicked)}
                  >
                    <RxCross2 className="ml-4 size-6" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            <DropdownMenu>
              <DropdownMenuTrigger className="relative">
                <div className="absolute bottom-auto left-auto right-2 top-2 size-2 rounded-full bg-black outline outline-[3px] outline-offset-0 outline-white" />
                <BiBell className="size-6" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="max-w-[19rem] px-0"
                align="end"
                sideOffset={0}
              >
                <div className="flex flex-col">
                  <div className="flex items-center justify-between px-4 py-2">
                    <DropdownMenuLabel className="p-0">
                      Notifications
                    </DropdownMenuLabel>
                    <a href="#">Mark as read</a>
                  </div>
                  <DropdownMenuSeparator />
                  <div className="h-full max-h-[14rem] overflow-auto px-2 py-1">
                    <DropdownMenuItem className="mt-2 grid grid-cols-[max-content_1fr] gap-2 px-2 py-1">
                      <div className="flex size-full flex-col items-start justify-start">
                        <img
                          src="https://relume-assets.s3.amazonaws.com/relume-icon.svg"
                          alt="Avatar"
                          className="size-6"
                        />
                      </div>
                      <div>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit.
                        </p>
                        <p className="mt-2 text-sm">11 Jan 2022</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="mt-2 grid grid-cols-[max-content_1fr] gap-2 px-2 py-1">
                      <div className="flex size-full flex-col items-start justify-start">
                        <img
                          src="https://relume-assets.s3.amazonaws.com/relume-icon.svg"
                          alt="Avatar"
                          className="size-6"
                        />
                      </div>
                      <div>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit.
                        </p>
                        <p className="mt-2 text-sm">11 Jan 2022</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="mt-2 grid grid-cols-[max-content_1fr] gap-2 px-2 py-1">
                      <div className="flex size-full flex-col items-start justify-start">
                        <img
                          src="https://relume-assets.s3.amazonaws.com/relume-icon.svg"
                          alt="Avatar"
                          className="size-6"
                        />
                      </div>
                      <div>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit.
                        </p>
                        <p className="mt-2 text-sm">11 Jan 2022</p>
                      </div>
                    </DropdownMenuItem>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <Sheet>
              <SheetTrigger>
                <img
                  src="https://relume-assets.s3.amazonaws.com/relume-icon.svg"
                  alt="User profile"
                  className="size-6 rounded-full"
                />
              </SheetTrigger>
              <SheetPortal>
                <SheetOverlay className="fixed inset-0 bg-black/50" />
                <SheetContent
                  position={isMobile ? "left" : "right"}
                  className="fixed top-0 bottom-0 h-screen w-full max-w-xs rounded-none border-l border-l-border-primary bg-background-primary md:w-auto md:max-w-md md:rounded-md"
                >
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between border-b border-border-primary p-4">
                      <SheetClose>
                        <RxCross2 className="size-6" />
                      </SheetClose>
                      <DropdownMenuLabel className="p-0">
                        Menu
                      </DropdownMenuLabel>
                    </div>
                    <div className="h-full w-full flex-1 overflow-auto px-4 py-2">
                      <DropdownMenuGroup className="gap-2">
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                      </DropdownMenuGroup>
                    </div>
                  </div>
                </SheetContent>
              </SheetPortal>
            </Sheet>
            <CreateEventButton /> {/* Added CreateEventButton component */}
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="grid grid-cols-[max-content_1fr]">
        {/* Sidebar */}
        <div className="hidden min-w-[12.5rem] flex-col border-r border-border-primary lg:flex">
          <Navigation />
        </div>
        <main className="relative">
          {/* Mobile Nav */}
          <Sheet>
            <SheetTrigger className="absolute left-0 top-0 z-20 p-4 lg:hidden">
              <RxHamburgerMenu className="size-6" />
            </SheetTrigger>
            <SheetPortal>
              <SheetOverlay className="fixed inset-0 bg-black/50" />
              <SheetContent
                position="left"
                className="fixed top-0 bottom-0 h-screen w-full max-w-xs rounded-none border-r border-r-border-primary bg-background-primary"
              >
                <Navigation />
              </SheetContent>
            </SheetPortal>
          </Sheet>

          <div className="container mx-auto max-w-6xl p-6">
            <div className="relative min-h-[40rem] w-full rounded-md border bg-white p-6 shadow-sm">
              <div className="grid w-full grid-cols-1 items-center gap-4">
                <div className="flex w-full justify-between">
                  <div>
                    <h1 className="text-xl font-bold">Heading goes here</h1>
                    <p className="text-gray-500">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse varius enim in eros.
                    </p>
                  </div>
                  <Button>
                    <AddFeedbackButton />
                  </Button>
                  {/* Updated to use AddFeedbackButton */}
                </div>

                <Tabbar/>

                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border px-4 py-2">Full name</td>
                        <td className="border px-4 py-2">
                          <a href="#" className="text-blue-600 underline">
                            View
                          </a>
                        </td>
                        <td className="border px-4 py-2">Jan 11, 2050</td>
                        <td className="border px-4 py-2">
                          <button className="text-red-600">Delete</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">Full name</td>
                        <td className="border px-4 py-2">
                          <a href="#" className="text-blue-600 underline">
                            View
                          </a>
                        </td>
                        <td className="border px-4 py-2">Jan 11, 2050</td>
                        <td className="border px-4 py-2">
                          <button className="text-red-600">Delete</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <button className="mt-4 px-4 py-2 bg-black text-white">
                    New
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

// Sidebar Navigation Component
const Navigation = () => (
  <nav className="flex flex-col flex-1">
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex items-center justify-between py-3 pr-4">
          <div className="flex items-center gap-3">
            <BiHome className="size-6" />
            <span className="hidden lg:block">Home</span>
          </div>
          <RxChevronDown className="size-5" />
        </AccordionTrigger>
        <AccordionContent className="pl-10">
          <a href="#" className="block py-2">
            Dashboard
          </a>
          <a href="#" className="block py-2">
            Overview
          </a>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger className="flex items-center justify-between py-3 pr-4">
          <div className="flex items-center gap-3">
            <BiBarChartAlt2 className="size-6" />
            <span className="hidden lg:block">Events</span>
          </div>
          <RxChevronDown className="size-5" />
        </AccordionTrigger>
        <AccordionContent className="pl-10">
          <a href="#" className="block py-2">
            Event Name
          </a>
          <a href="#" className="block py-2">
            Unpublish Event
          </a>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger className="flex items-center justify-between py-3 pr-4">
          <div className="flex items-center gap-3">
            <BiArchive className="size-6" />
            <Button variant="tertiary" size="icon">
              <RiDeleteBin6Line />
            </Button>
          </div>
          <RxChevronDown className="size-5" />
        </AccordionTrigger>
      </AccordionItem>
    </Accordion>

    <div className="mt-auto flex flex-col items-stretch gap-2 p-6">
      <a
        href="#"
        className="flex items-center gap-3 py-2 text-gray-600 hover:text-gray-900"
      >
        <BiHelpCircle className="size-6" />
        <span className="hidden lg:block">Support</span>
      </a>
      <a
        href="#"
        className="flex items-center gap-3 py-2 text-gray-600 hover:text-gray-900"
      >
        <BiCog className="size-6" />
        <span className="hidden lg:block">Settings</span>
      </a>
    </div>
  </nav>
);

export default CreateEvent;
