import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import {
  getGoogleTokens,
  logout,
  myHeaders,
  refreshGoogleTokens,
} from './authorizationAPI';

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
        myHeaders.append('Authorization', `Bearer ${state.accessToken}`);
      })
      .addCase(refreshGoogleTokensAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(refreshGoogleTokensAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedIn = true;
        state.accessToken = action.payload.token;
        myHeaders.delete('Authorization');
        myHeaders.append('Authorization', `Bearer ${state.accessToken}`);
      })
      .addCase(refreshGoogleTokensAsync.rejected, (state, action) => {
        state.loading = false;
        state.loggedIn = false;
      })
      .addCase(logoutAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedIn = false;
        state.accessToken = null;
        myHeaders.delete('Authorization');
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.loading = false;
        state.loggedIn = false;
        state.accessToken = null;
        myHeaders.delete('Authorization');
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
