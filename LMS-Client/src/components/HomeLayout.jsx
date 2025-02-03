
// lib imports
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// component and icons and images import
import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import Footer from "./Footer";
import logo from '../assets/download-removebg-preview (1).png'
import { CiSearch } from "react-icons/ci";

// thunck imports
import { logout } from "../../Redux/Slices/Authslice";
import { getcoursesList } from "../../Redux/Slices/courseSlice";

function HomeLayout({ children }) {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state?.authstate?.isLoggedIn);
  const role = useSelector((state) => state?.authstate?.role);
  const { data } = useSelector((state) => state?.authstate);
  let { coursesList } = useSelector((state) => state?.courseState);

  const catagoryList = [...new Set(coursesList.map(c => c.catagory))]
  const [showMenuOptions, setShowMenuOptions] = useState(false)
  const [showCourseCatagoryList, setShowCourseCatagoryList] = useState(false)
  let [list, setList] = useState(coursesList.map(c => c.catagory == catagoryList[0]))
   

  const handleLogout = async () => {
    const response = await dispatch(logout(data._id));
    if (response?.payload?.success) {
      setShowMenuOptions(false)
      navigate('/')
    }
  };


  const coursesBycatagory = (c) => {        
    setList(coursesList.filter(course => course.catagory == c))
    setList(prev => prev.slice(0,3))
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
    <div className=" min-h-[90vh] bg-gray-200  ">
      <div className="absolute left-0 z-50 w-fit">
        <input type="checkbox" className="drawer-toggle" id="my-drawer" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className=" cursor-pointer relative">
            <FiMenu
              onClick={changeWidth}
              size={"32px"}
              className=" fw-bold text-white m-4"
            />
          </label>
        </div>

        <div className="drawer-side w-0">
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


      <header className=" z-50 sticky top-0 left-0 shadow-[0_0_5px_gray] bg-white h-[11.5vh] w-full hidden lg:block ">
        <nav className=" flex  h-full w-full justify-center items-center">
          <ul className=" border h-full px-16 flex w-full justify-between items-center text-2xl text-white">
            <li className=" flex justify-center  h-full items-center gap-10 relative ">
              <li
                onClick={() => navigate('/')}
                className=" h-14 w-20  flex items-center rounded-md">
                <img src={logo} alt="" />
              </li>
              <li
                onMouseEnter={() => setShowCourseCatagoryList(true)}
                onMouseLeave={() => setShowCourseCatagoryList(false)}
                className=" border-2  border-gray-400 rounded w-48  text-lg py-0.5 bg-white shadow-xl">
                <select name="" id="" className=" border-1 rounded text-center h-full  w-full bg-white text-black font-semibold">
                  <option onClick={() => navigate('/courses')} value=""> Courses</option>
                </select>

                {/* absolute component of the catagory wise course list in the header */}
                {showCourseCatagoryList ? (<div className=" absolute w-[940px] h-[22rem] top-12 left-[7.5rem] shadow-[0_0_5px_gray] my-1 rounded flex bg-white">
                  <div className={`w-[27%]  bg-gray-400  h-full grid-rows-${catagoryList.length} grid`}>
                     {catagoryList.map(c => <div onMouseEnter={() => coursesBycatagory(c)} key={c} className=" flex justify-center items-center border-b-2 "><p className=" underline">{c}</p></div>)} 
                  </div>
                  <div className=" h-full w-[73%]  ">
                    <div className="w-[90%] grid grid-cols-2 pt-10">

                   {
                    list.map(course =>
                     <div
                     onClick={() => navigate('/course/description' , {state:{...course}})}
                     key={course._id} className=" text-black h-16 flex items-center justify-start gap-4  px-1  m-3  border border-gray-200">
                      <img src={course?.thumbnail?.secure_Url} className=" w-12 h-12 rounded" alt="" />
                      <p>{course.title}</p>
                      </div>)
                   }
                    </div>
                  </div>
                </div>) : null}
              </li>
            </li>

            <ul className=" flex h-full items-center  text-black ">
              <li className=" bg-gray-100 rounded-md relative text-end border   overflow-hidden w-64">
                <CiSearch className=" absolute left-2 text-3xl top-1  text-gray-500" />
                <input type="text" className=" focus:outline-none text-lg py-1 w-[80%] bg-gray-100" placeholder="Enter course name..." />
              </li>
              <li className=" relative ">
                {isLoggedIn ? (
                  <div
                  onMouseEnter={() => setShowMenuOptions(!showMenuOptions)}
                  onMouseLeave={() => setShowMenuOptions(false)}
                  className="  w-24 flex justify-end"
                  >

                  <img
                    onClick={() => setShowMenuOptions(!showMenuOptions)}
                    src={data.avatar.secureUrl} alt="" className=" h-11 w-11 hover:border-black hover:border-2 rounded-full" />
                    {showMenuOptions ? (<div className=" absolute top-12 w-48 bg-white shadow-[0_0_10px_gray]  justify-center  rounded-md right-0 flex flex-col items-start text-gray-500 text-[17px]">
                  <li className="py-2 bg-gray-200 rounded-md text-center w-full capitalize text-blue-500 font-semibold flex justify-center gap-2"><p className=" text-red-400">hey,</p> {data.fullName}</li>
                  <div className=" flex flex-col px-3 border w-full py-2">
                    <li
                      onClick={() => navigate('/user/profile')}
                      className=" hover:text-xl transition-all ease-linear hover:text-black duration-200">my profile</li>
                    {role === "ADMIN" ? (
                      <li onClick={() => navigate('/admin/dashboard')} >Admin Dashboard</li>
                    ) : null}
                    {role === "SUPER ADMIN" ? (
                      <li onClick={() => navigate('/super-admin/dashboard')} className="hover:text-xl transition-all ease-linear  hover:text-black  duration-200">Super Admin Panel</li>
                    ) : null}
                    <li className=" hover:text-xl transition-all ease-linear  hover:text-black  duration-200">subscription info</li>
                    <li
                      onClick={() => navigate('/contact-us')}
                      className=" hover:text-xl transition-all ease-linear  hover:text-black  duration-200">support</li>
                    <li
                      onClick={handleLogout}
                      className=" hover:text-xl transition-all ease-linear  hover:text-black  duration-200">logout</li>
                  </div>
                </div>) : null}
                    </div>
                ) : (

                  <div className=" border-2 border-green-300 bg-gray-100 font-bold hover:bg-gray-300 rounded-md px-2 py-1">
                    <p onClick={() => navigate('/login')} className="  text-green-400 text-lg ">Login/register</p>
                  </div>
                )}

                

              </li>
            </ul>
          </ul>
        </nav>
      </header>

      {children}

      <Footer />
    </div>
  );
}

export default HomeLayout;

