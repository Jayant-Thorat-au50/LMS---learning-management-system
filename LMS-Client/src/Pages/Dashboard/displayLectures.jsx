import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import HomeLayout from '../../components/HomeLayout';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLecture, getCourseLectures } from '../../../Redux/Slices/lectureState';
import { FaPlus } from 'react-icons/fa'

function DisplayLectures() {

  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const lectures = useSelector(state => state?.lectureState?.lectures)
  const { role, data } = useSelector(state => state?.authstate)
  const [currentVideo, setCurrentVideo] = useState(0)


  useEffect(() => {
    if (!state) navigate("/courses");
    dispatch(getCourseLectures(state._id))
  }, [])

  return (
    <HomeLayout>
      {lectures.length > 0 ? (
      <div className=' flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white'>
        <div className=' text-center font-semibold text-2xl text-yellow-500'>
          Course name : <span className=' text-white capitalize'>{state.title}</span>
        </div>
        <div className=' flex justify-center items-start gap-5 w-full'>
          {/* left section for playing videos */}
          <div className=' space-y-5 w-[50rem] rounded-lg shadow-[0_0_10px_black]'>
            <video
              src={lectures && lectures[currentVideo]?.lectureSrc?.secure_url}
              controls
              disablePictureInPicture
              className=' object-fill rounded-tr-lg rounded-tl-lg w-full'
              controlsList='nodownload'
            ></video>

            <h1 className=' w-full px-3 text-2xl '>
              <span className=' text-yellow-500 text-2xl font-semibold'>
                {" "} Title :
              </span> {" "}
              {lectures && lectures[currentVideo]?.title}
            </h1>
            <p className=' w-full px-3 text-2xl flex items-center line-clamp-4'>
              <span className=' text-yellow-500 line-clamp-4 text-2xl font-semibold'>
               {" "} Description :
              </span>  {" "} 
             {lectures && lectures[currentVideo]?.description}

            </p>
          </div>

          {/* right section of the page for displaying list of the lectures*/}
          <ul className=' w-[30rem] shadow-[0_0_10px_black] px-2 gap-3 flex flex-col items-center'>
            <li className=' flex w-full justify-center items-center'>
              {role === "ADMIN" ? (
                <div className=' flex justify-between  w-full relative'>
                  <p className=' text-2xl'>Lectures list</p>
                  <button
                    onClick={() => navigate("/course/add-lecture", { state: { ...state } })}
                    className=' flex items-center gap-5 text-xl text-white hover:text-gray-300  transition-all ease-in-out duration-200 font-bold bg-purple-700 px-2
                           rounded-lg'> <FaPlus /> <p> Add new lecture</p></button>
                </ div>
              ) : null}
            </li>
            {
              lectures && lectures.map((lecture, idx) => {
                return (
                  <li
                    onClick={() => setCurrentVideo(idx)}
                    title={lecture.title}
                    key={lecture._id}
                    className=' flex flex-col items-start w-full gap-4  '
                  >

                    <p className=' text-xl '>
                      <span className=' text-xl text-yellow-500'>
                        lecture no.{idx + 1} : {" "}
                      </span>
                      {lecture?.title}
                    </p>
                    {role === "ADMIN" && (
                      <button
                      onClick={() => dispatch(deleteLecture([state._id,lecture._id])) }
                      className=' text-xl text-black hover:text-black transition-all ease-in-out duration-200 font-bold bg-red-700 px-2
                           rounded-lg'>
                        Delete lecture
                      </button>
                    )} <hr className=' text-white border-white w-full' />
                  </li>
                )
              })
            }


          </ul>

        </div>
      </div>
      ):role === "ADMIN" && state.createdby == data.fullName ? (
      <div className=' min-h-[90vh] flex justify-center items-center'>
          <div className='  bg-gray-700 rounded-md flex justify-between  w-[40rem] shadow-[0_0_10px_black] py-4 px-3 relative'>
        <p className=' text-white font-semibold text-2xl'>Lectures list</p>
        <button
          onClick={() => navigate("/course/add-lecture", { state: { ...state } })}
          className=' flex items-center gap-5 text-xl text-white hover:text-gray-300  transition-all ease-in-out duration-200 font-bold bg-purple-700 px-2
                 rounded-lg'> <FaPlus /> <p> Add new lecture</p></button>
      </ div>
      </div>
      ) : navigate(-1) }


    </HomeLayout>
  )
}

export default DisplayLectures
