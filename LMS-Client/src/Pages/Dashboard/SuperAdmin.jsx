import React, { useEffect } from 'react'

// component imports
import HomeLayout from '../../components/HomeLayout'
import { FaPlus } from 'react-icons/fa'
import ChartData from '../../components/chartData'


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
import UserList from '../../components/UserList'

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
                
                <ChartData/>
              {/* list of users */}
                <UserList/>
            </div>

        </HomeLayout>
    )

}

export default SuperAdmin
