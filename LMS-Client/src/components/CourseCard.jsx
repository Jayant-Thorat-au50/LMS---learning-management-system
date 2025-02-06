import React from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function CourseCard({ data }) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userData = useSelector(state => state?.authstate.data)

    const onSubscribe = async () => {
        if (userData.role === "ADMIN" || userData.role === "SUPER ADMIN") {
            toast.error('only students can buy the subscription');
            return;
        }
        await dispatch(purchaseSubcription(userData._id))
    }

    return (


        <div
          onClick={() => navigate('/course/description', { state: { ...data } })}
            className=' shadow-[0_0_12px_gray]   flex flex-col items-center  w-[19rem] my-5  h-[25rem] cursor-pointer  gap-0 border-black  bg-white group overflow-hidden rounded-md '>

            <div className=' w-full h-1/2 '>
                <img src={data?.thumbnail?.secure_Url}  alt="thumbnail" className=' w-full  h-44  hover:scale-110 object-cover transition-all ease-in-out duration-300' />
            </div>
            <div className='  rounded-md w-full flex h-full justify-evenly py-1 items-start px-3 flex-col'>
                <div className=' text-center w-full'>

                    <div className=' flex justify-start text-center w-full '>
                        <h1 className=' mx-auto text-start text-xl text-black font-semibold capitalize line-clamp-2'>{data?.title}</h1>
                    </div>
                </div>
                <p className='capitalize text-black font-bold texl-lg '><span className=' font-semibold text-lg text-blue-500 '>Category</span> : {data?.catagory}</p>
                {/* <p className=' line-clamp-2 text-black'><span className=' font-semibold text-xl text-blue-400 '>Description</span> : {data?.description}</p> */}
                <p className='capitalize text-gray-500 font-semibold'><span className=' font-semibold text-lg  text-blue-500'>Instructor</span> : {data?.createdby}</p>
                <p className='font-bold text-black'><span className=' font-semibold text-lg   text-blue-500'> No. of lectures </span> : {data?.noOfLectures}</p>

            </div>
            <div className=' w-full text-center py-1 mb-2 px-2 flex justify-between'>
                <button
                    onClick={() => navigate('/course/description', { state: { ...data } })}
                    className='  text-center text-black text-lg font-semibold border-2  border-gray-500 px-2 rounded-xl hover:text-xl hover:border-black transition-all ease-linear  duration-200  '>Explore</button>
                <button
                    onClick={onSubscribe}
                    className='  text-center text-black text-lg font-semibold border-2 px-2 rounded-xl btn bg-white border-gray-500 hover:bg-white   hover:text-xl hover:border-black transition-all ease-linear  duration-200  '>Subscribe Bundle</button>
            </div>

        </div>


    )
}

export default CourseCard
