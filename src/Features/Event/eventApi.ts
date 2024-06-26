// // apiSlice.js
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// // Tạo API slice
// export const eventApi = createApi({
//   reducerPath: 'event', // Tên duy nhất cho slice
//   baseQuery: fetchBaseQuery({ baseUrl: 'https://eventmanagementfu.azurewebsites.net/' }), // URL gốc của API
//   endpoints: (builder) => ({
//     createEvent: builder.mutation({
//       query: (newEvent) => ({
//         url: 'api-events/create',
//         method: 'POST',
//         body: newEvent,
//       }),
//     }),
//   }),
// });

// // Export hook sử dụng mutation
// export const { useCreateEventMutation } = eventApi;


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../Store/Store';
import { useSelector } from 'react-redux';
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
    getListEvent: builder.query({
      query: () => 'api-events/account'
    })
  }),
});

export const { useCreateEventMutation, useGetListEventQuery } = eventApi;

