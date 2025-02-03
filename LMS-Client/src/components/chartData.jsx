import React from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import { FaUsers } from 'react-icons/fa'
import { FcSalesPerformance } from 'react-icons/fc'
import { useSelector } from 'react-redux'
import {ArcElement, BarElement, CategoryScale, Chart as ChartJs, Legend, LinearScale, Title, Tooltip} from 'chart.js'
import { useNavigate } from 'react-router-dom'

ChartJs.register(ArcElement, BarElement, Tooltip, Legend, Title, CategoryScale, LinearScale)

function ChartData() {

    const navigate = useNavigate()

    const { allUserCount, subscribedUserCount } = useSelector(state => state?.stat)
    const { allPayments, finalMonth, monthlySalesRecord } = useSelector(state => state?.paymentstate)
    const {role} = useSelector(state => state?.authstate)

    const userData = {
        labels: ['Registered users', 'Enrolled users'],
        fontColor: 'white',
        datasets: [{
            label: "User details",
            data: [allUserCount, subscribedUserCount],
            backgroundColor: ['yellow', 'green'],
            borderWidth: 2
        }]
    }

    const salesdata = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        fontColor: 'white',
        datasets: [{
            label: "Sales / Month",
            data: finalMonth,
            backgroundColor: ["rgb(255, 99, 132)"],
            borderColor: ["White"],
            borderWidth: 1
        }]
    }

        return (
         <div
         className=' grid grid-cols-2 gap-3 '>
                            {/* left part of the stats dashboard */}
                            <div className=' flex flex-col justify-center  bg-gray-400 items-center   gap-5 rounded-md'>
                                <div className=' h-64 w-64'>
                                    <Pie data={userData} />
                                </div>
                                <div className=' grid grid-cols-2 gap-2'>

                                {role === "SUPER ADMIN"?(
                                   <div
                                   onClick={() => navigate('/user/allUsers')}
                                   className=' flex items-center justify-center gap-5  px-1 rounded'>
                                       <div className=' flex justify-center flex-col items-center text-black text-xl'>
                                           <h3>Registered Users</h3>
                                           <p className='text-black text-3xl'>{allUserCount}</p>
                                       </div>
                                       <FaUsers className=' text-5xl text-white' />
                                   </div>
                                ):(
                                    <div
                                    className=' flex items-center justify-center gap-5  px-1 rounded'>
                                        <div className=' flex justify-center flex-col items-center text-white text-2xl'>
                                            <h3>Registered Users</h3>
                                            <p className='text-black text-3xl'>{allUserCount}</p>
                                        </div>
                                        <FaUsers className=' text-5xl text-white' />
                                    </div>
                                )}

                                    
                                    
                                    <div className=' flex items-center justify-center gap-5  px-1 rounded'>
                                        <div className=' flex justify-center flex-col items-center text-black text-xl'>
                                            <h3>Enrolled Users</h3>
                                            <p className=' text-3xl text-black'>{subscribedUserCount}</p>
                                        </div>
                                        <FaUsers className='text-5xl text-pink-500' />
                                    </div>
                                </div>
                            </div>
        
                            {/* right part of the stats dashboard */}
        
                            <div className=' flex flex-col items-center bg-black gap-5 p-5 shadow-[0_0_7px_black] rounded-md'>
                                <div className=' h-80 w-full relative '>
                                    <Bar data={salesdata} className=' h-full text-white' />
                                </div>
                                <div className=' grid grid-cols-2 gap-3 w-full '>
                                    <div className=' grid grid-cols-2 '>
                                        <div className=' flex  items-center text-2xl text-white flex-col'>
                                            <h3 className=' text-lg' >Subscription count</h3>
                                            <p className=' text-yellow-500'>{allPayments.count}</p>
                                        </div>
                                        <div className='  flex w-full justify-center'>
                                            <FcSalesPerformance className=' text-4xl' />
                                        </div>
                                    </div>
                                    <div className=' w-full grid grid-cols-2 bg-black  '>
                                        <div className=' flex w-full gap-8 items-center text-2xl text-white flex-col'>
                                            <h3 className=' text-lg'>Total Revenue</h3>
                                            <p className=' text-yellow-500'>{allPayments.count * 499}</p>
                                        </div>
                                        <div className=' flex justify-center'>
                                            <FcSalesPerformance className=' text-4xl' />
                                        </div>
                                    </div>
                                </div>
                            </div>
        
                        </div>
    )
}

export default ChartData
