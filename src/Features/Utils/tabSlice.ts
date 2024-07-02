// slices/tabSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentTab: 'schedule', // Giá trị mặc định của tab
};

const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setTab: (state, action) => {
      state.currentTab = action.payload;
      sessionStorage.setItem('currentTab',action.payload)
    },
  },
});

export const { setTab } = tabSlice.actions;
export default tabSlice.reducer;
