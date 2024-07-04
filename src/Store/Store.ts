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
    [adminApi.reducerPath]: adminApi.reducer,
    headerDisplay: HeaderDisplayReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware,adminApi.middleware ,eventApi.middleware, sponsorApi.middleware, feedbackApi.middleware),
});


// export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
