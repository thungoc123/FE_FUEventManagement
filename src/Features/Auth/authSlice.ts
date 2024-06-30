import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
interface DecodedToken {
  role: string;
  accountId: string
  // Add other properties as needed
}
export interface AuthState {
    token: string | null,
    role: string,
    accountId: string | null
  }
  
  const initialState: AuthState = {
    token: null,
    role: '',
    accountId: ''
  };
  const decodeToken = (token: string): DecodedToken => {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      return decoded;
    } catch (error) {
      console.error("Invalid token", error);
      return { role: '', accountId: '' }; // Default role if token is invalid
    }
  };
  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setToken: (state, action: PayloadAction<string>) => {
        state.token = action.payload;
        const decoded = decodeToken(action.payload);
        state.role = decoded.role;
        state.accountId = decoded.accountId
      },
      clearToken: (state) => {
        state.token = null;
        state.role = '';
        state.accountId = null;
      },
      setRole: (state, action: PayloadAction<string>) => {
        state.role = action.payload;
      },
      setAccountId: (state, action : PayloadAction<string>) => {
        state.accountId = action.payload
      }
    },
  });
  export const { setToken, clearToken, setRole, setAccountId} = authSlice.actions;
  export default authSlice.reducer;
