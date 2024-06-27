// src/Features/EventManage/eventSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EOevent } from '../../Types/eo.type'; // Đảm bảo bạn có kiểu EOevent

// Định nghĩa kiểu dữ liệu cho state
interface EventState {
  events: EOevent[];
  loading: boolean;
  error: string | null;
}

// Khởi tạo giá trị ban đầu của state
const initialState: EventState = {
  events: [],
  loading: false,
  error: null,
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    // Action để set danh sách sự kiện
    setEvents(state, action: PayloadAction<EOevent[]>) {
      state.events = action.payload;
    },
    // Các action khác (nếu cần) có thể được thêm vào đây
  },
});

export const { setEvents } = eventSlice.actions;

export default eventSlice.reducer;
