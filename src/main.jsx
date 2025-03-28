import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles
import Login from "./pages/Login";
import UsersList from "./pages/UsersList";
import './index.css';

const PrivateRoute = ({ children }) => {
  return localStorage.getItem("token") ? children : <Navigate to="/" />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ToastContainer position="top-right" autoClose={3000} />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/users" element={<PrivateRoute><UsersList /></PrivateRoute>} />
    </Routes>
  </BrowserRouter>
);
