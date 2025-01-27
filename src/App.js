import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Components/Shared/Layout";
import Dashboard from "./Pages/Dashboard";
import Management from "./Pages/Management";
import Wiki from "./Pages/Wiki";
import Inventory from "./Pages/Inventory";
import Login from "./Pages/Login";
import AuthProvider from "./Consts/authProvider";
import { AuthContext } from "./Consts/common";
import { ToastContainer } from "react-toastify";

function PrivateRoute({ children, requiredRole }) {
  const { isAuthenticated, user } = React.useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
}

function App() {
  return (
    <>
      <ToastContainer />
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
                  <PrivateRoute requiredRole="Admin">
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
            <Route path="login" element={<Login />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
