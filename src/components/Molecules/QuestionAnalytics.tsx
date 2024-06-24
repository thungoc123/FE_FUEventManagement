import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
  Label,
  Input,
} from "@relume_io/relume-ui";
import { BiLogoGoogle } from "react-icons/bi";
import PieChart from "../Atoms/PieChart";
import { BiChart } from "react-icons/bi";
export const QuestionAnalytics = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="icon" variant="link">
            <BiChart />
          </Button>
        </DialogTrigger>

        <DialogPortal>
          <DialogOverlay className="bg-black/25" />
          <DialogContent className="w-full max-w-md bg-white px-10 py-14 md:py-16 md:px-12 md:data-[state=open]:duration-300 md:data-[state=open]:animate-in md:data-[state=closed]:animate-out md:data-[state=closed]:fade-out-0 md:data-[state=open]:fade-in-0 md:data-[state=closed]:slide-out-to-left-1/2 md:data-[state=open]:slide-in-from-left-1/2">
            <DialogHeader>
              <DialogTitle className="mb-2">Question Name</DialogTitle>
              <DialogDescription>
                Create an account to get started with Relume
              </DialogDescription>
            </DialogHeader>
            {/* <span> */}
            <PieChart />
            {/* </span> */}
            <DialogFooter className="mt-6"></DialogFooter>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  );
};
