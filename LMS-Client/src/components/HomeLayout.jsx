
// lib imports
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// component and icons and images import
import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import Footer from "./Footer";
import logo from '../assets/download-removebg-preview (1).png'


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
  const {data} = useSelector(state => state?.authstate)

  const catagoryList = [...new Set(coursesList.map(c => c.catagory))]
  const [showCourseCatagoryList, setShowCourseCatagoryList] = useState(false)
  let [list, setList] = useState(coursesList.map(c => c.catagory == catagoryList[0]))




  const [viewAllval, setViewAllVal] = useState("")

  const coursesBycatagory = (c) => {
    setList(coursesList.filter(course => course.catagory == c))
    setList(prev => prev.slice(0, 3))
  }

        const handleLogout = async () => {
          const response = await dispatch(logout(data._id));
          if (response?.payload?.success) {
            setShowMenuOptions(false)
            navigate('/')
          }
        };

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

  const sendAdminRequest = async () => {
    if (window.confirm('Once you become admin you can add your own courses, do you want send request for admin?')) {
    if (!isLoggedIn) {
      navigate('/login')
      toast.error('please login to continue')
      return;
    }

      const response = await dispatch(becomeAdminNow(data._id))

      if (response.payload.success) {
        toast.success('you will be notified once aprooved')
        const res = await dispatch(getUserData(data._id));
        console.log(res);

      }

    }
  }

  useEffect(() => {
    const getCourses = async () => {
      await dispatch(getcoursesList())
    }

    getCourses()
  }, [])
  return (
    <div className=" min-h-[100vh] max-w-full overflow-hidden  bg-gradient-to-b from-blue-200 via-cyan-100 to-slate-50  ">
     
     <div className="w-full lg:hidden shadow-[0_0_10px_black] border-2 bg-white ps-4 pt-2">

     <img onClick={() => navigate('/')} src={logo} alt="" className=" w-16 h-12 bg-white" />
     </div>
     
     
      <div className="absolute   top-0  right-0 z-50 w-fit lg:w-fit lg:hidden block">
        <input type="checkbox" className="drawer-toggle" id="my-drawer" />
        <div className="drawer-content ">
          <label htmlFor="my-drawer" className=" cursor-pointer relative">
            <FiMenu
              onClick={changeWidth}
              size={"32px"}
              className=" fw-bold text-black m-4"
            />
          </label>
        </div>

        <div className="drawer-side top-0 -left-24 bg-white absolute  lg:hidden block w-0">
          <label htmlFor="my-drawer" className="drawer-overlay "></label>
          <ul className="menu   text-sm  py-4 lg:w-48 w-40 sm:w-64 bg-gray-300 h-screen   text-black relative">
            <li className="absolute  h-10 text-xl right-2 z-50">
              <button onClick={hideDrawer} className=" text-center hover:bg-gray-600 hover:text-white h-[100%]">
                <AiFillCloseCircle className="" />
              </button>
            </li>

            <li className="hover:bg-gray-300 w-full ">
              <Link to={"/"}>Home</Link>
            </li>
            {isLoggedIn && role === "ADMIN" && (
              <li>
                <Link to={"/admin/dashboard"}>Admin dashboard</Link>
              </li>
            )}
              { role !== "SUPER ADMIN" ?(<li>
                <span onClick={isLoggedIn && role==="USER"?()=>sendAdminRequest() :isLoggedIn && role==="ADMIN"?() => navigate('/course/create') :() => navigate('login')}>Add courses</span>
              </li>):null}
            {isLoggedIn && role === "SUPER ADMIN" && (
              <li>
                <Link to={"/super-admin/dashboard"}>Super Admin Dashboard</Link>
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
                  <button className=" rounded-md bg-primary w-[45%]  text-white text-lg px-2 font-semibold hover:bg-blue-700 transition-all ease-in-out duration-400 hover:font-bold">
                    <Link className=" w-full" to='/login'>Login</Link>
                  </button>
                  <button className=" rounded-md bg-secondary w-[55%]  text-white px-1  text-lg font-semibold hover:bg-pink-500 transition-all ease-in-out duration-400 hover:font-bold">
                    <Link className=" w-full" to={'/signUp'}>Signup</Link>
                  </button>
                </div>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <div className="  flex items-center justify-start">
                  <button className=" rounded-md bg-primary px-2 w-[45%] text-white text-lg font-semibold">
                    <Link to='/user/profile'>profile</Link>
                  </button>
                  <button className=" rounded-md bg-secondary px-1 w-[55%] text-white  text-lg font-semibold"
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

