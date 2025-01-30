import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../src/pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import Spinners from "./component/Spinners";
import ProtectedRoute from "./component/ProtectedRoute";
import PublicRoute from "./component/PublicRoute";
import ApplyDoctorForm from "./pages/ApplyDoctorForm";
import Notification from "./pages/Notification";

function App() {
  const loading = useSelector((state) => state.alerts.loading);
  // console.log(loading);
  return (
    <div>
      <BrowserRouter>
        {loading ? (
          <Spinners />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor-apply"
              element={
                <ProtectedRoute>
                  <ApplyDoctorForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notification"
              element={
                <ProtectedRoute>
                  <Notification />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
