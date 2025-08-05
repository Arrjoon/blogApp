'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      const now = Math.floor(Date.now() / 1000); // in seconds
      return decoded.exp < now;
    } catch (error) {
      return true; // treat invalid token as expired
    }
  };

  const login = (token, user) => {
    setToken(token);
    setUser(user);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      if (isTokenExpired(storedToken)) {
        logout(); // expire immediately if old
      } else {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));

        // Optional: set timeout to auto-logout when token expires
        const decoded = jwtDecode(storedToken);
        const timeLeft = decoded.exp * 1000 - Date.now(); // in ms

        const timeout = setTimeout(() => {
          logout();
          alert('Session expired. Please log in again.');
        }, timeLeft);

        return () => clearTimeout(timeout); // clean up
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
