
import React from "react";
import { Button, Input } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { BiSearch } from "react-icons/bi";

type StateEvent = {
  id: number;
  name: string;
};

type EventImage = {
  id: number;
  url: string;
  event: string;
};

type BlogPost = {
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
};

type Props = {
  tagline?: string;
  heading?: string;
  description?: string;
  button?: ButtonProps;
  blogPosts?: BlogPost[];
};

export type Blog33Props = React.ComponentPropsWithoutRef<"section"> & Props;

export const Blog33 = (props: Blog33Props) => {
  const { tagline, heading, description, button, blogPosts } = {
    ...Blog33Defaults,
    ...props,
  } as Props;
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="container mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <Input id="search" placeholder="Search" icon={<BiSearch className="size-6" />} />

          <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            {heading}
          </h2>
          <p className="md:text-md">{description}</p>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 md:gap-y-12 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <div key={post.id}>
              <a
                href="#"
                className="mb-6 inline-block w-full max-w-full focus-visible:outline-none"
              >
                <div className="w-full overflow-hidden">
                  <img
                    src={post.eventImages[0]?.url || 'https://relume-assets.s3.amazonaws.com/placeholder-image-landscape.svg'}
                    alt={post.eventImages[0]?.event || 'Placeholder image'}
                    className="aspect-[3/2] size-full object-cover"
                  />
                </div>
              </a>
              <a
                href="#"
                className="mb-2 mr-4 inline-block max-w-full text-sm font-semibold focus-visible:outline-none"
              >
                {post.stateEvent.name}
              </a>

              <a
                href="#"
                className="mb-2 block max-w-full focus-visible:outline-none"
              >
                <h5 className="text-xl font-bold md:text-2xl">{post.name}</h5>
              </a>
              <p>{post.description}</p>
              <div className="mt-6 flex items-center">
                <div className="mr-4 shrink-0">
                  <img
                    src={post.eventImages[0]?.url || 'https://relume-assets.s3.amazonaws.com/placeholder-image.svg'}
                    alt={post.eventImages[0]?.event || 'Placeholder image'}
                    className="size-12 min-h-12 min-w-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h6 className="text-sm font-semibold">Price: ${post.price}</h6>
                  <div className="flex items-center">
                    <p className="text-sm">Start: {new Date(post.timestart).toLocaleDateString()}</p>
                    <span className="mx-2">•</span>
                    <p className="text-sm">End: {new Date(post.timeend).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center">
          <Button
            variant={button.variant}
            size={button.size}
            iconRight={button.iconRight}
            iconLeft={button.iconLeft}
            className="mt-10 md:mt-14 lg:mt-16"
          >
            {button.title}
          </Button>
        </div>
      </div>
    </section>
  );
};

export const Blog33Defaults: Blog33Props = {
  tagline: "Blog",
  heading: "Short heading goes here",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  button: { title: "View all", variant: "secondary" },
  blogPosts: [
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
      ]
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
      ]
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
      ]
    }
  ]
};

Blog33.displayName = "Blog33";
