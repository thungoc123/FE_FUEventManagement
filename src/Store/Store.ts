import {configureStore} from '@reduxjs/toolkit'
import eventReducer from '../Reducer/Event.reducer'
import { authApi } from '../Features/Auth/authApi'
import authReducer, {AuthState} from '../Features/Auth/authSlice'
export const store = configureStore({
    reducer: {
        // sau khi có reducer thành công thì vào đây tạo. 
        [authApi.reducerPath]: authApi.reducer,
        event : eventReducer,
        auth: authReducer
        // event này sẽ xuất hiện trong state tree global của mình được display trên redux dev tool. 
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
})
 // Lấy RootState và AppDispatch từ store của chúng ta 
 // RootState này sẽ được sử dụng khi mình dùng useSelector 
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

