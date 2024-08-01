import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../Store/Store';
import { EOevent } from '../../Types/eo.type';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:7979/',
  prepareHeaders: (headers, { getState }) => {
    let token = sessionStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const eventApi = createApi({
  reducerPath: 'event',
  baseQuery,
  tagTypes: ['Events', 'Event'],

  endpoints: (builder) => ({
    createEvent: builder.mutation({
      query: (newEvent) => ({
        url: 'api-events/create',
        method: 'POST',
        body: newEvent,
      }),
      invalidatesTags: [{ type: 'Events', id: 'LIST' }],
    }),
    updateEvent: builder.mutation({
      query: ({ eventId, newEvent }) => ({
        url: `api-events/${eventId}`,
        method: 'PUT',
        body: newEvent,
      }),
      invalidatesTags: (result, error, { eventId }) => [{ type: 'Event', id: eventId }],
    }),
    deleteEvent: builder.mutation({
      query: ({ eventId }) => ({
        url: `api-events/event${eventId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { eventId }) => [{ type: 'Event', id: eventId }, { type: 'Events', id: 'LIST' }],
    }),
    getListEvent: builder.query<EOevent[], void>({
      query: () => 'api-events/account',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Event', id } as const)),
              { type: 'Events', id: 'LIST' },
            ]
          : [{ type: 'Events', id: 'LIST' }],
    }),
    getAllEvents: builder.query<EOevent[], void>({
      query: () => 'api-events',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Event', id } as const)),
              { type: 'Events', id: 'LIST' },
            ]
          : [{ type: 'Events', id: 'LIST' }],
    }),
    getEventDetails: builder.query<EOevent, string>({
      query: (id) => `api-events/${id}`,
      providesTags: (result, error, id) => [{ type: 'Event', id }],
    }),
    addSchedule: builder.mutation({
      query: ({ id, newSchedule }) => ({
        url: `api-events/${id}/create-schedule`,
        method: 'POST',
        body: newSchedule,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Event', id }],
    }),
    addImage: builder.mutation({
      query: ({ id, newImage }) => ({
        url: `api-events/${id}/add-image`,
        method: 'POST',
        body: newImage,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Event', id }],
    }),
    addCheckingStaff: builder.mutation({
      query: ({ id, newStaff }) => ({
        url: `api-events/${id}/create-staff`,
        method: 'POST',
        body: newStaff,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Event', id }],
    }),
    deleleCheckingStaff: builder.mutation({
      query: ({ checkingStaffId, eventId }) => ({
        url: `api-events/staff${checkingStaffId}/event${eventId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { eventId }) => [{ type: 'Event', id: eventId }],
    }),
    deleteImage: builder.mutation({
      query: ({ imageId }) => ({
        url: `api-events/image${imageId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { imageId }) => [{ type: 'Event', id: imageId }],
    }),
    publishEvent: builder.mutation({
      query: (eventId) => ({
        url: `api-events/event/${eventId}/publish`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, { eventId }) => [{ type: 'Event', id: eventId }],
    }),
    addSponsorToEvent: builder.mutation({
      query: ({ eventId, newData }) => ({
        url: `api-events/${eventId}/add-sponsor`,
        method: 'POST',
        body: newData,
      }),
      invalidatesTags: (result, error, { eventId }) => [{ type: 'Event', id: eventId }],
    }),
    addSponsorWithProfitPercentage: builder.mutation({
      query: ({ eventId, profitPercentage }) => ({
        url: `api-events/${eventId}/add-sponsor`,
        method: 'POST',
        body: { eventId, profitPercentage },
      }),
      invalidatesTags: (result, error, { eventId }) => [{ type: 'Event', id: eventId }],
    }),
    deleteSponsor: builder.mutation({
      query: ({ eventId, sponsorId }) => ({
        url: `api-events/${eventId}/sponsor/${sponsorId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { eventId }) => [{ type: 'Event', id: eventId }],
    }),
  }),
});

export const {
  useDeleteSponsorMutation,
  useAddSponsorToEventMutation,
  useAddSponsorWithProfitPercentageMutation, // Export the new hook
  usePublishEventMutation,
  useDeleteEventMutation,
  useDeleteImageMutation,
  useCreateEventMutation,
  useGetListEventQuery,
  useGetAllEventsQuery,
  useGetEventDetailsQuery,
  useAddScheduleMutation,
  useAddImageMutation,
  useAddCheckingStaffMutation,
  useUpdateEventMutation,
  useDeleleCheckingStaffMutation,
} = eventApi;
