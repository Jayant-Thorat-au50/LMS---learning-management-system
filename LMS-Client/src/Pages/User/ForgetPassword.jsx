import React, { useEffect, useState } from 'react'

import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import HomeLayout from '../../components/HomeLayout';
import { forgetPassword } from '../../../Redux/Slices/Authslice';



function ForgetPassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.authstate)
    console.log(auth);

    const [userInput, setUserInput] = useState({
        email: "",

    })

    const handleUserInput = (e) => {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        })
    }




    const sendLink = async (e) => {

        e.preventDefault()

        if (!userInput.email) {
            toast.error('email is required')
            return
        }

        if (!userInput.email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            toast.error('invalid email id')
            return;
        }

        const response = await dispatch(forgetPassword(userInput));
        console.log(response);

        if (response?.payload?.success) {
            console.log(response?.payload?.success);
            toast.success("an email with password reset link is sent to registered email address")
            navigate(`/`)
            setUserInput({
                email: ""
            })
        }

    }



    return (
        <HomeLayout>

            <div className=' w-full h-[90vh] flex justify-center items-center'>

                <form action="" onSubmit={sendLink} encType='multipart/form-data' noValidate className='shadow-[0_0_10px_black] bg-white w-96 flex  flex-col gap-2 items-center py-5'>
                    <h1 className=' text-center capitalize font-bold text-3xl my-2  text-black'>reset password</h1>

                    <div className=' flex flex-col items-start w-full px-10 space-y-2'>
                        <label htmlFor="email" className=' font-semibold text-black text-xl '>Email</label>
                        <input type="email" id='email' placeholder="Enter your email...." onChange={handleUserInput} value={userInput.email} className=' text-black px-5 py-1 bg-transparent border-2 w-full border-gray-400 rounded-md' required name='email' />
                    </div>
                    <p className='px-10 text-red-500'>please enter the email registered with your account</p>


                    <div className=' px-10  w-full flex justify-center items-center my-1'>
                        <button type='submit' className=' bg-yellow-500 w-full font-bold text-2xl py-1 rounded text-black hover:bg-yellow-800'>reset password</button>
                    </div>


                </form>

            </div>

        </HomeLayout>
    )
}

export default ForgetPassword
