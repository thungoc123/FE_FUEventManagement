
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ticketApi = createApi({
  reducerPath: 'ticketApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7979/' }),
  endpoints: (builder) => ({
    getTicketById: builder.query({
      query: (id: number) => `api-ticket/${id}`,
    }),
  }),
});

export const { useGetTicketByIdQuery } = ticketApi;
