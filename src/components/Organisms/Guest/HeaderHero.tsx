import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import '../Style/header.css'
import SearchBar from "./SearchBar";
import { EventImage, StateEvent } from "../../../Types/eo.type";
import { useEffect, useState } from "react";
import { truncateString } from "../../../ulities/Stringhandle";
import DateDisplay from "../../Atoms/Date";
import { useNavigate } from "react-router-dom";

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  heading: string;
  description: string;
  buttons: ButtonProps[];
  images: ImageProps[];
  EventPosts?: EventPost[];
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
  stateEvent?: StateEvent | null;
  eventImages: EventImage[] | null;
  url?: string;
  button?: ButtonProps;
  location?: string;
};

export type Header76Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Header76 = (props: Header76Props) => {
  const { heading, description, buttons, images , EventPosts} = {
    ...Header76Defaults,
    ...props,
  } as Props;
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredEvents, setFilteredEvents] = useState<EventPost[]>(EventPosts || []);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchValue(query);

    if (!EventPosts) return;

    const filtered = EventPosts.filter((post) =>
      post.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEvents(filtered);
  };
  const [visibleEvents, setVisibleEvents] = useState(3);

  useEffect(() => {
    setFilteredEvents(EventPosts || []);
  }, [EventPosts]);
  const navigate = useNavigate();
  const handleButtonClick = (eventId: number) => {
    navigate(`/event-detail/${eventId}`);
  };

  
  return (
    <>
    <header className="grid grid-cols-1 gap-y-16 pt-16 md:grid-flow-row md:pt-24 lg:grid-flow-col lg:grid-cols-2 lg:items-center lg:pt-0 header">
      <div className="mx-[5%] max-w-[40rem] justify-self-start lg:ml-[5vw] lg:mr-20 lg:justify-self-end">
        <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">{heading}</h1>
        <p className="md:text-md">{description}</p>
        <div className="mt-6 flex gap-x-4 md:mt-8">
          {/* {buttons.map((button, index) => (
            <Button key={index} {...button}>
              {button.title}
            </Button>
          ))} */}
          {filteredEvents.slice(0, visibleEvents).map((post) => {
            const stateEventName = post.stateEvent?.name ?? "No location";
            const eventImageUrl =
              post.eventImages && post.eventImages.length > 0
                ? post.eventImages[0].url
                : "https://relume-assets.s3.amazonaws.com/placeholder-image-landscape.svg";

            return (
              <div key={post.id} className="eventCard flex flex-col justify-between h-full">
                <a href={post.url} className="mb-3 inline-block w-full max-w-full focus-visible:outline-none">
                  <div className="w-full overflow-hidden">
                    <img
                      src={eventImageUrl}
                      alt={post.eventImages && post.eventImages.length > 0 ? post.eventImages[0].event : "Placeholder image"}
                      className="aspect-[3/2] size-full object-cover"
                    />
                  </div>
                </a>
                <div className="mt-3 flex items-center justify-between">
                  <DateDisplay date={new Date(post.timestart).toLocaleDateString()} />
                  {/* <LocationDisplay location={post.location ?? "No location"} /> */}
                </div>
                <a href={post.url} className="mb-2 block max-w-full focus-visible:outline-none">
                  <h5 className="text-xl font-bold md:text-2xl">{post.name}</h5>
                </a>
                <p>{truncateString(post.description,70)}</p>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex">
                    <h6 className="text-sm font-semibold price">Price: {post.price} VND</h6>
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
                    className="mt-6 ml-2 button_blog_card"
                    onClick={() => handleButtonClick(post.id)}
                  >
                    {post.button?.title || "Detail"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="h-[30rem] overflow-hidden pl-[5vw] pr-[5vw] md:h-[40rem] lg:h-screen lg:pl-0">
        <div className="grid w-full grid-cols-2 gap-x-4">
          <div className="-mt-[120%] grid size-full animate-loop-vertically columns-2 grid-cols-1 gap-4 self-center">
            {images.map((image, index) => (
              <div key={index} className="grid size-full grid-cols-1 gap-4">
                <div className="relative w-full pt-[120%]">
                  <img
                    className="absolute inset-0 size-full object-cover"
                    src={image.src}
                    alt={image.alt}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="grid size-full animate-loop-vertically grid-cols-1 gap-4">
            {images.map((image, index) => (
              <div key={index} className="grid size-full grid-cols-1 gap-4">
                <div className="relative w-full pt-[120%]">
                  <img
                    className="absolute inset-0 size-full object-cover"
                    src={image.src}
                    alt={image.alt}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
            {/* Search display  */}

    </>
  );
};

export const Header76Defaults: Header76Props = {
  heading: "Welcome to FPT event",
  description:
    "The ease of searching, filtering, and staying updated on the latest events is the core value we aim to deliver to you.",
  buttons: [{ title: "Button" }, { title: "Button", variant: "secondary" }],
  images: [
    {
      src: "https://images.pexels.com/photos/301987/pexels-photo-301987.jpeg?auto=compress&cs=tinysrgb&w=600",
      alt: "Placeholder image 1",
    },
    {
      src: "https://images.pexels.com/photos/431722/pexels-photo-431722.jpeg?auto=compress&cs=tinysrgb&w=600",
      alt: "Placeholder image 2",
    },
    {
      src: "https://images.pexels.com/photos/2608516/pexels-photo-2608516.jpeg?auto=compress&cs=tinysrgb&w=600",
      alt: "Placeholder image 3",
    },
    {
      src: "https://images.pexels.com/photos/2311713/pexels-photo-2311713.jpeg?auto=compress&cs=tinysrgb&w=600",
      alt: "Placeholder image 4",
    },
    {
      src: "https://images.pexels.com/photos/35880/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
      alt: "Placeholder image 5",
    },
    {
      src: "https://phucthanhnhan.com/contents_images/images/event-la-gi-3.jpg",
      alt: "Placeholder image 6",
    },
  ],
};

Header76.displayName = "Header76";
