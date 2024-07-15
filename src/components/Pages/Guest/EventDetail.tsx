// import { Navbar2 } from "../Organisms/Guest/Navbar";
// import { Footer1 } from "../Organisms/Guest/Footer";
// import { Contact1 } from "../Organisms/Guest/Contact";
// import EventDetails from "../Organisms/Guest/EventDetail";
// import { Gallery3 } from "../Organisms/Guest/EventGallery";
// import { Testimonial1 } from "../Organisms/Guest/Testimonial";
// import Schedule from "../Organisms/Guest/Schedule";
// import { Header80 } from "../Molecules/EventHeader";
// import { Cta7 } from "../Molecules/CTA";
// import { useGetEventDetailsQuery } from "../../Features/Event/eventApi";
import { useParams } from "react-router-dom";
// import { useGetEventDetailsQuery } from "../../../Features/Event/eventApi";
import { NavbarLogout } from "../../Organisms/Guest/NavbarLogout";
import { Header3, Header80 } from "../../Molecules/EventHeader";
import EventDetails from "../../Organisms/Guest/EventDetail";
import Schedule from "../../Organisms/Guest/Schedule";
import Gallery3 from "../../Organisms/Guest/EventGallery";
import { Cta7 } from "../../Molecules/CTA";
import { Contact1 } from "../../Organisms/Guest/Contact";
import { Testimonial1 } from "../../Organisms/Guest/Testimonial";
import { Footer1 } from "../../Organisms/Guest/Footer";
import { useGetEventDetailsQuery } from "../../../Features/Event/eventDisplayApi";
import { Navbar2 } from "../../Organisms/Guest/Navbar";
// import { NavbarLogout } from "../Organisms/Guest/NavbarLogout";
import '../../Organisms/Style/eventDetail.css'
function EventDetail() {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return <div>Error: Event ID is missing.</div>;
  }
  const { data, error, isLoading } = useGetEventDetailsQuery(id);

  if (isLoading) return <div className="loader"></div>;
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

  //#region EXTRACTING EVENTS DATA GOT FROM BACKEND
  const eventImages =
    data?.eventImages?.map((image) => ({
      src: image.url,
      alt: image.event,
    })) ?? [];

  const eventSchedules = data?.eventSchedules ?? [];

  const eventName = data?.name ?? "No event name available";

  const summary = data?.description ?? "No description available";

  const tags = data?.stateEvent ? [data.stateEvent.name] : [];
  
  const timeOpenSale = data?.timeopensale ?? "";
  const timeCloseSale = data?.timeclosesale?? "";
 
  const quantity = typeof data?.quantity === 'string' ? Number(data.quantity) : data?.quantity ?? 0;
  const price = typeof data?.price === 'string' ? Number(data.price) : data?.price ?? 0;
  const startDate = data?.timestart
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

  const client =
    eventSchedules.map((schedule) => schedule.actor).join(", ") ||
    "No actors available";

  const location =
    eventSchedules.map((schedule) => schedule.location).join(", ") ||
    "No locations available";

  // FINAL DATA PASSED
  const days: { [key: string]: any[] } = eventSchedules.reduce(
    (acc: { [key: string]: any[] }, schedule) => {
      const date = new Date(schedule.date).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push({
        time: `${schedule.timestart} - ${schedule.duration}`,
        title: schedule.name,
        tags: [schedule.eventType],
        speaker: schedule.actor,
        location: schedule.location,
      });
      return acc;
    },
    {}
  );

  const formattedDays = Object.keys(days).map((date) => ({
    date,
    events: days[date],
  }));
  //#endregion
  //EVENT GALLERY 
  
  return (
    <>
        <Navbar2 />
        {/* <Header80
        heading={eventName}
        description={summary}
        eventImages={eventImages}
      /> */}
      <Header3 
      heading={eventName}
      description={summary}
      eventImages={eventImages}
      tags={tags}
      />
      <EventDetails
        eventId={id}
        eventName={eventName}
        summary={summary}
        tags={tags}
        client={client}
        date={startDate}
        duration={duration}
        location={location}
        quantity={quantity}
        price={price}
        timeOpenSale={timeOpenSale}
        timeCloseSale={timeCloseSale}

      />

      <Schedule days={formattedDays} />
      <Gallery3 heading="Event Gallery" description="" images={eventImages} /> {/* Truyền eventImages vào Gallery3 */}
      {/* <Cta7 /> */}
      {/* <Contact1 /> */}
      <Testimonial1 />
      <Footer1 />
    </>
  );
}

export default EventDetail;
