import React, { useState } from 'react'
import HomeLayout from '../../components/HomeLayout'
import { changePassword } from '../../../Redux/Slices/Authslice';
import { isPassword } from '../../Helpers/regexMatcher';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaEye , FaEyeSlash} from "react-icons/fa";



function ChangePassword() {

    const {data} = useSelector(state => state?.authstate)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const [userInput, setUserInput] = useState({
        oldPassword:"",
        newPassword:""
    })

    const [showOldPassword, setOldShowPassword] = useState(false)
    const [showNewPassword, setNewShowPassword] = useState(false)

    const handleUserInput = (e) => {
        const {name, value} = e.target;

        setUserInput({
            ...userInput,
            [name]:value
        })
    }

    const ResetPassword = async (e) => {

        e.preventDefault();

        if (!userInput.oldPassword || !userInput.newPassword) {
            return toast.error("All fields are mandatory")
        }

        if (!isPassword(userInput.newPassword)) {
            return toast.error('password must be 6 to 16 characters long')
        }

        const response = await dispatch(changePassword([data._id, userInput]))
        console.log(response);

        if (response?.payload?.success) {
            toast.success("password reseted successfully")
            navigate('/user/profile')
        }
    }

    return (
        <HomeLayout>
                        <div className=' w-full h-screen flex justify-center items-center'>

<form action="" onSubmit={ResetPassword} encType='multipart/form-data' noValidate className='shadow-[0_0_10px_black] w-96 flex  flex-col gap-2 items-center'>
    <h1 className=' text-center capitalize font-bold text-3xl my-2 text-yellow-400'>change password</h1>

    <div className=' flex flex-col items-start w-full px-10 space-y-2 relative'>
        <label htmlFor="oldPassword" className=' font-semibold text-white text-xl'>current passowrd</label>
        <input type={showOldPassword?'text' : 'password'} id='oldPassword' placeholder="Enter your current password...." onChange={handleUserInput} value={userInput.currentPassword} className=' text-white px-5 py-2 bg-transparent border w-full' required name='oldPassword' />
        {
            showOldPassword?(
                <FaEye className='absolute right-11 top-8 p-2 rounded-sm hover:bg-black transition-all ease-in-out duration-300 text-4xl ' onClick={() => setOldShowPassword(!showOldPassword)}/>
            ):(
                <FaEyeSlash className=' absolute right-11 top-8 p-2 rounded-sm hover:bg-black transition-all ease-in-out duration-300 text-4xl' onClick={() => setOldShowPassword(!showOldPassword)}/>
            )
        }
    </div>
    <div className=' flex flex-col items-start w-full px-10 space-y-2 relative'>
        <label htmlFor="newPassword" className=' font-semibold text-white text-xl'>new passowrd</label>
        <input  type={showNewPassword?'text' : 'password'} id='newPassword' placeholder="Enter your new password...." onChange={handleUserInput} value={userInput.newPassword} className=' text-white px-5 py-2 bg-transparent border w-full' required name='newPassword' />
        {
            showNewPassword?(
                <FaEye className='absolute right-11 top-8 p-2 rounded-sm hover:bg-black transition-all ease-in-out duration-300 text-4xl ' onClick={() => setNewShowPassword(!showNewPassword)}/>
            ):(
                <FaEyeSlash className=' absolute right-11 top-8 p-2 rounded-sm hover:bg-black transition-all ease-in-out duration-300 text-4xl' onClick={() => setNewShowPassword(!showNewPassword)}/>
            )
        }
    </div>


    <div className=' px-10  w-full flex justify-center items-center my-1'>
        <button type='submit' className=' bg-yellow-500 w-full font-bold text-2xl py-1 rounded text-black hover:bg-yellow-800'>change password</button>
    </div>


</form>

</div>
        </HomeLayout>
    )
}

export default ChangePassword
