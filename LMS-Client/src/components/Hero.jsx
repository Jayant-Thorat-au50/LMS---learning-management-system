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

                <div className=' w-full flex flex-col lg:flex-row'>
                       {/* left part */}
            <div className='rounded-lg  w-[100%] h-fit   lg:h-[26rem] lg:w-[57%] space-y-3 lg:space-y-6 flex flex-col justify-between items-start ps-10 '>

<h1 className=' text-2xl  lg:text-4xl text-black font-semibold '>
    Empower your future with the
    courses designed to <span className=' text-blue-800'>fit your choice</span>.
</h1>
<p className=' text-sm lg:text-lg font-semibold text-gray-700 '>
    We have large library of courses taught by highly skilled and qualified faculties at affordable cost
</p>
<p className='  text-lg font-semibold text-gray-700 hidden lg:block '>
    In order to assist you in reaching your personal and professional objectives,
    <br /> we bring together top-notch teachers, engaging material, and a helpful community.
</p>
<div className=' space-x-12 lg:space-x-10 flex w-full'>
    <Link to={'/courses'}>
        <button className=' bg-white px-5 py-2 rounded-md font-semibold cursor-pointer text-sm lg:text-lg hover:bg-white text-black border-2 border-black transition-all ease-linear  hover:text-xl  duration-200  '>
            Explore courses
        </button>
    </Link>
    <Link to={'/contact-us'}>
        <button className='px-5 py-2  rounded-md font-semibold cursor-pointer  text-sm lg:text-lg hover:bg-white text-black bg-white hover:text-xl  border-2 border-black transition-all ease-linear duration-200 '>
            Contact Us
        </button>
    </Link>

</div>
</div>
    {/* right part */}
<div className='   w-[100%] lg:w-[40%] ms-3  flex h-[21rem] lg:h-[28rem] items-center  flex-col justify-center relative '>
<div className=' flex'>
    <img alt="" className='  absolute lg:left-20 left-7 top-10 w-40 h-32 lg:w-48 lg:h-40 rounded-3xl' src={hero8} />
    <img alt="" className=' bg-blue-200 absolute lg:right-5 right-16 top-5 lg:-top-2 w-36 h-36 lg:w-48 lg:h-48 rounded-3xl' src={hero9} />
</div>
<img alt="" className='  absolute lg:right-9 right-10 w-64 h-40 bottom-0 lg:bottom-8 mt-3 lg:w-64 lg:h-52 rounded-3xl' src={hero5} />
</div>
                </div>

                <div className=' w-full border-2
                 border-black flex flex-col gap-5 justify-center items-center'>
                    <p className=' text-gray-500 text-lg'>Trusted by the learners from</p>
                    <div className=' hidden lg:flex w-full justify-between items-center px-52'>
                        <img src={microsoftLogo} alt="" className=' h-12 w-14' />
                        <img src={walmartLogo} alt="" className=' h-14 w-14' />
                        <img src={accentureLogo} alt="" className=' h-11 w-36' />
                        <img src={paypalLogo} alt="" className=' h-14 w-14' />
                        <img src={adobeLogo} alt="" className=' h-10 w-36' />
                    </div>
                    <div className=' w-full  flex lg:hidden justify-between items-center px-52'>
                        <img src={microsoftLogo} alt="" className=' h-6 w-6' />
                        <img src={walmartLogo} alt="" className='h-6 w-6' />
                        <img src={accentureLogo} alt="" className='h-6 w-6' />
                        <img src={paypalLogo} alt="" className='h-6 w-6' />
                        <img src={adobeLogo} alt="" className='h-6 w-6' />
                    </div>
                </div>

      

        </div>


    )
}

export default Hero
