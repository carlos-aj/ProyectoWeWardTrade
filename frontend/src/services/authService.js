
export async function loginUser(email, password) {
  const res = await fetch('/api/login', {
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

export async function registerUser({ email, password, username }) {
  const res = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, username }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Registro fallido');
  }

  const data = await res.json();
  return data.token; // asumimos que devuelve un token como el login
}
