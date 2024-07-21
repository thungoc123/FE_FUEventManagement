import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ticketApi = createApi({
  reducerPath: "ticketApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:7979/" }),
  endpoints: (builder) => ({
    getTicketById: builder.query({
      query: (id: number) => `api-ticket/${id}`,
    }),
    getVisitorByAccountId: builder.query({
      query: (accountId: string) =>
        `api-ticket/visitorId?accountId=${accountId}`,
    }),
    getNumberAttendances: builder.query({
      query: (eventId: number) => `api-ticket/total-participants/${eventId}`,
    }),
    updateTicketStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `api-ticket/${id}/status`,
        method: "PUT",
        body: { status },
      }),
    }),
  }),
});

export const {
  useGetTicketByIdQuery,
  useGetVisitorByAccountIdQuery,
  useUpdateTicketStatusMutation,
  useGetNumberAttendancesQuery,
} = ticketApi;
