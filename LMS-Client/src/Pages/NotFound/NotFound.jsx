import React from 'react'
import './NotFound.css'
import pagenotfoundimg from '../../assets/404-page-not-found-removebg-preview.png'
import {useNavigate} from 'react-router-dom'

function NotFound() {
    const navigate = useNavigate()
    return (
        <div className=' h-screen w-full flex justify-center flex-col bg-[#1A2238] items-center'>
            <div className=' w-2/3 flex justify-between relative'>
                <p className=' text-8xl w-1/2 font-bold text-white statusCode'>404</p>
                <div className=' absolute top-10 notfound px-1 text-white bg-black'>
                    <p className=''>Page not found</p>
                </div>
                <div>
                    <img src={pagenotfoundimg} alt="" className='  w-80' />
                </div>
             
            </div>
           
                <div className='  top-10  px-1 statusCode text-white bg-transparent'>
                   <button className=' btn btn-secondary' onClick={() => navigate(-1)}>Go back</button>
                </div>
        </div>
    )
}

export default NotFound
