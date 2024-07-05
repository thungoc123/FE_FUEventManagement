
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Sponsor } from '../../Types/event.type';

export const sponsorApi = createApi({
  reducerPath: 'sponsorApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://eventmanagementfu.azurewebsites.net/' }), 
  endpoints: (builder) => ({
    getSponsor: builder.query<Sponsor[], void>({
      query: () => `api-sponsor`,
    }),
  }),
});

export const { useGetSponsorQuery } = sponsorApi;
