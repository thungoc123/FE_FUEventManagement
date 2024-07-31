import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SurveyQuestion, SurveyQuery, Survey, SurveyQuestionQuery } from '../types/surveyTypes'; // Đảm bảo import đúng các type
import UpdateSurvey from '../../components/Organisms/EventOperator/updateSurvey';

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
        //CREATE SURVEY 
        createSurvey: builder.mutation({
            query: ({ eventId, newSurvey }) => ({
                url: `api-surveys/survey/${eventId}`,
                method: 'POST',
                body: newSurvey,
            }),
            invalidatesTags: ['Surveys'],
        }),
                //CREATE SURVEY QUESTION
        createSurveyQuestion: builder.mutation({
            query: (newSurveyQuestion) => ({
                url: `api-surveyQuestion/surveyquestion/1`,
                method: 'POST',
                body: newSurveyQuestion,
            }),
            invalidatesTags: ['SurveyQuestions'],
        }),
        //GET LIST SURVEY QUESTION
        getSurveyQuestions: builder.query<SurveyQuestionQuery[], number>({
            query: (surveyId) => `api-surveyQuestion/${surveyId}/questions`,
            providesTags: (result, error, surveyId) => [{ type: 'SurveyQuestions', id: surveyId }],
        }),
        // GET LIST SURVEY
        listSurvey: builder.query<SurveyQuery[], string>({
            query: (accountId) => `api-surveys/list-survey/${accountId}`,
            providesTags: (result, error, accountId) => [{ type: 'Surveys', id: accountId }],
        }),
        // UPDATE SURVEY
        updateSurvey: builder.mutation({
            query: ({ id, survey }) => ({
                url: `api-surveys/update/${id}`,
                method: 'PUT',
                body: survey,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Surveys', id }],
        }),
    }),
});

export const { 
    useCreateSurveyMutation, 
    useCreateSurveyQuestionMutation, 
    useGetSurveyQuestionsQuery, 
    useListSurveyQuery,
    useUpdateSurveyMutation  // Export the new hook
} = surveyApi;
