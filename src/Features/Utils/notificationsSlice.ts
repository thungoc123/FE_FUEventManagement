// notificationsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
  timestamp: number;
}

export type NotificationsState = Notification[];
<<<<<<< HEAD

// export const initialState: NotificationsState = [];
const storedNotifications = localStorage.getItem('notifications');
const initialState: NotificationsState = storedNotifications ? JSON.parse(storedNotifications) : [];
=======
const loadState = (): NotificationsState => {
    try {
      const serializedState = localStorage.getItem('notifications');
      if (serializedState === null) {
        return [];
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return [];
    }
  };

  const saveState = (state: NotificationsState) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('notifications', serializedState);
    } catch {
      // ignore write errors
    }
  };
// Khởi tạo initialState cho slice
export const initialState: NotificationsState = [];
>>>>>>> TienMerge

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState, // Sử dụng initialState đã khai báo
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.push(action.payload);
<<<<<<< HEAD
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
=======
      saveState(state);
    },
    removeNotification: (state, action: PayloadAction<number>) => {
      return state.filter(notification => notification.id !== action.payload);
    },
    removeAllNotifications: (state) => {
      // Xóa tất cả notifications
      state.splice(0, state.length);
      // Lưu state vào localStorage sau khi xóa
      saveState(state);
    },
  },
});

export const { addNotification, removeNotification, removeAllNotifications } = notificationsSlice.actions;
>>>>>>> TienMerge

export default notificationsSlice.reducer;
