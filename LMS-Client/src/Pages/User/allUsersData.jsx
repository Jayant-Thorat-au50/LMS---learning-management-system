import React, { useEffect } from 'react'
import HomeLayout from '../../components/HomeLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUserData } from '../../../Redux/Slices/statSlice'
import { BsCollectionPlayFill, BsTrash } from 'react-icons/bs'
import { FaEdit } from 'react-icons/fa'
import { deleteUser } from '../../../Redux/Slices/Authslice'
import { useLocation, useNavigate } from 'react-router-dom'

function AllUsersData() {

    const {allUsers} = useSelector(state => state?.stat)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {state} = useLocation();

    console.log(state);

    const load = async () => {
        const response = await dispatch(getAllUserData())
    }

    const handleUserDelete = async (userId) => {

        const response = await dispatch(deleteUser(userId))
        console.log(response);
        

        if(response.payload.success){
            navigate('/superAdmin/dashboard')
        }
    }

    useEffect(() => {
          load()
    }, [])
    
    return (
        <HomeLayout>

            <div className=' pt-16 px-16  flex justify-center items-center flex-col gap-10'>

                <h1 className=' text-yellow-500 text-5xl font-semibold'>All users</h1>

                         <table className='table shadow-[0_0_9px_gray] overflow-x-scroll mb-9  '>
                                <thead>
                                    <tr className=' text-white text-xl'>
                                        <th>Sr. No.</th>
                                      <th>fullName</th>
                                      <th>email</th>
                                      {/* <th>avatar</th> */}
                                      <th className=' '>role</th>
                                      <th>subscription</th>
                                      <th className='  text-center'>actions</th>
            
                                    </tr>
                                </thead>
            
                                <tbody>
                                    {allUsers.map((user, idx) => {
                                        return (
                                            <tr key={user._id} className=' text-xl text-gray-400'>
                                                <td>{idx + 1}</td>
                                                <td>{user.fullName}</td>
                                                <td>{user.email}</td>
                                                
                                                {user.role ==="SUPER ADMIN"?(<td className=' text-green-500'>{user.role}</td>):(<td>{user.role}</td>)}
                                                <td>{user.subscription.status}</td>
                                            
    <td className=' flex items-center justify-center gap-5'>
                                          
                                          <button
                                            onClick={() => handleUserDelete(user._id)}
                                          className=' bg-red-500 hover:bg-red-700 transition-all ease-in-out duration-300 text-2xl p-2 rounded-md'>
                                               <BsTrash className=' text-white hover:scale-110 object-cover transition-all ease-in-out duration-200'/>
                                          </button>
                                        
                                
                                      </td>                                          
                                                
                                           
                                                
                                            </tr>
                                        )
                                    })}
                                </tbody>
            
                            </table>
            </div>
        </HomeLayout>
    )
}

export default AllUsersData
