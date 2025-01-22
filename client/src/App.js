import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../src/pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import Spinners from "./component/Spinners";

function App() {
  const loading = useSelector((state) => state.alerts.loading);
  console.log(loading);
  return (
    <div>
      <BrowserRouter>
        {loading ? (
          <Spinners />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
