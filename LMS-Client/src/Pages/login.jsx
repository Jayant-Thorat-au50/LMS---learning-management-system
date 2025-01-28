import React, { useState } from 'react'
import HomeLayout from '../components/HomeLayout';
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { loginNow } from '../../Redux/Slices/Authslice';


function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.authstate)
    console.log(auth);

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    })

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

            navigate(`/`)
            setLoginData({
                email: "",
                password: "",
            })
        }

    }



    return (
        <HomeLayout>

            <div className=' w-full h-screen flex justify-center items-center'>
                <form action="" onSubmit={login} encType='multipart/form-data' noValidate className='shadow-[0_0_10px_black] w-96 flex  flex-col gap-2 items-center'>
                    <h1 className=' text-center capitalize font-bold text-3xl my-2 text-yellow-400'>registration page</h1>

                    <div className=' flex flex-col items-start w-full px-10 space-y-2'>
                        <label htmlFor="email" className=' font-semibold text-white text-xl'>Email</label>
                        <input type="email" id='email' placeholder="Enter your email...." onChange={handleUserInput} value={loginData.email} className='px-5 py-1 bg-transparent border w-full' required name='email' />
                    </div>
                    <div className=' flex flex-col items-start w-full px-10 space-y-2'>
                        <label htmlFor="password" className=' font-semibold  text-white text-xl' >Password</label>
                        <input type="password" placeholder="Enter your password...." onChange={handleUserInput} value={loginData.password} id='password' className='border bg-transparent px-5 text-white py-1 w-full borderbg-transparent' required name='password' />
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

            </div>

        </HomeLayout>
    )
}

export default Login
