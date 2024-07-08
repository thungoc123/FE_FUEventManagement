// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { sponsorApi } from "../Features/Sponsor/sponsorApi";
import { sponsor_programApi } from "../Features/Sponsor/sponsor_programApi";
import { orderApi } from "../Types/order.type";
import { eventDisplayApi } from "../Features/Event/eventDisplayApi";

export const store = configureStore({
  reducer: {
    [sponsorApi.reducerPath]: sponsorApi.reducer,
    [eventDisplayApi .reducerPath]: eventDisplayApi.reducer,
    [sponsor_programApi.reducerPath] : sponsor_programApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sponsorApi.middleware,eventDisplayApi.middleware,sponsor_programApi.middleware,orderApi.middleware),
  
});

export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch;
  