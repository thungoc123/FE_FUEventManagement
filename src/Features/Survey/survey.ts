import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SurveyQuestion, SurveyQuery, Survey, SurveyQuestionQuery } from '../types/surveyTypes'; // Đảm bảo import đúng các type

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:7979/',
    prepareHeaders: (headers, { getState }) => {
        // Lấy token từ sessionStorage
        let token = sessionStorage.getItem('token');
        if (token) {
            // Thêm Authorization header với giá trị token
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const surveyApi = createApi({
    reducerPath: 'surveyApi',
    baseQuery,
    tagTypes: ['Surveys', 'SurveyQuestions'], // Định nghĩa tagTypes

    endpoints: (builder) => ({
        createSurvey: builder.mutation({
            query: ({ eventId, newSurvey }) => ({
                url: `api-surveys/survey/${eventId}`,
                method: 'POST',
                body: newSurvey,
            }),
            invalidatesTags: ['Surveys'],
        }),
        createSurveyQuestion: builder.mutation({
            query: (newSurveyQuestion) => ({
                url: `api-surveyQuestion/surveyquestion/1`,
                method: 'POST',
                body: newSurveyQuestion,
            }),
            invalidatesTags: ['SurveyQuestions'],
        }),
        getSurveyQuestions: builder.query<SurveyQuestionQuery[], number>({
            query: (surveyId) => `api-surveyQuestion/questions/${surveyId}`,
            providesTags: (result, error, surveyId) => [{ type: 'SurveyQuestions', id: surveyId }],
        }),
        getSurveys: builder.query<SurveyQuery[], void>({
            query: () => 'api-surveys',
            providesTags: (result) =>
                result
                    ? result.map(({ surveyID }) => ({ type: 'Surveys', id: surveyID }))
                    : ['Surveys'],
        }),
        listSurvey: builder.query<Survey[], string>({
            query: (accountId) => `api-surveys/list-survey/${accountId}`,
            providesTags: (result, error, accountId) => 
                result ? result.map(({ id }) => ({ type: 'Surveys', id })) : ['Surveys'],
        }),
    }),
});

export const { useCreateSurveyMutation, useCreateSurveyQuestionMutation, useGetSurveyQuestionsQuery, useGetSurveysQuery, useListSurveyQuery } = surveyApi;
