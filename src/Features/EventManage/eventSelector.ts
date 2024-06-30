// import { createSelector } from "@reduxjs/toolkit";
// import { RootState } from "../../Store/Store";
// import { eventApi } from "./eventApi";
// import { useSelector } from "react-redux";

// // export const selectEvents = (state:RootState) => eventApi.endpoints.getListEvent.select()(state)?.data || [];
// // const selectEvents = useSelector((state: RootState) => state.events.events);

// // export const selectedEvents = createSelector([selectEvents])

// export const selectUnpublishEvents = createSelector(
//   [selectEvents],
//   (events) => events
// );
// export const selectPublishEvents = createSelector(
//   [selectEvents],
//   (events) => events.filter(event => event.stateEvent.name === 'PUBLISH')
// );