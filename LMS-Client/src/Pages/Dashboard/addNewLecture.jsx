import React, { useState } from 'react'
import HomeLayout from '../../components/HomeLayout'
import { useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai';

import toast from 'react-hot-toast';
import { addNewLecture } from '../../../Redux/Slices/lectureState';
import { useDispatch } from 'react-redux';

function AddNewLecture() {
    const { state } = useLocation();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [userInput, setUserInput] = useState({
        title: "",
        description: "",
        lecture: undefined,
        videoSrc: ""
    })

    const hanldeInputChange = (e) => {

        const { name, value } = e.target

        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    const getVideo = (e) => {

        const video = e.target.files[0]
        const source = window.URL.createObjectURL(video);

        setUserInput({
            ...userInput,
            lecture: video,
            videoSrc: source
        })
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();

        if (!userInput.title || !userInput.description || !userInput.lecture) {
            return toast.error("All fileds are mandatory")
        }

        const formData = new FormData()
        formData.append("title", userInput.title)
        formData.append('description', userInput.description)
        formData.append('lecture', userInput.lecture)

        console.log(formData.entries()
        );
        const response = await dispatch(addNewLecture([state._id, formData]));

        if (response?.payload?.success) {
            navigate(-1)
            setUserInput({
                title: "",
                description: "",
                lecture: undefined,
                videoSrc: ""
            })
        }


    }



    return (
        <HomeLayout>
            <div
                className=' min-h-[95vh] flex flex-col justify-center items-center '
            >
                <div className=' w-96 flex flex-col bg-white pb-3 mb-4 justify-center items-center shadow-[0_0_10px_black] px-4 py-1 gap-3'>

                    <header className=' flex justify-center items-center relative'>
                        <h1 className=' text-2xl text-black font-semibold '>
                            Add new lecture
                        </h1>

                        <button onClick={() => navigate(-1)} className=' absolute  -left-24  bottom-0'>
                            <AiOutlineArrowLeft className=' text-black font-bold hover:text-blue-500 transition-all ease-in-out duration-200 text-2xl' />
                        </button>
                    </header>

                    <form
                        onSubmit={onFormSubmit}
                        noValidate
                        className=' w-full flex flex-col gap-4'
                    >
                        <div className='  w-full '>

                            <input value={userInput.title} type="text" id='title' onChange={hanldeInputChange} name='title' className=' text-black w-full py-1 bg-transparent px-2 border-2 border-gray-400 rounded-md' placeholder='Enter the title of the lecture' />
                        </div>


                        <div className=' flex flex-col w-full gap-1'>

                            <textarea value={userInput.description} type="text" onChange={hanldeInputChange} id='description' name='description' className=' text-white w-full py-1 bg-transparent px-2  border-2 border-gray-400 rounded-md resize-none h-36' placeholder='Enter the description of the lecture' />
                        </div>


                        {
                            userInput.videoSrc ? (
                                <div className=' relative'>
                                    <video
                                        controls
                                        muted
                                        disablePictureInPicture
                                        className=' nodownloads relative'
                                        src={userInput.videoSrc}>
                                    </video>
                                    <button className=' absolute -bottom-4 left-1 bg-red-600 text-white rounded-md px-2 hover:bg-red-700 transition-all ease-in-out duration-200 text-xl cursor-auto '
                                        onClick={() => setUserInput({
                                            title: "",
                                            description: "",
                                            lecture: undefined,
                                            videoSrc: ""
                                        })}
                                    >
                                        remove video
                                    </button>
                                </div>


                            ) : (
                                <div className=' flex  border-2 border-gray-400 rounded-md h-36 items-center justify-center   w-full gap-2 '>
                                    <label htmlFor="lecture" className=' w-full h-full flex justify-center items-center  text-2xl text-yellow-400 cursor-pointer'><p className='text-2xl text-yellow-400 '>choose your video :</p></label>
                                    <input value={userInput.lecture} onChange={getVideo} accept='video/mp4 video/x-mp4, video/*' type="file" id='lecture' name='lecture' className=' hidden' />

                                </div>
                            )
                        }

                        <button type='submit' className=' bg-green-500 text-white text-2xl p-0 py-2 w-full font-bold hover:bg-green-600'>
                            Upload lecture
                        </button>


                    </form>

                </div>
            </div>

        </HomeLayout>
    )
}

export default AddNewLecture
