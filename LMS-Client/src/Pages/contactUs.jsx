import React, { useState } from 'react'
import HomeLayout from '../components/HomeLayout'
import toast from 'react-hot-toast'
import { isEmail } from '../Helpers/regexMatcher.js'

function ContactUs() {

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        message: ""
    })
    const handleUserInput = (event) => {

        const { name, value } = event.target

        setUserData({
            ...userData,
            [name]: value
        })
    }

    const onSubmitForm = (e) => {
        e.preventDefault();

        if (!userData.name || !userData.email || !userData.message) {
            toast.error('Every field is required');
            return
        }

        if (!isEmail(userData.email)) {
            toast.error('invalid email')
            return
        }
        alert('form submitted successfully')
    }

    return (
        <HomeLayout>

            <div className='  h-[90vh] w-45%  grid grid-cols-2 bg-blue-200 '>
                <form action="" noValidate onSubmit={onSubmitForm} className=' mx-auto p-2 px-6 gap-2 bg-white h-[27rem] my-auto rounded-md w-[22rem]  shadow-[0_0_10px_black]'>
                    <h1 className=' font-semibold  text-2xl  text-center text-blue-400 '>Get in touch</h1>

                    <div className=' flex flex-col gap-1'>
                        <label htmlFor="name" className=' text-black text-xl font-semibold'>Name</label>
                        <input type="text" id='name' name='name' className='p-1 bg-[#F3F4F6] border border-black rounded-md' placeholder="Enter your name" value={userData.name} onChange={handleUserInput} />
                    </div>
                    <div className=' flex flex-col gap-1'>
                        <label htmlFor="email" className=' text-black text-xl font-semibold'>email</label>
                        <input type="text" id='email' name='email' className='p-1 bg-[#F3F4F6] border border-black rounded-md'
                            placeholder='Enter your email' value={userData.email} onChange={handleUserInput} />
                    </div>
                    <div className=' flex flex-col gap-1'>
                        <label htmlFor="query" className=' text-black text-2xl'><i>message</i></label>
                        <textarea type="text" id='query' name='message' className=' p-2 h-[25vh] border-black resize-none rounded-md bg-[#F3F4F6] border'
                            placeholder='Enter your message' value={userData.message} onChange={handleUserInput} />
                    </div>

                    <div>
                        <button className=' py-1 my-4 bg-blue-500 text-black font-bold text-xl w-full rounded-sm hover:bg-blue-900 transition-all ease-in-out duration-300 mb-2' type='submit'>Submit form</button>
                    </div>
                </form>

                <div className=' bg-slate-400'>
                    <div className=' bgImg_Contact w-full h-full'>

                    </div>
                </div>
            </div>
         


        </HomeLayout>
    )
}

export default ContactUs
