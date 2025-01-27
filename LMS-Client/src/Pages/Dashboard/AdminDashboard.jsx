import React, { useEffect } from 'react'

// component imports
import HomeLayout from '../../components/HomeLayout'

// hooks and lib imports
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {Chart as ChartJs, ArcElement, Tooltip, Legend ,Title, CategoryScale, LinearScale, BarElement} from 'chart.js'
import {Bar, Pie} from 'react-chartjs-2'
import {FaUsers} from 'react-icons/fa'
import {FcSalesPerformance} from 'react-icons/fc'


// thunck imports
import { getAllUserData } from '../../../Redux/Slices/statSlice';
import { getAllpaymentsList } from '../../../Redux/Slices/PaymentsSlice';
import { deleteCourse, getcoursesList } from '../../../Redux/Slices/courseSlice';

ChartJs.register(ArcElement, BarElement, Tooltip, Legend, Title, CategoryScale, LinearScale)


function AdminDashboard() {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { allUserCount, subscribedUserCount } = useSelector(state => state?.stat)
    const { allPayments, finalMonth, monthlySalesRecord } = useSelector(state => state?.paymentstate)
    const {coursesList} = useSelector(state => state?.courseState)


    const loadInfo = async () => {
        const res1 = await dispatch(getAllUserData())
        const res2 = await dispatch(getAllpaymentsList());
        await dispatch(getcoursesList())
    }

    const userData = {
        labels:['Registered users', 'Enrolled users'],
        fontColor:'white',
        datasets:[{
            label:"User details",
            data:[allUserCount, subscribedUserCount],
            backgroundColor:['yellow', 'green'],
            borderWidth:2
        }]
    }

   const salesdata = {
        labels:['Jan','Feb','Mar', 'Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        fontColor:'white',
        datasets:[{
            label:"Sales / Month",
            data:finalMonth,
            backgroundColor:["rgb(255, 99, 132)"],
            borderColor:["White"],
            borderWidth:1
        }]
    }

    const onCourseDelete = async (cid) => {

        if(window.confirm('Aren you sure to delete the course')){
           const response = await dispatch(deleteCourse(cid))
           if(response){
            await(getcoursesList())
           }
        }

    }

    

    console.log(allPayments);
    console.log(finalMonth);
    console.log(allUserCount);
    console.log(subscribedUserCount);
    console.log(monthlySalesRecord);

    useEffect(() => {
        loadInfo()
    }, [])


    return (
        <HomeLayout>
        <div className=' min-h-[90vh] flex flex-col flex-wrap pl-5 pt-5 gap-5'>
              <h1 className=' text-center  text-5xl text-yellow-500 font-semibold'>Admin Dashboard</h1>
               <div className=' grid grid-cols-2 gap-3'>
                {/* left part of the stats dashboard */}
                <div className=' flex flex-col justify-center items-center shadow-[0_0_7px_black] py-3 gap-5 rounded-md'>
                    <div className=' h-80 w-80'>
                    <Pie data={userData}/>
                    </div>
              <div className=' grid grid-cols-2 gap-2'>
              <div className=' flex items-center justify-center gap-5  px-1 rounded'>
                     <div className=' flex justify-center flex-col items-center text-white text-2xl'>
                        <h3>Registered Users</h3>
                        <p className=' text-5xl'>{allUserCount}</p>
                     </div>
                     <FaUsers className=' text-5xl text-white'/>
                </div>
                <div className=' flex items-center justify-center gap-5  px-1 rounded'>
                     <div className=' flex justify-center flex-col items-center text-white text-2xl'>
                        <h3>Enrolled Users</h3>
                        <p className=' text-5xl'>{subscribedUserCount}</p>
                     </div>
                     <FaUsers className='text-5xl text-green-500'/>
                </div>
              </div>
                </div>

                {/* right part of the stats dashboard */}

                <div className=' flex flex-col items-center gap-10 p-5 shadow-[0_0_7px_black] rounded-md'>
                     <div className=' h-80 w-full relative '>
                         <Bar data={salesdata} className=' h-full text-white' />
                     </div>
                       <div className=' grid grid-cols-2 gap-3 w-full'>
                       <div className=' grid grid-cols-2 '>
                        <div className=' flex  items-center text-2xl text-white flex-col'>
                            <h3 >Subscription count</h3>
                            <p className=' text-yellow-500'>{allPayments.count}</p>
                        </div>
                        <div className='  flex w-full justify-center'>
                        <FcSalesPerformance className=' text-7xl'/>
                        </div>
                     </div>
                     <div className=' w-full grid grid-cols-2  '>
                        <div className=' flex w-full gap-8 items-center text-2xl text-white flex-col'>
                            <h3>Total Revenue</h3>
                            <p className=' text-yellow-500'>{allPayments.count * 499}</p>
                        </div>
                        <div className=' flex justify-center'>
                        <FcSalesPerformance className=' text-7xl'/>
                        </div>
                     </div>
                       </div>
                </div>
               </div>
        </div>

        </HomeLayout>
    )

}

export default AdminDashboard
