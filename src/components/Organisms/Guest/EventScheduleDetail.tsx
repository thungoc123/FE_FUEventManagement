"use client";

import clsx from "clsx";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  Label,
  Input,
} from "@relume_io/relume-ui";
type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  heading: string;
  image: ImageProps;
  children: React.ReactNode;
  onClose: () => void;
  // onClose: boolean;
  // seteventSheduleDetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type Content1Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Content1 = (props: Content1Props) => {
  const { heading, children, image } = {
    ...Content1Defaults,
    ...props,
  } as Props;

  return (
    <>
      {/* <Dialog
        open={props.eventSheduleDetailOpen}
        onOpenChange={props.seteventSheduleDetailOpen}
        
      >
        <DialogTrigger asChild>
          <span></span>
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay className="bg-black/25" />
          <DialogContent className="w-full max-w-md bg-white p-10 md:p-12">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold mb-4 text-center">
              {heading}
              </DialogTitle>
              <DialogDescription className="mb-6 text-center">
              {children}
              </DialogDescription>
            </DialogHeader>
            <>
            <div>
                      <img
                        src={image.src}
                        className="w-full object-cover"
                        alt={image.alt}
                      />
                    </div>
          
            </>
            <DialogFooter>
              <span></span>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </Dialog> */}
      <section className="px-[5%] py-16 md:py-24 lg:py-28 fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75
" onClick={props.onClose}
        >
        <div className="container bg-white p-4   relative ">
          <div className="grid grid-cols-1 items-start gap-y-12 md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
            <div>
              <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                {heading}
              </h2>
              <div className="prose">{children}</div>
            </div>
            <div>
              <img
                src={image.src}
                className="w-full object-cover"
                alt={image.alt}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export const Content1Defaults: Content1Props = {
  heading: "Short heading goes here",
  children: (
    <div>
      <p>
        Odio felis sagittis, morbi feugiat tortor vitae feugiat fusce aliquet.
        Nam elementum urna nisi aliquet erat dolor enim. Ornare id morbi eget
        ipsum. Aliquam senectus neque ut id eget consectetur dictum. Donec
        posuere pharetra odio consequat scelerisque et, nunc tortor. Nulla
        adipiscing erat a erat. Condimentum lorem posuere gravida enim posuere
        cursus diam.
      </p>
     
     
      
    </div>
  ),
  image: {
    src: "https://relume-assets.s3.amazonaws.com/placeholder-image.svg",
    alt: "Placeholder image",
  },
};

Content1.displayName = "Content1";
