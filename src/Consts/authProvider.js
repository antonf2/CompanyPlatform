import React, { useState, useEffect } from 'react';
import { AuthContext } from './common';

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
    const storedUser = localStorage.getItem("authToken");
    if (storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }

    setIsLoading(false);

    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem("authToken");
      if (!updatedToken) {
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const login = (userData) => {
    localStorage.setItem('authToken', JSON.stringify(userData));
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
