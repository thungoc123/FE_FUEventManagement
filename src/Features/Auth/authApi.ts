import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// tạo 1 response
interface LoginResponse {
  data : string,
  message : string
  statusCode : number 
}
// tạo 1 request
interface LoginRequest {
    email: string;
    password: string;
}
interface VisitorResponse {
  message : string
}
interface VisitorRequest {
  email: string;
  password: string;
  confirmPassword: string
  information: null
}
export const authApi = createApi({
    reducerPath: 'authApi',
    // https://eventmanagementfu.azurewebsites.net
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7979/' }),
    endpoints: (builder) => ({
      login: builder.mutation<LoginResponse, LoginRequest>({
        query: (credentials) => ({
          url: '/Auth/login',
          method: 'POST',
          body: credentials,
        }),
      }),
      registerVisitor: builder.mutation<VisitorResponse, VisitorRequest>({
        query: (newUser) => ({
          url: '/api-visitor/sign-up-visitor',
          method: 'POST',
          body: newUser,
        }),
      }),
      registerSponsor: builder.mutation({
        query: (newUser) => ({
          url: '/api-sponsor/sign-up-sponsor',
          method: 'POST',
          body: newUser,
        })
      })
    }),
  });

export const { useLoginMutation , useRegisterVisitorMutation, useRegisterSponsorMutation } = authApi;


