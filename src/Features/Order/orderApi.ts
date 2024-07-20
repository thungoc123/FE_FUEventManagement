import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const createorderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7979/' }),
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: ({ order }) => ({
        url: `/api-ticket/create_ticket_order`,
        method: 'POST',
        body: order,
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = createorderApi;