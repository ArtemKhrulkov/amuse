import { http } from 'utils/api';

export async function refreshGoogleTokens() {
  const response = await http.get('api/auth/refresh-token');

  if (response.statusText === 'OK') {
    return response.data;
  }

  throw Error(response.data.detail);
}

export async function getCurrentUser() {
  const response = await http.get('api/user/self');

  if (response.statusText === 'OK') {
    return response.data;
  }

  throw Error(response.data.detail);
}

export async function logout() {
  const response = await http.get('api/auth/logout');

  if (response.statusText === 'OK') {
    return response.data;
  }

  throw Error(response.data.detail);
}
