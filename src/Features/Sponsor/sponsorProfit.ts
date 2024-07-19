import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface SponsorProfit {
  sponsorId: number;
  sponsorName: string;
  profitPercentage: number;
}

export const sponsorProfitApi = createApi({
  reducerPath: 'sponsorProfitApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7979/' }),
  endpoints: (builder) => ({
    getSponsorProfits: builder.query<SponsorProfit[], { eventId: number, totalEventProfit: number }>({
      query: ({ eventId, totalEventProfit }) => `api-sponsor/${eventId}/sponsors/profits?totalEventProfit=${totalEventProfit}`,
    }),
  }),
});

export const { useGetSponsorProfitsQuery } = sponsorProfitApi;
