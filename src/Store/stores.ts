// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { sponsorApi } from "../Features/Sponsor/sponsorApi";
import { sponsor_programApi } from "../Features/Sponsor/sponsor_programApi";
import { orderApi } from "../Types/order.type";
import { eventDisplayApi } from "../Features/Event/eventDisplayApi";
import { eventApi } from "../Features/Event/eventApi"; // Ensure this import path is correct

export const store = configureStore({
  reducer: {
    [sponsorApi.reducerPath]: sponsorApi.reducer,
    [eventDisplayApi.reducerPath]: eventDisplayApi.reducer,
    [sponsor_programApi.reducerPath]: sponsor_programApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer, // Add the eventApi reducer here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      sponsorApi.middleware,
      eventDisplayApi.middleware,
      sponsor_programApi.middleware,
      orderApi.middleware,
      eventApi.middleware // Add the eventApi middleware here
    ),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
