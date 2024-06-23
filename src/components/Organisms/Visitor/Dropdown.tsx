import React, { useState } from "react";

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
  BiStar,
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
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../../Features/Auth/authApi";
import { clearToken } from "../../../Features/Auth/authSlice";
import { RootState } from "@reduxjs/toolkit/query";
import { useNavigate } from "react-router-dom";

type Props = {
  email?: string | null;
};
const Dropdown: React.FC<Props> = (props) => {
  // const [isLogout, setLogout] = useState(false)
  // const { token } = useSelector((state: RootState) => state.auth)
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    dispatch(clearToken());
    navigate("/");
  };

  // dispatch(clearToken(token))

  return (
    <div className="flex items-center gap-2 justify-self-end md:gap-4">
      {/* <a href='' onClick={handleLogout}>Log Out</a> */}

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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <p className="mt-2 text-sm">11 Jan 2022</p>
                </div>
              </DropdownMenuItem>
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
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center p-0">
          {/* <img
                  src="https://relume-assets.s3.amazonaws.com/avatar-image.svg"
                  alt="Avatar"
                  className="size-10 rounded-full object-cover"
                /> */}
          {props.email}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          sideOffset={0}
          className="mt-1.5 px-0 py-2"
        >
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <a href="#">My Profile</a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a href="#">Profile Settings</a>
            </DropdownMenuItem>
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
  );
};

export default Dropdown;
