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

            <div className='bg-gradient-to-b from-slate-50 via-teal-100 to-slate-50 pt-10 text-white  flex flex-col px-0z lg:px-14  gap-12 min-h-[90vh]'>


                <Hero />


                <div className=' w-full px-7  '>
                    {catagoryList.map((catagory) => <CourseListByCat key={catagory} catagory={catagory} />)}
                </div>


                <div className=' w-full flex flex-col px-6'>
                    <h2 className='  text-black text-2xl font-semibold'>Explore All Categories</h2>
                    <div className=' w-full h-96  bg-white my-2 py-6 gap-7 flex flex-wrap'>

                        {
                            catagories.map(ele =>
                                <div key={ele.name} className='card border w-[31%] h-36 bg-gray-300'>
                                    <div className=' w-full flex flex-col justify-between h-full py-4 px-3'>
                                        <div className=' flex justify-between items-center'>
                                            <p className=' text-blue-500 capitalize font-semibold text-xl'>{ele.name}</p>
                                            <img src={ele.thumbnail} alt="" className=' rounded-xl w-12 h-12' />
                                        </div>
                                        <p className=' text-black text-lg line-clamp-2'>{ele.description}</p>
                                    </div>
                                </div>
                            )
                        }

                    </div>
                </div>


                <div className=' px-14 mb-14 '>
                    <Testimonials />
                </div>

            </div>

        </HomeLayout>
    )
}

export default HomePage
