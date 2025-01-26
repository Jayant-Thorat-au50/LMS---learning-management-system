import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import HomeLayout from '../../components/HomeLayout';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLecture, getCourseLectures } from '../../../Redux/Slices/lectureState';
import { FaPlus } from 'react-icons/fa'
import {MdModeEdit } from 'react-icons/md'
import { FaPlay } from "react-icons/fa";

function DisplayLectures() {

  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const lectures = useSelector(state => state?.lectureState?.lectures)
  const { role, data } = useSelector(state => state?.authstate)
  const [currentVideo, setCurrentVideo] = useState(0)
  const [currentlyPlaying, setCurrentlyPlaying] = useState()

  const [edit_lecture_modal_data, setEdit_lecture_modal_data] = useState(" ")
  const [modifiledInput, setModifiledInput] = useState({})

  const handleModifiledInput = (e) => {
       const {name, value} = e.target;
     
       setEdit_lecture_modal_data({
        ...edit_lecture_modal_data,
        [name]:value
       })


  }

console.log(edit_lecture_modal_data);


  const editLectureModal = (lec_data) => {
    setEdit_lecture_modal_data(lec_data)
    document.getElementById("edit_lecture_modal").showModal()
  }

  const getVideo = (e) => {
    const video = e.target.files[0];

    const source = window.URL.createObjectURL(video);

    if(source){
      setEdit_lecture_modal_data({
        ...edit_lecture_modal_data,
        lecture : video ,
        videoSrc:source
      })
    }
  }

  useEffect(() => {
    if (!state) navigate("/courses");
    dispatch(getCourseLectures(state._id)) 
  }, [])

  return (
    <HomeLayout>
      {lectures?.length > 0 ? (
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
                    onClick={() =>{ setCurrentVideo(idx)
                       setCurrentlyPlaying(lecture._id)}}
                    title={lecture.title}
                    key={lecture._id}
                    className=' flex  items-center justify-start w-full  '
                  >
                   <div className=' w-[15%] flex justify-center items-center'>
                   {currentlyPlaying == lecture._id ? (<FaPlay className=''/>):null}
                   </div>
                    <div className=' flex flex-col gap-2 w-[80%]'>
                    <p className=' text-xl '>
                      <span className=' text-2xl text-yellow-500'>
                        lecture no.{idx + 1} : {" "}
                      </span>
                      {lecture?.title}
                    </p>
                    {role === "ADMIN" && (
                      <div className=' flex w-full justify-between'>

                      <button
                      onClick={() => dispatch(deleteLecture([state._id,lecture._id])) }
                      className=' text-xl text-black hover:text-black transition-all ease-in-out duration-200 font-bold bg-red-700 px-2
                           rounded-lg'>
                        Delete lecture
                      </button>
                      <button
                      onClick={() => editLectureModal(lecture) }
                      className=' text-xl text-black hover:text-black transition-all ease-in-out duration-200 font-bold bg-yellow-500 px-2
                      rounded-lg'>
                        Edit lecture
                      </button>
                             </div>
                    )}
                     <hr className=' text-white border-white w-full' />
                    </div>
                  </li>
                )
              })
            }


          </ul>

        </div>
      </div>
      ):(role === "ADMIN" && state.createdby == data.fullName) ? (
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

<dialog id="edit_lecture_modal" className="modal">
  <div className="modal-box w-8/12 max-w-5xl bg-gray-800 space-y-3 ">
    <h3 className="font-bold text-center text-white text-2xl">Edit lecture</h3>
   {
    edit_lecture_modal_data ? (
      <form 
      className=' grid grid-cols-2 gap-10'
      >
      { edit_lecture_modal_data?.lectureSrc?.secure_url ? ( <div className=' w-full '>
         <video 
         controls
         disablePictureInPicture
         className=' w-full h-full nodownloads'
         src={edit_lecture_modal_data?.lectureSrc?.secure_url}></video>
         <button onClick={() => setEdit_lecture_modal_data({})}  className=' bg-red-600 text-white text-xl px-2 rounded-lg font-semibold '>remove video</button>
       </div>):(
       <div className=' w-full flex justify-center items-center'>
        <label className=' cursor-pointer text-xl text-white w-full border h-full flex justify-center items-center' htmlFor="videoSrc"><p>choose your video :</p></label>
        <input id='videoSrc' type="file" hidden name='videoSrc' value={edit_lecture_modal_data.videoSrc} onChange={getVideo}/>
       </div>
       )}
 
       <div className=' space-y-3 text-2xl text-white relative'>
       
         <div className=' flex flex-col items-start gap-1 text-yellow-500 relative'>
           <label htmlFor="">Title :</label>
           <input name='title' type="text" value={edit_lecture_modal_data.title} className=' px-2 w-full border-black border-2 rounded-lg py-1 text-white bg-transparent'  onChange={handleModifiledInput} />
        
         </div>
         <div className=' flex flex-col items-start gap-1 text-yellow-500 relative'>
           <label htmlFor="">Description :</label>
           <textarea name='description' type="text" value={edit_lecture_modal_data.description} className=' px-2 w-full border-black resize-none h-32 border-2 rounded-lg py-1 text-white bg-transparent'  onChange={handleModifiledInput} />
        
         </div>
       
         
       <button className=' top-[16.2rem] right-24 font-semibold absolute btn btn-success text-xl'>Save</button>
       </div>
 
      </form>
    ):null
   }
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button, it will close the modal */}
        <button className="btn-error btn text-xl">Close</button>
      </form>
    </div>
  </div>
  </dialog>


    </HomeLayout>
  )
}

export default DisplayLectures
