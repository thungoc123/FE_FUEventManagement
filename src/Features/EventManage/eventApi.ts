
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../Store/Store';
import { useSelector } from 'react-redux';
import { EOevent } from '../../Types/eo.type';


const baseQuery = fetchBaseQuery({
  baseUrl: 'https://eventmanagementfu.azurewebsites.net/',
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

export const eventApi = createApi({
  reducerPath: 'event',
  baseQuery,
  endpoints: (builder) => ({
    createEvent: builder.mutation({
      query: (newEvent) => ({
        url: 'api-events/create',
        method: 'POST',
        body: newEvent,
      }),
    }),
    getListEvent: builder.query<EOevent[], void>({
      query: () => 'api-events/account',
      keepUnusedDataFor: 3600,
    })
  }),
});

export const { useCreateEventMutation, useGetListEventQuery } = eventApi;

