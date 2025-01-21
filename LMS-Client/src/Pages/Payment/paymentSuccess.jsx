import React from 'react'
import HomeLayout from '../../components/HomeLayout'
import { AiFillCheckCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'


function PaymentSuccess() {
    return (
      <HomeLayout>
        <div className=' min-h-[90vh] flex justify-center w-full items-center'>
             <div className=' w-80 h-[26rem] flex flex-col justify-center items-center shadow-[0_0_10px_black] relative'>
                  <div className=' text-white font-bold w-full bg-green-500 text-center rounded-tl-lg rounded-tr-lg absolute top-0 right-0'>
                    <p className=' text-white text-3xl px-2 py-2'>Payment successfull</p>
                  </div>

                  <div className=' text-white text-xl text-center flex flex-col items-center gap-12 '>
                  <p className='  '>
                    Welcome to the pro bundle <br /> now you can enjoy all the courses
                  </p>
                  <div className=''>
                    <AiFillCheckCircle className=' text-green-500 text-7xl animate-bounce'/>
                  </div>
                  </div>

                  <Link to="/">
                  <button className=' hover:bg-green-700 transition-all ease-in-out duration-200 text-3xl w-full bg-green-500 py-2 text-white font-bold rounded-bl-lg rounded-br-lg absolute bottom-0 left-0'>
                    Go to Dashboard
                  </button>
                  </Link>
             </div>
        </div>
      </HomeLayout>
    )
}

export default PaymentSuccess
