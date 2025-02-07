import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRazorpayApiKey, purchaseSubcription, verifySubscription } from '../../../Redux/Slices/PaymentsSlice'
import toast from 'react-hot-toast'
import HomeLayout from '../../components/HomeLayout'
import { BiRupee } from 'react-icons/bi'


import { useNavigate, } from 'react-router-dom'
import { getUserData } from '../../../Redux/Slices/Authslice'


function Cheackout() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userData = useSelector(state => state?.authstate?.data)
    const razorpay_key = useSelector(state => state?.paymentstate?.api_key);
    const subscription_id = useSelector(state => state?.paymentstate?.subscription_id);

    const paymentDetails = {
        razorpay_payment_id: "",
        razorpay_subscription_id: "",
        razorpay_signature: "",
    }

    const load = async () => {
        await dispatch(getRazorpayApiKey());
        await dispatch(purchaseSubcription(userData._id))
    }

    const handleSubscription = async (e) => {
        e.preventDefault();
        if (!razorpay_key || !subscription_id) {
            return toast.error('something went wrong');
        };

        const options = {
            key: razorpay_key,
            subscription_id: subscription_id,
            name: 'lmsjayant',
            description: "lms subscription",
            theme: {
                color: "#6699ff"
            },
            prefill: {
                email: userData.email,
                name: userData.fullName
            },
            handler: async function (response) {

                paymentDetails.razorpay_payment_id = response.razorpay_payment_id,
                    paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id,
                    paymentDetails.razorpay_signature = response.razorpay_signature,
                    toast.success("payment successfull");
                const response1 = await dispatch(verifySubscription([userData._id, paymentDetails]))
                const response2 = await dispatch(getUserData(userData._id))
                console.log(response2);
                response1?.payload?.success ? navigate("/payment/success") : navigate("payment/failure")
            }
        }
        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
    }

    useEffect(() => {
        load();
    }, [])
    return (
        <HomeLayout>
            <form
                onSubmit={handleSubscription}
                noValidate
                className=' min-h-[90vh] flex justify-center items-center text-white'>
                <div className=' w-80 h-[26rem] flex flex-col justify-center items-center shadow-[0_0_10px_black] rounded-lg relative'>

                    <h1 className=' w-full text-center bg-yellow-500 text-white text-2xl font-bold py-4 absolute top-0 rounded-tl-lg rounded-tr-lg'>Subscription bundle</h1>

                    <div className='  text-start px-4 mt-2 w-full'>
                        <p className='text-[17px] w-full flex flex-col justify-center items-center text-black'>
                            With this purchase, you will get access to all of our platform's courses for a full year. {" "} <br />
                            <span className='  mt-5 text-black text-2xl font-bold w-full text-center'>A period of one year.</span>
                            <br />
                            All of the courses, both new and old, will be accessible.
                        </p>

                        <p className=' flex items-center justify-center text-xl font-bold text-yellow-500'>
                            <BiRupee className=' text-2xl' /> <span>Price : 499 </span> &nbsp;only
                        </p>

                        <div className=' text-gray-500 flex flex-col items-center justify-center w-full '>
                            <p>100% refund on cancellation</p>
                            <p>*Terms and conditions apply*</p>
                        </div>

                        <button type='Submit' className=' w-full bg-yellow-500 absolute rounded-bl-lg rounded-br-lg py-2 text-2xl bottom-0 left-0 font-bold text-white hover:bg-yellow-600 hover:text-black transition-all ease-in-out duration-300'>Buy now</button>
                    </div>


                </div>

            </form>
        </HomeLayout>
    )
}

export default Cheackout
