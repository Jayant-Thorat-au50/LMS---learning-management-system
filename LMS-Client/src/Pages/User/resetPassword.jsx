import React from 'react'
import HomeLayout from '../../components/HomeLayout'
import { useParams } from 'react-router-dom'

function ResetPassword() {

const {resetToken} = useParams()

    console.log(resetToken);
    

    return (
           <HomeLayout>
            <div className=' min-h-[90vh] flex justify-center items-center'>
                 <div className=' flex flex-col items-start justify-center w-[22rem] shadow-[0_0_10px_black h-48]'>

                 </div>
            </div>
           </HomeLayout>
    )
}

export default ResetPassword
