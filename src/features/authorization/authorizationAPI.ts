import { api } from 'utils/api';

export async function getGoogleTokens() {
  const response = await api.get('api/auth/google/success');

  if (response.ok) {
    return response.body;
  }

  throw Error(response.err);
}

export async function refreshGoogleTokens() {
  const response = await api.get('api/auth/refresh-token');

  if (response.ok) {
    return response.body;
  }

  throw Error(response.err);
}

export async function logout() {
  const response = await api.get('api/auth/logout');

  if (response.ok) {
    return response.body;
  }

  throw Error(response.err);
}
