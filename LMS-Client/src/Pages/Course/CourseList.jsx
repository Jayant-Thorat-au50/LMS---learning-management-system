import React, { useEffect } from 'react'
import { getcoursesList } from '../../../Redux/Slices/courseSlice'
import { useDispatch, useSelector } from 'react-redux'
import HomeLayout from '../../components/HomeLayout'
import CourseCard from '../../components/CourseCard'
import CourseListByCat from '../../components/courseListByCat'



function CourseList() {


  const Dispatch = useDispatch()
  const list = useSelector(state => state?.courseState.coursesList)
  const {catagoryList} = useSelector(state => state?.courseState)

  console.log(catagoryList);
  
  // const catagories = [...new Set(list.map(ele => ele.catagory))]
  // console.log(catagories);

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
        className=' min-h-[90vh] pt-12 px-14 flex flex-col mt-5 bg-gray-200  text-white
         space-y-5'
        >
        <h1 className='text-center text-3xl font-semibold text-black '>
          Explore courses made by
          <span className=' font-bold text-yellow-500'>Industry experts</span>
        </h1>
   
 

      <div className=' flex  justify-start w-full flex-wrap'>
      <div 
            className=' flex flex-wrap justify-evenly px-3  '>
       
       {catagoryList.map(cat => <CourseListByCat key={cat} catagory = {cat}/>)}
        </div>
        </div>
          </div>

    </HomeLayout>
  )
}

export default CourseList
