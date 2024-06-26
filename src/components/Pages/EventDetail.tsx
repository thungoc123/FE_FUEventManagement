import { Navbar2 } from "../Organisms/Guest/Navbar";
import { Footer1 } from "../Organisms/Guest/Footer";
import { Contact1 } from "../Organisms/Guest/Contact";
import EventDetails from "../Organisms/Guest/EventDetail";
import { Gallery3 } from "../Organisms/Guest/EventGallery";
import { Testimonial1 } from "../Organisms/Guest/Testimonial";
import Schedule from "../Organisms/Guest/Schedule";
import { Header80 } from "../Molecules/EventHeader";
import { Cta7 } from "../Molecules/CTA";
import { useGetEventDetailsQuery } from "../../Features/Event/eventApi";
import { useParams } from "react-router-dom";
import { EventImage } from "../../Types/event.type";

function EventDetail() {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return <div>Error: Event ID is missing.</div>;
  }
  const { data, error, isLoading } = useGetEventDetailsQuery(id);
  if (isLoading) return <div className="loader">Loading...</div>;
  if (error) {
    let errorMessage;
    if ("status" in error) {
      errorMessage =
        "error" in error ? error.error : JSON.stringify(error.data);
    } else {
      errorMessage = error.message;
    }
    return <div>Error: {errorMessage}</div>;
  }
  const eventImages=data?.eventImages?? "No event image available";
  const eventName = data?.name ?? "No event name available";
  const summary = data?.description ?? "No description available";
  const tags = data?.stateEvent ? [data.stateEvent.name] : [];
  const date = data?.timestart
    ? new Date(data.timestart).toLocaleDateString()
    : "No date available";
  const duration =
    data?.timestart && data?.timeend
      ? `${Math.round(
          (new Date(data.timeend).getTime() -
            new Date(data.timestart).getTime()) /
            60000
        )} minutes`
      : "No duration available";
      const eventSchedules = data?.eventSchedules ?? [];
      const client = eventSchedules.map(schedule => schedule.actor).join(", ") || "No actors available";
      const location = eventSchedules.map(schedule => schedule.location).join(", ") || "No locations available";
      const eventImage: EventImage[] = data?.eventImages.map((image) => ({
        id: image.id,
        url: image.url,
        event: image.event,
      })) ?? [];
  return (
    <>
      <Navbar2 />
      {/* <Header9 /> */}
      {/* <Blog33 /> */}
      <Header80 heading={eventName} description={summary} eventImage={eventImage}/>
      <EventDetails
        eventId={id}
        eventName={eventName}
        summary={summary}
        tags={tags}
        client={client} // Adjust this line according to your data structure
        date={date}
        duration={duration}
        location={location}
      />
      <Schedule days={[]} />
      <Gallery3 />
      <Cta7 />
      <Contact1 />
      <Testimonial1 />
      <Footer1 />
    </>
  );
}

export default EventDetail;
