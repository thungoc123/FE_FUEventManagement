// src/app/store.js or wherever your store configuration is
import { configureStore } from '@reduxjs/toolkit';
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
import { cartApi } from '../Features/Order/cartApi';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'role', 'accountId'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [ticketApi.reducerPath]: ticketApi.reducer,
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
    [resetpasswordApi.reducerPath]: resetpasswordApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer, // Add the cartApi reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      ticketApi.middleware,
      sponsorApi.middleware,
      eventDisplayApi.middleware,
      sponsor_programApi.middleware,
      createorderApi.middleware,
      authApi.middleware,
      sponsorDashboardApi.middleware,
      eventApi.middleware,
      passwordApi.middleware,
      paymentApi.middleware,
      resetpasswordApi.middleware,
      cartApi.middleware // Add the cartApi middleware
    ),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
