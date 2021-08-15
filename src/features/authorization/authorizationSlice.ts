import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import {
  getGoogleTokens,
  logout,
  refreshGoogleTokens,
} from './authorizationAPI';
import { api } from 'utils/api';

interface AuthorizationState {
  loggedIn: boolean;
  loading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthorizationState = {
  loggedIn: false,
  loading: false,
  accessToken: null,
  refreshToken: null,
};

export const setGoogleTokensAsync = createAsyncThunk(
  'authorization/getGoogleTokens',
  async () => {
    return await getGoogleTokens();
  }
);

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

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setGoogleTokensAsync.pending, (state) => {
        state.loading = true;
        state.loggedIn = false;
      })
      .addCase(setGoogleTokensAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedIn = true;
        state.accessToken = action.payload.token;
        api.jwt(action.payload.token);
      })
      .addCase(setGoogleTokensAsync.rejected, (state) => {
        state.loading = false;
        state.loggedIn = false;
        api.jwt();
      })
      .addCase(refreshGoogleTokensAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshGoogleTokensAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedIn = true;
        state.accessToken = action.payload.token;
        api.jwt(action.payload.token);
      })
      .addCase(refreshGoogleTokensAsync.rejected, (state) => {
        state.loading = false;
        state.loggedIn = false;
      })
      .addCase(logoutAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.loading = false;
        state.loggedIn = false;
        state.accessToken = null;
        api.jwt();
      })
      .addCase(logoutAsync.rejected, (state) => {
        state.loading = false;
        state.loggedIn = false;
        state.accessToken = null;
        api.jwt();
      });
  },
});

export const { setLoggedIn, setAccessToken, setLoading } =
  authorizationSlice.actions;

export const selectIsLoggedIn = (state: RootState) =>
  state.authorization.loggedIn;
export const selectAccessToken = (state: RootState) =>
  state.authorization.accessToken;
export const selectLoading = (state: RootState) => state.authorization.loading;

export default authorizationSlice.reducer;
