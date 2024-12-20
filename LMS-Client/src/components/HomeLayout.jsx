import React from "react";
import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";

function HomeLayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);

  const handleLogout = (e) => {
    e.preventDefault();

    navigate("/");
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
  return (
    <div className=" min-h-[90vh]">
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
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-48 sm:w-80 bg-base-200  text-base-content relative">
            <li className="absolute right-2 z-50">
              <button onClick={hideDrawer}>
                <AiFillCloseCircle />
              </button>
            </li>

            <li>
              <Link to={"/"}>Home</Link>
            </li>
            {isLoggedIn && role === "ADMIN" && (
              <li>
                <Link to={"/admin/dashboard"}>Admin dashboard</Link>
              </li>
            )}
            <li>
              <Link to={"/courses"}>All courses</Link>
            </li>
            <li>
              <Link to={"/contact"}>contact us</Link>
            </li>
            <li>
              <Link to={"/about"}>about Us</Link>
            </li>

            {!isLoggedIn && (
              <li>
                <div className="  flex items-center justify-start">
                  <button className=" rounded-md bg-primary w-1/2 lg:w-1/3 text-white text-lg font-semibold">
                    <Link>Login</Link>
                  </button>
                  <button className=" rounded-md bg-secondary w-1/2 lg:w-1/3 text-white  text-lg font-semibold">
                    <Link to={'/signUp'}>Signup</Link>
                  </button>
                </div>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <div className="   flex items-center justify-center">
                  <button className=" rounded-md bg-primary text-white  p-1 text-xl font-semibold">
                    <Link>profile</Link>
                  </button>
                  <button
                    className=" rounded-md bg-secondary  text-white  p-1 text-xl font-semibold"
                    onClick={handleLogout}
                  >
                    <Link>logout</Link>
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>

      {children}

      <Footer />
    </div>
  );
}

export default HomeLayout;
