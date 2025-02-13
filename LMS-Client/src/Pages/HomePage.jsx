import React, { useEffect, useState } from 'react'
import HomeLayout from '../components/HomeLayout'
import CourseListByCat from '../components/courseListByCat'
import Hero from '../components/Hero.jsx'
import { catagories } from '../Constants/visionary\'sData.js'
import Testimonials from '../components/Testimonials.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { getcoursesList } from '../../Redux/Slices/courseSlice.js'




function HomePage() {

    const dispatch = useDispatch()
    const { coursesList } = useSelector(state => state?.courseState);
    const catagoryList = [...new Set(coursesList.map(c => c.catagory))]
    const [viewAll, setViewAll] = useState('')

    const loadInfo = async () => {

        await dispatch(getcoursesList())
    }

    useEffect(() => {
        loadInfo()
    }, [])


    return (
        <HomeLayout>

            <div className=' bg-white  lg:pt-10 text-white  flex flex-col px-0z lg:px-14  gap-12 min-h-[90vh]'>


                <Hero />

                   {/* course list by catagory */}
                <div className=' w-full px-7   '>
                    {catagoryList.map((catagory) => <CourseListByCat key={catagory} catagory={catagory} />)}
                </div>

                              {/*  */}
                <div className=' w-full flex flex-col px-6'>
                    <h2 className='  text-black lg:text-2xl text-xl font-semibold'>Explore All Categories</h2>
                    <div className=' w-full h-96  lg:bg-white my-2 lg:py-6 gap-1 lg:gap-7 flex flex-col lg:flex-row lg:flex-wrap'>

                        {
                            catagories.map(ele =>
                                <div key={ele.name} className='card border lg:w-[31%] w-full h-28 lg:h-36 bg-gray-300'>
                                    <div className=' w-full flex flex-col justify-between h-full py-1 lg:py-4 px-3'>
                                        <div className=' flex justify-between items-center'>
                                            <p className=' text-blue-500 capitalize font-semibold text-lg lg:text-xl'>{ele.name}</p>
                                            <img src={ele.thumbnail} alt="" className=' rounded-xl w-12 h-12' />
                                        </div>
                                        <p className=' text-black text-sm lg:text-lg line-clamp-2'>{ele.description}</p>
                                    </div>
                                </div>
                            )
                        }

                    </div>
                </div>

                                             {/* testimonials */}
                <div className=' lg:px-14 px-2 mb-5 lg:mb-14  mt-44 lg:mt-0 '>
                    <Testimonials />
                </div>

            </div>

        </HomeLayout>
    )
}

export default HomePage
