import React, { useEffect, useState } from 'react'
import HomeLayout from '../../components/HomeLayout'
import { useDispatch, useSelector } from 'react-redux'
import { filterUsers, getAllUserData } from '../../../Redux/Slices/statSlice'
import { BsCollectionPlayFill, BsTrash } from 'react-icons/bs'
import { FaEdit } from 'react-icons/fa'
import { deleteUser } from '../../../Redux/Slices/Authslice'
import { useLocation, useNavigate } from 'react-router-dom'
import { CiFilter } from "react-icons/ci";
import { MdFilterAltOff } from "react-icons/md";
import toast from 'react-hot-toast'


function AllUsersData() {

    const { allUsers } = useSelector(state => state?.stat)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { state } = useLocation();
    const [showFilterOptions, setShowFilterOptions] = useState(false)

    const [filterObj, setFilterObj] = useState({
        Active: false,
        pending: false,
        cancelled: false,
        ADMIN: false,
        'SUPER ADMIN': false
    })

    console.log(allUsers);
    

    const [list, setList] = useState(allUsers)

    console.log(allUsers);
    console.log(list);


    const load = async () => {
        const response = await dispatch(getAllUserData())
    }

    const handleUserDelete = async (userId) => {

        if(window.confirm('Are you sure to delete the user')){

            const response = await dispatch(deleteUser(userId))
            console.log(response);
    
    
            if (response.payload.success) {
                navigate('/super-admin/dashboard')
            }
        }
    }

    const [filter, setFilter] = useState({
        role: "",
        subscription: {
            status: ""
        }
    })

    console.log(filter);
    console.log(filterObj);


    const handleFilterinputs = (e) => {

        const { name, checked } = e.target

        // setFilterObj({
        //     name:checked
        // })

        if (name === 'Active' && checked) {
            setFilter({
                subscription: { status: name }
            })
        }
        if (name === 'pending' && checked) {
            setFilter({
                subscription: { status: name }
            })
        }
        if (name === 'cancelled' && checked) {
            setFilter({
                subscription: { status: name }
            })
        }
        if (name === 'ADMIN' && checked) {


            setFilter({
                role: name

            })
        }
        if (name === 'SUPER ADMIN' && checked) {
            setFilter({
                role: name
            })
        }


        setFilterObj((prev) => ({
            Active: false,
            pending: false,
            cancelled: false,
            ADMIN: false,
            'SUPER ADMIN': false
        }))
        setFilterObj((prev) => ({
            [name]: checked
        })
        )


    }

    const applyFilter = async () => {

        console.log(filter);


        if (!filter.subscription && !filter.role) {
            toast.error(" plaese select an filter option");
            return;
        }

        const response = await dispatch(filterUsers(filter))
        console.log(response);
        if (response?.payload?.success) {
            setShowFilterOptions(false),
                console.log(response.payload.users),
                setList(response.payload.users)
            setFilterObj({})
        }
    }
    useEffect(() => {
        load()
    }, [])

    return (
        <HomeLayout>

            <div className=' pt-16 px-16  flex justify-center items-center flex-col gap-10'>

                <div className=' relative self-end gap-16 flex  w-7/12 justify-between'>
                    <h1 className=' text-yellow-500 text-5xl font-semibold'>All users</h1>
                    {!showFilterOptions ? (<CiFilter
                        onClick={() => {
                            setShowFilterOptions(!showFilterOptions)
                        }}
                        className=' text-5xl text-white bg-sky-300 rounded-md' />) : (
                        <MdFilterAltOff
                            onClick={() => setShowFilterOptions(!showFilterOptions)}
                            className=' text-5xl text-white bg-sky-300 rounded-md' />
                    )}
                    {showFilterOptions ? (
                        <div className=' my-3 absolute -top-5 py-5 rounded-md z-50 w-52 bg-gray-300 text-black right-12 border flex flex-col shadow-[0_0_10px_black]'>
                            <div className=' flex border justify-between items-center font-semibold px-1'>
                                <label htmlFor="" className=' text-xl'>active</label>
                                <input type="checkbox" name='Active' checked={filterObj.Active} onChange={handleFilterinputs} className=' h-6 w-6 bg-black text-2xl' />
                            </div>
                            <div className=' flex border justify-between items-center font-semibold px-1'>
                                <label htmlFor="" className=' text-xl'>pending</label>
                                <input type="checkbox" name='pending' onChange={handleFilterinputs} checked={filterObj.pending} className=' h-6 w-6 bg-black text-2xl' />
                            </div>
                            <div className=' flex border justify-between items-center font-semibold px-1'>
                                <label htmlFor="" className=' text-xl'>cancelled</label>
                                <input type="checkbox" name='cancelled' onChange={handleFilterinputs} checked={filterObj.cancelled} className=' h-6 w-6 bg-black text-2xl' />
                            </div>
                            <div className=' flex border justify-between items-center font-semibold px-1'>
                                <label htmlFor="" className=' text-xl'>admin</label>
                                <input type="checkbox" checked={filterObj.ADMIN} name='ADMIN' onChange={handleFilterinputs} className=' h-6 w-6 bg-black text-2xl' />
                            </div>
                            <div className=' flex border justify-between items-center font-semibold px-1'>
                                <label htmlFor="" className=' text-xl'>S. admin</label>
                                <input type="checkbox" name='SUPER ADMIN' onChange={handleFilterinputs} checked={filterObj['SUPER ADMIN']} className=' h-6 w-6 bg-black text-2xl' />
                            </div>

                            <div className=' w-fit self-center my-2 '>
                                <button
                                    onClick={applyFilter}
                                    className=' font-semibold bg-sky-300 px-2 py-1 rounded-md text-black text-xl'>
                                    Apply
                                </button>
                            </div>

                        </div>
                    ) : null}
                </div>

                <table className='table bg-white shadow-[0_0_9px_gray] overflow-x-scroll mb-9  '>
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

                        {

                            list.length > 0 ? (
                                list.map((user, idx) => {
                                    return (
                                        <tr key={user._id} className=' text-xl text-gray-400'>
                                            <td>{idx + 1}</td>
                                            <td>{user.fullName}</td>
                                            <td>{user.email}</td>

                                            {user.role === "SUPER ADMIN" ? (<td className=' text-green-500'>{user.role}</td>) : (<td>{user.role}</td>)}
                                            <td>{user.subscription.status}</td>

                                            <td className=' flex items-center justify-center gap-5'>

                                                <button
                                                    onClick={() => handleUserDelete(user._id)}
                                                    className=' bg-red-500 hover:bg-red-700 transition-all ease-in-out duration-300 text-2xl p-2 rounded-md'>
                                                    <BsTrash className=' text-white hover:scale-110 object-cover transition-all ease-in-out duration-200' />
                                                </button>


                                            </td>



                                        </tr>
                                    )
                                })
                            ) : (
                                allUsers.map((user, idx) => {
                                    return (
                                        <tr key={user._id} className=' text-xl text-gray-400'>
                                            <td>{idx + 1}</td>
                                            <td>{user.fullName}</td>
                                            <td>{user.email}</td>

                                            {user.role === "SUPER ADMIN" ? (<td className=' text-green-500'>{user.role}</td>) : (<td>{user.role}</td>)}
                                            <td>{user.subscription.status}</td>

                                            <td className=' flex items-center justify-center gap-5'>

                                                <button
                                                    onClick={() => handleUserDelete(user._id)}
                                                    className=' bg-red-500 hover:bg-red-700 transition-all ease-in-out duration-300 text-2xl p-2 rounded-md'>
                                                    <BsTrash className=' text-white hover:scale-110 object-cover transition-all ease-in-out duration-200' />
                                                </button>


                                            </td>



                                        </tr>
                                    )
                                })
                            )
                        }


                    </tbody>

                </table>


                <div className="overflow-x-auto bg-white">
  <table className="table">
    {/* head */}
    <thead>
    <tr className=' text-black text-xl'>
                            <th>Sr. No.</th>
                            <th>fullName</th>
                            <th>email</th>
                            {/* <th>avatar</th> */}
                            <th className=' '>role</th>
                            <th>subscription</th>
                            <th className='  text-center'>actions</th>

                        </tr>
    </thead>
    <tbody className='text-lg text-black'>
      {/* row 1 */}
      {

list.length > 0 ? (
    list.map((user, idx) => {
        return (
            <tr key={user._id} className=' '>
                <td>{idx + 1}</td>
                <td>
                    <img src={user.avatar.secureUrl} alt="" className=' h-12 w-12' />
                    <p>{user.fullName}</p>
                </td>
                <td>{user.email}</td>

                {user.role === "SUPER ADMIN" ? (<td className=' text-green-500'>{user.role}</td>) : (<td>{user.role}</td>)}
                <td className='text-sm text-black'>{user.subscription.status}</td>

                <td className=' flex items-center justify-center gap-5'>

                    <button
                        onClick={() => handleUserDelete(user._id)}
                        className=' bg-red-500 hover:bg-red-700 transition-all ease-in-out duration-300 text-2xl p-2 rounded-md'>
                        <BsTrash className=' text-white hover:scale-110 object-cover transition-all ease-in-out duration-200' />
                    </button>


                </td>


            </tr>
        )
    })
) : (
    allUsers.map((user, idx) => {
        return (
            <tr key={user._id} className=''>
                <td>{idx + 1}</td>
                <td>
                <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={user.avatar.secureUrl}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold text-lg text-black capitalize">{user.fullName}</div>
            </div>
          </div>
                    </td>
                <td className='text-lg text-black'>{user.email}</td>

                {user.role === "SUPER ADMIN" ? (<td className='text-lg text-green-500'>{user.role}</td>) : (<td>{user.role}</td>)}
                <td>{user.subscription.status}</td>

                <td className=' flex items-center justify-center gap-5'>

                    <button
                        onClick={() => handleUserDelete(user._id)}
                        className=' bg-red-500 hover:bg-red-700 transition-all ease-in-out duration-300 text-2xl p-2 rounded-md'>
                        <BsTrash className=' text-white hover:scale-110 object-cover transition-all ease-in-out duration-200' />
                    </button>


                </td>



            </tr>
        )
    })
)
}

    </tbody>
    {/* foot */}

  </table>
</div>
            </div>
        </HomeLayout>
    )
}

export default AllUsersData
