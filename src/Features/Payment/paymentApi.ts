// src/Features/Payment/paymentApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://eventmanagementfu.azurewebsites.net/' }), // URL của backend
  endpoints: (builder) => ({
    sendPaymentInfo: builder.query({
      query: ({ amount, email }) => `api/v1/vnpay/pay?amount=${amount}&email=${encodeURIComponent(email)}`,
    }),
  }),
});

export const { useLazySendPaymentInfoQuery } = paymentApi;
