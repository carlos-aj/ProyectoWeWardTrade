import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);

  // Recuperar datos del usuario desde el backend al iniciar sesión
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      try {
        const res = await fetch('http://localhost:3000/api/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error('Error al cargar el usuario:', err);
        logout();
      }
    };
    fetchUser();
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
  };

  const updateUser = async (updates) => {
    try {
      const res = await fetch('/api/update-user', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      });
      const data = await res.json();
      setUser(data.user); // actualizar el usuario en memoria
    } catch (err) {
      console.error('Error actualizando usuario:', err);
    }
  };

  const deleteAccount = async () => {
    try {
      await fetch('/api/delete-account', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      logout();
    } catch (err) {
      console.error('Error al borrar la cuenta:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        updateUser,
        deleteAccount
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
