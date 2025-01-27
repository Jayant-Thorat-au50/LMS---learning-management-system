import React from 'react'
import { useNavigate } from 'react-router-dom'


function CourseCard({ data }) {

    const navigate = useNavigate()
    return (

        <div onClick={() => navigate('/course/description', { state: { ...data } })}
            className=' px-5 py-12 border-yellow-500  '>
            <div className='   flex flex-col items-center  w-[22rem] h-[430px] cursor-pointer border  gap-0 shadow-lg bg-zinc-700 group overflow-hidden rounded-lg'>
                
                <div className=' w-full h-2/3 overflow-hidden '>
                <img src={data?.thumbnail?.secure_Url} alt="thumbnail" className=' w-full max-h-full hover:scale-110 object-cover transition-all ease-in-out duration-300' />
                </div>
                <div className='  rounded-md w-full flex h-full justify-between pb-2 items-start px-3 flex-col'>
                    <h1 className=' text-white text-2xl font-semibold capitalize line-clamp-2'>{data?.title}</h1>
                    <p className='capitalize'><span className=' font-semibold text-xl text-yellow-500'>Category</span> : {data?.catagory}</p>
                    <p className=' line-clamp-3'><span className=' font-semibold text-xl text-yellow-500 '>Description</span> : {data?.description}</p>
                    <p className='capitalize'><span className=' font-semibold text-xl  text-yellow-500'>Instructor</span> : {data?.createdby}</p>
                    <p><span className=' font-semibold text-xl text-yellow-500'> no. of lectures </span> : {data?.noOfLectures}</p>

                </div>
            </div>
        </div>

    )
}

export default CourseCard
