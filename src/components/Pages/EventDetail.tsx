import React from "react";
import { Navbar2 } from "../Organisms/Guest/Navbar";
import { Header9 } from "../Organisms/Guest/HeaderHero";
import { Footer1 } from "../Organisms/Guest/Footer";
import { Contact1 } from "../Organisms/Guest/Contact";
import EventDetails from "../Organisms/Guest/EventDetail";
import { Gallery3 } from "../Organisms/Guest/EventGallery";
import { Testimonial1 } from "../Organisms/Guest/Testimonial";
import Schedule from "../Organisms/Guest/Schedule";
import { Header80 } from "../Molecules/EventHeader";
import { Cta7 } from "../Molecules/CTA";

function EventDetail() {
    const eventData = [
        {
          date: "Friday 09 Feb",
          events: [
            {
              time: "8:00 am",
              title: "Keynote Speaker Session",
              tags: ["In-person", "Online"],
              speaker: "John Doe",
              location: "Main Hall",
            },
            {
              time: "9:00 am",
              title: "Panel Discussion",
              tags: ["Online"],
              speaker: "Jane Smith",
              location: "Virtual Room",
            },
            {
              time: "10:00 am",
              title: "Workshop Session",
              tags: ["Online"],
              speaker: "Mark Johnson",
              location: "Conference Room",
            },
          ],
        },
        {
          date: "Saturday 10 Feb",
          events: [],
        },
        {
          date: "Sunday 11 Feb",
          events: [],
        },
      ];
  return (
    <>
      <Navbar2 />
      {/* <Header9 /> */}
      {/* <Blog33 /> */}
      <Header80 />
      <EventDetails
        eventName="Event Name Here"
        summary="A quick summary for attendees"
        tags={["Tag One", "Tag Two", "Tag Three"]}
        client="Fullname"
        date="March 2023"
        duration="2 hours"
        location="Lô E2a-7, Đường D1, Đ. D1,Long Thạnh Mỹ, Thành Phố Thủ Đức,Thành phố Hồ Chí Minh 700000"
      />
      <Schedule days={eventData}/>
    <Gallery3 />
    <Cta7 />
      <Contact1 />

<Testimonial1 />
      <Footer1 />
    </>
  );
}

export default EventDetail;
