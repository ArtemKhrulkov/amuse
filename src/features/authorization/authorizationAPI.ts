const myHeaders = new Headers({ 'Content-Type': 'application/json' });
export async function googleAuth() {
  const response = await fetch('/auth/google/login', {
    method: 'GET',
    headers: myHeaders,
  });
  const data = await response.json();
  console.log(data);

  return data;
}
