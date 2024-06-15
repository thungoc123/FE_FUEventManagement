"use client";

import { Button } from "@relume_io/relume-ui";
import type { ImageProps, ButtonProps } from "@relume_io/relume-ui";
import EventImage from "../../Atoms/EventImage";
import DateDisplay from "../../Atoms/Date";
import LocationDisplay from "../../Atoms/Location";
import { RxChevronRight } from "react-icons/rx";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Store/Store";
type EventPosts = {
  url?: string;
  image?: ImageProps;
  category?: string;
  title?: string;
  description?: string;
  date?: string;
  location?: string;
  button?: ButtonProps;
};

type Props = {
  tagline?: string;
  heading?: string;
  description?: string;
  button?: ButtonProps;
  EventPosts?: EventPosts[];
};

export type EventBlogProps = React.ComponentPropsWithoutRef<"section"> & Props;

export const EventBlog = (props: EventBlogProps) => {
  const { tagline, heading, description, button, EventPosts } = {
    ...EventBlogDefault,
    ...props,
  } as Props;
  const [visibleEvents, setVisibleEvents] = useState(3);
  const EventList = useSelector((state: RootState) => state.event.eventList)
  console.log(EventList)
  const handleViewAll = () => {
    setVisibleEvents(EventList?.length || 0);
  };

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="container mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            {heading}

          </h2>
          <p className="md:text-md">{description}</p>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 md:gap-y-12 lg:grid-cols-3">
          {EventList?.slice(0, visibleEvents).map((post, index) => (
            <div key={`${post.name}-${index}`}>
              <a
                href={post.image}
                className="mb-3 inline-block w-full max-w-full focus-visible:outline-none"
              >
                <EventImage src={post.image} alt="" />
              </a>
              <div className="mt-3 flex items-center justify-between">
                <DateDisplay date={post.timestart} />
                <DateDisplay date={post.timeend} />
              </div>
              <a
                href=""
                className="mb-2 block max-w-full focus-visible:outline-none"
              >
                <h5 className="text-xl font-bold md:text-2xl">{post.name}</h5>
              </a>
              <p>{post.description}</p>
              <Button
                variant="link"
                size="sm"
                
                className="mt-6 flex items-center justify-center gap-x-1"
              >
                View Detail
              </Button>
            </div>
          ))}
        </div>
        {visibleEvents < (EventPosts?.length || 0) && (
          <div className="flex items-center justify-center">
            <Button
              variant={button?.variant}
              size={button?.size}
              iconRight={button?.iconRight}
              iconLeft={button?.iconLeft}
              className="mt-10 md:mt-14 lg:mt-16"
              onClick={handleViewAll}
            >
              {button?.title}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export const EventBlogDefault: EventBlogProps = {
  tagline: "Discover",
  heading: "Upcomming Events",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  button: { title: "View all", variant: "secondary" },
  EventPosts: [
    {
      url: "#",
      image: {
        src: "https://relume-assets.s3.amazonaws.com/placeholder-image-landscape.svg",
        alt: "Placeholder image 1",
      },
      category: "Category",
      title: "Blog title heading will go here",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
      location: "Testing",
      date: "Fri 09 Feb 2024",
      button: {
        title: "Read more",
        variant: "link",
        size: "link",
        iconRight: <RxChevronRight className="size-4" />,
      },
    },
    {
      url: "#",
      image: {
        src: "https://relume-assets.s3.amazonaws.com/placeholder-image-landscape.svg",
        alt: "Placeholder image 1",
      },
      category: "Category",
      title: "Blog title heading will go here",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
      location: "Testing",
      date: "Fri 09 Feb 2024",
      button: {
        title: "Read more",
        variant: "link",
        size: "link",
        iconRight: <RxChevronRight className="size-4" />,
      },
    },
    {
      url: "#",
      image: {
        src: "https://relume-assets.s3.amazonaws.com/placeholder-image-landscape.svg",
        alt: "Placeholder image 1",
      },
      category: "Category",
      title: "Blog title heading will go here",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
      location: "Testing",
      date: "Fri 09 Feb 2024",
      button: {
        title: "Read more",
        variant: "link",
        size: "link",
        iconRight: <RxChevronRight className="size-4" />,
      },
    },
    {
      url: "#",
      image: {
        src: "https://relume-assets.s3.amazonaws.com/placeholder-image-landscape.svg",
        alt: "Placeholder image 1",
      },
      category: "Category",
      title: "Blog title heading will go here",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
      location: "Testing",
      date: "Fri 09 Feb 2024",
      button: {
        title: "Read more",
        variant: "link",
        size: "link",
        iconRight: <RxChevronRight className="size-4" />,
      },
    },
    {
      url: "#",
      image: {
        src: "https://relume-assets.s3.amazonaws.com/placeholder-image-landscape.svg",
        alt: "Placeholder image 1",
      },
      category: "Category",
      title: "Blog title heading will go here",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
      location: "Testing",
      date: "Fri 09 Feb 2024",
      button: {
        title: "Read more",
        variant: "link",
        size: "link",
        iconRight: <RxChevronRight className="size-4" />,
      },
    },
    {
      url: "#",
      image: {
        src: "https://relume-assets.s3.amazonaws.com/placeholder-image-landscape.svg",
        alt: "Placeholder image 1",
      },
      category: "Category",
      title: "Blog title heading will go here",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
      location: "Testing",
      date: "Fri 09 Feb 2024",
      button: {
        title: "Read more",
        variant: "link",
        size: "link",
        iconRight: <RxChevronRight className="size-4" />,
      },
    },
  ],
};

EventBlog.displayName = "EventBlog";
