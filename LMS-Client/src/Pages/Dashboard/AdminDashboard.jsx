import React, { useEffect, useState } from 'react';

// component imports
import { FaPlus } from 'react-icons/fa';
import HomeLayout from '../../components/HomeLayout';
import { LuPlus } from "react-icons/lu";


// hooks and lib imports
import { ArcElement, BarElement, CategoryScale, Chart as ChartJs, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { FaEdit, FaUsers } from 'react-icons/fa';
import { FcSalesPerformance } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


// thunck imports
import toast from 'react-hot-toast';
import { BsCollectionPlayFill, BsPlayFill, BsTrash } from 'react-icons/bs';
import { deleteCourse, editCourse, getcoursesList } from '../../../Redux/Slices/courseSlice';
import { getAllpaymentsList } from '../../../Redux/Slices/PaymentsSlice';
import { getAllUserData } from '../../../Redux/Slices/statSlice';
import ChartData from '../../components/chartData';
import UserList from '../../components/CourseListForAdmin';

ChartJs.register(ArcElement, BarElement, Tooltip, Legend, Title, CategoryScale, LinearScale)


function AdminDashboard() {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { allUserCount, subscribedUserCount } = useSelector(state => state?.stat)
    const { allPayments, finalMonth, monthlySalesRecord } = useSelector(state => state?.paymentstate)
    let { coursesList } = useSelector(state => state?.courseState)
    let { data } = useSelector(state => state?.authstate)
    const [editCourseModalData, setEditCourseModalData] = useState({})

    coursesList = coursesList.filter(course => course.createdby == data.fullName)

    // coursesList = coursesList.filter(course => course.createdby === data.fullName )



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

    const openEditCourseModal = (courseData) => {
        setEditCourseModalData(courseData)

        if (editCourseModalData) {

            document.getElementById('my_modal_1').showModal()
        }
    }

    const handleInputChage = (e) => {

        const { name, value } = e.target;

        setEditCourseModalData({
            ...editCourseModalData,
            [name]: value
        })
    }

    console.log(editCourseModalData);

    const getVideo = (e) => {

        const video = e.target.files[0]

        const source = window.URL.createObjectURL(video);

        if (source) {
            setEditCourseModalData({
                ...editCourseModalData,
                newThumbnail: video,
                thumbnail: {
                    secure_Url: source
                }
            })
        }
    }

    const onCourseEdit = async (e) => {

        e.preventDefault()

        if (!editCourseModalData.title || !editCourseModalData.description) {
            toast.error("Every field is required")
            return
        }
        const formData = new FormData();
        formData.append('title', editCourseModalData.title)
        formData.append('description', editCourseModalData.description)
        formData.append('newThumbnail', editCourseModalData.newThumbnail)

        console.log(formData.entries());

        const response = await dispatch(editCourse([editCourseModalData._id, formData]))

        console.log(response);
        if (response?.payload?.success) {
            console.log('course updated successfully');
            setEditCourseModalData({})
            window.location.reload()

        }

    }

    useEffect(() => {
        loadInfo()
    }, [])


    return (
        <HomeLayout>
            <div className='  from-blue-200 via-cyan-100 to-slate-50 min-h-[90vh] flex flex-col flex-wrap px-24 pt-5 gap-5'>
                <h1 className=' text-center  text-3xl text-blue-500 font-semibold'>Admin Dashboard</h1>
z
                {/* stats data of the user and subscriptions */}
                <ChartData />

                {/* <UserList openModal={openEditCourseModal} deletecourse={onCourseDelete}/> */}


                <div className="overflow-x-auto bg-gradient-to-b from-slate-50 to-teal-100  my-5 px-6 ">
                    <div className=' border-b-2 border-black flex justify-between items-center py-2 w-full px-2 my-2'>
                        <p className=' text-xl font-semibold text-black'>your courses</p>
                        <button 
                        onClick={() => navigate('/course/create')}
                        className=' flex items-center bg-green-500 justify-between gap-2 px-2 py-1'>
                            <FaPlus className=' text-black' />
                        <p className=' text-black  font-semibold text-lg'>Create new</p> 
                        </button>

                    </div>
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
                                                onClick={() => onCourseDelete(course._id)}
                                                className=' bg-red-500 hover:bg-red-700 transition-all ease-in-out duration-300 text-2xl p-2 rounded-md'>
                                                <BsTrash className=' text-white hover:scale-110 object-cover transition-all ease-in-out duration-200' />
                                            </button>
                                            <button
                                                onClick={() => openEditCourseModal(course)}
                                                className=' bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 text-2xl p-2 rounded-md'>
                                                <FaEdit className=' text-white hover:scale-110 object-cover transition-all ease-in-out duration-200' />
                                            </button>

                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

            </div>

            <dialog id="my_modal_1" className="modal bg-blue-200">
                <form onSubmit={onCourseEdit} className="modal-box w-11/12 max-w-5xl">
                    <h1 className=' text-4xl text-yellow-500 text-center font-semibold my-5 shadow-[0_0_20px_black] py-1'>Edit course</h1>

                    <div className=' w-full shadow-[0_0_20px_black] p-4 grid grid-cols-2 gap-5'>


                        <div className='  flex flex-col gap-5'>
                            <div className=' flex flex-col justify-center items-start   w-full  px-4'>
                                <label htmlFor="" className=' text-2xl text-yellow-500'>Title :</label>
                                <input type="text" name='title' value={editCourseModalData.title} onChange={handleInputChage} className='bg-transparent border text-xl text-white px-2
         rounded w-full py-1' />
                            </div>
                            <div className=' flex flex-col justify-center items-start  w-full  px-4'>
                                <label htmlFor="" className=' text-2xl text-yellow-500'>Description :</label>
                                <textarea type="text" name='description' value={editCourseModalData.description} onChange={handleInputChage} className=' rounded resize-none h-44 w-full text-xl  text-white px-2
          py-1 bg-transparent border' />
                            </div>
                        </div>

                        <div className=' space-y-5'>
                            {
                                editCourseModalData?.thumbnail?.secure_Url ? (
                                    <div className=' relative'>
                                        <img
                                            src={editCourseModalData?.thumbnail?.secure_Url}
                                            className=' w-full  h-60'
                                            alt="" />
                                        <button
                                            onClick={() => setEditCourseModalData({ ...editCourseModalData, thumbnail: { secure_Url: "" } })}
                                            className=' bg-red-700 rounded-md font-semibold px-2 text-lg text-white absolute -bottom-7 left-0'>
                                            remove img
                                        </button>
                                    </div>
                                ) : (
                                    <div className=' border h-60  w-full'>
                                        <label htmlFor="avatar" className='   h-60 border w-full flex justify-center items-center '><p className='text-xl text-white'>Choose your thumbnail</p></label>
                                        <input type="file" name='avatar' id='avatar' hidden value={editCourseModalData?.thumbnail?.secure_Url} onChange={getVideo} />
                                    </div>
                                )
                            }
                            <div className=" w-full  h-14 flex items-center justify-center  text-2xl">

                                <div className=' w-full ps-6 grid grid-cols-2'>
                                    <label htmlFor="" className=' text-center mx-auto text-yellow-400'>Course catagory :</label>
                                    <select name="select" id="" className=' bg-transparent rounded-lg shadow-[0_0_7px_black]'>
                                        <option value="" className=' text-white rounded-lg bg-transparent'>Ai Ml</option>
                                    </select>

                                </div>
                            </div>
                        </div>
                    </div>


                    <div className=' flex py-0 w-full items-center justify-end relative'>
                        <button
                            type='Submit'
                            className=' bg-green-500 btn text-black text-2xl absolute bottom-0 right-24'>Save</button>
                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button, it will close the modal */}
                                <button className="btn text-2xl bg-red-500 text-black">Close</button>
                            </form>
                        </div>
                    </div>
                </form>
            </dialog>




        </HomeLayout>
    )

}

export default AdminDashboard
