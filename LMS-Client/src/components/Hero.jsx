import React from 'react'

// image imports
import hero8 from '../assets/images.jpeg'
import hero5 from '../assets/pexels-olia-danilevich-4974912.jpg'
import hero9 from '../assets/pexels-photo-1462630-removebg-preview_waifu2x_photo_noise3_scale-removebg-preview.png'
import microsoftLogo from '../assets/microsoft.logo.png'
import walmartLogo from '../assets/walmart.logo.png'
import accentureLogo from '../assets/accenture.logo.png'
import adobeLogo from '../assets/adobe.logo.png'
import paypalLogo from '../assets/paypal.logo.png'

// lib imports
import { Link } from 'react-router-dom'


function Hero() {
    return (
        <div className=' flex flex-col pt-5 gap-10 '>

                <div className=' w-full flex'>
                       {/* left part */}
            <div className='rounded-lg  w-[60%]    h-[26rem] lg:w-[57%] space-y-6 flex flex-col justify-between items-start ps-10 '>

<h1 className=' text-2xl  lg:text-5xl text-black font-semibold '>
    Empower your future with the
    courses designed to <span className=' text-blue-800'>fit your choice</span>.
</h1>
<p className='  text-lg font-semibold text-gray-500 '>
    We have large library of courses taught by highly skilled and qualified faculties at affordable cost
</p>
<p className='  text-lg font-semibold text-gray-500 '>
    In order to assist you in reaching your personal and professional objectives,
    <br /> we bring together top-notch teachers, engaging material, and a helpful community.
</p>
<div className=' space-x-10'>
    <Link to={'/courses'}>
        <button className=' bg-white px-5 py-2 rounded-md font-semibold cursor-pointer text-lg hover:bg-white text-black border-2 border-black transition-all ease-linear  hover:text-xl  duration-200  '>
            Explore courses
        </button>
    </Link>
    <Link to={'/contact-us'}>
        <button className='px-5 py-2  rounded-md font-semibold cursor-pointer  text-lg hover:bg-white text-black bg-white hover:text-xl  border-2 border-black transition-all ease-linear duration-200 '>
            Contact Us
        </button>
    </Link>

</div>
</div>
    {/* right part */}
<div className='   w-[40%] ms-3   flex h-[28rem] items-center  flex-col justify-center relative '>
<div className=' flex'>
    <img alt="" className='  absolute left-20  top-9  w-48 h-40 rounded-3xl' src={hero8} />
    <img alt="" className=' bg-white absolute right-5 -top-2  w-48 h-48 rounded-3xl' src={hero9} />
</div>
<img alt="" className='  absolute right-9 bottom-8 mt-3 w-64 h-52 rounded-3xl' src={hero5} />
</div>
                </div>

                <div className=' w-full flex flex-col gap-5 justify-center items-center'>
                    <p className=' text-gray-500 text-lg'>Trusted by the learners from</p>
                    <div className=' w-full flex justify-between items-center px-52'>
                        <img src={microsoftLogo} alt="" className=' h-12 w-14' />
                        <img src={walmartLogo} alt="" className=' h-14 w-14' />
                        <img src={accentureLogo} alt="" className=' h-11 w-36' />
                        <img src={paypalLogo} alt="" className=' h-14 w-14' />
                        <img src={adobeLogo} alt="" className=' h-10 w-36' />
                    </div>
                </div>

            {/* <h1 className=' text-black text-5xl font-semibold text-center'>Empower your future with the 
        courses designed to <span className=' text-blue-800'>fit your choice</span></h1>
        <p className=' text-lg text-gray-500 '>
        In order to assist you in reaching your personal and professional objectives,
        <br /> we bring together top-notch teachers, engaging material, and a helpful community.
        </p>

        <div className=' flex justify-center items-center'>
        <input type="text" className=" focus:outline-none text-lg py-1 w-[80%] bg-white text-black" placeholder="Enter course name..." />
            <button className=' bg-blue-500 px-2 py-1 text-black'>Search</button>
        </div> */}

        </div>


    )
}

export default Hero
