import React from 'react'
import HomeLayout from '../components/HomeLayout'
import { Link } from 'react-router-dom'

function HomePage() {
    return (
        <HomeLayout>

        <div className=' pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]'>
         <div className=' w-1/2 space-y-6'>
              <h1 className=' text-5xl font-semibold'>
                  Find out best
                  <span className= 'text-yellow-500 font-bold'>
                    Online Course
                  </span>
              </h1>
              <p className=' text-xl text-gray-200'>
              We have large library of courses taught by highly skilled and qualified faculties at affordable cost
              </p>
              <div className=' space-x-6'>
                <Link to={'/courses'}>
                <button className=' bg-yellow-500 px-5 py-3 rounded-md font-semibold cursor-pointer text-lg hover:bg-yellow-600 transition-all ease-in-out duration-300 '>
                    Explore courses
                </button>
                </Link>
                <Link to={'/contact'}>
                <button className='px-5 py-3 border rounded-md font-semibold cursor-pointer text-lg hover:bg-yellow-600 transition-all ease-in-out duration-300 '>
                    Contact Us
                </button>
                </Link>

              </div>
         </div>

   <div className=' w-1/2 flex items-center justify-center'>
          <img src="" alt="" height={100} width={100} />
   </div>


        </div>





        </HomeLayout>
    )
}

export default HomePage