import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';




export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://eventmanagementfu.azurewebsites.net' }),
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (order) => ({
        url: '/api/orders',
        method: 'POST',
        body: order,
      }),
    }),
  }),
});

export const { usePlaceOrderMutation } = orderApi;
