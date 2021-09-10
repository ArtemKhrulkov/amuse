import axios from 'axios';
import { AppStore } from 'app/store';
import { refreshGoogleTokensAsync } from 'features/authorization/authorizationSlice';

// create a new instance of axios
export const http = axios.create({
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
export const setupInterceptors = (store: AppStore) => {
  const { dispatch } = store;
  http.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalConfig = error.config;

      if (originalConfig.url !== '/api/auth/refresh-token' && error.response) {
        if (
          error.response.status === 401 &&
          error.response.data.detail === 'JWT token has expired'
        ) {
          dispatch(refreshGoogleTokensAsync());

          return http(originalConfig);
        }
      }

      return Promise.reject(error);
    }
  );
};
