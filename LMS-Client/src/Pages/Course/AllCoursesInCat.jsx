import React, { useState } from 'react'
import HomeLayout from '../../components/HomeLayout'
import { useSelector } from 'react-redux'
import CourseCard from '../../components/CourseCard'
import { useParams } from 'react-router-dom'

function AllCoursesInCat() {

    const {catagory} = useParams()
   const {coursesList} = useSelector(state => state?.courseState)
   console.log(catagory);
 

   const list = coursesList.filter(c => c.catagory === catagory)
   console.log(list);
   
   

    return (
        <HomeLayout>
            <div className=' min-h-[90vh] flex justify-center items-center bg-white px-20 py-16'>
                 <div className=' flex flex-wrap justify-center items-center gap-6'>
                {
                    list && list.map(course => <CourseCard key={course._id} data={course}/>)
                }
                 </div>
            </div>
        </HomeLayout>
    )
}

export default AllCoursesInCat
