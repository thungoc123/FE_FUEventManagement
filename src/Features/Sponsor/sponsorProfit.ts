import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface SponsorProfit {
  sponsorId: number;
  companyName: string;
  sponsorProfitPercent: number;
  profitAmount:number;
}

export const sponsorProfitApi = createApi({
  reducerPath: 'sponsorProfitApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7979/' }),
  endpoints: (builder) => ({
    getSponsorProfits: builder.query<SponsorProfit[], { eventId: number, accountId: number, totalEventProfit: number }>({
      query: ({ eventId, accountId, totalEventProfit }) => `api-sponsor/${eventId}/${accountId}?totalEventProfit=${totalEventProfit}`,
    }),
  }),
});

export const { useGetSponsorProfitsQuery } = sponsorProfitApi;
