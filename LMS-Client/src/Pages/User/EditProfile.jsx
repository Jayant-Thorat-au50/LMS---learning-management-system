
// lib imports
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
// component imports
import HomeLayout from '../../components/HomeLayout'
import { CiEdit } from "react-icons/ci";
import { AiOutlineArrowLeft } from 'react-icons/ai';

// thunck imports
import { userUpdate } from '../../../Redux/Slices/Authslice';

function EditProfile() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    let data = useSelector(state => state?.authstate?.data);
    const [editing, setEditing] = useState(false)
    const [isEdited, setIsEdited] = useState(false)

    const [userInput, setUserInput] = useState({
        fullName: data?.fullName,
        avatar: data?.avatar?.secureUrl,
        userId: data?._id,
        ImgPreview: ""

    });

    const handleImgUpload = (e) => {

        e.preventDefault();

        const uploadedImg = e.target.files[0];

        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadedImg);
        fileReader.addEventListener('load', function () {
            setUserInput({
                ...userInput,
                ImgPreview: this.result,
                avatar: uploadedImg
            })
            setIsEdited(true)
        })
    }

    const handleInputChange = (e) => {
        if (editing) {
            const { name, value } = e.target;
            console.log(name, value);

            setUserInput({
                ...userInput,
                [name]: value
            })
            setIsEdited(true)
        }
    }

    console.log(userInput);
    

    const onFormSubmit = async (e) => {
        e.preventDefault();

        if ((userInput.fullName && userInput.fullName.length < 5)) {
            toast.error('name cannot be of less than 5 characters')
            return
        }
        const formData = new FormData()
        formData.append("fullName", userInput.fullName)
        formData.append("avatar", userInput.avatar)

        const response = await dispatch(userUpdate([userInput.userId, formData]));
        console.log(response);
        

        if (response?.payload?.success) {
            navigate('/user/profile')

        }

        if (response?.payload?.success) {
            console.log('state updated successfully');
        }

    }
    return (
        <HomeLayout>
            {/* <div className=' flex justify-center items-center min-h-[100vh] w-full '>
                <form
                    onSubmit={onFormSubmit}
                    noValidate
                    className=' flex flex-col items-center content-center  rounded-sm min-h-[26rem] shadow-[0_0_10px_black] gap-5 w-96 py-3 px-2'
                >
                    <h1 className=' text-2xl font-semibold text-center text-white py-1'>Edit Profile</h1>
                    <div className=' relative'>
                        <label htmlFor="avatar" className=' cursor-pointer '>
                            {userInput.ImgPreview ? (<img src={userInput?.ImgPreview} alt="" className='  w-32 h-32 rounded-full m-auto' />) : (
                                <img src={userInput?.avatar} alt="" className='  w-32 h-32 rounded-full m-auto' />

                            )}
                            <CiEdit className=' absolute left-20 bottom-0 text-3xl hover:bg-black  rounded-full  transition-all ease-in-out duration-300' />

                        </label>
                        <input accept=".jpg, .jpeg, .svg, .png" type="file" hidden id='avatar' onChange={handleImgUpload} />
                    </div>
                    <div className=' w-full flex items-center px-auto  '>
                        <label htmlFor="title" className=' w-[30%] text-2xl font-semibold text-yellow-500'>Full name
                        </label>

                        <span className=' w-[10%] text-2xl text-white'>:</span>

                        {editing ? (<input type="text" value={userInput.fullName} name='fullName' onChange={handleInputChange} className=' w-[50%] border-black border-2 rounded-lg bg-transparent px-2 text-xl text-white font-semibold capitalize py-1' />) : (
                            <p className=' w-[50%] rounded-lg bg-transparent py-1 border border-transparent  text-xl text-white font-semibold capitalize relative '>{userInput.fullName}


                                {!editing ? (<CiEdit onClick={() => setEditing(true)} className=' absolute left-44 bottom-1 border border-black text-3xl hover:bg-black transition-all ease-in-out duration-300 rounded-full' />) : null}

                            </p>
                        )}

                    </div>
                    <div type="Submit" className='w-full'>
                        <button disabled={!editing || !isEdited} className=' w-full rounded py-1 bg-yellow-600 text-white text-2xl font-semibold hover:bg-yellow-500 hover:text-black transition-all ease-in-out duration-300 '>Save Changes</button>
                    </div>

                    <div className=' flex items-center w-full justify-center'>

                        <Link to="/user/profile" className=' flex items-center w-full justify-center gap-1 '>
                            <AiOutlineArrowLeft className='  text-3xl hover:bg-black transition-all ease-in-out duration-300 rounded-full' />
                            <p className='text-white text-2xl font-semibold hover:underline transition-all ease-in-out duration-300'>Go back to profile</p>
                        </Link>
                    </div>
                </form>
            </div>
            <button className="btn" onClick={() => document.getElementById('my_modal_4').showModal()}>open modal</button> */}

            <div className=' min-h-[90vh] flex justify-center items-center flex-col w-full'>
                {/* You can open the modal using document.getElementById('ID').showModal() method */}
             
                <dialog id="my_modal_4" className="modal w-full">
                    <form
                    onSubmit={onFormSubmit}
                    noValidate
                    className=' flex items-center content-center  rounded-sm h-[22rem] shadow-[0_0_10px_black] w-7/12 '
                >
                    {/* <h1 className=' text-2xl font-semibold text-center text-white py-1'>Edit Profile</h1> */}

                    <div className=' w-[40%] bg-blue-200 h-full flex flex-col gap-5 items-center justify-center'>
                    <div className=' relative'>
                        <label htmlFor="avatar" className=' cursor-pointer '>
                            {userInput.ImgPreview ? (<img src={userInput?.ImgPreview} alt="" className='  w-32 h-32 rounded-full m-auto' />) : (
                                <img src={userInput?.avatar} alt="" className='  w-44 h-44 rounded-full m-auto' />

                            )}
                            <CiEdit className=' absolute left-24 bg-black bottom-0 text-3xl hover:bg-black  rounded-full  transition-all ease-in-out duration-300' />

                        </label>
                        <input accept=".jpg, .jpeg, .svg, .png" type="file" hidden id='avatar' onChange={handleImgUpload} />
                    </div>
                      <div className=' flex flex-col justify-center items-center w-full'>
                      <h2 className=' text-black capitalize text-xl font-semibold'>{userInput.fullName}</h2>
                      <p className=' text-black'>({data.role})</p>
                      </div>
                    </div>
                   
                   <div className=' w-[60%] bg-gray-300 flex flex-col justify-center items-start h-full px-14 space-y-7'>
                   <div className=' w-full flex justify-start gap-2 flex-col items-start px-auto'>
                        <label htmlFor="title" className=' text-2xl font-semibold text-black'>Full name :
                        </label>


                        {editing ? (<input type="text" value={userInput.fullName} name='fullName' onChange={handleInputChange} className=' w-full border-black border-2 px-4 rounded bg-transparent text-xl text-black font-semibold capitalize py-1' />) : (
                            <p className=' w-full rounded bg-transparent border-2 px-2 border-black  text-xl  text-black font-semibold capitalize relative '>{userInput.fullName}
                                {!editing ? (<CiEdit onClick={() => setEditing(true)} className=' absolute left-80 bottom-0.5 border border-black text-2xl transition-all ease-in-out duration-300 rounded-full' />) : null}

                            </p>
                        )}

                    </div>

                    <div type="Submit" className='w-full'>
                        <button disabled={!editing || !isEdited} className=' w-full rounded py-1 bg-yellow-600 text-white text-2xl font-semibold hover:bg-yellow-500 hover:text-black transition-all ease-in-out duration-300 '>Save Changes</button>
                    </div>

                    <div className=' relative flex items-center w-full justify-start'>

                        <Link to="/user/profile" className=' flex items-center w-full justify-start gap-2 '>
                            <AiOutlineArrowLeft className='  cursor-pointer text-3xl hover:bg-black transition-all ease-in-out duration-300 rounded-full' />
                            <p className='text-red-400 text-xl font-semibold hover:underline transition-all ease-in-out duration-300 cursor-pointer'>Go back to profile</p>
                        </Link>
                        <div className="modal-action  px-4 absolute bottom-0 right-5 bg-yellow-400 rounded-lg ">
                           
                        </div>
                    </div>
                   </div>

                        
                    </form>
                </dialog>
            </div>
        </HomeLayout>
    )
}

export default EditProfile
