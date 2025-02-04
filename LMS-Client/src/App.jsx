import React from "react";
import "./App.css";
// lib imports
import { Routes, Route } from "react-router-dom";

// middleware imports
import RequireAuth from "./components/RequireAuth.jsx";

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
import AddCourse from "./Pages/Course/AddCourse.jsx";
import Profile from "./Pages/User/profile.jsx";
import EditProfile from "./Pages/User/EditProfile.jsx";
import Cheackout from "./Pages/Payment/cheackout.jsx";
import PaymentsFailure from "./Pages/Payment/paymentsFailure.jsx";
import PaymentSuccess from "./Pages/Payment/paymentSuccess.jsx";
import DisplayLectures from "./Pages/Dashboard/displayLectures.jsx";
import AddNewLecture from "./Pages/Dashboard/addNewLecture.jsx";
import AdminDashboard from "./Pages/Dashboard/AdminDashboard.jsx";
import ForgetPassword from "./Pages/User/forgetPassword.jsx";
import ResetPassword from "./Pages/User/resetPassword.jsx";
import ChangePassword from "./Pages/User/changePassword.jsx";
import SuperAdmin from "./Pages/Dashboard/SuperAdmin.jsx";
import AllUsersData from "./Pages/User/allUsersData.jsx";
import AllCoursesInCat from "./Pages/Course/AllCoursesInCat.jsx";



function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/reset-password" element={<Login />} />
      <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
      <Route path="/forgotPassword" element={< ForgetPassword />} />
      <Route path="/courses" element={<CourseList />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/denied" element={<Denied />} />
      <Route path="/course/description" element={<CourseDescription />} />
      <Route path="/course/:catagory" element={<AllCoursesInCat />} />
      <Route path="/*" element={<NotFound />} />
    
      <Route element={<RequireAuth allowedRoles={['ADMIN']} />}>
        <Route path="/admin/dashboard" element={< AdminDashboard />} />
        <Route path="/course/create" element={<AddCourse />} />
        <Route path="/course/add-lecture" element={<AddNewLecture />} />
      </Route>
      <Route element={<RequireAuth allowedRoles={['SUPER ADMIN']} />}>
        <Route path="/super-admin/dashboard" element={<SuperAdmin />} />
        <Route path="/user/allUsers" element={<AllUsersData />} />
      </Route>

      <Route element={<RequireAuth allowedRoles={['ADMIN', 'USER', 'SUPER ADMIN']} />}>
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/changepassword" element={< ChangePassword />} />
        <Route path="/checkout" element={<Cheackout />} />
        <Route path="/payment/success" element={< PaymentSuccess />} />
        <Route path="/payment/failure" element={<PaymentsFailure />} />
        <Route path="/user/editprofile" element={<EditProfile />} />
        <Route path="/course/displayLectures" element={<DisplayLectures />} />
      </Route>




    </Routes>
  );
}

export default App;
