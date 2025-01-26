import React, { useEffect } from 'react'

// component imports
import HomeLayout from '../../components/HomeLayout'

// hooks and lib imports
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

// thunck imports
import { getAllUserData } from '../../../Redux/Slices/statSlice';
import { cancelSubscription, getAllpaymentsList } from '../../../Redux/Slices/PaymentsSlice';


function AdminDashboard() {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { allUserCount, subscribedUserCount } = useSelector(state => state?.stat)
    const { subscriptions } = useSelector(state => state?.paymentstate)

   

    return (
        <HomeLayout>


        </HomeLayout>
    )

}

export default AdminDashboard
