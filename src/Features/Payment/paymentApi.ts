import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the paymentApi with the existing and new endpoints
export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7979/' }), // Base URL of the backend
  endpoints: (builder) => ({
    sendPaymentInfo: builder.query({
      query: ({ amount, email }) => `api/v1/vnpay/pay?amount=${amount}&email=${encodeURIComponent(email)}`,
    }),
    sendCapitalPaymentInfo: builder.query({
      query: ({ amount, email, sponsorId, eventId }) => 
        `api/v1/vnpay/pay/capital?amount=${amount}&email=${email}&sponsorId=${sponsorId}&eventId=${eventId}`,
    }),
  }),
});

// Export hooks for the queries
export const { useLazySendPaymentInfoQuery, useLazySendCapitalPaymentInfoQuery } = paymentApi;
