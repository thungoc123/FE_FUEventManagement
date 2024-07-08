// services/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const passwordApi = createApi({
  reducerPath: 'passwordApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://eventmanagementfu.azurewebsites.net/' }),
  endpoints: (builder) => ({
    resetPassword: builder.mutation({
      query: (email) => ({
        url: 'api-auth-resetpassword/forgot-password',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*',
        },
        body: { email },
      }),
    }),
  }),
});

export const { useResetPasswordMutation } = passwordApi;
