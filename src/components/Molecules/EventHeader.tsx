import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  heading: string;
  description: string;
  eventImages: ImageProps[];
};

export type Header80Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Header80 = (props: Header80Props) => {
  const { heading, description, eventImages } = {
    ...Header80Defaults,
    ...props,
  } as Props;

  const transformRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: transformRef });
  const animatedScrollYProgress = useSpring(scrollYProgress, {
    bounce: 0,
  });
  const yFirst = useTransform(animatedScrollYProgress, [0, 1], ["0vh", "-87.5vh"]);
  const ySecond = useTransform(animatedScrollYProgress, [0, 1], ["0vh", "-39.6vh"]);
  const navigator = useNavigate();
  const buyTicketButton = () => {
    navigator('/payment');
  };

  return (
    <section ref={transformRef} className="relative h-[150vh] px-[5%] md:h-[300vh]">
      <div className="sticky top-0 h-[100vh] overflow-hidden">
        <div className="container relative flex h-full max-w-lg items-center pb-24 pt-16 text-center md:pt-24 lg:py-28 z-30">
          <div>
            <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">{heading}</h1>
            <p className="relative z-20 md:text-md">{description}</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-auto top-0 z-10">
          <motion.div className="flex flex-col gap-[26vw] pt-[70vh]" style={{ y: yFirst }}>
            {eventImages.slice(0, 4).map((image, index) => (
              <div
                key={index}
                className={clsx("relative h-[35vw] pt-[120%] sm:h-auto", {
                  "w-[30vw] md:w-[28vw] lg:w-[22vw]": index === 0,
                  "left-[52vw] mt-[-46vw] w-[30vw] md:w-[28vw] lg:left-[58vw] lg:w-[22vw]":
                    index === 1,
                  "left-[4vw] mt-[-5vw] w-[28vw] md:w-[26vw] lg:w-[20vw]": index === 2,
                  "left-[64vw] mt-[-45vw] w-[26vw] md:w-[24vw] lg:w-[18vw]": index === 3,
                })}
              >
                <img
                  src={image.src}
                  className="absolute inset-0 size-full object-cover"
                  alt={image.alt}
                />
              </div>
            ))}
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-0 left-auto right-0 top-0 z-0"
          style={{ y: ySecond }}
        >
          <div className="flex flex-col gap-[26vw] pt-[70vh]">
            {eventImages.slice(4).map((image, index) => (
              <div
                key={index}
                className={clsx("relative h-[35vw] pt-[120%] opacity-75 sm:h-auto", {
                  "w-[28vw] md:w-[26vw] lg:w-[20vw]": index === 0,
                  "right-[50vw] mt-[-44vw] w-[26vw] md:w-[24vw] lg:right-[54vw] lg:w-[18vw]":
                    index === 1,
                })}
              >
                <img
                  src={image.src}
                  className="absolute inset-0 size-full object-cover"
                  alt={image.alt}
                />
              </div>
            ))}
          </div>
        </motion.div>
        <div className="absolute inset-0 -z-10 mt-[35rem] md:mt-[100vh]" />
      </div>
    </section>
  );
};

export const Header80Defaults: Header80Props = {
  heading: "",
  description: "",
  eventImages: [
    {
      src: "",
      alt: "",
    },
  ],
};

Header80.displayName = "Header80";
