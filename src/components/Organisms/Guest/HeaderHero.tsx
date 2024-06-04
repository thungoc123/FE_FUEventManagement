"use client";

import { Button } from "@relume_io/relume-ui";
import type { ImageProps, ButtonProps } from "@relume_io/relume-ui";

type Props = {
  heading?: string;
  description?: string;
  buttons?: ButtonProps[];
  image?: ImageProps;
};

export type Header9Props = React.ComponentPropsWithoutRef<"section"> & Props;

export const Header9 = (props: Header9Props) => {
  const { heading, description, buttons, image } = {
    ...Header9Defaults,
    ...props,
  } as Props;
  return (
    <header className="flex h-svh min-h-svh flex-col">
      <div className="relative flex-1">
        <div className="absolute inset-0 -z-10">
          <img
            src={image.src}
            alt={image.alt}
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      </div>
      <div className="px-[5%]">
        <div className="container">
          <div className="grid grid-rows-1 items-start gap-2 py-12 md:grid-cols-2 md:gap-x-12 md:gap-y-8 md:py-18 lg:gap-x-20 lg:gap-y-16 lg:py-20">
            <h1 className="mb-5 text-6xl font-bold text-text-primary md:mb-6 md:text-9xl lg:text-10xl">
              {heading}
            </h1>
            <div>
              <p className="text-base text-text-primary md:text-md">{description}</p>
              <div className="mt-6 flex gap-x-4 md:mt-8">
                {buttons.map((button, index) => (
                  <Button
                    key={`${button.title}-${index}`}
                    variant={button.variant}
                    size={button.size}
                    iconRight={button.iconRight}
                    iconLeft={button.iconLeft}
                  >
                    {button.title}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export const Header9Defaults: Header9Props = {
  heading: "Welcome to FPT University's Event Registration",
  description:
    "Register or buy ticket for upcoming events and seminars at FPT University.",
  buttons: [{ title: "Button" }],
  image: {
    src: "https://relume-assets.s3.amazonaws.com/placeholder-image.svg",
    alt: "Placeholder image",
  },
};