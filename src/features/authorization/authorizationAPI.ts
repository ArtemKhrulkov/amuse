export const myHeaders = new Headers({
  'Content-Type': 'application/json',
  credentials: 'include',
});
export async function getGoogleTokens() {
  const response = await fetch('api/auth/google/success', {
    method: 'GET',
    headers: myHeaders,
  });
  return await response.json();
}

export async function refreshGoogleTokens() {
  const response = await fetch('api/auth/refresh-token', {
    method: 'GET',
    headers: myHeaders,
  });
  return await response.json();
}

export async function logout() {
  const response = await fetch('api/auth/logout', {
    method: 'GET',
    headers: myHeaders,
  });
  return await response.json();
}
