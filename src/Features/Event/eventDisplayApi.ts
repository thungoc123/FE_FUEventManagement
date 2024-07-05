import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Event } from "../../Types/event.type";
export const eventDisplayApi = createApi({
  reducerPath: "eventDisplayApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://eventmanagementfu.azurewebsites.net/",
  }), // Replace with your API base URL
  endpoints: (builder) => ({
    getEventDetails: builder.query<Event, string>({
      query: (id) => `api-events/${id}`,
    }),

    // PUBLISHED
    getPublishedEvents: builder.query<Event[], void>({
      query: () => `api-events/state/1`,
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
  useGetHappenedEventsQuery,
} = eventDisplayApi;
