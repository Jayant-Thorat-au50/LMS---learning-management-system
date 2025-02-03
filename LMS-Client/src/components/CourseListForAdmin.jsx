import React from 'react'
import { BsCollectionPlayFill, BsTrash } from 'react-icons/bs'
import { FaEdit, FaPlus } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { CiFilter } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

function UserList({openModal,deletecourse}) {
    const navigate = useNavigate()
    let { coursesList } = useSelector(state => state?.courseState)
    const {role, data} = useSelector(state => state?.authstate)

    const deleteC = (course) => {
        deletecourse(course._id)
        window.location.reload()
    }


    return (
        <div>
            <div className=' w-[98%] py-2 px-3 flex justify-center mb-5 flex-col gap-5 items-center self-center  shadow-[0_0_7px_black]'>
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
                                                onClick={() => deleteC(course)}
                                                className=' bg-red-500 hover:bg-red-700 transition-all ease-in-out duration-300 text-2xl p-2 rounded-md'>
                                                     <BsTrash className=' text-white hover:scale-110 object-cover transition-all ease-in-out duration-200'/>
                                                </button>
                                                <button
                                                onClick={() => openModal(course) }
                                                className=' bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 text-2xl p-2 rounded-md'>
                                                     <FaEdit className=' text-white hover:scale-110 object-cover transition-all ease-in-out duration-200'/>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
        
                        </table>
                        </div>

                        
                        
        </div>
                        
    )
}

export default UserList
