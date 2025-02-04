import React, { useState } from 'react'
import HomeLayout from '../components/HomeLayout';
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { loginNow } from '../../Redux/Slices/Authslice';
import {FaEye, FaEyeSlash} from 'react-icons/fa'
import loginPageImg from '../assets/pexels-diimejii-2574616.jpg'
import loginPageImg2 from '../assets/pexels-hiteshchoudhary-879109.jpg'
import loginPageImg3 from '../assets/pexels-george-dolgikh-551816-1326947.jpg'


function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.authstate)
    console.log(auth);

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    })

    const [showPassword, setShowPassword] = useState(false)

    const handleUserInput = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        })
    }




    const login = async (e) => {

        e.preventDefault()

        if (!loginData.email || !loginData.password) {
            toast.error('every field is required')
            return
        }

        if (!loginData.email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            toast.error('invalid email id')
            return;
        }
        if (!loginData.password.match(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/)) {
            toast.error('password must be 6 to 16 char long')
            return;
        }

        const formData = new FormData();
        formData.append("email", loginData.email)
        formData.append("password", loginData.password)


        const response = await dispatch(loginNow(loginData));
        console.log(response);

        if (response?.payload?.success) {
            console.log(response?.payload?.success);

            navigate('/')
            setLoginData({
                email: "",
                password: "",
            })
        }

    }

    return (
        <HomeLayout>
{/* 
            <div className=' w-full border-2 border-black h-screen flex justify-center items-center'>
                <form action="" onSubmit={login} encType='multipart/form-data' noValidate className='shadow-[0_0_10px_black] w-96 flex  flex-col gap-2 items-center'>
                    <h1 className=' text-center capitalize font-bold text-3xl my-2 text-yellow-400'>registration page</h1>

                    <div className=' flex flex-col items-start w-full px-10 space-y-2'>
                        <label htmlFor="email" className=' font-semibold text-white text-xl'>Email</label>
                        <input type="email" id='email' placeholder="Enter your email...." onChange={handleUserInput} value={loginData.email} className='px-5 py-2 bg-transparent border w-full' required name='email' />
                    </div>
                    <div className=' flex flex-col items-start w-full px-10 relative space-y-2'>
                        <label htmlFor="password" className=' font-semibold  text-white text-xl' >Password</label>
                        <input type={showPassword?'text':"password"} placeholder="Enter your password...." onChange={handleUserInput} value={loginData.password} id='password' className='border bg-transparent px-5 py-2 text-white w-full borderbg-transparent' required name='password' />
                        {
                            showPassword?(
                               <FaEye className='absolute bottom-1 right-11 text-4xl p-2 hover:bg-black transition-all ease-in-out duration-300  rounded-sm' onClick={() => setShowPassword(!showPassword)}/>
                            ):(
                                <FaEyeSlash className=' absolute bottom-1 right-11 text-4xl p-2 hover:bg-black transition-all ease-in-out duration-300  rounded-sm' onClick={() => setShowPassword(!showPassword)}/>
                            )
                        }
                    </div>

                    <div className=' px-10  w-full flex justify-center items-center my-1'>
                        <button type='submit' className=' bg-yellow-500 w-full font-bold text-2xl py-1 rounded text-black hover:bg-yellow-800'>login</button>
                    </div>

                    <div className='my-0'>
                        <p className='text-lg text-blue-500 bg-transparent'>forget your password?  <span onClick={() => navigate('/forgotPassword')} className=' text-white' ><u>reset now</u></span></p>
                    </div>
                    <div className='my-2'>
                        <p className='text-lg text-white bg-transparent'>Do not have an acc? <span onClick={() => navigate('/signUp')} className=' text-yellow-500' >register</span></p>
                    </div>


                </form>

            </div> */}

            <div className=' w-full flex justify-center items-center h-[88vh] px-10'>

            <div className=' w-1/2 h-full '>
               <div className=' flex relative w-full ms-14 my-9'>
               <div className=' absolute top-1 left-5'>
                    <img src={loginPageImg} alt="" className=' rounded-tr-3xl h-52 w-48' />
                </div>
               <div className=' absolute top-16 right-40'>
                    <img src={loginPageImg2} alt="" className=' rounded-2xl h-40 w-68' />
                </div>
                  <div className=' absolute top-60 left-5'>
                    <img src={loginPageImg3} alt="" className=' h-52 w-72 rounded-r-2xl' />
                </div>
               </div>
             </div>

               <div className=' bg-blue-200 w-1/2 h-full flex justify-center items-center  border'>
               <form action="" onSubmit={login}  noValidate className='shadow-[0_0_10px_black] w-[25rem] bg-white  h-fit flex  flex-col gap-3 items-center'>
                    <h1 className=' text-center capitalize font-semibold text-2xl my-2 text-blue-600'>Registration page</h1>

                    <div className=' flex flex-col items-start w-full px-10 space-y-1'>
                        <label htmlFor="email" className=' font-semibold text-black text-xl'>Email</label>
                        <input type="email" id='email' placeholder="Enter your email...." onChange={handleUserInput} value={loginData.email} className='px-5 rounded text-black border-black py-2  border bg-[#F3F4F6] w-full' required name='email' />
                    </div>
                    <div className=' flex flex-col items-start w-full px-10 relative space-y-1'>
                        <label htmlFor="password" className=' font-semibold  text-black text-xl' >Password</label>
                        <input type={showPassword?'text':"password"} placeholder="Enter your password...." onChange={handleUserInput} value={loginData.password} id='password' className='border  px-5 py-2 text-black w-full border-black rounded bg-[#F3F4F6] borderbg-transparent' required name='password' />
                        {
                            showPassword?(
                               <FaEye className='absolute bottom-1 right-11 text-4xl p-2 hover:bg-black transition-all ease-in-out duration-300  rounded-sm' onClick={() => setShowPassword(!showPassword)}/>
                            ):(
                                <FaEyeSlash className=' absolute bottom-1 right-11 text-4xl p-2 hover:bg-black transition-all ease-in-out duration-300  rounded-sm' onClick={() => setShowPassword(!showPassword)}/>
                            )
                        }
                    </div>

                    <div className=' px-10  w-full flex justify-center items-center my-1'>
                        <button type='submit' className=' bg-blue-400 w-full font-bold text-2xl py-1 rounded text-black hover:bg-blue-300'>login</button>
                    </div>

                    <div>
                        <p className='text-lg text-blue-600 font-semibold'>forget your password?  <span onClick={() => navigate('/forgotPassword')} className=' text-black' ><u>reset now</u></span></p>
                    </div>
                    <div className='my-2'>
                        <p className='text-lg text-black bg-transparent'>Do not have an acc? <span onClick={() => navigate('/signUp')} className=' text-blue-600 font-semibold' >register</span></p>
                    </div>


                </form>

               </div>
              
            </div>

        </HomeLayout>
    )
}

export default Login
