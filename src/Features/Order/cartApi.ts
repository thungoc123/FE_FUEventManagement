import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7979/' }),
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => 'api-ticket/cart',
    }),
  }),
});

export const { useGetCartQuery } = cartApi;
