import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface SponsorProfit {
  sponsorId: number;
  companyName: string;
  sponsorEmail: string;
  sponsorProfitPercent: number;
  profitAmount: number;
  eventName: string;
}

export const sponsorProfitApi = createApi({
  reducerPath: "sponsorProfitApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:7979/" }),
  endpoints: (builder) => ({
    getSponsorProfits: builder.query<SponsorProfit[], number>({
      query: (accountId) => `api-sponsor/profits/${accountId}`,
    }),
  }),
});

export const { useGetSponsorProfitsQuery } = sponsorProfitApi;
