import React, { useEffect } from 'react'
import HomeLayout from '../../components/HomeLayout'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { cancelSubscription } from '../../../Redux/Slices/PaymentsSlice';
import { getUserData } from '../../../Redux/Slices/Authslice';
import toast from 'react-hot-toast';


function Profile() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    let userData = useSelector(state => state?.authstate?.data)
    console.log(userData);

    const handleCancelSubscription = async () => {
        toast.loading('Initiating cancellation')
     await  dispatch(cancelSubscription(userData._id))
      
        const response = await dispatch(getUserData(userData._id))
        console.log(response);
        
        toast.dismiss()
        toast.success('subscription cancelled successfully')
        if (response?.pyaload?.success) {
            
            navigate('/user/profile')
        }

    }

    const load = async () => {
        console.log('logged');
        
      const res =  await dispatch(getUserData(userData._id));
      console.log(res.pyaload);

    }

    useEffect(() => {
          load()
    }, [])
    return (
        <HomeLayout>
            <div className=' min-h-[90vh] flex flex-col justify-center items-center'>
                <div className=' flex flex-col my-10 gap-4 rounded-lg text-white w-96 p-4 shadow-[0_0_10px_black]'>
                    <img src={userData?.avatar?.secureUrl}
                        className=' rounded-full w-40 m-auto border-black'
                        alt="" />
                    <h3 className=' text-center capitalize text-xl font-semibold tracking-wide'>
                        <u> {userData?.fullName}

                        </u>
                    </h3>

                    <div className=' grid grid-rows-3'>
                        <div className=' flex justify-between'>  <p className=' w-[30%]'>Email</p> <span>:</span> <p className=' w-[60%] text-start'>{userData?.email}</p></div>
                        <div className=' flex justify-between'>  <p className=' w-[30%]'>Role</p> <span>:</span> <p className='  w-[60%] text-start'> {userData?.role}</p></div>
                     {userData.role === "USER"?(
                        <div className=' flex justify-between'>  <p className=' w-[30%]'>Subscription:</p> <span>:</span> <p className='  w-[60%] text-start'> {userData?.subscription.status}</p></div>

                     ):null}
                    </div>

                    <div className=' flex items-center justify-between gap-2'>
                        <Link to="/changepassword"
                            className=" bg-yellow-600 w-1/2 py-2 px-2 text-white text-lg font-bold hover:bg-yellow-500 transition-all ease-in-out duration-200 hover:text-black"
                        >
                            <button>Change Password</button>
                        </Link>
                        <Link to="/user/editprofile"
                            className=" bg-yellow-600 w-1/2 py-2 px-2 text-white text-lg font-bold hover:bg-yellow-500 transition-all ease-in-out duration-300 text-center hover:text-black"
                        >
                            <button>Edit profile</button>
                        </Link>

                    </div>
                    <div>
                        {userData?.subscription.status === "Active" ? (
                            <button onClick={() => handleCancelSubscription()} className=' bg-red-600 w-full font-bold py-2 text-xl hover:bg-red-400 transition-all ease-in-out duration-300'>Cancel subscription</button>
                        ) : null}
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default Profile
