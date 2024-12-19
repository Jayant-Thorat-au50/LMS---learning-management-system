import React from "react";
import "./App.css";
// lib imports
import { Routes, Route } from "react-router-dom";

// component imports
import HomePage from "./Pages/HomePage.jsx";
import AboutUs from "./Pages/aboutUs.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutUs />} />
    </Routes>
  );
}

export default App;
