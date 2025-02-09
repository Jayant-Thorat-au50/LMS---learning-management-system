
// lib imports
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// component and icons and images import
import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import Footer from "./Footer";


// thunck imports
import { logout } from "../../Redux/Slices/Authslice";
import { getcoursesList } from "../../Redux/Slices/courseSlice";
import Header from "./Header.jsx";

// images imports
function HomeLayout({ children }) {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state?.authstate?.isLoggedIn);
  const role = useSelector((state) => state?.authstate?.role);
  let { coursesList } = useSelector((state) => state?.courseState);

  const catagoryList = [...new Set(coursesList.map(c => c.catagory))]
  const [showCourseCatagoryList, setShowCourseCatagoryList] = useState(false)
  let [list, setList] = useState(coursesList.map(c => c.catagory == catagoryList[0]))




  const [viewAllval, setViewAllVal] = useState("")

  const coursesBycatagory = (c) => {
    setList(coursesList.filter(course => course.catagory == c))
    setList(prev => prev.slice(0, 3))
  }

  

  const changeWidth = () => {
    const drawerside = document.getElementsByClassName("drawer-side");
    drawerside[0].style.width = "auto";
  };

  const hideDrawer = () => {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;

    const drawerside = document.getElementsByClassName("drawer-side");
    drawerside[0].style.width = 0;
  };

  useEffect(() => {
    const getCourses = async () => {
      await dispatch(getcoursesList())
    }

    getCourses()
  }, [])
  return (
    <div className=" min-h-[100vh]  bg-gradient-to-b from-blue-200 via-cyan-100 to-slate-50  ">
      <div className="absolute left-0 z-50 w-full lg:w-fit lg:hidden block">
        <input type="checkbox" className="drawer-toggle" id="my-drawer" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className=" cursor-pointer relative">
            <FiMenu
              onClick={changeWidth}
              size={"32px"}
              className=" fw-bold text-black m-4"
            />
          </label>
        </div>

        <div className="drawer-side  lg:hidden block w-0">
          <label htmlFor="my-drawer" className="drawer-overlay "></label>
          <ul className="menu pr-0 text-lg p-4 w-48 sm:w-64 bg-base-200 h-screen text-base-content relative">
            <li className="absolute h-10 text-xl right-2 z-50">
              <button onClick={hideDrawer} className=" text-center hover:bg-gray-600 hover:text-white h-[100%]">
                <AiFillCloseCircle className="" />
              </button>
            </li>

            <li className=" ">
              <Link to={"/"}>Home</Link>
            </li>
            {isLoggedIn && role === "ADMIN" && (
              <li>
                <Link to={"/admin/dashboard"}>Admin dashboard</Link>
              </li>
            )}
            {isLoggedIn && role === "SUPER ADMIN" && (
              <li>
                <Link to={"/superadmin/dashboard"}>Super Admin Dashboard</Link>
              </li>
            )}
            <li>
              <Link to={"/courses"}>All courses</Link>
            </li>
            <li>
              <Link to={"/contact-us"}>contact us</Link>
            </li>
            <li>
              <Link to={"/about"}>about Us</Link>
            </li>

            {!isLoggedIn && (
              <li>
                <div className="  flex items-center justify-start">
                  <button className=" rounded-md bg-primary w-1/2 lg:w-6/12 text-white text-lg font-semibold hover:bg-blue-700 transition-all ease-in-out duration-400 hover:font-bold">
                    <Link to={'/login'}>Login</Link>
                  </button>
                  <button className=" rounded-md bg-secondary w-1/2 lg:w-6/12 text-white  text-lg font-semibold hover:bg-pink-500 transition-all ease-in-out duration-400 hover:font-bold">
                    <Link to={'/signUp'}>Signup</Link>
                  </button>
                </div>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <div className="  flex items-center justify-start">
                  <button className=" rounded-md bg-primary w-1/2 lg:w-1/2 text-white text-lg font-semibold">
                    <Link to='/user/profile'>profile</Link>
                  </button>
                  <button className=" rounded-md bg-secondary w-1/2 lg:w-1/2 text-white  text-lg font-semibold"
                    onClick={() => handleLogout()}>
                    logout
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>

      </div>


   <Header/>

      {children}

      <Footer />
    </div>
  );
}

export default HomeLayout;

