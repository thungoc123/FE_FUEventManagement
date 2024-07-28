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
  } = useGetPublishedEventsQuery();
  
  console.log(publishedEvents);

  // DATA OF HAPPENED EVENTS
  const {
    data: happendEvents = [],
    error: happenedEventsError,
    isLoading: happenedEventsLoading,
  } = useGetHappenedEventsQuery();
  
  console.log(happendEvents);

  if (publishedEventsLoading || happenedEventsLoading)
    return <div className="loader"></div>;

  if (publishedEventsError || happenedEventsError)
    return <div>Error loading events</div>;

  // Ensure that publishedEvents is an array and not null
  const validPublishedEvents = Array.isArray(publishedEvents) ? publishedEvents : [];
  const validHappendEvents = Array.isArray(happendEvents) ? happendEvents : [];


  return (
    <>
      <Navbar2 EventPosts={validPublishedEvents} />
      <Header76 />
      <EventBlog
        tagline="Discover"
        heading="Upcoming Events"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        button={{ title: "View all", variant: "secondary" }}
        EventPosts={validPublishedEvents}
      />
      <Blog33
        tagline="Blog"
        heading="Event On the Line"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        button={{ title: "View all", variant: "secondary" }}
        EventPosts={validHappendEvents}
      />
      <Logo1 />
      <Footer1 />
    </>
  );
}

export default HomePage;
