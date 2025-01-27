import React, { useState } from 'react'
import HomeLayout from '../../components/HomeLayout'
import { useDispatch, useSelector } from 'react-redux';
import { BsPersonCircle } from 'react-icons/bs';
import { CiEdit } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { userUpdate } from '../../../Redux/Slices/Authslice';

function EditProfile() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    let data = useSelector(state => state?.authstate?.data);
    const [editing, setEditing] = useState(false)
    const [isEdited, setIsEdited] = useState(false)

    console.log(isEdited);
    console.log(editing);



    const [userInput, setUserInput] = useState({
        fullName: data?.fullName,
        avatar: data?.avatar?.secureUrl,
        userId: data?._id,
        ImgPreview: ""

    });

    

    console.log(userInput);

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

    const onFormSubmit = async (e) => {
        e.preventDefault();

        if (userInput.fullName && userInput.fullName.length < 5) {
            toast.error('name cannot be of less than 5 characters')
            return
        }
        



        const formData = new FormData()
        formData.append("fullName", userInput.fullName)
        formData.append("avatar", userInput.avatar)

        const response = await dispatch(userUpdate([userInput.userId, formData]));

        if (response?.payload?.success) {
            navigate('/user/profile')

        }

        if(response?.payload?.success){
            console.log('state updated successfully');
        }

    }
    return (
        <HomeLayout>
            <div className=' flex justify-center items-center min-h-[100vh] w-full '>
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
        </HomeLayout>
    )
}

export default EditProfile
