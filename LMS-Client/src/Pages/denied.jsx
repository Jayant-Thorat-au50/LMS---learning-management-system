import React from 'react'
import HomeLayout from '../components/HomeLayout'
import { useNavigate } from 'react-router-dom'


function Denied() {

    const navigate = useNavigate();
    return (
     <HomeLayout>

 <div className='w-full h-screen flex flex-col justify-center items-center space-y-2'>
        <span className='text-9xl font-extrabold text-white'>
            403
        </span>

        <span className=' bg-black text-white px-2 py-1 rotate-12 absolute'>Access Denied</span>
        <button onClick={() => navigate(-1)}
         className=' border px-4 py-3 text-white cursor-pointer hover:bg-yellow-500 hover:border-0 hover:text-black font-bold rounded-md'>
           <span className='text-xl transition-all ease-in-out duration-300'> Go back</span>
        </button>
 </div>
     </HomeLayout>
    )
}

export default Denied
