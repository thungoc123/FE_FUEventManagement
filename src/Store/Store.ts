import { configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // Sử dụng localStorage
import { authApi } from '../Features/Auth/authApi';
import authReducer from '../Features/Auth/authSlice';
import { eventApi } from '../Features/EventManage/eventApi';

import notificationsReducer from '../Features/Utils/notificationsSlice';
import { sponsorApi } from '../Features/Sponsor/sponsorApi';
import eventReducer from '../Features/EventManage/eventSlice'; // Import eventReducer
import tabReducer from '../Features/Utils/tabSlice';
import {feedbackApi} from '../Features/FeedbackManage/feedbackApi'
import { adminApi } from '../Features/Admin/AdminApi';
import HeaderDisplayReducer from '../Features/Utils/HeaderDisplaySlice';
import { visitorApi } from '../Features/Visitor/visitorApi';
import { eventDisplayApi } from '../Features/Event/eventDisplayApi';
import { sponsor_programApi } from '../Features/Sponsor/sponsor_programApi';
import { createorderApi } from '../Features/Order/orderApi';
import { passwordApi } from '../Features/Password/passwordApi';
import { sponsorDashboardApi } from '../Features/Sponsor/sponsorDashboardApi';
import { ticketApi } from '../Features/Order/ticketApi';
import { paymentApi } from '../Features/Payment/paymentApi';
import resetpasswordApi from '../Features/Password/resetPasswordApi';
import { cartApi } from '../Features/Order/cartApi';
import { sponsorPercentApi } from '../Features/Event/sponsorPercent';
import { sponsorProfitApi } from '../Features/Sponsor/sponsorProfit';
import { eventAmountApi } from '../Features/Event/eventAmoutApi';
import { checkingApi } from '../Features/CheckingStaff/checkingApi';

export const store = configureStore({
  reducer: {
    [ticketApi.reducerPath]: ticketApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [eventDisplayApi.reducerPath]: eventDisplayApi.reducer,
    [createorderApi.reducerPath]: createorderApi.reducer,
    [sponsor_programApi.reducerPath]: sponsor_programApi.reducer,
    [sponsorDashboardApi.reducerPath]: sponsorDashboardApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
    // [eventApi.reducerPath]: eventApi.reducer,
    notifications: notificationsReducer,
    [sponsorApi.reducerPath]: sponsorApi.reducer,
    auth: authReducer,
    events: eventReducer,
    [resetpasswordApi.reducerPath]: resetpasswordApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [sponsorProfitApi.reducerPath]: sponsorProfitApi.reducer,
    [eventAmountApi.reducerPath]: eventAmountApi.reducer,
    [sponsorPercentApi.reducerPath]: sponsorPercentApi.reducer,
  },
    tab: tabReducer, // Thêm reducer của tab vào store
    [feedbackApi.reducerPath] : feedbackApi.reducer,
    [visitorApi.reducerPath] : visitorApi.reducer,
    [checkingApi.reducerPath]: checkingApi.reducer, // Thêm checkingApi.reducer vào store
    [adminApi.reducerPath]: adminApi.reducer,
    headerDisplay: HeaderDisplayReducer,
// src/app/store.ts


  },


  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      sponsorProfitApi.middleware,
      ticketApi.middleware,
      sponsorApi.middleware,
      visitorApi.middleware,
      authApi.middleware,
      adminApi.middleware ,
      eventApi.middleware, 
      sponsorApi.middleware, 
      feedbackApi.middleware,
      eventDisplayApi.middleware,
      sponsor_programApi.middleware,
      createorderApi.middleware,
      sponsorDashboardApi.middleware,
      passwordApi.middleware,
      paymentApi.middleware,
      resetpasswordApi.middleware,
      cartApi.middleware,
      eventAmountApi.middleware,
      sponsorPercentApi.middleware,
      checkingApi.middleware, // Thêm middleware của checkingApi vào store
      resetpasswordApi.middleware // Add resetpasswordApi middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
