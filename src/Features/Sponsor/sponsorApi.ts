<<<<<<< HEAD
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../Store/Store';
import { useSelector } from 'react-redux';
import { SponsorProgramWithEvent } from '../../Types/dbsponsor.type';
import { Sponsor } from '../../Types/sponsor';
import { EOevent } from '../../Types/eo.type';
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

export const sponsorApi = createApi({
  reducerPath: 'sponsor',
  baseQuery,
  tagTypes: ['sponsor'],
  endpoints: (builder) => ({
    createSponsor: builder.mutation({
      query: (newSponsorProgram) => ({
        url: 'api-sponsor/create-program',
        method: 'POST',
        body: newSponsorProgram,
      }),
    }),
    getListSponsorProgram: builder.query<SponsorProgramWithEvent[], void>({
      query: () => 'api-sponsor/account/program',
    }),
    getListSponsorPerson: builder.query<Sponsor[], void>({
      query: () => 'api-sponsor',
    }),
    getEventByAccount: builder.query<EOevent[], void>({
      query: () => `/api-sponsor/account/event`,
      // providesTags: (result, error, state) => [{ type: 'Event', id: state }],
    }),
    addEventToSponsorProgram: builder.mutation({
      query: ({sponsorProgramId,newSponsorEvent}) => ({
        url: `api-sponsor/sponsorProgram/${sponsorProgramId}/events`,
        method: 'POST',
        body: newSponsorEvent,
      }),
    }),
    deleteSponsorProgram: builder.mutation({  
      query: (sponsorProgramId) => ({
        url: `api-sponsor/program/${sponsorProgramId}`,
        method: 'DELETE',
      }),
    }),
    deleteEventFromSponsorProgram: builder.mutation({
      query: ({sponsorProgramId,eventId}) => ({
        url: `api-sponsor/program/${sponsorProgramId}/event/${eventId}`,
        method: 'DELETE',
      }),
    }),
    updateSponsorProgram: builder.mutation({
      query: ({sponsorProgramId,updateSponsorProgram}) => ({
        url: `api-sponsor/program/${sponsorProgramId}`,
        method: 'PUT',
        body: updateSponsorProgram,
      }),
=======

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Sponsor } from '../../Types/event.type';

export const sponsorApi = createApi({
  reducerPath: 'sponsorApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://eventmanagementfu.azurewebsites.net/' }), 
  endpoints: (builder) => ({
    getSponsor: builder.query<Sponsor[], void>({
      query: () => `api-sponsor`,
>>>>>>> TienMerge
    }),
  }),
});

<<<<<<< HEAD
export const { useUpdateSponsorProgramMutation ,useDeleteEventFromSponsorProgramMutation,useDeleteSponsorProgramMutation ,useAddEventToSponsorProgramMutation , useGetEventByAccountQuery ,useGetListSponsorPersonQuery,useCreateSponsorMutation, useGetListSponsorProgramQuery } = sponsorApi;

=======
export const { useGetSponsorQuery } = sponsorApi;
>>>>>>> TienMerge
