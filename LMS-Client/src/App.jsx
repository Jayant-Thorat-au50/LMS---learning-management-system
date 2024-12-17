import React from "react";
import "./App.css";
// lib imports
import { Routes, Route } from "react-router-dom";

// component imports
import HomePage from "./Pages/HomePage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;
