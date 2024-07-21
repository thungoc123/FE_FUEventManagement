import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { EOevent } from './eo.type';




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


interface Order {
  attendances: [],
  createdDate: string,
  description: string,
  event: EOevent,
  

}