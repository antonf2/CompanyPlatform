import React, { useContext, useEffect, useState } from 'react';
import Layout from './Components/Shared/Layout';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Management from './Pages/Management';
import Wiki from './Pages/Wiki';
import Inventory from './Pages/Inventory';
import Login from './Pages/Login';
import { AuthContext } from './Consts/common';
import AuthProvider from './Consts/authProvider';

function PrivateRoute({ children, requiredRole }) {
  const { isAuthenticated, user } = React.useContext(AuthContext);

  console.log("Checking access:", { isAuthenticated, user, requiredRole });

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
}


function AuthWrapper({ children }) {
  const { isAuthenticated } = React.useContext(AuthContext);
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="management"
              element={
                <PrivateRoute requiredRole="admin">
                  <Management />
                </PrivateRoute>
              }
            />
            <Route
              path="wiki"
              element={
                <PrivateRoute>
                  <Wiki />
                </PrivateRoute>
              }
            />
            <Route
              path="inventory"
              element={
                <PrivateRoute>
                  <Inventory />
                </PrivateRoute>
              }
            />
          </Route>
          <Route
            path="login"
            element={
              <AuthWrapper>
                <Login />
              </AuthWrapper>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
