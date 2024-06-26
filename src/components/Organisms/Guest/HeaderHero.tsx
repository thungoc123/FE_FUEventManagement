// import { Button } from "@relume_io/relume-ui";
// import type { ImgProps, ButtonProps } from "@relume_io/relume-ui";
// import { useGetEventDetailsQuery } from "../../../Features/Event/eventApi";
// import React, { useState, useEffect } from "react";

// type Props = {
//   heading?: string;
//   description?: string;
//   buttons?: ButtonProps[];
//   image?: ImgProps;
// };

// export type Header9Props = React.ComponentPropsWithoutRef<"section"> & Props;

// export const Header9 = (props: Header9Props) => {
//   const {
//     heading,
//     description,
//     buttons = [],
//   } = {
//     ...Header9Defaults,
//     ...props,
//   } as Props;

//   // Fetch the event details (replace 'eventId' with the actual event ID you want to fetch)
//   const eventId = "1"; // Example event ID
//   const { data: event, error, isLoading } = useGetEventDetailsQuery(eventId);

//   // Placeholder image if event image is not available
//   const defaultImage = {
//     src: "https://relume-assets.s3.amazonaws.com/placeholder-image.svg",
//     alt: "Placeholder image",
//   };

//   // Use event image if available, otherwise use default image
//   const image =
//     event && event.eventImages && event.eventImages.length > 0
//       ? { src: event.eventImages[0].url, alt: event.name }
//       : defaultImage;

//   return (
//     <header className="flex h-svh min-h-svh flex-col">
//       <div className="relative flex-1">
//         <div className="absolute inset-0 -z-10">
//           {isLoading ? (
//             <div>Loading...</div>
//           ) : error ? (
//             <div>Error: {"status" in error ? error.status : error.message}</div>
//           ) : (
//             // <Carousel opts={{ loop: true }}>
//             //   <CarouselContent>
//             //     {Array.from({ length: 5 }).map((_, index) => (
//             //       <CarouselItem key={index} className="basis-1/2">
//                     <img
//                       src={image.src}
//                       alt={image.alt}
//                       className="absolute inset-0 size-full object-cover"
//                     />
//             //       </CarouselItem>
//             //     ))}
//             //   </CarouselContent>
//             //   <CarouselPrevious className="bg-white" />
//             //   <CarouselNext className="bg-white" />
//             // </Carousel>
//           )}
//         </div>
//       </div>
//       <div className="px-[5%]">
//         <div className="container">
//           <div className="grid grid-rows-1 items-start gap-2 py-12 md:grid-cols-2 md:gap-x-12 md:gap-y-8 md:py-18 lg:gap-x-20 lg:gap-y-16 lg:py-20">
//             <h1 className="mb-5 text-6xl font-bold text-text-primary md:mb-6 md:text-9xl lg:text-10xl">
//               {heading}
//             </h1>
//             <div>
//               <p className="text-base text-text-primary md:text-md">
//                 {description}
//               </p>
//               <div className="mt-6 flex gap-x-4 md:mt-8">
//                 {buttons.map((button, index) => (
//                   <Button
//                     key={`${button.title}-${index}`}
//                     variant={button.variant}
//                     size={button.size}
//                     iconRight={button.iconRight}
//                     iconLeft={button.iconLeft}
//                   >
//                     {button.title}
//                   </Button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export const Header9Defaults: Header9Props = {
//   heading: "Welcome to FPT University's Event Registration",
//   description:
//     "Register or buy tickets for upcoming events and seminars at FPT University.",
//   buttons: [{ title: "Button" }],
//   image: {
//     src: "https://relume-assets.s3.amazonaws.com/placeholder-image.svg",
//     alt: "Placeholder image",
//   },
// };
import { useState, useEffect } from "react";
import type { ButtonProps, CarouselApi } from "@relume_io/relume-ui";
import clsx from "clsx";
import Autoplay from "embla-carousel-autoplay";
import {
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@relume_io/relume-ui";
import { truncateString } from "../../../ulities/Stringhandle";

type ImageProps = {
  src: string;
  alt?: string;
};

type EventImage = {
  id: number;
  url: string;
  event: string;
};

type Props = {
  heading: string;
  description: string;
  buttons: ButtonProps[];
  images: ImageProps[];
  eventImages: EventImage[];
  carouselHeading: string;
  carouselDescription: string;
};

const options = {
  loop: true,
};

const plugins = [
  Autoplay({
    delay: 5000,
  }),
];

export type Header9Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Header9 = (props: Header9Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const {
    heading,
    description,
    buttons,
    images,
    eventImages,
    carouselHeading,
    carouselDescription,
  } = {
    ...Header9Defaults,
    ...props,
  } as Props;

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section className="grid grid-cols-1 items-center gap-y-16 overflow-hidden pt-16 sm:overflow-auto md:pt-24 lg:grid-cols-[50%_50%] lg:gap-y-0 lg:pt-0">
      <div className="mx-[5%] max-w-md justify-self-start lg:ml-[5vw] lg:mr-20 lg:justify-self-end">
        <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
          {heading}
        </h1>
        <p className="md:text-md">{description}</p>
        <div className="mt-6 flex gap-x-4 md:mt-8">
          {buttons.map((button, index) => (
            <Button
              key={index}
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
      <div className="relative clear-both h-[300px] max-h-[60rem] min-h-screen w-full bg-[#ddd] text-center">
        <Carousel
          opts={options}
          plugins={plugins}
          setApi={setApi}
          className="relative left-0 right-0 z-10 block h-full overflow-hidden whitespace-nowrap pl-4"
        >
          <CarouselContent>
            {eventImages.map((image, index) => (
              <CarouselItem key={index} className="pl-0">
                <div className="relative inline-block size-full whitespace-normal text-left align-top">
                  <div className="flex h-screen flex-col">
                    <div className="relative flex-1">
                      <img
                        className="absolute size-full object-cover"
                        src={image.url}
                        alt={`Event image ${index + 1}`}
                      />
                    </div>
                    <div className="relative bg-background-secondary px-6 pb-32 pt-6 sm:px-8 sm:pt-8">
                      <div className="w-full max-w-lg">
                        <h2 className="mb-1 text-md font-bold leading-[1.4] md:text-xl">
                          {carouselHeading}
                        </h2>
                        <p>{truncateString(carouselDescription,10, "...")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-between pl-4">
            <div className="absolute bottom-[52px] left-8 right-auto top-auto flex w-full items-start justify-start">
              {eventImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={clsx("mx-[3px] inline-block size-2 rounded-full", {
                    "bg-black": current === index + 1,
                    "bg-neutral-light": current !== index + 1,
                  })}
                />
              ))}
            </div>
            <CarouselPrevious className="bottom-2 left-auto right-[5.5rem] top-auto size-12 md:right-24" />
            <CarouselNext className="bottom-2 left-auto right-8 top-auto size-12" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export const Header9Defaults: Header9Props = {
  heading: "Medium length hero heading goes here",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
  buttons: [{ title: "Button" }, { title: "Button", variant: "secondary" }],
  images: [
    {
      src: "https://relume-assets.s3.amazonaws.com/placeholder-image.svg",
      alt: "Placeholder image 1",
    },
    {
      src: "https://relume-assets.s3.amazonaws.com/placeholder-image.svg",
      alt: "Placeholder image 2",
    },
    {
      src: "https://relume-assets.s3.amazonaws.com/placeholder-image.svg",
      alt: "Placeholder image 3",
    },
  ],
  eventImages: [],
  carouselHeading: "Short heading goes here",
  carouselDescription:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
};

Header9.displayName = "Header9";



