
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../Store/Store';
import { useSelector } from 'react-redux';
import { EOevent } from '../../Types/eo.type';




const baseQuery = fetchBaseQuery({
<<<<<<< HEAD
  baseUrl: 'http://localhost:7979/',
=======
  baseUrl: 'https://eventmanagementfu.azurewebsites.net/',
>>>>>>> TienMerge
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
<<<<<<< HEAD
  tagTypes: ['Events','Event'], // Định nghĩa tagTypes cho endpoint

=======
>>>>>>> TienMerge
  endpoints: (builder) => ({
    createEvent: builder.mutation({
      query: (newEvent) => ({
        url: 'api-events/create',
        method: 'POST',
        body: newEvent,
      }),
<<<<<<< HEAD
      invalidatesTags: [{ type: 'Events', id: 'LIST' }], // Invalidates the list tag

=======
>>>>>>> TienMerge
    }),
    updateEvent: builder.mutation({
      query: ({ eventId, newEvent }) => ({
        url: `api-events/${eventId}`,
        method: 'PUT',
        body: newEvent,
      }),
<<<<<<< HEAD
      invalidatesTags: (result, error, { eventId }) => [{ type: 'Event', id: eventId }], // Invalidates specific event by id

    }),
    deleteEvent: builder.mutation({
      query: ({eventId}) => ({
        url: `api-events/event${eventId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { eventId }) => [{ type: 'Event', id: eventId }, { type: 'Events', id: 'LIST' }], // Invalidates specific event and list
=======
>>>>>>> TienMerge
    }),
    getListEvent: builder.query<EOevent[], void>({
      query: () => 'api-events/account',
      // keepUnusedDataFor: 3600,
<<<<<<< HEAD
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Event', id } as const)),
              { type: 'Events', id: 'LIST' },
            ]
          : [{ type: 'Events', id: 'LIST' }],
=======
>>>>>>> TienMerge
    }),

    addSchedule: builder.mutation({
      query: ({ id, newSchedule }) => ({
        url: `api-events/${id}/create-schedule`,
        method: 'POST',
        body: newSchedule,
      }),
<<<<<<< HEAD
      invalidatesTags: (result, error, { id }) => [{ type: 'Event', id }], // Invalidates specific event by id

=======
>>>>>>> TienMerge
    }),
    addImage: builder.mutation({
      query: ({id, newImage}) => ({
        url: `api-events/${id}/add-image`,
        method: 'POST',
        body: newImage,
<<<<<<< HEAD
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Event', id }], // Invalidates specific event by id

=======
      })
>>>>>>> TienMerge
    }),
    addCheckingStaff: builder.mutation({
      query: ({id, newStaff}) => ({
        url: `api-events/${id}/create-staff`,
        method: 'POST',
        body: newStaff,
<<<<<<< HEAD
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

    }),
    addSponsorToEvent: builder.mutation({
      query: ({ eventId, newData }) => ({
        url: `api-events/${eventId}/add-sponsor`,
        method: 'POST',
        body: newData,
      }),
      invalidatesTags: (result, error, { eventId }) => [{ type: 'Event', id: eventId }], // Invalidates specific event by id
    }),
    deleteSponsor: builder.mutation({
      query: ({ eventId, sponsorId }) => ({
        url: `api-events/${eventId}/sponsor/${sponsorId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { eventId }) => [{ type: 'Event', id: eventId }], // Invalidates specific event by id
    }),
  }),
});

export const {useDeleteSponsorMutation ,useAddSponsorToEventMutation , usePublishEventMutation,useDeleteEventMutation,useDeleteImageMutation ,useCreateEventMutation, useGetListEventQuery, useAddScheduleMutation, useAddImageMutation, useAddCheckingStaffMutation, useUpdateEventMutation, useDeleleCheckingStaffMutation } = eventApi;
=======
      })
    })
  }),
});

export const { useCreateEventMutation, useGetListEventQuery, useAddScheduleMutation, useAddImageMutation, useAddCheckingStaffMutation, useUpdateEventMutation } = eventApi;
>>>>>>> TienMerge

