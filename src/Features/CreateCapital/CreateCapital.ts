import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const paymentApi = createApi({
  reducerPath: 'createcapital',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7979/' }), // URL of the backend
  endpoints: (builder) => ({
    callCapital: builder.mutation({
      query: ({ eventId, fundraising }) => ({
        url: `api-events/${eventId}/callcapital`,
        method: 'POST',
        body: { fundraising },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const { useCallCapitalMutation } = paymentApi;
