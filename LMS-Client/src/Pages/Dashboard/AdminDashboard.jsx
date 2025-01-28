import React, { useEffect } from 'react'

// component imports
import HomeLayout from '../../components/HomeLayout'
import { FaPlus } from 'react-icons/fa'


// hooks and lib imports
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJs, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement } from 'chart.js'
import { Bar, Pie } from 'react-chartjs-2'
import { FaUsers, FaEdit } from 'react-icons/fa'
import { FcSalesPerformance } from 'react-icons/fc'


// thunck imports
import { getAllUserData } from '../../../Redux/Slices/statSlice';
import { getAllpaymentsList } from '../../../Redux/Slices/PaymentsSlice';
import { deleteCourse, getcoursesList } from '../../../Redux/Slices/courseSlice';
import { BsCollectionPlayFill, BsPlayFill, BsTrash } from 'react-icons/bs';

ChartJs.register(ArcElement, BarElement, Tooltip, Legend, Title, CategoryScale, LinearScale)


function AdminDashboard() {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { allUserCount, subscribedUserCount } = useSelector(state => state?.stat)
    const { allPayments, finalMonth, monthlySalesRecord } = useSelector(state => state?.paymentstate)
    let { coursesList } = useSelector(state => state?.courseState)
    let { data } = useSelector(state => state?.authstate)

    coursesList = coursesList.filter(course => course.createdby === data.fullName )
    console.log(coursesList);
    

    const loadInfo = async () => {
        const res1 = await dispatch(getAllUserData())
        const res2 = await dispatch(getAllpaymentsList());
        await dispatch(getcoursesList())
    }

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

    const onCourseDelete = async (cid) => {

        if (window.confirm('Are you sure to delete the course')) {
            const response = await dispatch(deleteCourse(cid))
            console.log(response);
            
            if (response?.payload?.success) {
                
                await dispatch(getcoursesList())
            }
        }

    }

    useEffect(() => {
        loadInfo()
    }, [])


    return (
        <HomeLayout>
            <div className=' min-h-[90vh] flex flex-col flex-wrap pl-5 pt-5 gap-10'>
                <h1 className=' text-center  text-5xl text-yellow-500 font-semibold'>Admin Dashboard</h1>

                 {/* stats data of the user and subscriptions */}
                <div className=' grid grid-cols-2 gap-3'>
                    {/* left part of the stats dashboard */}
                    <div className=' flex flex-col justify-center items-center shadow-[0_0_7px_black] py-3 gap-5 rounded-md'>
                        <div className=' h-80 w-80'>
                            <Pie data={userData} />
                        </div>
                        <div className=' grid grid-cols-2 gap-2'>
                            <div className=' flex items-center justify-center gap-5  px-1 rounded'>
                                <div className=' flex justify-center flex-col items-center text-white text-2xl'>
                                    <h3>Registered Users</h3>
                                    <p className='text-yellow-500 text-3xl'>{allUserCount}</p>
                                </div>
                                <FaUsers className=' text-5xl text-white' />
                            </div>
                            <div className=' flex items-center justify-center gap-5  px-1 rounded'>
                                <div className=' flex justify-center flex-col items-center text-white text-2xl'>
                                    <h3>Enrolled Users</h3>
                                    <p className=' text-3xl text-yellow-500'>{subscribedUserCount}</p>
                                </div>
                                <FaUsers className='text-5xl text-green-500' />
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
                                    <FcSalesPerformance className=' text-7xl' />
                                </div>
                            </div>
                            <div className=' w-full grid grid-cols-2  '>
                                <div className=' flex w-full gap-8 items-center text-2xl text-white flex-col'>
                                    <h3>Total Revenue</h3>
                                    <p className=' text-yellow-500'>{allPayments.count * 499}</p>
                                </div>
                                <div className=' flex justify-center'>
                                    <FcSalesPerformance className=' text-7xl' />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className=' w-[98%] py-2 px-3 flex justify-center flex-col gap-5 items-center self-center  shadow-[0_0_7px_black]'>
                    <div className=' w-full flex justify-between items-center'>
                 <h1 className=' text-4xl text-yellow-500 font-semibold'>Course Overview</h1>
             
                 <button
                 onClick={() => navigate('/course/create')}
                 className=' w-fit flex items-center gap-2 bg-yellow-500  rounded-md text-2xl text-black px-2 font-semibold py-1 hover:bg-yellow-600 transition-all ease-in-out duration-300 cursor-pointer '>
                    <p>Create new course</p>
                    <FaPlus className=' text-2xl text-black'/>
                 </button>
           
                    </div>

                <table className='table overflow-x-scroll '>
                    <thead>
                        <tr className=' text-white text-xl'>
                          <th>Sr No.</th>
                          <th>Course title</th>
                          <th>Instructor</th>
                          <th className='  text-center'>No.of lectures</th>
                          <th>Course description</th>
                          <th className='  text-center'>actions</th>

                        </tr>
                    </thead>

                    <tbody>
                        {coursesList.map((course, idx) => {
                            return (
                                <tr key={course._id} className=' text-xl text-gray-400'>
                                    <td>{idx + 1}</td>
                                    <td>{course.title}</td>
                                    <td>{course.createdby}</td>
                                    <td className=' text-center'>{course.noOfLectures}</td>
                                    <td className=' max-w-28 overflow-hidden text-ellipsis whitespace-nowrap'>
                                        <textarea readOnly value={course.description} className=' w-80 resize-none bg-transparent'></textarea>
                                    </td>
                                    <td className=' flex items-center justify-center gap-5'>
                                        <button
                                        onClick={() => navigate('/course/displayLectures',{ state:{...course}})}
                                        className=' bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 text-2xl p-2 rounded-md'>
                                             <BsCollectionPlayFill className=' text-white hover:scale-110 object-cover transition-all ease-in-out duration-200'/>
                                        </button>
                                        <button
                                        onClick={() => onCourseDelete(course._id)}
                                        className=' bg-red-500 hover:bg-red-700 transition-all ease-in-out duration-300 text-2xl p-2 rounded-md'>
                                             <BsTrash className=' text-white hover:scale-110 object-cover transition-all ease-in-out duration-200'/>
                                        </button>
                                        <button
                                        onClick={() => navigate('/course/displayLectures', {state:{...course}}) }
                                        className=' bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 text-2xl p-2 rounded-md'>
                                             <FaEdit className=' text-white hover:scale-110 object-cover transition-all ease-in-out duration-200'/>
                                        </button>
                                        {/* <button className=' bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 text-2xl p-2 rounded-md'>
                                             <BsCollectionPlayFill className=' text-white'/>
                                        </button> */}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>

                </table>
                </div>
            </div>

        </HomeLayout>
    )

}

export default AdminDashboard
