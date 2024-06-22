import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { EventApi } from './eventApi';
export const eventSlice = createApi({
  reducerPath: 'eventSlice',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://eventmanagementfu.azurewebsites.net' }), // Replace with your API base URL
  endpoints: (builder) => ({
    getEventDetails: builder.query<EventApi, string>({
      query: (eventId) => `/api-sponsor/1${eventId}`,
    }),
  }),
});

export const { useGetEventDetailsQuery } = eventSlice;
