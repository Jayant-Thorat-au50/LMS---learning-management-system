import React from 'react'
import aboutMainImage from '../assets/aboutmainimg.jpeg'
import HomeLayout from '../components/HomeLayout'

// constants import
import { visionaries } from '../Constants/visionary\'sData'

//component imports
import Carousel from '../components/Carousel'

function AboutUs() {

    return (
        <HomeLayout>

            <div className=' min-h-[90vh]  bg-white text-white px-auto pt-16 mb-16 flex items-center flex-col gap-10 lg:gap-16 justify-center'>
                <div className='flex items-center justify-center flex-col lg:flex-row lg:gap-0 lg:px-20  pt-16 gap-10'>
                    <section className='  w-11/12 lg:w-8/12 space-y-6  justify-center '>
                        <h1 className=' text-4xl font-semibold text-black'>
                            High-quality, reasonably priced <br />
                            education
                        </h1>
                        <p className='text-xl text-gray-500'>
                            our mission to offer the globe high-quality education. We give students and prospective instructors a forum to exchange information, abilities, and creative ideas. to empower and support humanity's development and well-being
                        </p>
                    </section>
                    <section className='w-10/12 lg:w-6/12 space-y-6 flex justify-center'>
                        <img src={aboutMainImage} alt="" className='rounded-lg w-10/12' />
                    </section>
                </div>

                <div className="carousel w-1/2 bg-white  ">
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



            </div>
        </HomeLayout>
    )
}

export default AboutUs
