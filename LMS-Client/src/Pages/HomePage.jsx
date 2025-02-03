import React, { useEffect, useState } from 'react'
import HomeLayout from '../components/HomeLayout'
import { data, Link } from 'react-router-dom'
import homePageImg from '../assets/pexels-photo-10725897-removebg-preview.png'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../Redux/Slices/Authslice'
import hero1 from '../assets/pexels-photo-12899182 (1).webp'
import hero2 from '../assets/pexels-pixabay-267582.jpg'
import hero3 from '../assets/pexels-hiteshchoudhary-879109.jpg'
import hero4 from '../assets/pexels-photo-1462630-removebg-preview.png'
import hero5 from '../assets/pexels-olia-danilevich-4974912.jpg'
import hero9 from '../assets/pexels-photo-1462630-removebg-preview_waifu2x_photo_noise3_scale-removebg-preview.png'
import hero7 from '../assets/pexels-photo-1462630-removebg-preview_waifu2x_photo_noise3_scale_waifu2x_photo_noise3_scale.png'
import hero8 from '../assets/images.jpeg'
import CourseListByCat from '../components/courseListByCat'




function HomePage() {

    const { coursesList } = useSelector(state => state?.courseState);
    const catagoryList = [...new Set(coursesList.map(c => c.catagory))]

    return (
        <HomeLayout>

            <div className=' pt-20 text-white bg-[rgb(255,255,255)] flex flex-col px-14 gap-16   min-h-[90vh]'>

                <div className='  flex '>

                    <div className='rounded-lg w-full bg-blue-200 h-[28rem] lg:w-[57%] space-y-6 flex flex-col justify-center items-start px-10 '>

                        <h1 className=' text-2xl  lg:text-5xl text-black font-semibold '>
                            Find out best
                            <span className='text-blue-500 font-semibold'>
                                Online Course
                            </span>
                        </h1>
                        <p className='  text-xl text-black '>
                            We have large library of courses taught by highly skilled and qualified faculties at affordable cost
                        </p>
                        <div className=' space-x-6'>
                            <Link to={'/courses'}>
                                <button className=' bg-white px-5 py-3 rounded-md font-semibold cursor-pointer text-lg hover:bg-white text-black border-2 border-black transition-all ease-linear  hover:text-xl  duration-200  '>
                                    Explore courses
                                </button>
                            </Link>
                            <Link to={'/contact-us'}>
                                <button className='px-5 py-3  rounded-md font-semibold cursor-pointer  text-lg hover:bg-white text-black bg-white hover:text-xl  border-2 border-black transition-all ease-linear duration-200 '>
                                    Contact Us
                                </button>
                            </Link>

                        </div>
                    </div>

                    <div className='  w-[40%] flex h-[28rem] items-center  flex-col justify-center relative '>
                        <div className=' flex'>
                            <img alt="" className='  absolute left-20  top-9  w-48 h-40 rounded-3xl' src={hero8} />
                            <img alt="" className=' bg-blue-100 absolute right-5 -top-2  w-48 h-48 rounded-3xl' src={hero9} />
                        </div>
                        <img alt="" className='  absolute right-9 bottom-0 mt-3 w-72 h-60 rounded-3xl' src={hero5} />
                    </div>

                </div>


                <div className=' w-full px-7  '>
                    {catagoryList.map(catagory => <CourseListByCat key={catagory} catagory={catagory} />)}
                </div>


                <div className=' w-full flex flex-col px-14'>
                    <h2 className=' border text-black text-2xl font-semibold'>Explore All Categories</h2>
                    <div className=' w-full h-96 border bg-white my-2 py-6 gap-7 flex flex-wrap'>

                        {
                            [0, 0, 0, 0, 0, 0].map(ele => <div key={ele} className='card border w-[30%] h-32 bg-gray-300'>

                            </div>)
                        }

                    </div>
                </div>

            </div>

        </HomeLayout>
    )
}

export default HomePage
