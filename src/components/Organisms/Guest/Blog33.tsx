"use client";

import React, { useState } from "react";
import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { RxChevronRight } from "react-icons/rx";
import DateDisplay from "../../Atoms/Date"; // Ensure this component exists or adjust accordingly
import LocationDisplay from "../../Atoms/Location"; // Ensure this component exists or adjust accordingly
import SearchBar from "./SearchBar";

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
  stateEvent?: StateEvent | null; // Đảm bảo rằng stateEvent có thể là null
  eventImages: EventImage[] | null; // Đảm bảo rằng eventImages có thể là null
  url?: string;
  button?: ButtonProps;
  location?: string;
};

type Props = {
  tagline?: string;
  heading?: string;
  description?: string;
  button?: ButtonProps;
  EventPosts?: EventPost[];
};

export type Blog33Props = React.ComponentPropsWithoutRef<"section"> & Props;

export const Blog33 = (props: Blog33Props) => {
  const { tagline, heading, description, button, EventPosts } = {
    ...Blog33Default,
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
          <SearchBar />
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            {heading}
          </h2>
          <p className="md:text-md">{description}</p>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 md:gap-y-12 lg:grid-cols-3">
          {EventPosts?.slice(0, visibleEvents).map((post, index) => {
            const stateEventName = post.stateEvent?.name ?? "No location";
            const eventImageUrl =
              post.eventImages && post.eventImages.length > 0
                ? post.eventImages[0].url
                : "https://relume-assets.s3.amazonaws.com/placeholder-image-landscape.svg";

            return (
              <div key={post.id}>
                <a
                  href={post.url}
                  className="mb-3 inline-block w-full max-w-full focus-visible:outline-none"
                >
                  <div className="w-full overflow-hidden">
                    <img
                      src={eventImageUrl}
                      alt={
                        post.eventImages && post.eventImages.length > 0
                          ? post.eventImages[0].event
                          : "Placeholder image"
                      }
                      className="aspect-[3/2] size-full object-cover"
                    />
                  </div>
                </a>
                <div className="mt-3 flex items-center justify-between">
                  <DateDisplay
                    date={new Date(post.timestart).toLocaleDateString()}
                  />
                  <LocationDisplay location={post.location ?? "No location"} />{" "}
                  {/* Sử dụng thuộc tính location */}
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
                    <h6 className="text-sm font-semibold">
                      Price: ${post.price}
                    </h6>
                    <div className="flex items-center">
                      <p className="text-sm">
                        Start: {new Date(post.timestart).toLocaleDateString()}
                      </p>
                      <span className="mx-2">•</span>
                      <p className="text-sm">
                        End: {new Date(post.timeend).toLocaleDateString()}
                      </p>
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
            );
          })}
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

export const Blog33Default: Blog33Props = {
  tagline: "Blog",
  heading: "Event On the Line",
  description: "",
  button: { title: "View all", variant: "secondary" },
  EventPosts: [],
};

Blog33.displayName = "Blog33";
