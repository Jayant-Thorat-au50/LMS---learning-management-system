import React, { useEffect } from 'react'

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


ChartJs.register(ArcElement, BarElement, Tooltip, Legend, Title, CategoryScale, LinearScale)


function SuperAdmin() {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { allUserCount, subscribedUserCount, allUsers } = useSelector(state => state?.stat)
    const { allPayments, finalMonth, monthlySalesRecord } = useSelector(state => state?.paymentstate)
    let { coursesList } = useSelector(state => state?.courseState)
    let { data } = useSelector(state => state?.authstate)

    console.log(allUsers);


    const loadInfo = async () => {
        const res1 = await dispatch(getAllUserData())
        const res2 = await dispatch(getAllpaymentsList());
        await dispatch(getcoursesList())
    }


    const openEditCourseModal = (courseData) => {
        setEditCourseModalData(courseData)

        if(editCourseModalData){

            document.getElementById('my_modal_1').showModal()
        }
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
            <div className=' min-h-[90vh] flex flex-col flex-wrap pt-5 gap-10 px-24'>
                <h1 className=' text-center  text-3xl text-yellow-500 font-semibold'>Admin Dashboard</h1>

                {/* stats data of the user and subscriptions */}

               
                <ChartData />
             
                {/* list of users */}
                {/* <UserList openModal={openEditCourseModal} deletecourse={onCourseDelete} /> */}



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
