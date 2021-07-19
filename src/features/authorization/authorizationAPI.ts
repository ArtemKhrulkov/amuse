const myHeaders = new Headers({ 'Content-Type': 'application/json' });
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
