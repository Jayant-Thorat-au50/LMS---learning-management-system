import React from "react";
// icon imports
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { becomeAdminNow, getUserData } from "../../Redux/Slices/Authslice";

function Footer() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data } = useSelector(state => state?.authstate);
  const { isLoggedIn } = useSelector(state => state?.authstate);
  const { role } = useSelector(state => state?.authstate);




  const sendAdminRequest = async () => {
    if (!isLoggedIn) {
      navigate('/login')
    }
    if (window.confirm('Once you become admin you can add your own courses')) {

      const response = await dispatch(becomeAdminNow(data._id))

      if (response.payload.success) {
        const res = await dispatch(getUserData(data._id));
        console.log(res);

      }

    }
  }

  // getting the year by inbuild js method
  const year = new Date().getFullYear();
  return (
    <footer className=" relative  h-[10vh] flex flex-column sm:flex-row items-center justify-between text-white bg-gray-800 py-5 sm:px-20 px-5 lg:px-5">
      <section className=" text-lg">
        Copyright &copy; {year} | All rights reserved
      </section>


      <section className=" flex justify-between gap-5 items-center">
        {(isLoggedIn && role === 'USER' && data.requestForAdmin === "Pending") ? (<div>
          <p
            onClick={sendAdminRequest}
            className=" text-white text-lg">Already requested for admin</p>
        </div>) : (isLoggedIn && role === 'USER' && data.requestForAdmin === "Rejected") ? (<div>
          <p
            onClick={sendAdminRequest}
            className=" text-white text-lg">Request again for admin <p className=" text-blue-500">send agian</p></p>
        </div>) : (!isLoggedIn || role === 'USER') ? (<div>
          <p
            onClick={sendAdminRequest}
            className=" text-white text-lg">Become a admin</p>
        </div>) : null}

        <nav className=" flex gap-5 text-2xl items-center justify-center text-white">
          <a
            href=""
            className=" hover:text-yellow-500 transition-all ease-in-out duration-300"
          >
            {" "}
            <BsFacebook />
          </a>
          <a
            href=""
            className=" hover:text-yellow-500 transition-all ease-in-out duration-300"
          >
            {" "}
            <BsInstagram />
          </a>
          <a
            href="https://www.linkedin.com/in/jayant-thorat-a18672210/"
            target="blank"
            className=" hover:text-yellow-500 transition-all ease-in-out duration-300"
          >
            {" "}
            <BsLinkedin />
          </a>
          <a
            href=""
            className=" hover:text-yellow-500 transition-all ease-in-out duration-300"
          >
            {" "}
            <BsTwitter />
          </a>
        </nav>

      </section>
    </footer>
  );
}

export default Footer;
