// src/features/sponsor/sponsorApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const sponsorPercentApi = createApi({
  reducerPath: 'sponsorPercentApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7979/' }),
  endpoints: (builder) => ({
    getSponsorProfit: builder.query<{ profitAmount: number }, { id: string; totalEventProfit: number }>({
      query: ({ id, totalEventProfit }) => `api-sponsor/${id}/sponsors/profits?totalEventProfit=${totalEventProfit}`,
    }),
  }),
});

export const { useGetSponsorProfitQuery } = sponsorPercentApi;
