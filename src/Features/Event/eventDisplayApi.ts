import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Event } from "../../Types/event.type";
import { EOevent } from "../../Types/eo.type";
export const eventDisplayApi = createApi({
  reducerPath: "eventDisplayApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:7979/",
  }), // Replace with your API base URL
  endpoints: (builder) => ({
    getEventDetails: builder.query<EOevent, string>({
      query: (id) => `api-events/${id}`,
    }),
    //UNPUBLISHED
    getUnPublishedEvents: builder.query<Event[], void>({
      query: () => `api-events/state/1`,
    }),
    // PUBLISHED
    getPublishedEvents: builder.query<Event[], void>({
      query: () => `api-events/state/2`,
    }),
    // HAPPENED EVENTS
    getHappenedEvents: builder.query<Event[], void>({
      query: () => `api-events/state/3`,
    }),
  }),
});

export const {
  useGetEventDetailsQuery,
  useGetPublishedEventsQuery,
  useGetUnPublishedEventsQuery,
  useGetHappenedEventsQuery,
} = eventDisplayApi;
