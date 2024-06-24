  import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
  import { Event } from '../../Types/event.type';
  export const eventApi = createApi({
    reducerPath: 'eventApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://eventmanagementfu.azurewebsites.net/' }), // Replace with your API base URL
    endpoints: (builder) => ({
      getEventDetails: builder.query<Event, string>({
        query: (id) => `api-events/${id}`,
      }),
      getEvents: builder.query<Event[], void>({
        query: () => `api-events`,
      }),
    }),
  });
  
  export const { useGetEventDetailsQuery, useGetEventsQuery } = eventApi;
