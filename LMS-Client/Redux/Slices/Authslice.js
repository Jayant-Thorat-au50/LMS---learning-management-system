import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn:localStorage.getItem('isLoggedIn')  || false,
    role:localStorage.getItem('role')  || " ",
    data:localStorage.getItem('data')  || {},
    
}

const AuthSlice = {
    name:'Auth',
    initialState,
    reducers:{}
}

export default AuthSlice.reducers