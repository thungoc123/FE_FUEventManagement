// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { sponsorApi } from "../Features/Sponsor/sponsorApi";
import { eventApi } from "../Features/Event/eventApi";

export const store = configureStore({
  reducer: {
    [sponsorApi.reducerPath]: sponsorApi.reducer,
    [eventApi .reducerPath]: eventApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sponsorApi.middleware,eventApi.middleware),
  
});

export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch;
