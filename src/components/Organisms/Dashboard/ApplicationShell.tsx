"use client";

import {
  Button,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  Input,
  SheetClose,
  SheetOverlay,
  SheetPortal,
} from "@relume_io/relume-ui";
import {
  BiArchive,
  BiBarChartAlt2,
  BiBell,
  BiCog,
  BiFile,
  BiHelpCircle,
  BiHome,
  BiLayer,
  BiPieChartAlt2,
  BiSearch,
  BiUserCheck,
  BiStar,
  BiNotepad,
  BiCalendarCheck,
  BiCalendarEdit,
  BiTrash,
} from "react-icons/bi";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@relume_io/relume-ui";
import { MdTrendingUp } from "react-icons/md";
import {
  RxChevronDown,
  RxChevronRight,
  RxCross2,
  RxHamburgerMenu,
} from "react-icons/rx";
import React, { ReactNode, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Stat1 } from "./StateCard";
import { Table1 } from "./Table";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "../../../Features/Auth/authSlice";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { createSelector } from "@reduxjs/toolkit";

import {
  NavigationComponentProps,
  NavigationProps,
} from "../../../Types/global.type";
import {
  eventApi,
  useGetListEventQuery,
} from "../../../Features/EventManage/eventApi";
import SurveyForm from "../../Pages/Dashboard/TestforCreateSurvey";
import { RootState } from "../../../Store/Store";
import CreateEvent from "../../Pages/Dashboard/EventOperator/CreateEvent";
import {
  selectPublishEvents,
  selectUnpublishEvents,
} from "../../../Features/EventManage/eventSelector";
import { setEvents } from "../../../Features/EventManage/eventSlice";
import { roleName } from "../../../ulities/ProtectedRoute";

type ParentComponentProps = {
  MainComponent?: React.ReactNode;
  StateComponent?: React.ReactNode;
};

export const ApplicationShell4: React.FC<ParentComponentProps> = ({
  MainComponent,
  StateComponent,
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isSearchIconClicked, setIsSearchIconClicked] =
    useState<boolean>(false);
  const [isRole, setRole] = useState("");
  const email = sessionStorage.getItem("email");
  let token = sessionStorage.getItem("token");
  const role = roleName(token);
  
  NavigationAuth(isRole);
  useEffect(() => {
    setRole(role);
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    localStorage.setItem("notifications", JSON.stringify([]));
    dispatch(clearToken());
    // persistor.purge();
    navigate("/");
  };

  const notifications = JSON.parse(localStorage.getItem("notifications"));

  const NavigationAuthLink = (role: string) => {
    switch (role) {
      case "ROLE_EO":
        navigate("/eventoperator/dashboard/");
        break;
      case "ROLE_SPONSOR":
        navigate("/sponsor/dashboard/profit");
        break;
      case "ROLE_VISITOR":
        navigate("/");
        break;
      case "ROLE_CHECKING_STAFF":
        navigate("");
        break;
      case "ROLE_ADMIN":
        navigate("/admin");
        break;
    }
  };
  const isHeaderVisible = useSelector((state: RootState) => state.headerDisplay.isHeaderVisible);
  return (
    <section>
      {/* Topbar */}
      <div className={isHeaderVisible}>
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
                {notifications.length !== 0 && (
                  <div className="absolute bottom-auto left-auto right-2 top-2 size-2 rounded-full bg-black outline outline-[3px] outline-offset-0 outline-white" />
                )}
                <BiBell className="size-6" />
              </DropdownMenuTrigger>
              {notifications.length !== 0 && (
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
                      {notifications.map((notification) => (
                        <DropdownMenuItem className="mt-2 grid grid-cols-[max-content_1fr] gap-2 px-2 py-1">
                          <div className="flex size-full flex-col items-start justify-start">
                            <img
                              src="https://relume-assets.s3.amazonaws.com/relume-icon.svg"
                              alt="Avatar"
                              className="size-6"
                            />
                          </div>
                          <div>
                            <p>{notification.message}</p>
                            <p className="mt-2 text-sm">
                              {new Date(
                                notification.timestamp
                              ).toLocaleString()}
                            </p>
                          </div>
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <div className="flex w-full items-end justify-end px-4 py-2">
                    <Button
                      variant="link"
                      size="link"
                      iconRight={<RxChevronRight />}
                      asChild
                    >
                      <a href="#">View All</a>
                    </Button>
                  </div>
                </DropdownMenuContent>
              )}
            </DropdownMenu>
            <DropdownMenu>
              {isRole === "ROLE_SPONSOR" && <SurveyForm />}
              {isRole === "ROLE_EO" && <CreateEvent />}
              {isRole === "ROLE_CHECKING_STAFF" && email}
              {isRole === "ROLE_ADMIN" && email}
              <DropdownMenuTrigger className="flex items-center p-0">
                <img
                  src="https://relume-assets.s3.amazonaws.com/avatar-image.svg"
                  alt="Avatar"
                  className="mx-2 size-10 rounded-full object-cover"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                sideOffset={0}
                className="mt-1.5 px-0 py-2"
              >
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    {isRole ? (
                      <a href="" onClick={() => NavigationAuthLink(isRole)}>
                        Dashboard
                      </a>
                    ) : (
                      <a href="#">My Cart</a>
                    )}
                  </DropdownMenuItem>
                  {isRole === "ROLE_SPONSOR" && (
                    <>
                      <DropdownMenuItem>
                        <a href="/sponsor/dashboard/manage">Profile Settings</a>
                      </DropdownMenuItem>
                      {/* <DropdownMenuItem>
                     <a href="/sponsor/dashboard/list"></a>
                   </DropdownMenuItem> */}
                    </>
                  )}

                  <DropdownMenuSeparator className="mx-4" />
                  <DropdownMenuItem>
                    <a href="" onClick={handleLogout}>
                      Log Out
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Shell Wrapper*/}
      <div className="relative flex flex-col items-stretch lg:flex-row lg:items-start">
        {/* Sidebar Wrapper */}
        <div className="absolute -top-16 flex h-full flex-col md:top-18 md:h-auto lg:sticky lg:h-[calc(100vh-4.5rem)]">
          <div className="sticky top-0 flex min-h-16 flex-col py-0 pl-6 md:min-h-18 md:bg-white md:pl-8 lg:h-screen lg:min-h-[auto] lg:w-[19.5rem] lg:border-r lg:border-border-primary lg:py-6 lg:pl-0">
            <div className="flex flex-1 flex-row items-center lg:flex-col lg:items-stretch">
              {isMobile ? (
                <Sheet>
                  <SheetTrigger>
                    <RxHamburgerMenu className="size-8" />
                  </SheetTrigger>
                  <SheetPortal>
                    <SheetOverlay className="bg-black/60" />
                    <SheetClose className="right-5 top-5 text-white">
                      <RxCross2 className="size-6" />
                    </SheetClose>
                    <SheetContent
                      side="left"
                      className="w-[80vw] overflow-hidden md:w-full md:max-w-[19.5rem]"
                    >
                      <Navigation />
                    </SheetContent>
                  </SheetPortal>
                </Sheet>
              ) : (
                <Navigation />
              )}
            </div>
          </div>
        </div>

        <main className="relative w-[30%] flex-1">
          <div className="border-b-2 border-dashed border-[#d3d3d3] px-2 py-6 text-center bg-white">
            {/* <Stat1 /> */}
            {StateComponent}
          </div>
          <div className="container px-2 py-2  md:py-10 lg:py-12">
            {/* <Table1 /> */}
            {MainComponent}
          </div>
        </main>
      </div>
    </section>
  );
};
//  const selectEvents = (state: RootState) => state.event;

//   export const selectPublishedEvents = createSelector(
//     selectEvents,
//     (events) => events.filter(event => event.state === 'PUBLISHED')
//   );

// const unpublishEventCount =  events?.filter(event => event.stateEvent.name === "UNPUBLISH").length;
// const publishEventCount =  events?.filter(event => event.stateEvent.name === "HAPPENED").length;
let NavigationProp: NavigationProps[] = [];
const NavigationAuth = (role: string) => {
 

  switch (role) {
    case "ROLE_EO":
      NavigationProp = [
        {
          Name: "Dashboard",
          Url: "",
          icon: <BiPieChartAlt2 className="size-6 shrink-0" />,
          State: [
            {
              name: "Event Analytics",
              url: '/eventoperator/event/publish/analytics/',
              // number: 2,
              icon: <BiBarChartAlt2 className="size-6 shrink-0" />,
            },
            // {
            //   name: "Feedback Analytics",
            //   url: "",
            //   // number: 3,
            //   icon: <BiPieChartAlt2 className="size-6 shrink-0" />,
            // },
            // {
            //   name: "Attendance",
            //   url: "",
            //   // number: 3,
            //   icon: <BiUserCheck className="size-6 shrink-0" />,
            // },
          ],
        },
        {
          Name: "Event",
          Url: "",
          icon: <BiNotepad className="size-6 shrink-0" />,
          State: [
            {
              name: "Unpublish",
              url: "/eventoperator/dashboard/UnpublishEvent",
              // number: 0,
              icon: <BiCalendarEdit className="size-6 shrink-0" />,
            },
            {
              name: "Happened",
              url: "/eventoperator/dashboard/PublishEvent",
              // number: 0,
              icon: <BiCalendarCheck className="size-6 shrink-0" />,
            },
          ],
        },
        {
          Name: "Feedback",
          Url: "/eventoperator/dashboard/feedback",
          icon: <BiFile className="size-6 shrink-0" />,
        },
        {
          Name: "Trash",
          icon: <BiTrash className="size-6 shrink-0" />,
          Url: "",
          State: [
            {
              name: "Event",
              url: "",
              number: 2,
              icon: <BiNotepad className="size-6 shrink-0" />,
            },
            {
              name: "Feedback",
              url: "",
              number: 3,
              icon: <BiFile className="size-6 shrink-0" />,
            },
          ],
        },
      ];

      break;
    case "ROLE_SPONSOR":
      NavigationProp = [
        {
          Name: "Dashboard",
          Url: "profit",
          icon: <BiPieChartAlt2 className="size-6 shrink-0" />,
          State: [
            {
              name: "Event Analytics",
              url: "",
              number: 2,
              icon: <BiBarChartAlt2 className="size-6 shrink-0" />,
            },
            {
              name: "Survey Analytics",
              url: "",
              number: 3,
              icon: <BiPieChartAlt2 className="size-6 shrink-0" />,
            },
            {
              name: "Visitor Survey",
              url: "",
              number: 3,
              icon: <BiUserCheck className="size-6 shrink-0" />,
            },
          ],
        },
        {
          Name: "Sponsor Program",
          Url: "/sponsor/dashboard/program",
          icon: <BiNotepad className="size-6 shrink-0" />,
       
        },
        {
          Name: "Survey",
          Url: "",
          icon: <BiFile className="size-6 shrink-0" />,
          State: [
            {
              name: "Unpublish",
              url: "",
              number: 2,
              icon: <BiCalendarEdit className="size-6 shrink-0" />,
            },
            {
              name: "Happened",
              url: "",
              number: 3,
              icon: <BiCalendarCheck className="size-6 shrink-0" />,
            },
          ],
        },
        {
          Name: "Trash",
          icon: <BiTrash className="size-6 shrink-0" />,
          Url: "",
          State: [
            {
              name: "Sponsor Program",
              url: "",
              number: 2,
              icon: <BiNotepad className="size-6 shrink-0" />,
            },
            {
              name: "Survey",
              url: "",
              number: 3,
              icon: <BiFile className="size-6 shrink-0" />,
            },
          ],
        },
      ];
      break;
    case "ROLE_CHECKING_STAFF":
      // navigate("");
      NavigationProp = [
        {
          Name: "Attendance", 
          Url: "",
          icon: <BiNotepad className="size-6 shrink-0" />,
        },
      ];
      break;
    case "ROLE_ADMIN":
      NavigationProp = [
        {
          Name: "Sponsor",
          Url: "/admin",
          icon: <BiNotepad className="size-6 shrink-0" />,
        },
        {
          Name: "Event Operator",
          Url: "/admin/eventoperator",
          icon: <BiFile className="size-6 shrink-0" />,
        },
        {
          Name: "Visitor",
          Url: "/admin/visitor",
          icon: <BiFile className="size-6 shrink-0" />,
        },
      ];
      break;
  }
};

type Props = {
  navigationProps: NavigationProps[];
};

const Navigation: React.FC<Props> = ({ navigationProps = NavigationProp }) => {
  const navigate = useNavigate();
  let token = sessionStorage.getItem("token");
  const roleDisplay = roleName(token);
  const goToHome = () => {
    navigate("/");
  };
  return (
    <nav className="absolute left-0 right-auto top-0 float-right h-full w-[80vw] max-w-[none] md:w-full md:max-w-[19.5rem] lg:relative lg:inset-auto lg:w-auto lg:max-w-[auto]">
      <div className="absolute flex size-full flex-col gap-4 border-r border-border-primary bg-white py-6 lg:gap-6 lg:border-none lg:py-0">
        <div className="flex size-full flex-col overflow-auto px-4">
          <a href="#" className="flex items-center gap-x-2 p-2 text-center">
            <span className="flex w-full items-center gap-3">
              <BiHome className="size-6 shrink-0" />
              <span onClick={goToHome}>Home</span>
            </span>
          </a>
          {navigationProps.map((nav, index) => (
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1" className="border-none">
                {roleDisplay == "ROLE_ADMIN" ? (
                  <span className="flex items-center gap-3 p-2">
                    {nav.icon}
                    <a href={nav.Url}>
                      <p>{nav.Name}</p>
                    </a>
                  </span>
                ) : (
                  <AccordionTrigger
                    className="p-2 font-normal display-none"
                    icon={
                      <RxChevronDown className="shrink-0 text-text-primary transition-transform duration-300 " />
                    }
                  >
                    <span className="flex items-center gap-3">
                      {nav.icon}

                      <a href={nav.Url}>
                        <p>{nav.Name}</p>
                      </a>
                    </span>
                </AccordionTrigger>
                )}

                {nav.State?.map((item, idx) => (
                  <AccordionContent className="flex items-center gap-x-2 p-2 pl-[2.75rem] text-center">
                    <a
                      href={item.url}
                      className="flex items-center gap-x-2 p-2 text-center"
                    >
                      <span className="flex w-full items-center gap-3">
                        {item.icon}
                        <p>{item.name}</p>
                      </span>
                      {/* <span className="">
                        <p className="text-sm">{item.number}</p>
                      </span> */}
                    </a>
                  </AccordionContent>
                ))}
              </AccordionItem>
            </Accordion>
          ))}
        </div>
        <div className="flex flex-col gap-4 px-4 lg:gap-6">
        </div>
      </div>
    </nav>
  );
};
export const ApplicationShell4Defaults = {};

ApplicationShell4.displayName = "ApplicationShell4";
