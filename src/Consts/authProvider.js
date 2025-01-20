import React, { useState, useEffect } from 'react';
import { AuthContext } from './common';

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const syncUserFromStorage = () => {
    const storedUser = localStorage.getItem('authToken');
    if (storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  useEffect(() => {
    syncUserFromStorage();

    const handleStorageChange = () => {
      syncUserFromStorage();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = (userData) => {
    localStorage.setItem('authToken', JSON.stringify(userData));
    syncUserFromStorage();
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    syncUserFromStorage();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
