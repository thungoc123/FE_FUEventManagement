
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
  endpoints: (builder) => ({
    createEvent: builder.mutation({
      query: (newEvent) => ({
        url: 'api-events/create',
        method: 'POST',
        body: newEvent,
      }),
    }),
    updateEvent: builder.mutation({
      query: ({ eventId, newEvent }) => ({
        url: `api-events/${eventId}`,
        method: 'PUT',
        body: newEvent,
      }),
    }),
    getListEvent: builder.query<EOevent[], void>({
      query: () => 'api-events/account',
      // keepUnusedDataFor: 3600,
    }),

    addSchedule: builder.mutation({
      query: ({ id, newSchedule }) => ({
        url: `api-events/${id}/create-schedule`,
        method: 'POST',
        body: newSchedule,
      }),
    }),
    addImage: builder.mutation({
      query: ({id, newImage}) => ({
        url: `api-events/${id}/add-image`,
        method: 'POST',
        body: newImage,
      })
    }),
    addCheckingStaff: builder.mutation({
      query: ({id, newStaff}) => ({
        url: `api-events/${id}/create-staff`,
        method: 'POST',
        body: newStaff,
      })
    })
  }),
});

export const { useCreateEventMutation, useGetListEventQuery, useAddScheduleMutation, useAddImageMutation, useAddCheckingStaffMutation, useUpdateEventMutation } = eventApi;

