import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CourseCard from './CourseCard'
import { useNavigate } from 'react-router-dom'

function CourseListByCat({ catagory }) {

    const list = useSelector(state => state?.courseState.coursesList)
    const { role } = useSelector(state => state?.authstate)
    const navigate = useNavigate()


    return (
        <div className=' flex flex-col items-start  justify-start w-full flex-wrap border-black'>

            <div className=' flex justify-between w-full border p-2 bg-blue-100 rounded-md '>
                <h1 className=' text-3xl ms-7 text-black font-bold'>{catagory}</h1>
                {role === "ADMIN" ? (
                    <div className=' flex gap-1'>
                        <button className=' rounded-md text-gray-400  font-bold px-1 py-1 bg-white'>View all &gt;&gt;</button>
                        <button
                            onClick={navigate('/course/create')}
                            className=' text-black font-bold rounded-md bg-yellow-500 px-1 py-1'>Add Course</button>
                    </div>
                ) : (
                    <div>
                        <button className=' text-gray-400 px-1 py-1 bg-white'>View all</button>
                    </div>
                )}
            </div>


            <div className=' flex  flex-wrap justify-between  '>
                {
                    list.map(course => {
                        if (course.catagory === catagory) {
                            return <CourseCard data={course} />
                        }
                    })
                }
            </div>
        </div>

    )
}

export default CourseListByCat
