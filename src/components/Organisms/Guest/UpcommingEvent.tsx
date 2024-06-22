"use client";

import React, { useState } from "react";
import { Button } from "@relume_io/relume-ui";
import type { ImageProps, ButtonProps } from "@relume_io/relume-ui";
import { RxChevronRight } from "react-icons/rx";
import DateDisplay from "../../Atoms/Date"; // Ensure this component exists or adjust accordingly
import LocationDisplay from "../../Atoms/Location"; // Ensure this component exists or adjust accordingly

type StateEvent = {
  id: number;
  name: string;
};

type EventImage = {
  id: number;
  url: string;
  event: string;
};

type EventPost = {
  id: number;
  name: string;
  description: string;
  price: number;
  timestart: string;
  timeend: string;
  timeopensale: string;
  timeclosesale: string;
  stateEvent: StateEvent;
  eventImages: EventImage[];
  url?: string;
  button?: ButtonProps;
};

type Props = {
  tagline?: string;
  heading?: string;
  description?: string;
  button?: ButtonProps;
  EventPosts?: EventPost[];
};

export type EventBlogProps = React.ComponentPropsWithoutRef<"section"> & Props;

export const EventBlog = (props: EventBlogProps) => {
  const { tagline, heading, description, button, EventPosts } = {
    ...EventBlogDefault,
    ...props,
  } as Props;

  const [visibleEvents, setVisibleEvents] = useState(3);
  const handleViewAll = () => {
    setVisibleEvents(EventPosts?.length || 0);
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
          {EventPosts?.slice(0, visibleEvents).map((post, index) => (
            <div key={post.id}>
              <a
                href={post.url}
                className="mb-3 inline-block w-full max-w-full focus-visible:outline-none"
              >
                <div className="w-full overflow-hidden">
                  <img
                    src={post.eventImages[0]?.url || 'https://relume-assets.s3.amazonaws.com/placeholder-image-landscape.svg'}
                    alt={post.eventImages[0]?.event || 'Placeholder image'}
                    className="aspect-[3/2] size-full object-cover"
                  />
                </div>
              </a>
              <div className="mt-3 flex items-center justify-between">
                <DateDisplay date={new Date(post.timestart).toLocaleDateString()} />
                <LocationDisplay location={post.stateEvent.name} />
              </div>
              <a
                href={post.url}
                className="mb-2 block max-w-full focus-visible:outline-none"
              >
                <h5 className="text-xl font-bold md:text-2xl">{post.name}</h5>
              </a>
              <p>{post.description}</p>
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <h6 className="text-sm font-semibold">Price: ${post.price}</h6>
                  <div className="flex items-center">
                    <p className="text-sm">Start: {new Date(post.timestart).toLocaleDateString()}</p>
                    <span className="mx-2">•</span>
                    <p className="text-sm">End: {new Date(post.timeend).toLocaleDateString()}</p>
                  </div>
                </div>
                <Button
                  variant={post.button?.variant}
                  size={post.button?.size}
                  iconRight={post.button?.iconRight}
                  iconLeft={post.button?.iconLeft}
                  className="mt-6 flex items-center justify-center gap-x-1"
                >
                  {post.button?.title}
                </Button>
              </div>
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
  heading: "Upcoming Events",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  button: { title: "View all", variant: "secondary" },
  EventPosts: [
    {
      id: 1,
      name: "Event 1",
      description: "Description for event 1",
      price: 100,
      timestart: "2023-06-01T00:00:00Z",
      timeend: "2023-06-01T02:00:00Z",
      timeopensale: "2023-05-01T00:00:00Z",
      timeclosesale: "2023-05-31T23:59:59Z",
      stateEvent: { id: 1, name: "State 1" },
      eventImages: [
        {
          id: 1,
          url: "https://relume-assets.s3.amazonaws.com/placeholder-image-landscape.svg",
          event: "Event 1"
        }
      ],
      url: "#",
      button: {
        title: "Read more",
        variant: "link",
        size: "link",
        iconRight: <RxChevronRight className="size-4" />,
      },
    },
    {
      id: 2,
      name: "Event 2",
      description: "Description for event 2",
      price: 200,
      timestart: "2023-06-02T00:00:00Z",
      timeend: "2023-06-02T02:00:00Z",
      timeopensale: "2023-05-02T00:00:00Z",
      timeclosesale: "2023-06-01T23:59:59Z",
      stateEvent: { id: 2, name: "State 2" },
      eventImages: [
        {
          id: 2,
          url: "https://relume-assets.s3.amazonaws.com/placeholder-image-landscape.svg",
          event: "Event 2"
        }
      ],
      url: "#",
      button: {
        title: "Read more",
        variant: "link",
        size: "link",
        iconRight: <RxChevronRight className="size-4" />,
      },
    },
    {
      id: 3,
      name: "Event 3",
      description: "Description for event 3",
      price: 300,
      timestart: "2023-06-03T00:00:00Z",
      timeend: "2023-06-03T02:00:00Z",
      timeopensale: "2023-05-03T00:00:00Z",
      timeclosesale: "2023-06-02T23:59:59Z",
      stateEvent: { id: 3, name: "State 3" },
      eventImages: [
        {
          id: 3,
          url: "https://relume-assets.s3.amazonaws.com/placeholder-image-landscape.svg",
          event: "Event 3"
        }
      ],
      url: "#",
      button: {
        title: "Read more",
        variant: "link",
        size: "link",
        iconRight: <RxChevronRight className="size-4" />,
      },
    }
  ],
};

EventBlog.displayName = "EventBlog";
