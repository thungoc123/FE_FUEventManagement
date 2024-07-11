import { Navbar2 } from "../Organisms/Guest/Navbar";
import { Header76 } from "../Organisms/Guest/HeaderHero";
import { Blog33 } from "../Organisms/Guest/Blog33";
import { Logo1 } from "../Organisms/Guest/Logo1";
import { Footer1 } from "../Organisms/Guest/Footer";
import { EventBlog } from "../Organisms/Guest/UpcommingEvent";
import { Event } from "../../Types/event.type";
import { useGetHappenedEventsQuery, useGetPublishedEventsQuery } from "../../Features/Event/eventDisplayApi";

function HomePage() {
  // DATA OF PUBLISHED EVENTS
  const {
    data: publishedEvents = [],
    error: publishedEventsError,
    isLoading: publishedEventsLoading,
  } = useGetPublishedEventsQuery(); // Sử dụng hook để lấy dữ liệu

  // DATA OF HAPPENED EVENTS
  const {
    data: happendEvents = [],
    error: happenedEventsError,
    isLoading: happenedEventsLoading,
  } = useGetHappenedEventsQuery();

  if (publishedEventsLoading || happenedEventsLoading)
    return <div className="loader"></div>;

  if (publishedEventsError || happenedEventsError)
    return <div>Error loading events</div>;
  // const eventImages = eventPosts.flatMap((event: Event) => event.eventImages);
  const headerData = {
    heading: "Event Of The Month",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    images: [],
    eventImages: publishedEvents.flatMap((event: Event) => event.eventImages.map(img => ({
      ...img,
      name: event.name,
      description: event.description
    }))),
  };

  return (
    <>
      <Navbar2 />
      {/* <Header9 {...headerData} />
       */}
      <Header76 />
      {/* RENDER THE UPCOMING EVENTS */}
      <EventBlog
        tagline="Discover"
        heading="Upcoming Events"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        button={{ title: "View all", variant: "secondary" }}
        EventPosts={publishedEvents}
      />

      {/* RENDER THE HAPPENED EVENTS */}
      <Blog33
        tagline="Blog"
        heading="Event On the Line"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        button={{ title: "View all", variant: "secondary" }}
        EventPosts={publishedEvents} // Truyền dữ liệu sự kiện vào Blog />
      />
      <Logo1 />
      <Footer1 />
    </>
  );
}

export default HomePage;
