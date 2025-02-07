import React, { useEffect, useState } from 'react'

// component imports
import { FaPlus } from 'react-icons/fa'
import HomeLayout from '../../components/HomeLayout'
import ChartData from '../../components/chartData'
import UserList from '../../components/CourseListForAdmin'

// hooks and lib imports
import { ArcElement, BarElement, CategoryScale, Chart as ChartJs, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { Bar, Pie } from 'react-chartjs-2'
import { FaEdit, FaUsers } from 'react-icons/fa'
import { FcSalesPerformance } from 'react-icons/fc'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


// thunck imports
import { BsCollectionPlayFill, BsPlayFill, BsTrash } from 'react-icons/bs'
import { getAllpaymentsList } from '../../../Redux/Slices/PaymentsSlice'
import { deleteCourse, getcoursesList } from '../../../Redux/Slices/courseSlice'
import { getAllUserData } from '../../../Redux/Slices/statSlice'
import { authorizeAdmin, getRequestList, getUserData, rejectAdminreq } from '../../../Redux/Slices/Authslice'
import toast from 'react-hot-toast'


ChartJs.register(ArcElement, BarElement, Tooltip, Legend, Title, CategoryScale, LinearScale)


function SuperAdmin() {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { allUserCount, subscribedUserCount, allUsers } = useSelector(state => state?.stat)
    const { allPayments, finalMonth, monthlySalesRecord } = useSelector(state => state?.paymentstate)
    let { coursesList } = useSelector(state => state?.courseState)
    let { data } = useSelector(state => state?.authstate)
    let { SAdminReqList } = useSelector(state => state?.authstate)

    const [requestStatus, setrequestStatus] = useState({
        aprooved:false,
        rejected:false
    })

    SAdminReqList = SAdminReqList.filter(reqUser => reqUser.role != "SUPER ADMIN")



    const loadInfo = async () => {
        const res = await dispatch(getRequestList())
        const res1 = await dispatch(getAllUserData())
        const res2 = await dispatch(getAllpaymentsList());
        await dispatch(getcoursesList())
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

    const onAuthorizeAdmin = async (reqUser) => {
      
        const response = await dispatch(authorizeAdmin(reqUser))
        if (response.payload.success) {
            setrequestStatus({
                ...requestStatus, aprooved:true
            })
            toast.success('request accepted successfully')
        }
    }
    const rejectAdminrequest = async (reqUser) => {
      
        const response = await dispatch(rejectAdminreq(reqUser))
        if (response.payload.success) {
            setrequestStatus({
                ...requestStatus, rejected:true
            })
            toast.success('request rejected')
        }
    }




    useEffect(() => {
        loadInfo();
    }, [])




    return (
        <HomeLayout>
            <div className=' min-h-[90vh] bg-white flex flex-col flex-wrap pt-5 gap-10 px-24'>
                <h1 className=' text-center  text-3xl text-blue-500 font-semibold'>Super Admin Dashboard</h1>


                {/* stats data of the user and subscriptions */}


                <ChartData />

                {/* list of users */}
                {/* <UserList openModal={openEditCourseModal} deletecourse={onCourseDelete} /> */}

                <div
                    tabIndex={0}
                    className="bg-gray-300 w-full  focus:bg-gray-200 focus:text-secondary-content collapse">
                    <div className="collapse-title flex justify-between items-center">
                        <p className=' text-black text-xl font-semibold'>Requests to become admin</p>
                        <p className=' text-white bg-green-500 p-2 h-12 w-12 text-xl text-center font-bold rounded-full'>{SAdminReqList.length}</p>
                        </div>
                    <div className="collapse-content">
                        <ul className=' w-full'>
                            {SAdminReqList && SAdminReqList.map(reqUser => <li>
                                <div className=' border-b-2 my-4 border-gray-400 w-full flex justify-between items-center px-5 '>
                                    <div className=' flex justify-center items-center gap-4'>
                                        <img src={reqUser.avatar.secureUrl} alt="" className=' h-16 w-16 rounded-lg' />
                                        <h3 className=' text-lg capitalize'>{reqUser.fullName}</h3>
                                    </div>
                                    <div className=' space-x-5'>
                                        <span
                                            onClick={() => onAuthorizeAdmin(reqUser)}
                                            className='px-2 py-1 font-semibold text-black bg-green-500 rounded-md transition-all ease-in-out duration-200 hover:bg-green-700'>{requestStatus.aprooved ? 'Aprooved':'Aproove'}</span>
                                        <span
                                        onClick={() => rejectAdminrequest(reqUser)}
                                        className=' px-2 py-1 font-semibold text-black bg-red-600 rounded-md transition-all ease-in-out duration-200 hover:bg-red-700'>{requestStatus.rejected ? 'Rejected':'Reject'}</span>
                                    </div>
                                </div>
                            </li>)}
                        </ul>
                    </div>
                </div>


                <div className="overflow-x-auto bg-blue-200 my-5 px-6 ">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className=' text-black text-lg'>
                                <th>Sr No.</th>
                                <th>Course title</th>
                                <th>Instructor</th>
                                <th className='  text-center'>No.of lectures</th>
                                <th>Course description</th>
                                <th className='  text-center'>actions</th>
                            </tr>
                        </thead>
                        <tbody className=' text-black'>
                            {/* row 1 */}
                            {coursesList.map((course, idx) => {
                                return (
                                    <tr key={course._id} className=' text-lg text-black'>
                                        <td>{idx + 1}</td>
                                        <td>{course.title}</td>
                                        <td>{course.createdby}</td>
                                        <td className=' text-center'>{course.noOfLectures}</td>
                                        <td className=' max-w-28 overflow-hidden text-ellipsis whitespace-nowrap'>
                                            <textarea readOnly value={course.description} className=' w-80 resize-none bg-transparent'></textarea>
                                        </td>
                                        <td className=' flex items-center justify-center gap-5'>
                                            <button
                                                onClick={() => navigate('/course/displayLectures', { state: { ...course } })}
                                                className=' bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 text-2xl p-2 rounded-md'>
                                                <BsCollectionPlayFill className=' text-white hover:scale-110 object-cover transition-all ease-in-out duration-200' />
                                            </button>
                                            <button
                                                onClick={() => onCourseDelete(course)}
                                                className=' bg-red-500 hover:bg-red-700 transition-all ease-in-out duration-300 text-2xl p-2 rounded-md'>
                                                <BsTrash className=' text-white hover:scale-110 object-cover transition-all ease-in-out duration-200' />
                                            </button>

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

export default SuperAdmin
