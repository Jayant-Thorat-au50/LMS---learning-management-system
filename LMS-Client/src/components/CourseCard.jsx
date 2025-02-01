import React from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function CourseCard({ data }) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userData =useSelector(state => state?.authstate.data)

  const onSubscribe = async () => {
    if(userData.role === "ADMIN" || userData.role === "SUPER ADMIN"){
        toast.error('only students can buy the subscription');
        return;
    }
    await dispatch(purchaseSubcription(userData._id))
  }

    return (

        
            <div 
      
            className=' shadow-xl   flex flex-col items-center  w-[22rem] my-5  h-[28rem] cursor-pointer  gap-0 border-black  bg-white group overflow-hidden rounded-2xl '>
                
                <div className=' w-full h-1/2 '>
                <img src={data?.thumbnail?.secure_Url} alt="thumbnail" className=' w-full  h-52  hover:scale-110 object-cover transition-all ease-in-out duration-300' />
                </div>
                <div className='  rounded-md w-full flex h-full justify-evenly py-1 items-start px-3 flex-col'>
                    <div className=' text-center w-full'>
                        
                    <div className=' flex justify-start text-center w-full '>
                    <h1 className=' mx-auto text-start text-2xl text-black font-semibold capitalize line-clamp-2'>{data?.title}</h1>
                    </div>
                    </div>
                    <p className='capitalize text-black font-bold texl-lg '><span className=' font-semibold text-xl text-blue-400 '>Category</span> : {data?.catagory}</p>
                    {/* <p className=' line-clamp-2 text-black'><span className=' font-semibold text-xl text-blue-400 '>Description</span> : {data?.description}</p> */}
                    <p className='capitalize text-black font-bold'><span className=' font-semibold text-xl  text-blue-400'>Instructor</span> : {data?.createdby}</p>
                    <p className='font-bold text-black'><span className=' font-semibold text-xl   text-blue-400'> no. of lectures </span> : {data?.noOfLectures}</p>

                </div>
                    <div className=' w-full text-center py-1 mb-2 px-4 flex justify-between'>
                        <button 
                              onClick={() => navigate('/course/description', { state: { ...data } })}
                        className='  text-center text-black text-lg font-semibold border-2 px-4 rounded-xl hover:text-xl hover:border-black transition-all ease-linear  duration-200  py-2'>Explore</button>
                        <button 
                        onClick={onSubscribe}
                        className='  text-center text-black text-lg font-semibold border-2 px-4 rounded-xl btn bg-white border-gray-300 hover:bg-white  hover:text-xl hover:border-black transition-all ease-linear  duration-200   py-2'>Subscribe Bundle</button>
                    </div>

            </div>
 

    )
}

export default CourseCard
