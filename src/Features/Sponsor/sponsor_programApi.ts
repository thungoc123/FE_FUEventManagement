import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SponsorProgram } from '../../Types/event.type';

export const sponsor_programApi = createApi({
  reducerPath: 'sponsorProgramApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7979/' }), 
  endpoints: (builder) => ({
    getSponsorProgram: builder.query<SponsorProgram[], void>({
      query: () => `api-sponsor/program`,
    }),
  }),
});

export const { useGetSponsorProgramQuery } = sponsor_programApi;