import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import HomeLayout from '../../components/HomeLayout';
import { useSelector } from 'react-redux';

function CourseDescription() {

    const { state } = useLocation();
    let { role, data } = useSelector(state => state.authstate);

    console.log(role);


    console.log(data);



    useEffect(() => {
        console.log(state);

    }, [])
    return (
        <HomeLayout>
            <div className=' w-full min-h-[90vh] flex justify-center items-center flex-col pt-12 px-28 text-white'>
                <div className=' grid grid-cols-2 gap-10  py-10 relative'>
                    <div className=' space-y-5'>
                        <img
                            className=' w-full h-64  '
                            src={state?.thubnail?.public_id}
                            alt="thumbnail" />

                        <div className=' flex flex-col justify-between items-start text-xl'>
                            <p className=' font-semibold'>
                                <span className=" text-yellow-400 font-bold">Total lectures : {" "}</span>
                                {state?.noOfLectures}
                            </p>
                            <p className=' font-semibold'>
                                <span className=" text-yellow-400 font-bold">Instructor : {" "}</span>
                                {state?.createdby}
                            </p>
                        </div>

                        {role === "ADMIN" || data?.isSubscribed === "Active" ? (
                            <button className=' bg-yellow-600 text-xl rounded-md px-5 py-3 font-bold hover:bg-yellow-500 transition-all ease-in-out duration-300 hover:text-black w-full tracking-widest'>Watch Lectures</button>
                        ) : (
                            <button className=' bg-yellow-600 text-xl rounded-md px-5 py-3 font-bold hover:bg-yellow-500 transition-all ease-in-out duration-300 hover:text-black w-full tracking-widest'>Subscribe</button>
                        )}

                    </div>

                    <div className=' space-y-2 text-xl flex flex-col items-start  '>
                        <h1 className=' text-3xl font-bold text-yellow-500 mb-5 text-center'>
                            {state.title}
                        </h1>

                        <p className=' text-yellow-500 text-xl font-semibold'>Course Description :</p>
                        <p>{state?.description}</p>
                    </div>

                </div>
            </div>


        </HomeLayout>
    )
}

export default CourseDescription
