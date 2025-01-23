import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import HomeLayout from '../../components/HomeLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseLectures } from '../../../Redux/Slices/lectureState';

function DisplayLectures() {

    const {state} = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const lectures = useSelector(state => state?.lectureState?.lectures)
    const {role, data} = useSelector(state => state?.authstate)
    const [currentVideo, setCurrentVideo] = useState(0)
    
    console.log(state);

    useEffect(() => {
      if(!state) navigate("/courses");
      dispatch (getCourseLectures(state._id))
    },[])
    
    return (
        <HomeLayout>

          <div className=' flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white'>
                 <div className=' text-center font-semibold text-2xl text-yellow-500'>
                 Course name : {state.title}
                 </div>
                 <div className=' flex justify-center items-center gap-10 w-full'>
                       {/* left section for playing videos */}
                       <div className=' space-y-5 w-[42rem] p-2 rounded-lg shadow-[0_0_10px_black]'>
                        <video 
                        src={lectures && lectures[currentVideo]?.lecture?.secure_url}
                        controls
                        disablePictureInPicture
                        className=' object-fill rounded-tr-lg rounded-tl-lg w-full'
                        muted
                        controlsList='nodownload'
                        ></video>
                       
                        <h1>
                          <span className=' text-yellow-500 text-2xl font-semibold'>
                            {" "} Title :
                          </span>
                            {lectures && lectures[currentVideo]?.title}
                        </h1>
                        <p>
                          <span className=' text-yellow-500 line-clamp-4 text-2xl font-semibold'>
                               Description {" "}
                          </span>
                          {lectures && lectures[currentVideo]?.description}

                        </p>
                       </div>
              
                       {/* right section of the page for displaying list of the lectures*/}
                       <ul className=' w-[28rem] shadow-[0_0_10px_black] px-2 flex flex-col items-center'>
                       <li className=' flex w-full justify-center items-center'>
                       {role === "ADMIN"?(
                            <div className=' flex justify-between  w-full'>
                              <p className=' text-2xl'>Lectures list</p>
                          <button
                          onClick={() => navigate("/course/add-lecture", {state:{...state}})}
                          className=' text-xl text-white hover:text-gray-300  transition-all ease-in-out duration-200 font-bold bg-purple-700 px-2
                           rounded-lg'>Add new lecture</button>
                           </ div>
                        ):null}
                       </li>
                       {
                        lectures && lectures.map((lecture, idx) => {
                          return (
                           <li 
                           onClick={() => setCurrentVideo(idx)}
                           key={lecture._id}>
                             <p>
                              <span>
                               {" "} lecture no. {idx + 1}
                              </span>
                              {lecture?.title}
                            </p>
                            {role === "ADMIN" && (
                              <button className=' text-xl text-black hover:text-black transition-all ease-in-out duration-200 font-bold bg-red-700 px-2
                           rounded-lg'>
                                Delete lecture
                              </button>
                            )}
                           </li>
                          )
                        })
                       }

            
                       </ul>
                       
                 </div>
          </div>

        </HomeLayout>
    )
}

export default DisplayLectures
