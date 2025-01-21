import React from 'react'
import HomeLayout from '../../components/HomeLayout'
import { RxCrossCircled } from 'react-icons/rx'
import { Link } from 'react-router-dom'


function PaymentFailure() {
    return (
      <HomeLayout>
        <div className=' min-h-[90vh] flex justify-center w-full items-center'>
             <div className=' w-80 h-[26rem] flex flex-col justify-center items-center shadow-[0_0_10px_black] relative'>
                  <div className=' text-white font-bold w-full bg-red-500 text-center rounded-tl-lg rounded-tr-lg absolute top-0 right-0'>
                    <p className=' text-white text-3xl px-2 py-2'>Payment failed</p>
                  </div>

                  <div className=' text-white text-xl text-center flex flex-col items-center gap-12 '>
                  <p className='  '>
                    oops! payment failed please try again
                  </p>
                  <div className=''>
                    < RxCrossCircled className=' text-red-500 text-7xl animate-bounce'/>
                  </div>
                  </div>

                  <Link to="/checkout">
                  <button className=' hover:bg-red-700 transition-all ease-in-out duration-200 text-3xl w-full bg-red-500 py-2 text-white font-bold rounded-bl-lg rounded-br-lg absolute bottom-0 left-0'>
                    please try again
                  </button>
                  </Link>
             </div>
        </div>
      </HomeLayout>
    )
}

export default PaymentFailure
