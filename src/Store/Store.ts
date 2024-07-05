import { configureStore } from "@reduxjs/toolkit";
import { sponsorApi } from "../Features/Sponsor/sponsorApi";
import { eventDisplayApi } from "../Features/Event/eventDisplayApi";
import { sponsor_programApi } from "../Features/Sponsor/sponsor_programApi";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authApi } from '../Features/Auth/authApi';
import authReducer from '../Features/Auth/authSlice';
import notificationsReducer from '../Features/Utils/notificationsSlice';
import eventReducer from '../Features/EventManage/eventSlice';
import { sponsorDashboardApi } from "../Features/Sponsor/sponsorDashboardApi";
import { eventApi } from "../Features/EventManage/eventApi";
import { createorderApi } from "../Features/Order/orderApi";
import { passwordApi } from "../Features/Password/passwordApi";

// Cấu hình persist cho auth reducer
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'role', 'accountId'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [sponsorApi.reducerPath]: sponsorApi.reducer,
    [eventDisplayApi.reducerPath]: eventDisplayApi.reducer,
    [sponsor_programApi.reducerPath] : sponsor_programApi.reducer,
    [createorderApi.reducerPath]: createorderApi.reducer,
    [passwordApi.reducerPath]: passwordApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: persistedAuthReducer,
    [eventApi.reducerPath]: eventApi.reducer,
    notifications: notificationsReducer,
    [sponsorDashboardApi.reducerPath]: sponsorDashboardApi.reducer,
    events: eventReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      sponsorApi.middleware,
      eventDisplayApi.middleware,
      sponsor_programApi.middleware,
      createorderApi.middleware,
      authApi.middleware,
      sponsorDashboardApi.middleware,
      eventApi.middleware,
      passwordApi.middleware
    ),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
  