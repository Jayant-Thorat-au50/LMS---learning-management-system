import React, { useState } from 'react'
import HomeLayout from '../components/HomeLayout'
import toast from 'react-hot-toast'
import {isEmail} from '../Helpers/regexMatcher.js'

function ContactUs() {

    const [userData, setUserData] = useState({
        name:"",
        email:"",
        message:""
    })
    const handleUserInput = (event) => {

        const {name, value} = event.target

        setUserData({
            ...userData,
            [name] : value
        })
    }

    const onSubmitForm = (e) => {
        e.preventDefault();

        if(!userData.name || !userData.email || !userData.message){
           toast.error('Every field is required');
           return
        }

        if(!isEmail(userData.email)){
            toast.error('invalid email')
            return
        }
        alert('form submitted successfully')
    }
    
    return (
      <HomeLayout>

    <div className=' flex flex-col h-[100vh] w-full justify-center items-center '>
        <form action="" noValidate onSubmit={onSubmitForm}  className=' space-y-1 p-2 px-6 rounded-md w-[22rem]  shadow-[0_0_10px_black]'>
            <h1 className=' font-bold text-yellow-500 text-3xl  text-center'>Contact form</h1>

            <div className=' flex flex-col gap-1'>
                <label htmlFor="name" className=' text-white text-xl font-semibold'>name</label>
                <input type="text" id='name' name='name' className='p-1 bg-transparent border rounded-sm' placeholder="Enter your name"  value={userData.name} onChange={handleUserInput} />
            </div>
            <div className=' flex flex-col gap-1'>
                <label htmlFor="email" className=' text-white text-xl font-semibold'>email</label>
                <input type="text" id='email' name='email' className='p-1 bg-transparent border rounded-sm'
                placeholder='Enter your email'  value={userData.email} onChange={handleUserInput}/>
            </div>
            <div className=' flex flex-col gap-1'>
                <label htmlFor="query" className=' text-white text-2xl'><i>message</i></label>
                <textarea type="text" id='query' name='message' className=' p-2 h-[35vh] resize-none rounded-sm bg-transparent border'
                placeholder='Enter your message' value={userData.message} onChange={handleUserInput} />
            </div>

            <div>
                <button className=' py-1 mt-1 bg-yellow-500 text-black font-bold text-xl w-full rounded-sm hover:bg-yellow-700 transition-all ease-in-out duration-300 mb-2' type='submit'>Submit form</button>
            </div>
        </form>
    </div>

      </HomeLayout>
    )
}

export default ContactUs
