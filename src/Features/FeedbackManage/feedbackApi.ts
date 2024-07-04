
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../Store/Store';
import { useSelector } from 'react-redux';
import { EOevent } from '../../Types/eo.type';
import { Feedback, FeedbackQuery, feedbackQuestionQuery } from '../../Types/feedback';


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

export const feedbackApi = createApi({
  reducerPath: 'feedback',
  baseQuery,
  tagTypes: ['FeedbackQuestions', 'Feedbacks'],

  endpoints: (builder) => ({
    createFeedback: builder.mutation({
      query: ({eventId,newFeedback}) => ({
        url: `api-feedbacks/events/${eventId}`,
        method: 'POST',
        body: newFeedback,
      }),
      invalidatesTags: ['Feedbacks'],
    }),
    getListFeedback: builder.query<FeedbackQuery[], string>({
      query: (accountId) => `api-feedbacks/list-feedback-account/${accountId}`,
      // keepUnusedDataFor: 3600,
      providesTags: (result, error, accountId) => [{ type: 'Feedbacks', id: accountId }],
    }),
    createQuestion: builder.mutation({
      query:(feedbackquestion) => ({
        url: 'feedbackQuestions/create',
        method: 'POST',
        body: feedbackquestion,
      }),
      invalidatesTags: (result, error, { feedbackID }) => [
        { type: 'FeedbackQuestions', id: feedbackID },
      ],
    }),
    getListFeedbackQuestion: builder.query<feedbackQuestionQuery[],string>({
      query: (feedbackId) => `/feedbackQuestions/feedback/${feedbackId}`,
      providesTags: (result, error, id) => [{ type: 'FeedbackQuestions', id }],
    })
    
  }),
});
export const { useGetListFeedbackQuestionQuery,useCreateQuestionMutation,useCreateFeedbackMutation, useGetListFeedbackQuery } = feedbackApi;