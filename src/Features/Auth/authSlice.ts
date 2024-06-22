import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface AuthState {
    token: string | null;
    // email: string; // Thêm email vào state

  }
  
  const initialState: AuthState = {
    token: null,
    // email: '', // Khởi tạo email

  };
  
  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setToken: (state, action: PayloadAction<string>) => {
        state.token = action.payload;
      },
      clearToken: (state) => {
        state.token = null;
      },
      // setEmail(state, action: PayloadAction<string>) {
      //   state.email = action.payload;
      // },
    },
  });
  
  export const { setToken, clearToken } = authSlice.actions;
  export default authSlice.reducer;