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
import CourseList from "./Pages/Course/CourseList.jsx";
import ContactUs from "./Pages/contactUs.jsx";
import Denied from "./Pages/denied.jsx";
import CourseDescription from "./Pages/Course/CourseDescription.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import AddCourse from "./Pages/Course/AddCourse.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/courses" element={<CourseList />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/denied" element={<Denied />} />
      <Route path="/course/description" element={<CourseDescription />} />
      <Route path="/*" element={<NotFound />} />
      <Route element={<RequireAuth allowedRoles={['ADMIN']}/>}>

        <Route path="/course/create" element={<AddCourse/>}/>
      </Route>


    </Routes>
  );
}

export default App;
