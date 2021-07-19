import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { getGoogleTokens, refreshGoogleTokens } from './authorizationAPI';

interface AuthorizationState {
  loggedIn: boolean;
  accessToken: string;
  refreshToken: string;
  tokenExpiryDate: string;
}

const initialState: AuthorizationState = {
  loggedIn: false,
  accessToken: '',
  refreshToken: '',
  tokenExpiryDate: '',
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
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
    setTokenExpiryDate: (state, action: PayloadAction<string>) => {
      state.tokenExpiryDate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setGoogleTokensAsync.pending, (state) => {
        state.loggedIn = false;
      })
      .addCase(setGoogleTokensAsync.fulfilled, (state, action) => {
        state.loggedIn = true;
        state.accessToken = action.payload.token;
        state.refreshToken = action.payload.refresh_token.sub;
        state.tokenExpiryDate = action.payload.refresh_token.exp;
      })
      .addCase(refreshGoogleTokensAsync.pending, (state) => {
        state.loggedIn = false;
      })
      .addCase(refreshGoogleTokensAsync.fulfilled, (state, action) => {
        state.loggedIn = true;
        state.accessToken = action.payload.token;
        state.refreshToken = action.payload.refresh_token.sub;
        state.tokenExpiryDate = action.payload.refresh_token.exp;
      });
  },
});

export const { setLoggedIn, setAccessToken, setTokenExpiryDate } =
  authorizationSlice.actions;

export const selectIsLoggedIn = (state: RootState) =>
  state.authorization.loggedIn;
export const selectAccessToken = (state: RootState) =>
  state.authorization.accessToken;
export const selectTokenExpiryDate = (state: RootState) =>
  state.authorization.tokenExpiryDate;

export default authorizationSlice.reducer;
