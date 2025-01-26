import React, { useEffect } from 'react'

// component imports
import HomeLayout from '../../components/HomeLayout'

// hooks and lib imports
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

// thunck imports
import { getAllUserData } from '../../../Redux/Slices/statSlice';
import { getAllpaymentsList } from '../../../Redux/Slices/PaymentsSlice';


function AdminDashboard() {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { allUserCount, subscribedUserCount } = useSelector(state => state?.stat)
    const { allPayments, finalMonth, monthlySalesRecord } = useSelector(state => state?.paymentstate)


    const load = async () => {
        const res1 = await dispatch(getAllUserData())
        const res2 = await dispatch(getAllpaymentsList())
    }

    console.log(allPayments);
    console.log(finalMonth);
    console.log(monthlySalesRecord);

    useEffect(() => {
        load()
    }, [])


    return (
        <HomeLayout>


        </HomeLayout>
    )

}

export default AdminDashboard
