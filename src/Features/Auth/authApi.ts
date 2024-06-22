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
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://eventmanagementfu.azurewebsites.net/Auth' }),
    endpoints: (builder) => ({
      login: builder.mutation<LoginResponse, LoginRequest>({
        query: (credentials) => ({
          url: 'login',
          method: 'POST',
          body: credentials,
        }),
      }),
    }),
  });

export const { useLoginMutation } = authApi;


