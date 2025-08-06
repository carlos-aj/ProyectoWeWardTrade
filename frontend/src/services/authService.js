
export async function loginUser(email, password) {
  const res = await fetch('http://localhost:5000/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Login fallido');
  }

  const data = await res.json();
  return data.token;
}

export async function registerUser({ email, password, name }) {
  const res = await fetch('http://localhost:5000/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name}),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Registro fallido');
  }

  const data = await res.json();
  return data.token;
}
