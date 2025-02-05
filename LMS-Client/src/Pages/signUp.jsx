import React, { useState } from 'react'
import { BsPersonCircle } from "react-icons/bs";
import HomeLayout from '../components/HomeLayout';
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../Redux/Slices/Authslice';
import { isEmail, isPassword } from '../Helpers/regexMatcher.js';
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { FcAlarmClock } from "react-icons/fc";

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

    const [showPassword, setShowPassword] = useState(false)


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

        let finalFullName;

        if (signUpData.fullName) {
            console.log(signUpData);

            const names = signUpData.fullName.split(" ")

            names.forEach((n) => n.charAt(0).toUpperCase())
            finalFullName = names.toString().replace(',', ' ')
        }

        const formData = new FormData();
        formData.append("fullName", finalFullName)
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

            <div className=' w-full h-[90vh] flex  bg-[#F2F2FD] justify-center items-center'>
                <div className=' w-full grid grid-cols-2 px-20'>
                    <form action="" onSubmit={createAccount} encType='multipart/form-data' noValidate className='shadow-[0_0_7px_gray
                    ] bg-white w-96 flex flex-col gap-2 items-start mx-auto'>
                        <h1 className=' text-center px-10 capitalize font-bold text-xl my-2 text-blue-500'>Begin your journy with us!</h1>

                        <div className=' flex justify-center items-center w-full flex-col px-10'>
                            <label htmlFor="Avatar" className=' cursor-pointer'>
                                {previewImg ? (<img src={previewImg} alt="" className='w-20 h-20 border-2 border-gray-300  m-auto rounded-full' />) : (<BsPersonCircle
                                    className=' w-16 h-16 text-blue-300 rounded-full m-auto'
                                />)}
                                <p className=' text-black bg-[#F3F4F6] px-2 mt-2'>Upload Avatar</p>
                            </label>
                            <input type="file" id='Avatar' hidden required name='Avatar' onChange={getImg} />
                        </div>

                        <div className=' flex flex-col  items-start w-full px-10 space-y-0'>
                            <label htmlFor="fullName" className=' font-semibold text-black text-lg'>Full Name</label>
                            <input type="text" id='fullName' className=' px-5 rounded-md text-black font-semibold py-1 bg-[#F3F4F6] w-full border border-black' placeholder="Enter your name...." required name='fullName' onChange={handleUserInput} value={signUpData.fullName} />
                        </div>
                        <div className=' flex flex-col items-start w-full px-10 space-y-0'>
                            <label htmlFor="email" className=' font-semibold  text-black text-lg'>Email</label>
                            <input type="email" id='email' placeholder="Enter your email...." onChange={handleUserInput} value={signUpData.email} className='px-5 font-semibold py-1 bg-[#F3F4F6] rounded-md border border-black w-full text-black ' required name='email' />
                        </div>
                        <div className=' flex flex-col items-start w-full px-10 space-y-0 relative '>
                            <label htmlFor="password" className=' font-semibold  text-black text-xl' >Password</label>
                            <input type={showPassword ? 'text' : 'password'} placeholder="Enter your password...." onChange={handleUserInput} value={signUpData.password} id='password' className='font-semibold bg-[#F3F4F6] px-5 text-black border border-black py-1 w-full ' required name='password' />

                            {
                                showPassword ? (
                                    <FaEye className=' absolute top-7 right-11 text-4xl p-2 hover:bg-black transition-all ease-in-out duration-300  rounded-full' onClick={() => setShowPassword(!showPassword)} />
                                ) : (
                                    <FaEyeSlash className=' absolute top-7 right-11 text-4xl p-2 hover:bg-black transition-all ease-in-out duration-300  rounded-full' onClick={() => setShowPassword(!showPassword)} />
                                )
                            }
                        </div>

                        <div className=' px-10 my-3 w-full flex justify-center items-center mt-2 mb-0'>
                            <button type='submit' className=' bg-blue-500 w-full font-semibold text-xl py-1 rounded text-black hover:bg-blue-900'>Create Account</button>
                        </div>


                        <div className='mb-3 text-center mx-auto'>
                            <p className='text-lg text-black text-center'>Already have an acc? <span onClick={() => navigate('/login')} className=' text-blue-500 font-bold' >login</span></p>
                        </div>


                    </form>

                    <div className=' w-3/4 flex flex-col items-start justify-center gap-10 '>
                        <h1 className=' text-3xl font-semibold text-black'>come join us</h1>
                        <div className=' w-full flex flex-col justify-center items-start gap-5'>
                            <div className=' text-black text-xl gap-7 flex justify-between items-center'>
                                <i className="ri-search-2-fill text-blue-400 text-4xl"></i>
                                <p>Explore articles, tutorials, and guides on diverse subjects</p>
                            </div>
                            <div className='  text-black text-xl gap-7 flex justify-between items-center'>
                                <FcAlarmClock className=' text-6xl' />
                                <p className=' ms-1'>Learn at your own pace and access educational resources anytime</p>
                            </div>
                            <div className='  text-black text-xl gap-7 flex justify-between items-center'>
                                <i className='ri-global-line text-4xl text-red-500'></i>                        <p>Engage with a community of learners and share insights</p>
                            </div>
                        </div>
                    </div>


                </div>


            </div>

        </HomeLayout>
    )
}

export default SignUp
