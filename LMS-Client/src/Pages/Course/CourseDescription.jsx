import React, { useEffect, useState } from 'react'

// hook and lib imports
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';


// component imports
import HomeLayout from '../../components/HomeLayout';
import EditCourseModal from '../../components/EditCourseModal';
import { getOneCourse } from '../../../Redux/Slices/courseSlice';
function CourseDescription() {

    const { state } = useLocation();
    const [courseObj, setCourseObj] = useState(state)
    const navigate = useNavigate()
    let { role, data } = useSelector(state => state.authstate);

    console.log(courseObj);
    
    const courseData = state



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

    const openEditCourseModal = () => {
        
        if(state){

            document.getElementById('my_modal_1').showModal()
        }
        
    }

    

    useEffect(() => {
           const onLoad = async () => {
            const response = await dispatch(getOneCourse(state._id));
            console.log(response);
            
        if(response?.payload?.success){
    setCourseObj(response?.payload?.Course)
        }
        onLoad();
            
           }
    }, [courseObj])


    return (
        <HomeLayout>
            <div className=' w-full min-h-[90vh] flex justify-center items-center flex-col px-28 text-white  relative'>
                {role === "ADMIN" && courseObj.createdby == data.fullName ? (
                    <div className=' w-fit z-50    absolute right-24 top-10 cursor-pointer '>
                        <button
                         onClick={openEditCourseModal}
                        className=' btn bg-yellow-500 hover:bg-yellow-600  px-2 py-1 transition-all ease-in-out duration-200 rounded-md text-2xl font-semibold text-black'>Edit Course</button>
                    </div>
                ):null}
                <div className=' flex justify-evenly items-start gap-10  py-10 relative'>
                    {/* left side of the page */}
                    <div className=' w-6/12   bg-white  shadow-[0_0_10px_gray]  space-y-5 overflow-hidden rounded-md '>
                        <img
                            className=' w-full h-48 hover:scale-110 object-cover transition-all ease-in-out duration-200'
                            src={courseObj?.thumbnail?.secure_Url}
                            alt="thumbnail" />
                                                 <p className=' text-start px-4 font-semibold text-black text-2xl'>{courseObj.title}</p>


                        <div className=' w-full px-3 gap-2 flex flex-col justify-between items-start text-xl'>
                            <p className=' font-semibold text-black'>
                                <span className=" text-blue-400 font-bold">Total lectures : {" "}</span>
                                {courseObj?.noOfLectures}
                            </p>
                            <p className=' font-semibold text-black'>
                                <span className=" text-blue-400 font-bold">Instructor : {" "}</span>
                                {courseObj?.createdby}
                            </p>
                        </div>

                        {role === "ADMIN" || role === "SUPER ADMIN" || data?.subscription?.status === "Active" ? (
                            <button
                                onClick={displayLectures}
                                className=' bg-yellow-600 text-xl rounded-md px-5 py-3 font-bold hover:bg-yellow-500 transition-all ease-in-out duration-150 hover:text-black w-full tracking-widest'>Watch Lectures</button>
                        ) : (
                            <button className=' bg-blue-600 text-xl rounded-md px-5 py-3 font-bold hover:bg-blue-500 transition-all ease-in-out duration-300 hover:text-black w-full tracking-widest'
                                onClick={() => navigate('/checkout')}
                            >Subscribe Bundle</button>
                        )}

                    </div>

                    <div className=' space-y-2 text-xl flex flex-col justify-start items-start  '>
                        <h1 className=' text-3xl font-semibold text-black mb-5 text-start'>
                            {courseObj.title}
                        </h1>

                        <p className=' text-blue-500 text-xl font-semibold'>Course Description :</p>
                        <p className=' text-black'>{courseObj?.description}</p>
                    </div>

                </div>
            </div>

            <dialog id="my_modal_1" className="modal bg-transparent">
            <EditCourseModal getNewCourse={setCourseObj} stateObj={courseObj} />
            </dialog>


        </HomeLayout>
    )
}

export default CourseDescription
