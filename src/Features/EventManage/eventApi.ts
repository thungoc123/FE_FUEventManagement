
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../Store/Store';
import { useSelector } from 'react-redux';
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

export const eventApi = createApi({
  reducerPath: 'event',
  baseQuery,
  tagTypes: ['Events','Event'], // Định nghĩa tagTypes cho endpoint

  endpoints: (builder) => ({
    createEvent: builder.mutation({
      query: (newEvent) => ({
        url: 'api-events/create',
        method: 'POST',
        body: newEvent,
      }),
      invalidatesTags: [{ type: 'Events', id: 'LIST' }], // Invalidates the list tag

    }),
    updateEvent: builder.mutation({
      query: ({ eventId, newEvent }) => ({
        url: `api-events/${eventId}`,
        method: 'PUT',
        body: newEvent,
      }),
      invalidatesTags: (result, error, { eventId }) => [{ type: 'Event', id: eventId }], // Invalidates specific event by id

    }),
    deleteEvent: builder.mutation({
      query: ({eventId}) => ({
        url: `api-events/event${eventId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { eventId }) => [{ type: 'Event', id: eventId }, { type: 'Events', id: 'LIST' }], // Invalidates specific event and list
    }),
    getListEvent: builder.query<EOevent[], void>({
      query: () => 'api-events/account',
      // keepUnusedDataFor: 3600,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Event', id } as const)),
              { type: 'Events', id: 'LIST' },
            ]
          : [{ type: 'Events', id: 'LIST' }],
    }),

    addSchedule: builder.mutation({
      query: ({ id, newSchedule }) => ({
        url: `api-events/${id}/create-schedule`,
        method: 'POST',
        body: newSchedule,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Event', id }], // Invalidates specific event by id

    }),
    addImage: builder.mutation({
      query: ({id, newImage}) => ({
        url: `api-events/${id}/add-image`,
        method: 'POST',
        body: newImage,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Event', id }], // Invalidates specific event by id

    }),
    addCheckingStaff: builder.mutation({
      query: ({id, newStaff}) => ({
        url: `api-events/${id}/create-staff`,
        method: 'POST',
        body: newStaff,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Event', id }], // Invalidates specific event by id
    }),
    deleleCheckingStaff: builder.mutation({
      query: ({checkingStaffId, eventId}) => ({
        url: `api-events/staff${checkingStaffId}/event${eventId}`,
        method: 'DELETE',
        // body: newStaff,
      }),
      invalidatesTags: (result, error, { eventId }) => [{ type: 'Event', id: eventId }], // Invalidates specific event by id

    }),
    deleteImage: builder.mutation({
      query: ({imageId}) => ({
        url: `api-events/image${imageId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { imageId }) => [{ type: 'Event', id: imageId }], // Invalidates specific event by id
    }),
    publishEvent: builder.mutation({
      query: (eventId) => ({
        url: `api-events/event/${eventId}/publish`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, { eventId }) => [{ type: 'Event', id: eventId }], // Invalidates specific event by id

    })
  }),
});

export const { usePublishEventMutation,useDeleteEventMutation,useDeleteImageMutation ,useCreateEventMutation, useGetListEventQuery, useAddScheduleMutation, useAddImageMutation, useAddCheckingStaffMutation, useUpdateEventMutation, useDeleleCheckingStaffMutation } = eventApi;

