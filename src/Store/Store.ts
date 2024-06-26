// // src/Store/Store.ts

// import { configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // Sử dụng localStorage
// import { authApi } from '../Features/Auth/authApi';
// import authReducer from '../Features/Auth/authSlice';
// import { eventApi } from '../Features/Event/eventApi';
// import notificationsReducer, { initialState as notificationsInitialState } from '../Features/Utils/notificationsSlice'

// // Cấu hình persist cho auth reducer
// const authPersistConfig = {
//   key: 'auth',
//   storage,
//   whitelist: ['token', 'role','accountId'], // Chỉ định các state bên trong auth mà bạn muốn lưu trữ
// };
// const notificationsPersistConfig = {
//   key: 'notifications',
//   storage,
// };
// // Tạo persistedReducer
// const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
// const persistedNotificationsReducer = persistReducer(notificationsPersistConfig, notificationsReducer);

// // Tạo store với persistedReducer
// export const store = configureStore({
//   reducer: {
//     [authApi.reducerPath]: authApi.reducer,
//     auth: persistedAuthReducer, // Sử dụng persisted reducer cho auth
//     [eventApi.reducerPath]: eventApi.reducer, // Thêm reducer của apiSlice vào store
//     notifications: persistedNotificationsReducer, // Thêm persisted reducer cho notifications

//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false, // Bỏ qua kiểm tra các hành động không tuần tự
//     }).concat(authApi.middleware, eventApi.middleware),
// });

// // Tạo persistor
// export const persistor = persistStore(store);

// // Lấy RootState và AppDispatch từ store của chúng ta
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// Store.ts
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Sử dụng localStorage
import { authApi } from '../Features/Auth/authApi';
import authReducer from '../Features/Auth/authSlice';
import { eventApi } from '../Features/Event/eventApi';
import notificationsReducer, { initialState as notificationsInitialState } from '../Features/Utils/notificationsSlice';
import { sponsorApi } from '../Features/Sponsor/sponsorApi';

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
    [sponsorApi.reducerPath]: sponsorApi.reducer
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
