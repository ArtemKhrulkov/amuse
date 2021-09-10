import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import {
  getCurrentUser,
  logout,
  refreshGoogleTokens,
} from './authorizationAPI';
import { http } from 'utils/api';
import { User } from 'types/common';

interface AuthorizationState {
  loggedIn: boolean;
  loading: boolean;
  accessToken: string | null;
  user: User | null;
}

const initialState: AuthorizationState = {
  loggedIn: false,
  loading: false,
  accessToken: null,
  user: null,
};

export const refreshGoogleTokensAsync = createAsyncThunk(
  'authorization/refreshGoogleTokens',
  async () => {
    return await refreshGoogleTokens();
  }
);

export const logoutAsync = createAsyncThunk(
  'authorization/logout',
  async () => {
    return await logout();
  }
);

export const getCurrentUserAsync = createAsyncThunk(
  'authorization/getCurrentUser',
  async () => {
    return await getCurrentUser();
  }
);

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshGoogleTokensAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshGoogleTokensAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedIn = true;
        state.accessToken = action.payload.token;
        http.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${action.payload.token}`;
      })
      .addCase(refreshGoogleTokensAsync.rejected, (state) => {
        state.loading = false;
        state.loggedIn = false;
        delete http.defaults.headers.common['Authorization'];
      })
      .addCase(getCurrentUserAsync.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logoutAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.loading = false;
        state.loggedIn = false;
        state.accessToken = null;
        delete http.defaults.headers.common['Authorization'];
      })
      .addCase(logoutAsync.rejected, (state) => {
        state.loading = false;
        state.loggedIn = false;
        state.accessToken = null;
        delete http.defaults.headers.common['Authorization'];
      });
  },
});

export const { setLoggedIn, setLoading } = authorizationSlice.actions;

export const selectIsLoggedIn = (state: RootState) =>
  state.authorization.loggedIn;
export const selectLoading = (state: RootState) => state.authorization.loading;
export const selectUser = (state: RootState) => state.authorization.user;

export default authorizationSlice.reducer;
