import React, { useState, useEffect } from "react";
import { AuthContext } from "./common";
import { jwtDecode } from "jwt-decode";

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const decodeToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      setUser({
        username: decoded.unique_name,
        role: decoded.role,
      });
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Invalid token:", error);
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const syncUserFromStorage = () => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      decodeToken(storedToken);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    syncUserFromStorage();

    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem("authToken");
      if (!updatedToken) {
        setIsAuthenticated(false);
        setUser(null);
      } else {
        decodeToken(updatedToken);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const login = (token) => {
    localStorage.setItem("authToken", token);
    syncUserFromStorage();
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setUser(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        login,
        logout,
        syncUserFromStorage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
