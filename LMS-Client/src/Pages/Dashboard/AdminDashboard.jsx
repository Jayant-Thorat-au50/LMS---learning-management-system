import React, { useEffect } from 'react'

// component imports
import HomeLayout from '../../components/HomeLayout'

// hooks and lib imports
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

// thunck imports
import { getAllUserData } from '../../../Redux/Slices/statSlice';
import axiosInstance from '../../Helpers/axiosInstance';

function AdminDashboard() {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { allUserCount, subscribedUserCount } = useSelector(state => state?.stat)

    const load = async () => {

        const response1 = await axiosInstance.get('/user/get');
        console.log(response1);
        
        const response = await dispatch(getAllUserData())
        console.log(response);
    }
    console.log(allUserCount);
    console.log(subscribedUserCount);
    

    useEffect(() => {
        load()
    }, [])


    return (
        <HomeLayout>


        </HomeLayout>
    )
}

export default AdminDashboard
