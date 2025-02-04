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
      const currentTime = Math.floor(Date.now() / 1000); 

      if (decoded.exp < currentTime) {
        logout();
        return;
      }

      setUser({
        username: decoded.unique_name,
        role: decoded.role,
      });
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Invalid token:", error);
      logout();
    }
  };

  const syncUserFromStorage = () => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      decodeToken(storedToken);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    syncUserFromStorage();

    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem("authToken");
      if (!updatedToken) {
        logout();
      } else {
        decodeToken(updatedToken);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("authToken");
      if (token) {
        const decoded = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp < currentTime) {
          logout();
        }
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const login = (token) => {
    localStorage.setItem("authToken", token);
    syncUserFromStorage();
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setUser(null);
    window.location.href = "/login";
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
