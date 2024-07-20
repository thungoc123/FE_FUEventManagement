// src/Features/EventManage/eventApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const eventAmountApi = createApi({
  reducerPath: 'eventAmountApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7979/' }),
  endpoints: (builder) => ({
    getListEvent: builder.query({
      query: () => 'api-event',
    }),
    getEventTotalAmount: builder.query({
      query: (id) => `api-ticket/total-amount/${id}`,
    }),
  }),
});

export const { useGetListEventQuery, useGetEventTotalAmountQuery } = eventAmountApi;
