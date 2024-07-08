// services/passwordApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const resetPasswordApi = createApi({
  reducerPath: 'resetPasswordApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://eventmanagementfu.azurewebsites.net/' }),
  endpoints: (builder) => ({
    resetPassword: builder.mutation({
      query: (email) => ({
        url: 'api-auth-resetpassword/reset-password',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*',
        },
        body: { email },
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ token, newPassword }) => ({
        url: 'api-auth-resetpassword/update-password',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: { newPassword },
      }),
    }),
  }),
});

export const { useResetPasswordMutation, useUpdatePasswordMutation } = resetPasswordApi;
