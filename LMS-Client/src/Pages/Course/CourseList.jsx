import React, { useEffect } from 'react'
import { getcoursesList } from '../../../Redux/Slices/courseSlice'
import { useDispatch, useSelector } from 'react-redux'
import HomeLayout from '../../components/HomeLayout'
import CourseCard from '../../components/CourseCard'



function CourseList() {


    const Dispatch = useDispatch()
    const list = useSelector(state => state.courseState.coursesList)



    
    const catagories = [...new Set(list.map(ele => ele.catagory))]
    console.log(catagories);
    


    const getCoursesList = async () => {
        const response = await Dispatch(getcoursesList());

        if (response?.payload?.success) {


   
        }
    }

    useEffect(() => {

        getCoursesList();

    }, [])
    return (
      <HomeLayout>
<div
className=' min-h-[90vh] pt-12 pl-20 flex flex-col mt-5  text-white'>
<h1  className='text-center text-3xl font-semibold '>
            Explore courses made by 
            <span className=' font-bold text-yellow-500'>Industry experts</span>
        </h1>
              <div className=' flex flex-wrap'>
                {list.map(ele => 
                    
                  <CourseCard key={ele.title} data={ele}/>

                )}
              </div>
</div>
      </HomeLayout>
    )
}

export default CourseList
