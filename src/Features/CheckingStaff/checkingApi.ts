import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EOevent } from "../../Types/eo.type";
import { attendance, checkingStaff } from "../../Types/checkingstaff";
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

export const checkingApi = createApi({
     reducerPath: 'checking',
     baseQuery,
     tagTypes: ['Checkings', 'Checking'], // Định nghĩa tagTypes cho endpoint
     endpoints: (builder) => ({
          getEventDetail: builder.query<checkingStaff, void>({
               query: () => ({
                    url: `api-staff/account/events`,
               }),
          }),
          getAttendance: builder.query<attendance[], number>({
               query: (eventId) => ({
                    url: `api-attendances-2/list/event/${eventId}`,
               }),
          }),
     }),
});

export const { useGetEventDetailQuery, useGetAttendanceQuery } = checkingApi;