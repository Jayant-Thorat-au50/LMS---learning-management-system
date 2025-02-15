// component imports
import App from "./App.jsx";
import React from "react";

// css imports
import "./index.css";

// lib imports
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../Redux/store.js";
// import 'remixicon/fonts/remixicon.css'
 

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  </Provider>
);
