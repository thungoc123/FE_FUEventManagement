// notificationsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
  timestamp: number;
}

export type NotificationsState = Notification[];

// export const initialState: NotificationsState = [];
const storedNotifications = localStorage.getItem('notifications');
const initialState: NotificationsState = storedNotifications ? JSON.parse(storedNotifications) : [];

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState, // Sử dụng initialState đã khai báo
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.push(action.payload);
      localStorage.setItem('notifications', JSON.stringify(state));
    },
    // removeNotification: (state, action: PayloadAction<number>) => {
    //   return state.filter(notification => notification.id !== action.payload);
    // },
    // removeAllNotifications: (state) => {
    //   // Xóa tất cả notifications
    //   state.splice(0, state.length);

    // },
  },
});
// , removeNotification, removeAllNotifications 
export const { addNotification} = notificationsSlice.actions;

export default notificationsSlice.reducer;
