
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
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
    deleteFeedback: builder.mutation({
      query: (feedbackId) => ({
        url: `api-feedbacks/${feedbackId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Feedbacks'],
    }),

    getListFeedback: builder.query<FeedbackQuery[], string>({
      query: (accountId) => `api-feedbacks/list-feedback-account/${accountId}`,
      // keepUnusedDataFor: 3600,
      providesTags: (result, error, accountId) => [{ type: 'Feedbacks', id: accountId }],
    }),
    createQuestion: builder.mutation({
      query:({feedbackquestion,feedbackId}) => ({
        url: `feedbackQuestions/questions/${feedbackId}`,
        method: 'POST',
        body: feedbackquestion,
      }),
      invalidatesTags: (result, error, { feedbackID }) => [
        { type: 'FeedbackQuestions', id: feedbackID },
      ],
    }),
    updateFeedback: builder.mutation({
      query: ({ id, feedback }) => ({
        url: `api-feedbacks/update/${id}`,
        method: 'PUT',  
        body: feedback,
      }),
      invalidatesTags: (result, error, { feedbackId }) => [{ type: 'Feedbacks', id: feedbackId }],
    }),
    getListFeedbackQuestion: builder.query<feedbackQuestionQuery[],string>({
      query: (feedbackId) => `/api-feedback-questions-event/feedback/${feedbackId}`,
      providesTags: (result, error, id) => [{ type: 'FeedbackQuestions', id }],
    }),
    deleteFeedbackQuestion: builder.mutation({
      query: (questionId) => ({
        url: `feedbackQuestions/${questionId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, questionId) => [{ type: 'FeedbackQuestions', id: questionId }],
    }),
    visitorAnswerFeedback: builder.mutation({
      query: ({ accountId, visitorAnswer }) => ({
        url: `api-visitor-answer/account/${accountId}`,
        method: 'POST',
        body: visitorAnswer,
      }),
    }),
   
  
  }),
})
export const { useUpdateFeedbackMutation,useVisitorAnswerFeedbackMutation ,useDeleteFeedbackMutation,useDeleteFeedbackQuestionMutation,useGetListFeedbackQuestionQuery,useCreateQuestionMutation,useCreateFeedbackMutation, useGetListFeedbackQuery } = feedbackApi;