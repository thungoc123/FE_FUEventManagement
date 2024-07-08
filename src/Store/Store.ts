import { configureStore } from '@reduxjs/toolkit';
<<<<<<< HEAD
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

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    // auth: persistedAuthReducer,
    [eventApi.reducerPath]: eventApi.reducer,
    notifications: notificationsReducer,
    [sponsorApi.reducerPath]: sponsorApi.reducer,
    auth: authReducer,
    events: eventReducer,
    tab: tabReducer, // Thêm reducer của tab vào store
    [feedbackApi.reducerPath] : feedbackApi.reducer,
    [visitorApi.reducerPath] : visitorApi.reducer,

    [adminApi.reducerPath]: adminApi.reducer,
    headerDisplay: HeaderDisplayReducer,
=======
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authApi } from '../Features/Auth/authApi';
import authReducer from '../Features/Auth/authSlice';
import notificationsReducer from '../Features/Utils/notificationsSlice';
import eventReducer from '../Features/EventManage/eventSlice';
import { sponsorApi } from '../Features/Sponsor/sponsorApi';
import { eventDisplayApi } from '../Features/Event/eventDisplayApi';
import { sponsor_programApi } from '../Features/Sponsor/sponsor_programApi';
import { createorderApi } from '../Features/Order/orderApi';
import { passwordApi } from '../Features/Password/passwordApi';
import { sponsorDashboardApi } from '../Features/Sponsor/sponsorDashboardApi';
import { eventApi } from '../Features/EventManage/eventApi';
import { ticketApi } from '../Features/Order/ticketApi';
import { paymentApi } from '../Features/Payment/paymentApi';
import resetpasswordApi from '../Features/Password/resetPasswordApi';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'role', 'accountId'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    // [ticketApi.reducerPath]: ticketApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [sponsorApi.reducerPath]: sponsorApi.reducer,
    [eventDisplayApi.reducerPath]: eventDisplayApi.reducer,
    [sponsor_programApi.reducerPath]: sponsor_programApi.reducer,
    [createorderApi.reducerPath]: createorderApi.reducer,
    [passwordApi.reducerPath]: passwordApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: persistedAuthReducer,
    [eventApi.reducerPath]: eventApi.reducer,
    notifications: notificationsReducer,
    [sponsorDashboardApi.reducerPath]: sponsorDashboardApi.reducer,
    events: eventReducer,
    [resetpasswordApi.reducerPath]: resetpasswordApi.reducer, // Add resetpasswordApi reducer
>>>>>>> TienMerge
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
<<<<<<< HEAD
    }).concat(visitorApi.middleware,authApi.middleware,adminApi.middleware ,eventApi.middleware, sponsorApi.middleware, feedbackApi.middleware),
});


// export const persistor = persistStore(store);
=======
    }).concat(
      // ticketApi.middleware,
      sponsorApi.middleware,
      eventDisplayApi.middleware,
      sponsor_programApi.middleware,
      createorderApi.middleware,
      authApi.middleware,
      sponsorDashboardApi.middleware,
      eventApi.middleware,
      passwordApi.middleware,
      paymentApi.middleware,
      resetpasswordApi.middleware // Add resetpasswordApi middleware
    ),
});

export const persistor = persistStore(store);
>>>>>>> TienMerge
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
