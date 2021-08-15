import { api } from 'utils/api';

export async function getGoogleTokens() {
  const response = await api.get('api/auth/google/success');
  return response.body;
}

export async function refreshGoogleTokens() {
  const response = await api.get('api/auth/refresh-token');
  console.log(response);
  return response.body;
}

export async function logout() {
  const response = await api.get('api/auth/logout');
  return response.body;
}
