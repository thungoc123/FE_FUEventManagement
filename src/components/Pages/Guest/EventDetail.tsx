<<<<<<< HEAD
<<<<<<<< HEAD:src/components/Pages/Guest/EventDetail.tsx
import React from "react";
import { Navbar2 } from "../../Organisms/Guest/Navbar";
import { Header80 } from "../../Molecules/EventHeader";
import EventDetails from "../../Organisms/Guest/EventDetail";
import Schedule from "../../Organisms/Guest/Schedule";
import { Gallery3 } from "../../Organisms/Guest/EventGallery";
import { Cta7 } from "../../Molecules/CTA";
import { Contact1 } from "../../Organisms/Guest/Contact";
import { Testimonial1 } from "../../Organisms/Guest/Testimonial";
import { Footer1 } from "../../Organisms/Guest/Footer";

========
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
import { NavbarLogout } from "../Organisms/Guest/NavbarLogout";
>>>>>>>> TienMerge:src/components/Pages/EventDetail.tsx

function EventDetail() {
  const { id } = useParams<{ id: string }>();
=======
import { useGetEventDetailsQuery } from "../../../Features/Event/eventDisplayApi";
import { Cta7 } from "../../Molecules/CTA";
import { Header80 } from "../../Molecules/EventHeader";
import { Contact1 } from "../../Organisms/Guest/Contact";
import EventDetails from "../../Organisms/Guest/EventDetail";
import Gallery3 from "../../Organisms/Guest/EventGallery";
import { Footer1 } from "../../Organisms/Guest/Footer";
import { Navbar2 } from "../../Organisms/Guest/Navbar";
import Schedule from "../../Organisms/Guest/Schedule";
import { Testimonial1 } from "../../Organisms/Guest/Testimonial";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EventDetail() {

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
>>>>>>> TienMerge
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

<<<<<<< HEAD
  //#region EXTRACTING EVENTS DATA GOT FROM BACKEND
=======
  const eventDetails = data; // Lưu trữ chi tiết sự kiện

>>>>>>> TienMerge
  const eventImages =
    data?.eventImages?.map((image) => ({
      src: image.url,
      alt: image.event,
    })) ?? [];

  const eventSchedules = data?.eventSchedules ?? [];

  const eventName = data?.name ?? "No event name available";
<<<<<<< HEAD

  const summary = data?.description ?? "No description available";

  const tags = data?.stateEvent ? [data.stateEvent.name] : [];

 
  const quantity = typeof data?.quantity === 'string' ? Number(data.quantity) : data?.quantity ?? 0;
  const price = typeof data?.price === 'string' ? Number(data.price) : data?.price ?? 0;
=======
  const summary = data?.description ?? "No description available";
  const tags = data?.stateEvent ? [data.stateEvent.name] : [];
>>>>>>> TienMerge
  const startDate = data?.timestart
    ? new Date(data.timestart).toLocaleDateString()
    : "No date available";

<<<<<<< HEAD


=======
>>>>>>> TienMerge
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

<<<<<<< HEAD
  // FINAL DATA PASSED
=======
>>>>>>> TienMerge
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
<<<<<<< HEAD
  //#endregion
  //EVENT GALLERY 
  
  return (
    <>
        <NavbarLogout/>
        <Header80
=======

  const handleCheckout = () => {
    navigate("/payment", { state: { eventDetails } });
  };
  return (
    <>
      <Navbar2 />
      <Header80
>>>>>>> TienMerge
        heading={eventName}
        description={summary}
        eventImages={eventImages}
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
<<<<<<< HEAD
        quantity={quantity}
        price={price}


      />

      <Schedule days={formattedDays} />
      <Gallery3 heading="Event Gallery" description="" images={eventImages} /> {/* Truyền eventImages vào Gallery3 */}
      <Cta7 />
=======
      />
      <Schedule days={formattedDays} />
      <Gallery3 heading="Event Gallery" description="" images={eventImages} />
      <Cta7 eventId={id} eventDetails={eventDetails} />
>>>>>>> TienMerge
      <Contact1 />
      <Testimonial1 />
      <Footer1 />
    </>
  );
}

export default EventDetail;
