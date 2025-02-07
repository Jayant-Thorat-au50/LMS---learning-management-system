import React from 'react'
import profileImg1 from '../assets/profile_img_1.png'
import profileImg2 from '../assets/profile_img_3.png' 
import profileImg3 from '../assets/profile_img_2.png' 

function Testimonials() {
    return (
        <div className=' flex flex-col justify-center gap-10 items-center'>

            <h2 className=' text-black text-center font-semibold text-3xl'>Testimonials</h2>

            <div className=' px-14 text-center'>
                <p className=' text-gray-500 text-xl'>Hear from our learners as they share their journeys of transformation, success, and how our platform has made a difference in their lives.</p>
            </div>
            <div className=' flex justify-center items-center gap-10'>
                <div className="card rounded-lg flex flex-col  bg-white w-80 shadow-[0_0_10px_black]">
                    <div className=' w-full flex justify-between px-8 my-5 items-center'>
                        <div className=' flex flex-col gap-1'>
                            <p className=' text-black font-semibold'>Donald Jackman</p>
                            <p className=' text-sm text-black'>SDE@Amazon</p>
                        </div>
                        <figure>
                            <img
                                src={profileImg1}
                                alt="Shoes"
                                className=' w-12 h-12 rounded-full me-4' />
                        </figure>
                    </div>
                    <div className="card-body text-gray-500 font-semibold">

                        <p>I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier</p>
                        <div className="card-actions justify-end">
                        </div>
                    </div>
                </div>
                <div className="card rounded-lg flex flex-col  bg-white w-80 shadow-[0_0_10px_black]">
                    <div className=' w-full flex justify-between px-8 my-5 items-center'>
                        <div className=' flex flex-col gap-1'>
                            <p className=' text-black font-semibold'>Richard Nelson</p>
                            <p className=' text-sm text-black'>SDE@Amazon</p>
                        </div>
                        <figure>
                            <img
                                src={profileImg2}
                                alt="Shoes"
                                className=' w-12 h-12 rounded-full me-4' />
                        </figure>
                    </div>
                    <div className="card-body text-gray-500 font-semibold">

                        <p>I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier</p>
                        <div className="card-actions justify-end">
                        </div>
                    </div>
                </div>
                <div className="card rounded-lg flex flex-col  bg-white w-80 shadow-[0_0_10px_black]">
                    <div className=' w-full flex justify-between px-8 my-5 items-center'>
                        <div className=' flex flex-col gap-1'>
                            <p className=' text-black font-semibold'>James Washington</p>
                            <p className=' text-sm text-black'>SDE@Samsung</p>
                        </div>
                        <figure>
                            <img
                                src={profileImg3}
                                alt="Shoes"
                                className=' w-12 h-12 rounded-full me-4' />
                        </figure>
                    </div>
                    <div className="card-body text-gray-500 font-semibold">

                        <p>I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier</p>
                        <div className="card-actions justify-end">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonials
