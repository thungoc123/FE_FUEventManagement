import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const resetpasswordApi = createApi({
  reducerPath: 'resetpasswordApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7979/' }),
  endpoints: (builder) => ({
    requestPasswordReset: builder.mutation({
      query: ({ email }) => ({
        url: 'api-auth-resetpassword/forgot-password',
        method: 'POST',
        body: { email },
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ token, newPassword }) => ({
        url: 'api-auth-resetpassword/reset-password',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newPassword }), // Đảm bảo body chứa mật khẩu mới
      }),
    }),
  }),
});

export const { useRequestPasswordResetMutation, useUpdatePasswordMutation } = resetpasswordApi;
export default resetpasswordApi;
