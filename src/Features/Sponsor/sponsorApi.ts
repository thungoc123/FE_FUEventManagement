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

export const sponsorApi = createApi({
  reducerPath: 'sponsor',
  baseQuery,
  endpoints: (builder) => ({
    createSponsor: builder.mutation({
      query: (newSponsorProgram) => ({
        url: 'api-sponsor/create-program',
        method: 'POST',
        body: newSponsorProgram,
      }),
    }),
  }),
});

export const { useCreateSponsorMutation } = sponsorApi;

