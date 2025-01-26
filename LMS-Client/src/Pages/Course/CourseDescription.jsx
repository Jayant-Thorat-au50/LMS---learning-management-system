import React from 'react'

// hook and lib imports
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

// component imports
import HomeLayout from '../../components/HomeLayout';
function CourseDescription() {

    const { state } = useLocation();
    const navigate = useNavigate()
    let { role, data } = useSelector(state => state.authstate);

    const courseData = state
    console.log(courseData);
    

    // authentication for admin role and owership of the course
    const displayLectures = () => {
        if (role === "ADMIN" && courseData.createdby != data.fullName) {
            toast.error('Admins can only view own courses');
            return;
        }

        if (role === "USER" && state.noOfLectures == 0) {
            toast.error('lectures are yet to be added')
            return
        }

        navigate("/course/displayLectures", { state: { ...courseData } })
    }


    return (
        <HomeLayout>
            <div className=' w-full min-h-[90vh] flex justify-center items-center flex-col pt-12 px-28 text-white'>
                <div className=' grid grid-cols-2 gap-10  py-10 relative'>
                    {/* left side of the page */}
                    <div className=' space-y-5  border rounded-md '>
                        <img
                            className=' w-full h-64'
                            src={state?.thumbnail?.secure_Url}
                            alt="thumbnail" />

                        <div className=' w-full px-3 gap-2 flex flex-col justify-between items-start text-xl'>
                            <p className=' font-semibold'>
                                <span className=" text-yellow-400 font-bold">Total lectures : {" "}</span>
                                {state?.noOfLectures}
                            </p>
                            <p className=' font-semibold'>
                                <span className=" text-yellow-400 font-bold">Instructor : {" "}</span>
                                {state?.createdby}
                            </p>
                        </div>

                        {role === "ADMIN" || data?.subscription?.status === "Active" ? (
                            <button
                                onClick={displayLectures}
                                className=' bg-yellow-600 text-xl rounded-md px-5 py-3 font-bold hover:bg-yellow-500 transition-all ease-in-out duration-150 hover:text-black w-full tracking-widest'>Watch Lectures</button>
                        ) : (
                            <button className=' bg-yellow-600 text-xl rounded-md px-5 py-3 font-bold hover:bg-yellow-500 transition-all ease-in-out duration-300 hover:text-black w-full tracking-widest'
                                onClick={() => navigate('/checkout')}
                            >Subscribe</button>
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
