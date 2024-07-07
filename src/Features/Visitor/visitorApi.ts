import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../Store/Store';
import { useSelector } from 'react-redux';
import { EOevent } from '../../Types/eo.type';
import { visitor } from '../../Types/account';



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

export const visitorApi = createApi({
  reducerPath: 'visitor',
  baseQuery,
  tagTypes: ['visitor'], // Định nghĩa tagTypes cho endpoint

  endpoints: (builder) => ({
    getListVistiors: builder.query<visitor[], void>({
      query: (eventId) => ({
        url: `/api-ticket/visitors/paid/${eventId}`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'visitor', id } as const)),
            ]
          : [],
    }),
  }),
});

export const { useGetListVistiorsQuery } = visitorApi;