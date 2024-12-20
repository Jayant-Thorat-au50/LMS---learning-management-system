import React from "react";
import "./App.css";
// lib imports
import { Routes, Route } from "react-router-dom";

// component imports
import HomePage from "./Pages/HomePage.jsx";
import AboutUs from "./Pages/aboutUs.jsx";
import NotFound from "./Pages/NotFound/NotFound.jsx";
import SignUp from "./Pages/signUp.jsx";
import Login from "./Pages/login.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
