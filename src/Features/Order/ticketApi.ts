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
    updateTicketStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `api-ticket/update/${id}`,
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
} = ticketApi;
