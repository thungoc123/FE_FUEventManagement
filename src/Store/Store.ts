// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { sponsorApi } from "../Features/Sponsor/sponsorApi";
import { eventApi } from "../Features/Event/eventApi";
import { sponsor_programApi } from "../Features/Sponsor/sponsor_programApi";

export const store = configureStore({
  reducer: {
    [sponsorApi.reducerPath]: sponsorApi.reducer,
    [eventApi .reducerPath]: eventApi.reducer,
    [sponsor_programApi.reducerPath] : sponsor_programApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sponsorApi.middleware,eventApi.middleware,sponsor_programApi.middleware),
  
});

export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch;
