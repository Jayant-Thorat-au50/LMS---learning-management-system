import React, { useState } from 'react'
import { BsPersonCircle } from "react-icons/bs";
import HomeLayout from '../components/HomeLayout';
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../Redux/Slices/Authslice';
import { isEmail, isPassword } from '../Helpers/regexMatcher.js';

function SignUp() {


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [previewImg, setPreviewImg] = useState('')
    const [signUpData, setSignUpData] = useState({
        fullName: "",
        email: "",
        password: "",
        avatar: ""
    })

    const getImg = (e) => {
        e.preventDefault()
        const uploadedImg = e.target.files[0]
        console.log(uploadedImg);
        if (uploadedImg) {

            setSignUpData({
                ...signUpData,
                avatar: uploadedImg
            })
            const fileReader = new FileReader();

            fileReader.readAsDataURL(uploadedImg);
            fileReader.addEventListener('load', function () {
                setPreviewImg(this.result)
            })
        }
    }
    const handleUserInput = (e) => {
        const { name, value } = e.target;
        setSignUpData({
            ...signUpData,
            [name]: value
        })
    }

    const createAccount = async (e) => {

        e.preventDefault()

        if (!signUpData.fullName || !signUpData.email || !signUpData.password) {
            toast.error('every field is required')
            return
        }
        if (signUpData.fullName.length < 5) {
            toast.error(' name must at least more than five characters')
            return;
        }
        if (!isEmail(signUpData.email)) {
            toast.error('invalid email id')
            return;
        }
        if (!isPassword(signUpData.password)) {
            toast.error('password must be 6 to 16 char long')
            return;
        }

        const formData = new FormData();
        formData.append("fullName", signUpData.fullName)
        formData.append("Avatar", signUpData.avatar)
        formData.append("email", signUpData.email)
        formData.append("password", signUpData.password)

        

        const response = await dispatch(register(formData));


        if (response?.payload?.success) {
            navigate(`/`)
            setSignUpData({
                fullName: "",
                email: "",
                password: "",
                avatar: ""
            })

            setSignUpData({ avatar: "" })
        }

    }



    return (
        <HomeLayout>

            <div className=' w-full h-screen flex justify-center items-center'>
                <form action="" onSubmit={createAccount} encType='multipart/form-data' noValidate className='shadow-[0_0_10px_black]  w-96 flex  flex-col gap-2 items-center'>
                    <h1 className=' text-center capitalize font-bold text-3xl my-2 text-yellow-400'>registration page</h1>

                    <div className=' flex justify-center items-center flex-col'>
                        <label htmlFor="Avatar" className=' cursor-pointer'>
                            {previewImg ? (<img src={previewImg} alt="" className='w-24 h-24 rounded-full m-auto' />) : (<BsPersonCircle
                                className=' w-24 h-24 rounded-full m-auto'
                            />)}

                        </label>
                        <input type="file" id='Avatar' hidden required name='Avatar' onChange={getImg} />
                    </div>

                    <div className=' flex flex-col items-start w-full px-10 space-y-2'>
                        <label htmlFor="fullName" className=' font-semibold text-yellow-500 text-xl'>Full Name</label>
                        <input type="text" id='fullName' className='border px-5 text-white py-1 bg-transparent w-full' placeholder="Enter your name...." required name='fullName' onChange={handleUserInput} value={signUpData.fullName} />
                    </div>
                    <div className=' flex flex-col items-start w-full px-10 space-y-2'>
                        <label htmlFor="email" className=' font-semibold  text-yellow-500 text-xl'>Email</label>
                        <input type="email" id='email' placeholder="Enter your email...." onChange={handleUserInput} value={signUpData.email} className='px-5 py-1 bg-transparent border w-full' required name='email' />
                    </div>
                    <div className=' flex flex-col items-start w-full px-10 space-y-2'>
                        <label htmlFor="password" className=' font-semibold  text-yellow-500 text-xl' >Password</label>
                        <input type="password" placeholder="Enter your password...." onChange={handleUserInput} value={signUpData.password} id='password' className='border bg-transparent px-5 text-white py-1 w-full borderbg-transparent' required name='password' />
                    </div>

                    <div className=' px-10  w-full flex justify-center items-center mt-2 mb-0'>
                        <button type='submit' className=' bg-yellow-500 w-full font-bold text-2xl py-1 rounded text-black hover:bg-yellow-800'>Create Account</button>
                    </div>


                    <div className='mb-3'>
                        <p className='text-lg text-white bg-transparent'>Already have an acc? <span onClick={() => navigate('/login')} className=' text-blue-500' >login</span></p>
                    </div>


                </form>

            </div>

        </HomeLayout>
    )
}

export default SignUp
