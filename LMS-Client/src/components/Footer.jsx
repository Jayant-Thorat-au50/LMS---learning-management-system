import React from "react";
// icon imports
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

function Footer() {
  // getting the year by inbuild js method
  const year = new Date().getFullYear();
  return (
    <footer className=" relative  h-[10vh] flex flex-column sm:flex-row items-center justify-between text-white bg-gray-800 py-5 sm:px-20 px-5 lg:px-5">
      <section className=" text-lg">
        Copyright &copy; {year} | All rights reserved
      </section>

      <section className=" flex gap-5 text-2xl items-center justify-center text-white">
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
      </section>
    </footer>
  );
}

export default Footer;
