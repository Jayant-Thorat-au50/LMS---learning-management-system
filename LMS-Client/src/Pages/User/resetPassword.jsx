import React, { useState } from 'react'
import HomeLayout from '../../components/HomeLayout'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { isPassword } from '../../Helpers/regexMatcher'
import { useDispatch } from 'react-redux'
import { resetPassword } from '../../../Redux/Slices/Authslice'

function ResetPassword() {

    const { resetToken } = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [userInput, setUserInput] = useState({
        newPassword: ""
    })



    console.log(userInput);
    const ResetPassword = async (e) => {

        e.preventDefault();

        if (!userInput.newPassword) {
            return toast.error("new password is required")
        }

        if (!isPassword(userInput.newPassword)) {
            return toast.error('password must be 6 to 16 characters long')
        }

        const response = await dispatch(resetPassword([resetToken, userInput]))
        console.log(response);

        if (response?.payload?.success) {
            toast.success("password reseted successfully")
            navigate('/login')
        }
    }


    return (
        <HomeLayout>
            <div className=' min-h-[90vh] flex justify-center items-center'>
                <form
                    onSubmit={ResetPassword}
                    className=' flex justify-start flex-col items-start px-5 gap-5 py-5  w-[22rem] shadow-[0_0_10px_black]'>

                    <h2 className=' text-3xl self-center text-white font-bold '>Enter new password</h2>
                    <div className='  w-full flex  justify-center items-start flex-col gap-3'>
                        <label htmlFor="" className=' text-yellow-500 text-2xl font-semibold '>New password</label>
                        <input type="text" className=' bg-transparent  border px-2 py-1 rounded-sm w-full' placeholder="Enter your new password" value={userInput.newPassword} onChange={(e) => setUserInput({ newPassword: e.target.value })} />
                    </div>

                    <button
                        type='Submit' className=' bg-yellow-500 rounded-sm text-2xl text-black w-full font-semibold py-1'>
                        Reset
                    </button>
                </form>
            </div>
        </HomeLayout>
    )
}

export default ResetPassword
