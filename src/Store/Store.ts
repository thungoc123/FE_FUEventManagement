import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Sử dụng localStorage
import { authApi } from '../Features/Auth/authApi';
import authReducer from '../Features/Auth/authSlice';
import { eventApi } from '../Features/EventManage/eventApi';
import notificationsReducer, { initialState as notificationsInitialState } from '../Features/Utils/notificationsSlice';
import { sponsorApi } from '../Features/Sponsor/sponsorApi';
import eventReducer from '../Features/EventManage/eventSlice'; // Import eventReducer

// Cấu hình persist cho auth reducer
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'role', 'accountId'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

// Tạo store với persistedReducer
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: persistedAuthReducer,
    [eventApi.reducerPath]: eventApi.reducer,
    notifications: notificationsReducer,
    [sponsorApi.reducerPath]: sponsorApi.reducer,
    events: eventReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware, eventApi.middleware, sponsorApi.middleware),
});

store.subscribe(() => {
  const state = store.getState().notifications;
  try {
    localStorage.setItem('notifications', JSON.stringify(state));
  } catch {
    // ignore write errors
  }
});
// Tạo persistor
export const persistor = persistStore(store);

// Lấy RootState và AppDispatch từ store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
