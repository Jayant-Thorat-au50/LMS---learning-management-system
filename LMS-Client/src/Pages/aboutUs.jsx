import React from 'react'
import aboutMainImage from '../assets/pexels-photo-270404-removebg-preview.png'
import HomeLayout from '../components/HomeLayout'

// constants import
import { visionaries } from '../Constants/visionary\'sData'

//component imports
import Carousel from '../components/Carousel'

function AboutUs() {

    return (
        <HomeLayout>

            <div className='  text-white px-auto pt-16 mb-16 flex items-center flex-col gap-10 lg:gap-16 justify-center'>
                <div className='flex items-center justify-center flex-col lg:flex-row lg:gap-0 lg:px-20  pt-16 gap-10'>
                    <section className='  w-11/12 lg:w-8/12 space-y-6  justify-center '>
                        <h1 className=' text-4xl font-semibold text-yellow-500'>
                            High-quality, reasonably priced <br />
                            education
                        </h1>
                        <p className='text-xl text-gray-200'>
                            our mission to offer the globe high-quality education. We give students and prospective instructors a forum to exchange information, abilities, and creative ideas. to empower and support humanity's development and well-being
                        </p>
                    </section>
                    <section className='w-10/12 lg:w-6/12 space-y-6 flex justify-center'>
                        <img src={aboutMainImage} alt="" className='rounded-lg w-10/12' />
                    </section>
                </div>

                <div className="carousel w-1/2  ">
                    {
                        visionaries && visionaries.map((carousel) =>
                            <Carousel
                                {...carousel}
                                Toatalslides={visionaries.length}
                                key={carousel.id}
                            />

                        )
                    }

                </div>


                {/* 
                <div className="carousel m-auto  h-[40vh]   px-10 w-1/2  ">
                    <div id="slide1" className="carousel-item border  w-full relative ">
                        <div className=' flex justify-center flex-col items-center  px-[15%]'>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
                            className="w-40 border-2 border-gray-200" />
                        <p>
                            "If you want to shine like a sun, first burn like a sun." "Failure will never overtake me if my determination to succeed is strong enough."
                        </p>
                        <h2 className=' text-xl font-bold'>
                            Abdul kalam
                        </h2>
                        <div className="absolute  top-36 -left-10 -right-10  flex -translate-y-1/2 transform justify-between">
                            <a href="#slide4" className="btn btn-circle">❮</a>
                            <a href="#slide2" className="btn btn-circle">❯</a>
                        </div>
                        </div>
                    </div>
                    <div id="slide2" className="carousel-item flex items-center border flex-col   w-full gap-5 text-center text-lg relative ">
                        <div>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
                            className="w-40 rounded-full h-2/4 border-2 border-gray-200" />
                        <p>
                            "If you want to shine like a sun, first burn like a sun." "Failure will never overtake me if my determination to succeed is strong enough."
                        </p>
                        <h2 className=' text-xl font-bold'>
                            Abdul kalam
                        </h2>
                        <div className="absolute  top-36 -left-10 -right-10  flex -translate-y-1/2 transform justify-between">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                        </div>
                        </div>
                    </div>
                    <div id="slide2" className="carousel-item relative w-full">
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
                            className="w-full" />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide1" className="btn btn-circle">❮</a>
                            <a href="#slide3" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                    <div id="slide3" className="carousel-item relative w-full">
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
                            className="w-full" />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide2" className="btn btn-circle">❮</a>
                            <a href="#slide4" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                    <div id="slide4" className="carousel-item relative w-full">
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
                            className="w-full" />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide3" className="btn btn-circle">❮</a>
                            <a href="#slide1" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                </div> */}

            </div>
        </HomeLayout>
    )
}

export default AboutUs
