import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { account } from '../../Types/account';


const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:7979/',
    prepareHeaders: (headers, { getState }) => {
      // Lấy token từ localStorage
      let token = sessionStorage.getItem('token')
      if (token) {
        // Thêm Authorization header với giá trị token
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });
export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery,
    tagTypes: ['account'],
    endpoints: (builder) => ({
        getAccounts: builder.query<account[], void>({
            query: () => '/api-accounts/account',
            // Add your authorization logic here
            // headers: { Authorization: 'Bearer YOUR_TOKEN' },
            providesTags: ['account'],
        }),
        deactiveAccount: builder.mutation({
            query: (id) => ({
                url: `/api-accounts/${id}/disable`,
                method: 'PUT',
            }),
            invalidatesTags: ['account'],
        }),
        activeAccount: builder.mutation({
          query: (id) => ({
              url: `/api-accounts/${id}/enable`,
              method: 'PUT',
          }),
          invalidatesTags: ['account'],
        }),
        createEventOperator: builder.mutation({
            query: (newEventOperator) => ({
                url: '/api-event-operators/signup',
                method: 'POST',
                body: newEventOperator,
            }),
            invalidatesTags: ['account'],
        }),
    }),
});

export const { useCreateEventOperatorMutation ,useActiveAccountMutation , useGetAccountsQuery, useDeactiveAccountMutation } = adminApi;
