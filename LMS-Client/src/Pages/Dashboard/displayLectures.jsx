import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import HomeLayout from '../../components/HomeLayout';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLecture, editLecture, getCourseLectures } from '../../../Redux/Slices/lectureState';
import { FaPlus } from 'react-icons/fa'
import { FaPlay } from "react-icons/fa";
import toast from 'react-hot-toast';

function DisplayLectures() {

  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const lectures = useSelector(state => state?.lectureState?.lectures)
  const { role, data } = useSelector(state => state?.authstate)
  const [currentVideo, setCurrentVideo] = useState(0)
  
  const [currentlyPlaying, setCurrentlyPlaying] = useState()

  console.log(state);
  

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
    console.log(lec_data);
    
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
        lectureSrc:{
          secure_url:source
        }
      })
    }
  }

  const onEditLecture = async (e) => {

    e.preventDefault();

    if(!edit_lecture_modal_data.title ||!edit_lecture_modal_data.description){
      toast.error("Evey field is required");
      return;
    }

    const formData = new FormData()
    formData.append('title', edit_lecture_modal_data.title)
    formData.append('lecture_id', edit_lecture_modal_data._id)
    formData.append('description', edit_lecture_modal_data.description)
    formData.append('lecture', edit_lecture_modal_data.lecture)

    
    
    const response = await dispatch(editLecture([state._id, formData]));
    console.log(response);

    if(response?.payload?.success){
        toast.success('lecture updated successfully')
      await dispatch(getCourseLectures(state._id))
        navigate('/course/displayLectures', {state:{...state}})
       
    }

  

  }

  const onload = async() => {
    if (!state) navigate("/courses");
      await dispatch(getCourseLectures(state._id))
  }

  useEffect(() => {
   
onload()
  }, [])

  return (
    <div className=' min-h-[100vh]'>
      {lectures?.length > 0 ? (
      <div className=' flex flex-col bg-gray-300 items-center justify-between gap-7 w-full py-5 text-white'>
        <div className=' text-center font-semibold text-2xl text-blue-600'>
          Course name : <span className=' text-black capitalize'>{state.title}</span>
        </div>
        <div className='w-full flex justify-center items-start gap-5 '>
          {/* left section for playing videos */}
          <div className=' space-y-5 w-[45rem] h-full border-2 border-black rounded'>
            <video
              src={lectures && lectures[currentVideo]?.lectureSrc?.secure_url}
              controls
              disablePictureInPicture
              className=' object-fill rounded-tr-md rounded-tl-md w-full'
              controlsList='nodownload'
            ></video>

            <div className=' flex flex-col my-5 gap-5 justify-evenly'>
            <h1 className=' w-full px-3 text-2xl text-black '>
              <span className=' text-blue-600 text-2xl font-semibold'>
                {" "} Title :
              </span> {" "}
              {lectures && lectures[currentVideo]?.title}
            </h1>
            <p className=' text-black w-full px-3 text-2xl flex items-center line-clamp-4'>
              <span className=' text-blue-600 line-clamp-4 text-2xl font-semibold'>
               {" "} Description :
              </span>  {" "} 
             {lectures && lectures[currentVideo]?.description}

            </p>
            </div>
            
          </div>

          {/* right section of the page for displaying list of the lectures*/}
          <ul className=' w-[25rem] overflow-y-scroll h-full border-2 border-black px-2 gap-3 flex flex-col items-center'>
            <li className=' flex w-full mt-2  items-center'>
              {role === "ADMIN" ? (
                <div className=' flex justify-between ps-4 w-full relative'>
                  <p className=' text-2xl text-black'>Lectures list</p>
                  <button
                    onClick={() => navigate("/course/add-lecture", { state: { ...state } })}
                    className=' flex items-center gap-2 px-2 text-xl text-white hover:text-gray-300  transition-all ease-in-out duration-200 font-bold bg-purple-700 
                           rounded-lg'> <FaPlus /> <p> Add</p></button>
                </ div>
              ) : null}
              
            </li>
            <li className=' flex justify-center items-center flex-col w-full'>
            {
              lectures && lectures.map((lecture, idx) => {
                return (
                  <div
                    onClick={() =>{ setCurrentVideo(idx)
                       setCurrentlyPlaying(lecture._id)}}
                    // title={lecture.title}
                    key={lecture._id}
                    className=' flex h-24 border-b-2 border-black items-center justify-start w-full  '
                  >
                   <div className=' w-[12%] flex justify-center items-center'>
                   {currentlyPlaying == lecture._id ? (<FaPlay className=' text-black text-2xl'/>):null}
                   </div>
                    <div className=' flex flex-col  gap-2 w-[88%]'>
                    <p className={role === 'ADMIN'? ( ' text-xl text-black font-semibold line-clamp-1 '):(' text-xl text-black font-semibold line-clamp-2')}>
                      <span className=' text-2xl text-black'>
                        {idx + 1} : {" "}
                      </span>
                      {lecture?.title}
                    </p>
                    {role === "ADMIN" && (
                      <div className=' flex w-full justify-between'>

                      <button
                      onClick={() => dispatch(deleteLecture([state._id,lecture._id])) }
                      className=' text-xl text-black hover:text-black transition-all ease-in-out duration-200 font-bol px-2
                           rounded-lg  bg-red-500'>
                        Delete lecture
                      </button>
                      <button
                      onClick={() => editLectureModal(lecture) }
                      className=' text-xl text-black hover:text-black transition-all ease-in-out duration-200   px-2
                      rounded-lg bg-blue-300'>
                        Edit lecture
                      </button>
                             </div>
                    )}
                    </div>
                  </div>
                )
              })
            }
            </li>


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
      onSubmit={onEditLecture}
      className=' grid grid-cols-2 gap-10 modal-action'
      >
               { edit_lecture_modal_data?.lectureSrc?.secure_url ? ( <div className=' w-full '>
         <video 
         controls
         disablePictureInPicture
         className=' w-full h-full nodownloads'
         src={edit_lecture_modal_data?.lectureSrc?.secure_url}></video>
         <button onClick={() => setEdit_lecture_modal_data({...edit_lecture_modal_data, lectureSrc:{
          secure_url:""
        }})}  
        className=' bg-red-600 text-white text-xl px-2 rounded-lg font-semibold '>remove video</button>
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
       
         
       <button 
       type='Submit'
       className=' top-[16.2rem] right-24 font-semibold absolute btn btn-success text-xl'>Save</button>
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


    </div>
  )
}

export default DisplayLectures
