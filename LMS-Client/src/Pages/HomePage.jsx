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
import axios from 'axios'
import Hero from '../components/Hero.jsx'




function HomePage() {

    const { coursesList } = useSelector(state => state?.courseState);
    const catagoryList = [...new Set(coursesList.map(c => c.catagory))]

    // const newList = async () => {

    //     const res = await fetch("https://newsapi.org/v2/everything?q=Apple&from=2025-02-04&sortBy=popularity&apiKey=5e8f55254a7b4d28b784b0fcde20d6b0",{
    //         method:'Get'
    //     });

    //     const result = await res.json();
    //     console.log(result);
        
        
    // }

    // useEffect(() => {
    //     newList()
    // })

    return (
        <HomeLayout>

            <div className='bg-gradient-to-b from-blue-100 via-cyan-100 to-slate-50 pt-10 text-white  flex flex-col px-14 gap-12    min-h-[90vh]'>


                <Hero/>


                <div className=' w-full px-7  '>
                    {catagoryList.map((catagory) => <CourseListByCat key={catagory} catagory={catagory} />)}
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
