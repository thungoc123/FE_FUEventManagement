import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const createorderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://eventmanagementfu.azurewebsites.net/' }),
  endpoints: (builder) => ({
    createOrder: builder.mutation({
    // CREATE ORDER-KHAI BAO BUILDER(KHI TAO ->MUTATION, LAY DU LIEU -> QUERY )  
      query: ({order}) => ({
        url: `api-ticket/create_ticket_order`,
        method: 'POST',
        body: order,
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = createorderApi;